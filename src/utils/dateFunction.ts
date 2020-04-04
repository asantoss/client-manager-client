import moment from 'moment';
export default function (date: any) {
	debugger;
	if (moment.isDate(date)) {
		console.log(moment.isDate(date));
		// const dateParsed = Date.parse(date);
		const stamp = new Date(date);

		return `
        ${stamp.getMonth() + 1}/${stamp.getDate()}/${stamp.getFullYear()}
        `;
	}
}
