import React, { useState, useEffect } from "react";
import { Form, Modal, Input, Select, message, Table } from "antd";
import Layout from "../components/layout/Layout";
import Spinner from "../components/layout/Spinner";
import axios from "axios";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltransactions, setAllTransactions] = useState([]);

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
    },
  ];

  // handling form submit
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/v1/transactions/add-transaction",
        { userid: user._id, ...values }
      );
      message.success("Transaction added successfully");
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error(`failed to add transaction.`);
    }
  };

  // fetching transactions
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/transactions/get-transaction",
        { userid: user._id }
      );
      setLoading(false);
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(`failed to fetch transactions.`);
    }
  };

  // useEffect
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
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

      <div className="content">
        <Table columns={columns} dataSource={alltransactions} />
      </div>

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
