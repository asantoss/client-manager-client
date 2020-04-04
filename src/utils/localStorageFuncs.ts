import Invoice from '../types/Invoice';

export function saveInvoiceToLocalStorage(invoice: Invoice): void {
	const localStorageInvoices = localStorage.getItem('invoices');
	let filteredInvoices = [];
	let localStorageInvoicesParsed = [];
	if (typeof localStorageInvoices === 'string') {
		localStorageInvoicesParsed = JSON.parse(localStorageInvoices) || [];
		filteredInvoices = localStorageInvoicesParsed.filter(
			(item: Invoice, index: number) => {
				if (
					item.dateDue === invoice.dateDue &&
					item.total === invoice.total &&
					item.products.length === invoice.products.length &&
					item.client.firstName === invoice.client.firstName &&
					item.client.lastName === invoice.client.lastName &&
					item.dateCreated === invoice.dateCreated
				) {
					return true;
				}
				return false;
			}
		);
	}
	if (filteredInvoices.length > 0) {
		const index = localStorageInvoicesParsed.indexOf(filteredInvoices[0]);
		return localStorage.setItem(
			'invoices',
			JSON.stringify([
				...localStorageInvoicesParsed.slice(0, index),
				invoice,
				...localStorageInvoicesParsed.slice(index + 1),
			])
		);
	} else {
		invoice.id = Math.floor(Math.random() * (999 - 1) + 1).toString();
		return localStorage.setItem(
			'invoices',
			JSON.stringify([...localStorageInvoicesParsed, invoice])
		);
	}
}
