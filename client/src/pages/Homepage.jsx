import React, { useState } from "react";
import { Form, Modal, Input, Select } from "antd";
import Layout from "../components/layout/Layout";
import Footer from "../components/layout/Footer";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      <div className="filters">
        <div>range filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content"></div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input text="text" required />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="food">food</Select.Option>
              <Select.Option value="fuel">Fuel</Select.Option>
              <Select.Option value="repair">Repair</Select.Option>
              <Select.Option value="extra">Extra</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" required />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" required />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
