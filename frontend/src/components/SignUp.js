import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.cpassword) {
        alert("Password not matching");
        return;
      }
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        { email: formData.email, password: formData.password }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("User registered successfully");
      }
      setFormData({ email: "", password: "", cpassword: "" });
    } catch (err) {
      console.log("Error", err);
    }
  };
  console.log(formData);

  return (
    <>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row style={{ width: "100%" }}>
          <Col
            md={4}
            className="mx-auto p-4 rounded-1"
            style={{ border: "1px solid gray" }}
          >
            <h3 className="text-center mb-4">Sign Up</h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={formData.cpassword}
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="w-100 p-2 rounded-pill"
              >
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col md={4} className="mx-auto p-4">
            <Button variant="outline-success" style={{ width: "100%" }}>
              Already have an Account ? Login
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
