import { BulbOutlined, CompassOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
import React, { useState } from "react";
import { AddTrade } from "./AddTrade";
import MyModal from "./Modal";
import Target from "./ModalCotent/Target";
import { TradeList } from "./TradeList";
import "./Body.css";

export const Body = () => {
  const { Header, Footer, Content } = Layout;
  const [isVisible, setVisible] = useState(false);

  return (
    <Layout>
      <Header>
        <div className="home-header">
          <div className="nav-container">
            <div>
              <a style={{ color: "white" }} href="/ideas">
                <BulbOutlined></BulbOutlined>
              </a>
            </div>
            <div>
              <CompassOutlined onClick={() => setVisible(true)} />
            </div>
          </div>
        </div>
      </Header>
      <Content className="content-container">
        <h2>Follow the rules and be patient</h2>
        <TradeList />
        <AddTrade />
        <MyModal visible={isVisible} setVisible={setVisible}>
          <Target />
        </MyModal>
      </Content>
      <Footer />
    </Layout>
  );
};
