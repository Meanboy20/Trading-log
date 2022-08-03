import React from "react";
import { AddTrade } from "./AddTrade";
import { EditTrade } from "./EditTrade";
import { Header } from "./Header";
import { TradeList } from "./TradeList";

export const Body = () => {
  return (
    <div>
      <Header />
      <TradeList />
      <AddTrade />
    </div>
  );
};
