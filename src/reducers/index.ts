import { combineReducers } from 'redux';
import AuthReducer from './authenticationReducer';
import InvoiceReducer from './invoiceReducer';
import { AuthState } from './authenticationReducer';
import InvoiceType from '../types/Invoice';
export default combineReducers({
	user: AuthReducer,
	invoice: InvoiceReducer
});

export interface AppState {
	user: AuthState;
	invoice: InvoiceType;
}
