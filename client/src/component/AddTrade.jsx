import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTrade = () => {
  const tradeDetail = {
    ticker: "",
    type: "",
    stockPrice: "",
    strikePrice: "",
    expirationDate: "",
    premium: "",
    size: "",
    note: "",
  };

  const [trade, setTrade] = useState(tradeDetail);

  const { addTransaction } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrade({
      ...trade,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(trade);
    addTransaction(trade);
    event.target.reset();
  };

  return (
    <div className="add-section">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="row">
          <label htmlFor="text">Ticker</label>
          <input
            type="text"
            name="ticker"
            style={{ width: "130px" }}
            onChange={handleChange}
            placeholder="Enter stock price..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Stock price</label>
          <input
            type="text"
            name="stockPrice"
            style={{ width: "170px" }}
            onChange={handleChange}
            placeholder="Enter stock price..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Strategy</label>
          <input
            type="text"
            name="type"
            style={{ width: "130px" }}
            onChange={handleChange}
            placeholder="Enter stratergy..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Strike Price</label>
          <input
            type="number"
            name="strikePrice"
            style={{ width: "130px" }}
            onChange={handleChange}
            placeholder="Enter strike price..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Expire date</label>
          <input
            type="date"
            name="expirationDate"
            style={{ width: "170px" }}
            onChange={handleChange}
            placeholder="Enter expirationDate..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Premium</label>
          <input
            type="number"
            name="premium"
            style={{ width: "150px" }}
            onChange={handleChange}
            placeholder="Enter premium..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Size</label>
          <input
            type="number"
            name="size"
            style={{ width: "150px" }}
            onChange={handleChange}
            placeholder="Enter premium..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Note</label>
          <textarea
            type="text"
            name="note"
            style={{ width: "150px" }}
            onChange={handleChange}
            placeholder="Make sure you follow rules!!!"
          />
        </div>

        <button type="submit" style={{ width: "150px" }}>
          Add trade
        </button>
      </form>
    </div>
  );
};
