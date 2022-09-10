export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTION":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };

    case "GET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };

    case "UPDATE_TRADE": {
      console.log(action.payload);
      const id = action.payload.data._id;
      console.log(id);

      const index = state.transactions.findIndex(
        (ele) => ele._id === action.payload.data._id
      );
      console.log(index);

      state.transactions[index] = {
        ...state.transactions[index],
        ...action.payload.data,
      };

      console.log(state.transactions[index]);
      return {
        ...state,
        loading: false,
        // transactions: [
        //   ...state.transactions,
        //   (state.transactions[index] = {action.payload}),
        // ],
      };
    }

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
