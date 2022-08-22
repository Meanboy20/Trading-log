import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export const EditTrade = () => {
  const { transaction, updateTransaction } = useContext(GlobalContext);
  const para = useParams();
  const id = para.id;
  const curr = transaction.filter((ele) => {
    return ele._id === id;
  });

  const [ticker, setTicker] = useState("");
  const [stockPrice, setStokPrice] = useState("");
  const [strategy, setStrategy] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [note, setNote] = useState("");
  const [expireDate, setExpireDate] = useState(curr[0].expirationDate);
  const [size, setSize] = useState(0);
  const [cDate, setCdate] = useState(0);
  const [cPrice, setCprice] = useState(0);
  const [premium, setPremium] = useState(0);

  const updatedTrade = {
    ticker: ticker,
    type: strategy,
    stockPrice: stockPrice,
    strikePrice: strikePrice,
    expirationDate: expireDate,
    premium: premium,
    size: size,
    note: note,
    closeDate: cDate,
    closePremium: cPrice,
    gainOrLoss: cPrice - curr[0].premium,
  };

  console.log(updatedTrade);

  const handleSubmit = () => {
    updateTransaction(updatedTrade);
  };

  return (
    <form>
      <div>
        <label htmlFor="my-input">Ticker</label>
        <input
          onChange={(e) => setTicker(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].ticker}
        />
      </div>

      <div>
        <label htmlFor="my-input">S-price</label>
        <input
          onChange={(e) => setStokPrice(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].stockPrice}
        />
      </div>

      <div>
        <label htmlFor="my-input">Type</label>
        <input
          onChange={(e) => setStrategy(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].type}
        />
      </div>

      <div>
        <label htmlFor="my-input">strike price</label>
        <input
          onChange={(e) => setStrikePrice(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].strikePrice}
        />
      </div>

      <div>
        <label htmlFor="my-input">DTE</label>
        <input
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].expirationDate}
          value={curr[0].expirationDate}
        />
      </div>

      <div>
        <label htmlFor="my-input">Premium</label>
        <input
          type={Number}
          onChange={(e) => setPremium(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].premium}
        />
      </div>

      <div>
        <label htmlFor="my-input">Size</label>
        <input
          onChange={(e) => setSize(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].size}
        />
      </div>

      <div>
        <label htmlFor="my-input">Note</label>
        <input
          onChange={(e) => setNote(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder={curr[0].note}
        />
      </div>

      <div>
        <label htmlFor="my-input">Close-date</label>
        <input
          type="date"
          onChange={(e) => setCdate(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </div>

      <div>
        <label htmlFor="my-input">Close-price</label>
        <input
          type={Number}
          onChange={(e) => setCprice(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </div>

      <button style={{ color: "blue" }} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
