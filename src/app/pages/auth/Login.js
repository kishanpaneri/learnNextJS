"use client";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Card,
  Button,
  Nav,
} from "react-bootstrap";

// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
};

const Register = () => {
  const router = useRouter();
  const [customError, setCustomError] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    debugger;
    // Handle form submission logic here
    let users = [];
    const usersLS = localStorage.getItem("users");
    if (usersLS) {
      users = JSON.parse(usersLS);
      let userFilter = users.filter(
        (user) => user.email == values.email && user.password == values.password
      );
      if (userFilter.length > 0) {
        localStorage.setItem("currentUser", JSON.stringify(userFilter[0]));
        router.push("/dashboard");      
        router.refresh();          
      } else {
        setCustomError("Email or password not match.");
        resetForm();
      }
    } else {
      setCustomError("Email or password not match.");
      resetForm();
    }
  };

  return (
    <Container>
      <Row>
        <Col md="6" className="m-auto mt-5">
          <Card className="text-center">
            <Card.Header>Learn NextJS</Card.Header>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={schema}
              >
                <Form>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label>Email</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label>Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      style={{ marginRight: "5px" }}
                    >
                      Login
                    </Button>
                    <Nav.Link href="/register"  className="text-primary" style={{ display: "inline" }}>
                      Register
                    </Nav.Link>
                  </FormGroup>

                  {customError && (
                    <FormGroup  className="text-danger">{customError}</FormGroup>
                  )}
                </Form>
              </Formik>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
