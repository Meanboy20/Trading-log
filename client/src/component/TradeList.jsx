import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TradeList.css";

export const TradeList = () => {
  const { transaction, getTransactions, deleteTransaction } =
    useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, []);

  const transactionData = transaction.forEach((element) => {
    const date = element.createAt;
    const exp = element.expirationDate;
    element.createAt = date.split("T")[0];
    element.expirationDate = exp.split("T")[0];
  });

  const navigate = useNavigate();

  const handleEdit = (transaction) => {
    navigate(`/edit/${transaction._id}`, { state: transaction });
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const columns = [
    {
      title: "Date ",
      dataIndex: "createAt",
      key: "date",
      width: "10%",
    },

    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      width: 20,
    },

    {
      title: "Stock price",
      dataIndex: "stockPrice",
      key: "stock price",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Strike Price",
      dataIndex: "ticker",
      key: "strike price",
    },

    {
      title: "Expire Date",
      dataIndex: "expirationDate",
      key: "expiration date",
    },

    {
      title: "Premium",
      dataIndex: "premium",
      key: "Premium",
    },

    {
      title: "Close Stock Price",
      dataIndex: "closePrice",
      key: "close price",
    },

    {
      title: "Close date",
      dataIndex: "closeDate",
      key: "close date",
    },
    {
      title: "Close Premium",
      dataIndex: "closePremium",
      key: "close premium",
    },

    {
      title: "Gain/Loss",
      dataIndex: "gainOrLoss",
      key: "gain and loss",
    },

    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <Space size="middle">
              <EditOutlined
                onClick={() => {
                  handleEdit(record);
                }}
              ></EditOutlined>
              ,
              <DeleteOutlined
                style={{ color: "red", marginLeft: 12 }}
                onClick={() => {
                  deleteTransaction(record._id);
                }}
              />
            </Space>
          </>
        );
      },
      width: "20%",
      key: "_id",
    },
  ];

  return (
    <div className="table-container">
      <Table columns={columns} dataSource={transaction} size="small" />
    </div>
  );
};
