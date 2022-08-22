import { Layout } from "antd";
import "antd/dist/antd.min.css";
import React from "react";
import { AddTrade } from "./AddTrade";
import { TradeList } from "./TradeList";

export const Body = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout>
      <Header />
      <Content>
        <TradeList /> <AddTrade />
      </Content>
      <Footer />
    </Layout>
  );
};
