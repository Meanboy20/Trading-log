import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Layout } from "antd";
import "./EditTrade.css";

export const EditTrade = () => {
  const { transaction, updateTransaction } = useContext(GlobalContext);
  const { Header, Content, Footer } = Layout;
  const para = useParams();
  const id = para.id;
  const navigation = useNavigate();
  const curr = transaction.filter((ele) => {
    return ele._id === id;
  });

  // console.log(curr);

  const tradeDetail = {
    rating: "",
    createAt: "",
    ticker: "",
    type: "",
    stockPrice: "",
    strikePrice: "",
    expirationDate: "",
    premium: "",
    size: "",
    note: "",
    closePremium: "",
    closeDate: "",
    closePrice: "",
  };

  const [trade, setTrade] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrade({
      ...trade,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    // console.log(trade);
    event.preventDefault();
    updateTransaction(id, trade);
    navigation("/");
  };

  return (
    <Layout>
      <Header></Header>

      <Content>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-input">
            <div className="input">
              <label>Create at</label>
              <input
                name="createAt"
                onChange={handleChange}
                type="date"
                defaultValue={`${curr[0].createAt}`}
              />
            </div>

            <div className="input">
              <label>Ticker</label>
              <input
                name="ticker"
                onChange={handleChange}
                defaultValue={curr[0].ticker}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">S-price</label>
              <input
                name="stockPrice"
                onChange={handleChange}
                id="my-input"
                defaultValue={curr[0].stockPrice}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Type</label>
              <input
                name="type"
                onChange={handleChange}
                id="my-input"
                defaultValue={curr[0].type}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">strike price</label>
              <input
                name="strikePrice"
                onChange={handleChange}
                id="my-input"
                defaultValue={curr[0].strikePrice}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">DTE</label>
              <input
                name="expirationDate"
                onChange={handleChange}
                id="my-input"
                defaultValue={curr[0].expirationDate}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Premium</label>
              <input
                type={Number}
                name="premium"
                onChange={handleChange}
                id="my-input"
                defaultValue={curr[0].premium}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Size</label>
              <input
                name="size"
                onChange={handleChange}
                id="my-input"
                aria-describedby="my-helper-text"
                defaultValue={curr[0].size}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Note</label>
              <textarea
                name="note"
                onChange={handleChange}
                id="my-input"
                aria-describedby="my-helper-text"
                defaultValue={curr[0].note}
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Close-date</label>
              <input
                name="closeDate"
                onChange={handleChange}
                type="date"
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Close-Premium</label>
              <input
                name="closePremium"
                onChange={handleChange}
                type={Number}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </div>

            <div className="input">
              <label htmlFor="my-input">Close-price</label>
              <input
                name="closePrice"
                onChange={handleChange}
                type={Number}
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </div>

            <button type="submit" style={{ color: "blue" }}>
              Submit
            </button>
          </form>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
