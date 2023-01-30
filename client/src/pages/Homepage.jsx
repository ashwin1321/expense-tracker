import React, { useState, useEffect } from "react";
import { Form, Modal, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";
import moment from "moment";
import Layout from "../components/layout/Layout";
import Spinner from "../components/layout/Spinner";
import axios from "axios";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alltransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [customDate, setCustomDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
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

  // useEffect
  useEffect(() => {
    // fetching transactions
    const getTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);

        const res = await axios.post(
          "http://localhost:5000/api/v1/transactions/get-transaction",
          { userid: user._id, frequency: frequency, customDate, type }
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

    getTransactions();
  }, [frequency, customDate, type]);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Filter</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="182">Last 6 months</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={customDate}
              onChange={(values) => setCustomDate(values)}
            />
          )}
        </div>

        <div className="">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={customDate}
              onChange={(values) => setCustomDate(values)}
            />
          )}
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => {
              setViewData("table");
            }}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => {
              setViewData("analytics");
            }}
          />
        </div>

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
        {viewData === "table" ? (
          <Table columns={columns} dataSource={alltransactions} />
        ) : (
          <Analytics alltransactions={alltransactions} />
        )}
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
