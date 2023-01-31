import React, { useState, useEffect } from "react";
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
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      console.log(`22`);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(
        `something went wrong. check your credentials or register if you haven't. \n`
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Layout>
        <div className=" register-page  ">
          {loading && <Spinner />}
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-secondary  p-5 rounded"
          >
            <h1 className="txt">Please Login</h1>
            <p className="text-warning txt">
              Mobile ma nakholnu ni, malai CSS lekhna alxi lagyo.
            </p>
            <br />
            <Form.Item label="Username" name="name">
              <Input type="text" placeholder="Enter Username" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter Password" required />
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
