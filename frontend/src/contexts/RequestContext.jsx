import { createContext, useReducer } from "react";

export const RequestContext = createContext();
export const requestReducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUESTS":
      return {
        requests: action.payload,
      };
    case "ADD_REQUEST":
      return {
        requests: [action.payload, ...state.requests],
      };
    case "DELETE_REQUEST":
      return {
        requests: state.requests.filter(
          (request) => request._id !== action.payload
        ),
      };
    case "UPDATE_REQUEST":
      return {
        requests: state.requests.map((request) =>
          request._id === action.payload._id ? { ...action.payload } : request
        ),
      };
    case "CLEAR_REQUESTS":
      return { ...state, requests: [] };
    default:
      return state;
  }
};
export const RequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestReducer, {
    requests: null,
  });
  console.log(state);
  return (
    <RequestContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RequestContext.Provider>
  );
};
