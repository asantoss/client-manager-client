import * as jspdf from 'jspdf';
import 'jspdf-autotable';

export const makePDf = data => {
	const body = data.products.map(product => {
		product.subTotal = product.quantity * product.price;
		return product;
	});
	const total = body.reduce((acc, prev) => {
		return acc + prev.subTotal;
	}, 0);
	const doc = new jspdf();
	const leftColumn = 15;
	const rightColumn = 150;
	doc.setFont('helvetica');
	doc.setFontSize(25);
	doc.setFontStyle('bold');
	// doc.text('Company Name', leftColumn, 30);
	doc.text('Quote', rightColumn, 30);

	doc.setFontStyle('normal');
	doc.setFontSize(16);
	doc.text('Created Date:', rightColumn, 40);
	doc.text(getFormattedDate(createDateInput()), rightColumn, 45);
	doc.text('Due Date:', rightColumn, 50);
	doc.text(getFormattedDate(data.dueDate), rightColumn, 55);

	doc.line(0, 50, 210, 50);
	doc.text(`${data.client.firstName} ${data.client.lastName}`, leftColumn, 60);
	doc.text(data.client.email, leftColumn, 70);
	doc.text(data.client.phoneNumber, leftColumn, 80);
	doc.line(0, 85, 210, 85);
	doc.autoTable({
		startY: 125,
		theme: 'plain',
		body: body,
		Margin: { left: 50, top: 40, bottom: 40, right: 40 },
		columns: [
			{
				header: 'Item',
				dataKey: 'productName'
			},
			{ header: 'Description', dataKey: 'description' },
			{ header: 'Qty', dataKey: 'quantity' },
			{ header: 'Price', dataKey: 'price' },
			{ header: 'Sub Total', dataKey: 'subTotal' }
		],
		didDrawPage: data => {
			const y = data.cursor.y + 10;
			doc.setFontSize(12);
			doc.text('Total:', rightColumn, y);
			doc.text(total + '', rightColumn + 15, y);
		}
	});
	doc.save(`${data.client.firstName} ${data.client.lastName} Quote`);
};

export function converToCurrency(number) {
	return new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD'
	}).format(number);
}

export function getFormattedDate(input) {
	let date = new Date(input);
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date
		.getDate()
		.toString()
		.padStart(2, '0');

	return month + '/' + day + '/' + year;
}

export function createDateInput() {
	let date = new Date();
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date
		.getDate()
		.toString()
		.padStart(2, '0');

	return year + '-' + month + '-' + day;
}
