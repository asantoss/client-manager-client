export interface Product {
	productName: string;
	description: string;
	quantity: number;
	price: number;
	subTotal?: number;
}
export interface Client {
	id?: string | number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	address?: string;
	city?: string;
	zipCode?: string;
}
export interface Company {
	companyName: string;
	address?: string;
	phoneNumber?: string;
	city?: string;
	zipCode?: string;
	email: string;
}

export default interface InvoiceType {
	id?: string;
	isPaid: Boolean;
	dateCreated?: string;
	dateDue: string;
	client: Client;
	company?: Company;
	products: Product[];
	total: number;
}
