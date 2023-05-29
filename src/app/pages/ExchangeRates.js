"use client";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const currencyOtps = ["USD", "INR", "EUR", "GBP"];

// Yup schema to validate the form
const schema = Yup.object().shape({
  amount: Yup.number().required(),
  fromCurrency: Yup.string().required(),
  toCurrency: Yup.string().required(),
  date: Yup.string().required(),
});

const initialValues = {
  amount: null,
  fromCurrency: "EUR",
  toCurrency: "GBP",
  date: "",
};

export default function ExchangeRates() {
  const router = useRouter();
  const [customError, setCustomError] = useState("");
  const [exchangeAmt, setExchangeAmt] = useState();
  const userLS = localStorage.getItem("currentUser");
  if (userLS == null || userLS == "null") {
    router.push("/");
  }

  const handleSubmit = (values, { resetForm }) => {
    debugger;

    var myHeaders = new Headers();
    myHeaders.append("apikey", "IjiIBD9bMmEMDpA56oGFI1tH6cNw4pjl");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${values.toCurrency}&from=${values.fromCurrency}&amount=${values.amount}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        debugger;
        if (result) {
          const res = JSON.parse(result);
          if (res && res?.success) setExchangeAmt(res.result.toFixed(2));
          else setCustomError(res.error.message);
        } else setCustomError("API Error.");
      })
      .catch((error) => console.log("error", error));
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
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <FormGroup className="mb-3">
                  <label htmlFor="amount">Amount:</label>
                  <Field type="number" name="amount" className="form-control" />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <label htmlFor="fromCurrency">From Currency:</label>
                  <Field
                    as="select"
                    name="fromCurrency"
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("fromCurrency", e.target.value);
                    }}
                  >
                    {currencyOtps
                      .filter((item) => item != values.toCurrency)
                      .map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage
                    name="fromCurrency"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <label htmlFor="toCurrency">To Currency:</label>
                  <Field
                    as="select"
                    name="toCurrency"
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("toCurrency", e.target.value);
                    }}
                  >
                    {currencyOtps
                      .filter((item) => item != values.fromCurrency)
                      .map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </Field>
                  <ErrorMessage
                    name="toCurrency"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <label htmlFor="date">Date:</label>
                  <DatePicker
                    selected={values.date}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    name="date"
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Button type="submit" color="primary" outline>
                    Submit
                  </Button>
                </FormGroup>
                {customError && (
                  <FormGroup className="text-danger mb-3">
                    {customError}
                  </FormGroup>
                )}

                {exchangeAmt && (
                  <FormGroup className="mb-3">
                    <label>Exchange Amount:</label>
                    <p>{exchangeAmt}</p>
                  </FormGroup>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
