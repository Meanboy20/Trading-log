import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Table from "react-bootstrap/Table";

export const TradeList = () => {
  const { transaction, getTransactions, deleteTransaction } =
    useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, []);

  const handleEdit = () => {};

  // const columns = [
  //   {
  //     title: "Date ",
  //     dataIndex: "createAt",
  //     key: "date",
  //   },

  //   {
  //     title: "Ticker",
  //     dataIndex: "ticker",
  //     key: "ticker",
  //   },

  //   {
  //     title: "Stock price",
  //     dataIndex: "stockPrice",
  //     key: "stock price",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //     key: "type",
  //   },

  //   {
  //     title: "Strike Price",
  //     dataIndex: "ticker",
  //     key: "strike price",
  //   },

  //   {
  //     title: "Expire Date",
  //     dataIndex: "expirationDate",
  //     key: "expiration date",
  //   },

  //   {
  //     title: "Premium",
  //     dataIndex: "premium",
  //     key: "Premium",
  //   },

  //   {
  //     title: "Close Stock Price",
  //     dataIndex: "closePrice",
  //     key: "close price",
  //   },

  //   {
  //     title: "Close date",
  //     dataIndex: "closeDate",
  //     key: "close date",
  //   },
  //   {
  //     title: "Close Premium",
  //     dataIndex: "closePremium",
  //     key: "close premium",
  //   },

  //   {
  //     title: "Gain/Loss",
  //     dataIndex: "gainOrLoss",
  //     key: "gain and loss",
  //   },

  //   {
  //     title: "Action",
  //     render: (record) => {
  //       return (
  //         <>
  //           <EditOutlined
  //             onClick={() => {
  //               handleEdit(record);
  //             }}
  //           ></EditOutlined>
  //           ,
  //           <DeleteOutlined
  //             style={{ color: "red", marginLeft: 12 }}
  //             onClick={() => {
  //               deleteTransaction(record._id);
  //             }}
  //           />
  //         </>
  //       );
  //     },
  //     width: "20%",
  //     key: "_id",
  //   },
  // ];

  const tradeTable = transaction.map((ele) => {
    console.log(ele._id);
    return (
      <tr key={ele._id}>
        <td>{ele.createAt}</td>
        <td>{ele.ticker}</td>
        <td>{ele.type}</td>
        <td>{ele.stockPrice}</td>
        <td>{ele.expirationDate}</td>
        <td>{ele.strikePrice}</td>
        <td>{ele.premium}</td>
        <td></td>

        <td>
          <button>edit</button>
        </td>
        <td>
          <button>delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Active trade</h2>
      <Table stripped bordered hover size="sm">
        <thead>
          <tr>
            <th>Time</th>
            <th>ticker</th>
            <th>stockPrice</th>
            <th>DTE</th>
            <th>strike</th>
            <th>$Pre</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>{tradeTable}</tbody>
      </Table>
    </div>
  );
};
