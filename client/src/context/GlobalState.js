import React, { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
  cases: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  async function getTransactions() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/transactions/");
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: "err.response.data.error",
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/transactions/",
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.err,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function updateTransaction(id, data) {
    try {
      // console.log("calling update api");

      const res = await axios.patch(
        `http://localhost:5000/api/v1/transactions/edit/${id}`,
        data
      );
      // console.log("update executed");
      dispatch({
        type: "UPDATE_TRADE",
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_TRADE_ERROR",
        payload: error.response.data.error,
      });
    }

    // dispatch({
    //   type: "ADD_TRANSACTION",
    //   payload: data,
    // });
  }

  return (
    <GlobalContext.Provider
      value={{
        transaction: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        updateTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
