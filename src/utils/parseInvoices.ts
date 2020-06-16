import InvoiceType, { Product } from '../types/Invoice';
import moment from 'moment';

interface LOGINQUERY {
	id?: string;
	companyName: string;
	firstName: string;
	lastName: string;
	email: string;
	address?: string;
	phoneNumber?: string;
	clients: [
		{
			id?: string;
			firstName: string;
			lastName: string;
			email: string;
			phoneNumber?: string;
			address?: string;
			city?: string;
			zipCode?: string;
			invoices: [InvoiceType];
		}
	];
}

export const parseInvoicesFromLocal = () => {
	let invoices: InvoiceType[] = [];
	let overDue: InvoiceType[] = [];
	let toBePaid: InvoiceType[] = [];
	const today = new Date();
	const localInvoices = localStorage.getItem('invoices');
	if (localInvoices) {
		const invoicesParsed = JSON.parse(localInvoices);
		invoicesParsed.forEach((invoiceObject: InvoiceType) => {
			const { dateDue, isPaid } = invoiceObject;
			if (moment(dateDue).isAfter(today.getDate()) && !isPaid) {
				toBePaid.push(invoiceObject);
			}
			if (moment(today.getDate()).isAfter(dateDue) && !isPaid) {
				overDue.push(invoiceObject);
			}

			invoices.push(invoiceObject);
		});
	}
	return [invoices, overDue, toBePaid];
};

export const parseInvoices = (data: LOGINQUERY) => {
	const { clients } = data;
	let invoices: InvoiceType[] = [];
	let overDue: InvoiceType[] = [];
	let toBePaid: InvoiceType[] = [];
	const today = new Date();
	clients.forEach((client) => {
		client.invoices.forEach((invoice) => {
			const { dateDue, isPaid, id, products } = invoice;
			const invoiceObject = {
				id,
				dateDue,
				isPaid,
				products,
				client: {
					...client,
				},
				company: {
					companyName: data.companyName,
					address: data.address,
					email: data.email,
					phoneNumber: data.phoneNumber,
				},
				total: calculateTotal(invoice.products),
			};
			if (moment(dateDue).isAfter(today.getDate()) && !isPaid) {
				toBePaid.push(invoiceObject);
			}
			if (moment(today.getDate()).isAfter(dateDue) && !isPaid) {
				overDue.push(invoiceObject);
			}
			invoices.push(invoiceObject);
		});
	});
	return [invoices, overDue, toBePaid];
};

export const calculateTotal = (data: Product[]) => {
	return data.reduce((acc, curr) => {
		return acc + curr.price * curr.quantity;
	}, 0);
};
