const axios = require('axios');
const fs = require('fs-extra');

const { getStreamFromURL } = global.utils;

const pathData = __dirname + '/assets/hubble/nasa.json';
if (!fs.existsSync(__dirname + '/assets/hubble'))
	fs.mkdirSync(__dirname + '/assets/hubble');

let hubbleData;

module.exports = {
	config: {
		name: "فضاء",
		version: "1.2",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem ảnh từ Hubble",
			en: "عرض صور فضاء"
		},
		longDescription: {
			vi: "Xem ảnh từ Hubble",
			en: "عرض صور فضاء"
		},
		category: "owner",
		guide: {
			en: "{pn} <date (mm-dd)>"
		}
	},

	langs: {
		vi: {
			invalidDate: "Ngày tháng bạn nhập vào không hợp lệ, vui lòng nhập lại theo định dạng mm-dd",
			noImage: "Không có ảnh nào được tìm thấy trong ngày này"
		},
		en: {
			invalidDate: "التاريخ الذي أدخلته غير صالح، يرجى إعادة الإدخال في شكل mm-dd",
			noImage: "لم يتم العثور على صور في هذا اليوم"
		}
	},

	onLoad: async function () {
		if (!fs.existsSync(pathData)) {
			const res = await axios.get('https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2/main/scripts/cmds/assets/hubble/nasa.json');
			fs.writeFileSync(pathData, JSON.stringify(res.data, null, 2));
		}
		hubbleData = JSON.parse(fs.readFileSync(pathData));
	},

	onStart: async function ({ message, args, getLang }) {
		const date = args[0] || "";
		const dateText = checkValidDate(date);
		if (!date || !dateText)
			return message.reply(getLang('invalidDate'));
		const data = hubbleData.find(e => e.date.startsWith(dateText));
		if (!data)
			return message.reply(getLang('noImage'));
		const { image, name, caption, url } = data;
		const getImage = await getStreamFromURL('https://imagine.gsfc.nasa.gov/hst_bday/images/' + image);
		const msg = `📅 Date: ${dateText}\n🌀 Name: ${name}\n📖 Caption: ${caption}\n🔗 Source: ${url}`;
		message.reply({
			body: msg,
			attachment: getImage
		});
	}
};

const monthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function checkValidDate(date) {
	const dateArr = date.split(/[-/]/);
	if (dateArr.length != 2)
		return false;
	let day;
	let month;
	if (dateArr[0] < 13) {
		day = dateArr[1];
		month = dateArr[0];
	}
	else {
		day = dateArr[0];
		month = dateArr[1];
	}
	if (month < 1 || month > 12)
		return false;
	if (day < 1 || day > 31)
		return false;
	if (month === 2 && day > 29)
		return false;
	if ([4, 6, 9, 11].includes(month) && day > 30)
		return false;
	return monthText[month - 1] + ' ' + parseInt(day);
}