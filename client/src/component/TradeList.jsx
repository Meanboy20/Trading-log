import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Space,
  Rate,
  Drawer,
  Col,
  Row,
  Divider,
  Checkbox,
  Timeline,
  Button,
  Image,
} from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TradeList.css";
import DescriptionItem from "./DescriptionItem";

export const TradeList = () => {
  useEffect(() => {
    console.log("userEffect run");
    getTransactions();
  }, []);

  const { transaction, getTransactions, deleteTransaction, updateTransaction } =
    useContext(GlobalContext);

  // const target = transaction.find((ele) => {
  //   return ele._id === "6321dcc637465829e837bd68";
  // });

  // console.log("re-render");

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawContent] = useState({ analysis: {} });
  const [drawerID, setDrawID] = useState("");

  const [editDetail, setEditDetail] = useState(false);
  const [tradeDetail, setTradeDetail] = useState({});
  const [visible, setVisible] = useState(false);

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

  function formatAsPercent(num) {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  const handleRateChange = (id, value) => {
    updateTransaction(id, { rating: value });
  };

  const handleEdit = (transaction) => {
    navigate(`/edit/${transaction._id}`, { state: transaction });
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Rating-c",
      filters: [
        { text: 0.5, value: 0.5 },
        { text: 1, value: 1 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
        { text: 5, value: 5 },
      ],

      width: "9%",
      onFilter: (value, ele) => {
        return ele.rating === value;
      },
      sorter: (a, b) => b.rating - a.rating,
      // defaultSortOrder: ["descend"],

      render: (ele) => {
        return (
          <Rate
            allowHalf
            count={5}
            defaultValue={ele.rating}
            style={{ color: ele.rating === 0.5 ? "red" : null }}
            onChange={(e) => {
              return handleRateChange(ele._id, e);
            }}
          />
        );
      },
    },
    {
      title: "Id",
      width: "1%",
      dataIndex: "_id",
    },
    {
      title: "Date ",
      dataIndex: "createAt",
      width: "5%",

      sorter: (a, b) => a.createAt.localeCompare(b.createAt),
      sortDirections: ["descend"],
      defaultSortOrder: ["descend"],
    },

    {
      title: "Ticker",
      dataIndex: "ticker",
      filters: [
        { text: "TSLA", value: "TSLA" },
        { text: "SOXS", value: "SOXS" },
        { text: "SOXL", value: "SOXL" },
      ],
      key: "ticker",
      width: 20,
      onFilter: (value, ele) => {
        return ele.ticker === value;
      },
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
      filters: [
        { text: "Sell Call", value: "Sell Call" },
        { text: "Sell Put", value: "Sell Put" },
        { text: "Buy Call", value: "Buy Call" },
        { text: "Buy Put", value: "Buy Put" },
      ],
      key: "type",
      width: "5%",
      onFilter: (value, ele) => {
        return ele.type === value;
      },
    },
    {
      title: "A",
      dataIndex: "account",
      filters: [
        { text: "G", value: "G" },
        { text: "X", value: "X" },
        { text: "IRA", value: "IRA" },
        { text: "DN", value: "DN" },
        { text: "M", value: "M" },
      ],
      key: "type",
      width: "1%",
      onFilter: (value, ele) => {
        return ele.account === value;
      },
    },

    {
      title: "Strike Price",
      dataIndex: "strikePrice",
      key: "strike price",
      width: "5%",
    },

    {
      title: "Expire Date",
      dataIndex: "expirationDate",
      key: "expiration date",
      width: "5%",
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
      width: "5%",
    },

    {
      title: "Close date",
      dataIndex: "closeDate",
      key: "close date",
      width: "5%",
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
      sorter: (a, b) => b.gainOrLoss - a.gainOrLoss,
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
      key: "note",
      render: (ele) => {
        const note = ele.note.split(" ").slice(0, 6).join(" ");
        // console.log("Note render run");
        return (
          <>
            <span>{note}</span>
            <span> </span>
            <a
              onClick={() => showDrawer(ele.note, ele._id, ele.analysis)}
              key={`a-${ele._id}`}
              style={{ color: "blue" }}
            >
              Details
            </a>
          </>
        );
      },
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
    {
      title: "Target",
      width: "5%",
      dataIndex: ["analysis", "Target"],
    },
  ].filter((ele) => ele.title !== "Id");

  const showDrawer = (note, id, analysis) => {
    console.log("value pass to drawer", analysis.Target);
    setDrawContent((pre) => {
      return { ...pre, note: note, analysis: analysis };
    });
    setDrawID(id);
    setOpen(true);
  };

  return (
    <div className="table-container">
      {/* {console.log(
        "table re-rendered",
        transaction.find((ele) => {
          return ele._id === "6321dcc637465829e837bd68";
        })
      )} */}
      <Table
        columns={columns}
        dataSource={transaction}
        size="middle"
        rowKey="_id"
        pagination={{ pageSize: 15 }}
      />

      <Drawer
        width={540}
        height={200}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={open}
      >
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Trade Analysis{" "}
          <Button
            style={{ backgroundColor: "#ADD8E6" }}
            onClick={() => {
              // editDetail ? updateTransaction(tradeDetail) : () => {};
              if (editDetail) {
                // console.log(drawerID);
                updateTransaction(drawerID, { analysis: tradeDetail });
              }
              setEditDetail((pre) => !pre);
            }}
          >
            {editDetail ? "Confirm Update" : "Edit"}
          </Button>
        </p>
        <p className="site-description-item-profile-p">
          Openning: <Checkbox>Macro</Checkbox> <Checkbox>R/R</Checkbox>
          <Checkbox>Time</Checkbox>
        </p>

        <Row>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Target"
              content={drawerContent.analysis.Target}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Account"
              content={drawerContent.analysis.Account}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="BreakEven"
              content={drawerContent.analysis.BreakEven}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="StopLoss"
              content={drawerContent.analysis.StopLoss}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="IV"
              content=""
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="c"
              content={drawerContent.analysis.RRratio}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Initial reason"
              content={drawerContent.note}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="ClosingPlan"
              content={drawerContent.analysis.ClosingPlan}
            />
          </Col>
        </Row>

        <Divider />
        <p className="site-description-item-profile-p">Improvment</p>
        <Row>
          <Col span={24} className="reality">
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Reality"
              content={drawerContent.analysis.Reality}
              contentStyle={{ display: "flex", color: "red" }}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Fib value"
              content={"60%"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Department"
              content="XTech"
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Category"
              content={drawerContent.analysis.Category}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="reality">
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Review"
              content={drawerContent.analysis.Review}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="chart"
              content={
                <>
                  <Image
                    preview={{
                      visible: false,
                    }}
                    width={300}
                    src={
                      drawerContent.analysis.chart !== undefined
                        ? drawerContent.analysis.chart[0]
                        : null
                    }
                    onClick={() => setVisible(true)}
                  />
                  {/* <a href={`${drawerContent.analysis.chart}`}></a> */}
                  <div
                    style={{
                      display: "none",
                    }}
                  >
                    <Image.PreviewGroup
                      preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                      }}
                    >
                      <Image
                        src={
                          drawerContent.analysis.chart !== undefined
                            ? drawerContent.analysis.chart[0]
                            : null
                        }
                      />
                      <Image
                        src={
                          drawerContent.analysis.chart !== undefined
                            ? drawerContent.analysis.chart[1]
                            : null
                        }
                      />
                      <Image
                        src={
                          drawerContent.analysis.chart !== undefined
                            ? drawerContent.analysis.chart[2]
                            : null
                        }
                      />
                    </Image.PreviewGroup>
                  </div>
                </>
              }
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Rolling</p>
        <Row>
          <Col span={12}>
            <Timeline mode="left">
              <Timeline.Item label="2022-09-01">
                <DescriptionItem
                  editDetail={editDetail}
                  setTradeDetail={setTradeDetail}
                  title="Rolling"
                  content=""
                />
              </Timeline.Item>
              <Timeline.Item label="2022-09-10">
                Buy: Sell: Credit: $
              </Timeline.Item>
              <Timeline.Item label="2022-10-01">
                Buy: Sell: Credit: $
              </Timeline.Item>
            </Timeline>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              editDetail={editDetail}
              setTradeDetail={setTradeDetail}
              title="Total adjustment"
              content=""
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};
