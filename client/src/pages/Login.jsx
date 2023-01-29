import React from "react";
import Layout from "../components/layout/Layout";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Layout>
        <div className=" register-page ">
          <Form layout="vertical" onFinish={handleSubmit}>
            <h1 className="txt">Please Login</h1>
            <Form.Item label="Username" name="name">
              <Input type="text" placeholder="Enter Username" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter Password" />
            </Form.Item>
            <div className=" abc d-flex justify-content-between">
              <Link to="/register" className="link">
                Not a user? click here to register.
              </Link>
              <br />
              <button className="btn btn-primary">Login</button>
            </div>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
