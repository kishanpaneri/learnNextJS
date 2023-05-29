"use client";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
  confPwd: Yup.string().required().min(7),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confPwd: "",
};

const Register = () => {
  const router = useRouter();
  const [customError, setCustomError] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    debugger;
    // Handle form submission logic here
    let addUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    let users = [];
    const usersLS = localStorage.getItem("users");
    if (usersLS) {
      users = JSON.parse(usersLS);
      let userFilter = users.filter((user) => user.email == values.email);
      if (userFilter.length > 0) {
        setCustomError("Email already exist.");
      } else {
        users.push(addUser);
        localStorage.setItem("users", JSON.stringify(users));
        resetForm();
        router.push("/login");
      }
    } else {
      users.push(addUser);
      localStorage.setItem("users", JSON.stringify(users));
      resetForm();
      router.push("/login");
    }
  };

  return (
    <Container>
      <Row>
        <Col md="6" className="m-auto mt-5">
          <Card className="text-center">
            <Card.Header className="text-start">Learn NextJS</Card.Header>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={schema}
              >
                <Form>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" name="name" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <label htmlFor="confPwd">Confirm Password:</label>
                    <Field
                      type="password"
                      name="confPwd"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confPwd"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup className="mb-3" style={{ textAlign: "start" }}>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      style={{ marginRight: "5px" }}
                    >
                      Register
                    </Button>
                    <Nav.Link href="/login" className="text-primary" style={{ display: "inline" }}>
                      Login
                    </Nav.Link>
                  </FormGroup>

                  {customError && (
                    <div className="text-danger">{customError}</div>
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
