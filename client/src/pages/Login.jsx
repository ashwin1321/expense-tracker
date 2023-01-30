import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        values
      );
      setLoading(false);
      message.success("login success");
      console.log(`object`, data);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      console.log(`22`);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(`something went wrong \n` + error);
    }
  };
  return (
    <>
      <Layout>
        <div className=" register-page ">
          {loading && <Spinner />}
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
