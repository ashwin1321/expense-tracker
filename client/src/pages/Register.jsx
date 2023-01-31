import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await axios
        .post("http://localhost:5000/api/v1/users/register", values)
        .then(() => {
          message.success("register successfully");
          setLoading(false);
          navigate("/login");
        });
    } catch (error) {
      message.error(error);
    }
  };

  // prefvent user to go back to register page after register
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Layout>
        <div className=" register-page ">
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={handleSubmit}>
            {" "}
            {/* antd doesn't have onSubmit */}
            <h1 className="txt">Please Register</h1>
            <Form.Item label="Username" name="name">
              <Input type="text" placeholder="Enter Username" required />
            </Form.Item>
            <Form.Item label="email" name="email">
              <Input type="email" placeholder="Enter Email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter Password" required />
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
