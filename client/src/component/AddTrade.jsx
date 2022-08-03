import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTrade = () => {
  const [ticker, setTicker] = useState("");
  const [stockPrice, setStokPrice] = useState("");
  const [strategy, setStrategy] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [premium, setPremium] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = () => {
    const newTrade = {
      ticker: ticker,
      type: strategy,
      stockPrice: stockPrice,
      strikePrice: strikePrice,
      expirationDate: expireDate,
      premium: premium,
    };

    addTransaction(newTrade);
  };

  return (
    <div>
      <h3>Add new trade</h3>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Ticker</Form.Label>
          <Form.Control
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            type="text"
            placeholder="Enter ticker"
          />
        </Form.Group>
      </Form>

      <Form>
        <div className="row">
          <label htmlFor="text">Stock price</label>
          <input
            type="text"
            onChange={(e) => setStokPrice(e.target.value)}
            placeholder="Enter stock price..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Strategy</label>
          <input
            type="text"
            onChange={(e) => setStrategy(e.target.value)}
            placeholder="Enter stratergy..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Strike Price</label>
          <input
            type="number"
            onChange={(e) => setStrikePrice(e.target.value)}
            placeholder="Enter strike price..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Expire date</label>
          <input
            type="date"
            onChange={(e) => setExpireDate(e.target.value)}
            placeholder="Enter expirationDate..."
          />
        </div>

        <div className="row">
          <label htmlFor="text">Premium</label>
          <input
            type="number"
            onChange={(e) => setPremium(e.target.value)}
            placeholder="Enter premium..."
          />
        </div>

        <Button className="btn" onClick={onSubmit}>
          Add trade
        </Button>
      </Form>
    </div>
  );
};
