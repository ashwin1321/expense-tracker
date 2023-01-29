import React from "react";
import Layout from "../components/layout/Layout";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Layout>
        <div className=" register-page ">
          <Form layout="vertical" onFinish={handleSubmit}>
            {" "}
            {/* antd doesn't have onSubmit */}
            <h1 className="txt">Please Register</h1>
            <Form.Item label="Username" name="name">
              <Input type="text" placeholder="Enter Username" />
            </Form.Item>
            <Form.Item label="email" name="email">
              <Input type="email" placeholder="Enter Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter Password" />
            </Form.Item>
            <div className=" abc d-flex justify-content-between">
              <Link to="/login" className="link">
                Already Register? Click here to Login.
              </Link>
              <br />
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
