import InvoiceType, { Product } from '../types/Invoice';

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

export const parseInvoices = (data: LOGINQUERY) => {
	const { clients } = data;
	let invoices: any = [];
	clients.forEach(client => {
		const { firstName, lastName, phoneNumber, email, address } = client;
		const clientInvoices = client.invoices.map(invoice => {
			const { dateDue, isPaid, id } = invoice;
			return {
				id,
				dateDue,
				isPaid,
				client: { firstName, lastName, phoneNumber, email, address },
				company: {
					companyName: data.companyName,
					address: data.address,
					email: data.email,
					phoneNumber: data.phoneNumber
				},
				total: calculateTotal(invoice.products)
			};
		});
		invoices = [...invoices, ...clientInvoices];
	});
	console.table(invoices);
	return invoices;
};

export const calculateTotal = (data: Product[]) => {
	return data.reduce((acc, curr) => {
		return acc + curr.price * curr.quantity;
	}, 0);
};
