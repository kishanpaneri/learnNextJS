"use client";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";

// Yup schema to validate the form
const schema = Yup.object().shape({
  downPayment: Yup.number().required(),
  loadAmount: Yup.number().required(),
  tenure: Yup.number().required(),
});

const initialValues = {
  downPayment: null,
  loadAmount: null,
  tenure: null,
};

export default function EmiCalculator() {
  const router = useRouter();
  const [customError, setCustomError] = useState("");
  const [emi, setEmi] = useState();
  
  const userLS = localStorage.getItem("currentUser");
  if (userLS == null || userLS == "null") {
    router.push("/");
  }

  const handleSubmit = (values, { resetForm }) => {
    debugger;
    let interest = parseFloat(((values.loadAmount * 10) / 100).toFixed(2));
    let totalAmt = (values.loadAmount + interest).toFixed(2);
    let tenureInMonth = values.tenure * 12;
    let emi = (totalAmt / tenureInMonth).toFixed(2);
    setEmi(emi);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <Form>
              <FormGroup className="mb-3">
                <label htmlFor="downPayment">Down Payment:</label>
                <Field
                  type="number"
                  name="downPayment"
                  className="form-control"
                />
                <ErrorMessage name="downPayment" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup className="mb-3">
                <label htmlFor="loadAmount">loadAmount:</label>
                <Field
                  type="number"
                  name="loadAmount"
                  className="form-control"
                />
                <ErrorMessage name="loadAmount" component="div" className="text-danger" />
              </FormGroup>
              <FormGroup className="mb-3">
                <label htmlFor="tenure">Tenure:</label>
                <Field type="number" name="tenure" className="form-control" />
                <ErrorMessage name="tenure" component="div"  className="text-danger" />
              </FormGroup>
              <FormGroup className="mb-3">
                <Button type="submit" color="primary" outline>
                  Submit
                </Button>
              </FormGroup>
              {customError && (
                <FormGroup className="text-danger mb-3">{ customError }</FormGroup>
              )}

              {emi && (
                <FormGroup className="mb-3">
                  <label>EMI:</label>
                  <p>{emi}</p>
                </FormGroup>
              )}
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
