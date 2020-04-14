import * as jspdf from 'jspdf';
import 'jspdf-autotable';

export const makePDf = (data) => {
	const body = data.products.map((product) => {
		product.subTotal = product.quantity * product.price;
		return product;
	});
	const total = body.reduce((acc, prev) => {
		return acc + prev.subTotal;
	}, 0);
	const doc = new jspdf();
	const leftColumn = 15;
	const rightColumn = 140;
	doc.setFont('helvetica');
	doc.setFontSize(26);
	doc.setFontStyle('bold');
	doc.text('Quote', leftColumn, 20);
	doc.setFontStyle('normal');
	doc.setFontSize(16);
	doc.text('Created Date:', rightColumn, 40);
	doc.text(getFormattedDate(createDateInput()), rightColumn + 40, 40);
	doc.text('Due Date:', rightColumn + 10, 50);
	doc.text(getFormattedDate(data.dateDue), rightColumn + 40, 50);
	doc.line(0, 70, 210, 70);
	doc.text(`${data.client.firstName} ${data.client.lastName}`, leftColumn, 85);
	if (data.client.phoneNumber) {
		doc.text(data.client.email, leftColumn, 95);
	}
	if (data.client.phoneNumber) {
		doc.text(data.client.phoneNumber, leftColumn, 105);
	}
	doc.line(0, 120, 210, 120);
	doc.autoTable({
		startY: 150,
		theme: 'striped',
		styles: {
			fontSize: 14,
			minCellHeight: 10,
		},

		headStyles: {
			fillColor: '#171D1C',
		},
		body: body,
		Margin: { left: 50, top: 40, bottom: 40, right: 40 },
		columns: [
			{
				header: 'Item',
				dataKey: 'productName',
			},
			{ header: 'Description', dataKey: 'description' },
			{ header: 'Qty', dataKey: 'quantity' },
			{ header: 'Price', dataKey: 'price' },
			{ header: 'Sub Total', dataKey: 'subTotal' },
		],
		didDrawPage: (data) => {
			const y = data.cursor.y + 10;
			doc.setFontSize(14);
			doc.text('Total:', rightColumn, y);
			doc.text(total + '', rightColumn + 15, y);
		},
	});
	// doc.open(`${data.client.firstName}_${data.client.lastName}_Quote.pdf`);
	doc.output('dataurlnewwindow');
};

export function converToCurrency(number) {
	return new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD',
	}).format(number);
}

export function getFormattedDate(input) {
	let date = new Date(input);
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return month + '/' + day + '/' + year;
}

export function createDateInput() {
	let date = new Date();
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return year + '-' + month + '-' + day;
}
