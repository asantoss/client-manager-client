import { combineReducers } from "redux";
import AuthReducer from "./authenticationReducer";
import InvoiceReducer from "./invoiceReducer";
export default combineReducers({
  user: AuthReducer,
  invoice: InvoiceReducer
});
