import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { Table, Space, Rate } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TradeList.css";

export const TradeList = () => {
  useEffect(() => {
    console.log("userEffect run");
    getTransactions();
  }, []);

  const { transaction, getTransactions, deleteTransaction } =
    useContext(GlobalContext);

  transaction.forEach((element) => {
    const date = element.createAt;
    const exp = element.expirationDate;

    element.createAt = date.split("T")[0];
    element.expirationDate = exp.split("T")[0];
    if (element.closeDate !== undefined) {
      const cd = element.closeDate;
      element.closeDate = cd.split("T")[0];
    }
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
      title: "Rating",
      render: (ele) => {
        return <Rate />;
      },
    },
    {
      title: "Date ",
      dataIndex: "createAt",
      key: "date",
      width: "5%",
      sorter: (a, b) => a.createAt.localeCompare(b.createAt),
      sortDirections: ["descend"],
      defaultSortOrder: ["descend"],
    },

    {
      title: "Ticker",
      dataIndex: "ticker",
      filters: [{ text: "TSLA", value: "TSLA" }],
      key: "ticker",
      width: 20,
      onFilter: (value, ele) => ele.ticker.indexOf(value) === 0,
      sorter: (a, b) => a.ticker.localeCompare(b.ticker),
      sortDirections: ["descend"],
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
      width: "5%",
    },

    {
      title: "Strike Price",
      dataIndex: "strikePrice",
      key: "strike price",
    },

    {
      title: "Expire Date",
      dataIndex: "expirationDate",
      key: "expiration date",
      width: "8%",
    },

    {
      title: "Premium",
      dataIndex: "premium",
      key: "Premium",
    },

    {
      title: "Size",
      dataIndex: "size",
      key: "Size",
    },

    {
      title: "Close @Price",
      dataIndex: "closePrice",
      key: "close price",
      width: "7%",
    },

    {
      title: "Close date",
      dataIndex: "closeDate",
      key: "close date",
    },
    {
      title: "C-Premium",
      dataIndex: "closePremium",

      key: "close premium",
      width: "7%",
    },

    {
      title: "Gain/Loss",
      dataIndex: "gainOrLoss",
      key: "gain and loss",
      sorter: (a, b) => a.gainOrLoss - b.gainOrLoss,
      render: (ele) => {
        if (ele !== undefined) {
          return ele > 0 ? (
            <span style={{ color: "green" }}>${ele}</span>
          ) : (
            <span style={{ color: "red" }}> ${ele}</span>
          );
        }
      },
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },

    {
      title: "Action",
      width: "5%",
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
      key: "_id",
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={transaction}
        size="middle"
        rowKey="createAt"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
