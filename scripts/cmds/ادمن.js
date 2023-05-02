module.exports = {
	config: {
		name: "ادمن",
		aliases: ["onlyadbox", "adboxonly", "adminboxonly"],
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "bật/tắt chỉ admin box sử dụng bot",
			en: "تشغيل/إيقاف تشغيل إمكانية استخدام البوت من قبل مسؤول الدردشة فقط."
		},
		longDescription: {
			vi: "bật/tắt chế độ chỉ quản trị của viên nhóm mới có thể sử dụng bot",
			en: "تشغيل/إيقاف تشغيل إمكانية استخدام البوت من قبل مسؤول الدردشة فقط."
		},
		category: "box chat",
		guide: {
			en: "   {pn} [on | off]"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			syntaxError: "Sai cú pháp, chỉ có thể dùng {pn} on hoặc {pn} off"
		},
		en: {
			turnedOn: "تم تشغيل وضع السماح لمسؤولي المجموعة فقط باستخدام البوت",
			turnedOff: "تم إيقاف وضع السماح لمسؤولي المجموعة فقط باستخدام البوت",
			syntaxError: "خطأ في الصياغة، استخدم {pn} on أو {pn} off فقط"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		if (args[0] == "on") {
			await threadsData.set(event.threadID, true, "data.onlyAdminBox");
			message.reply(getLang("turnedOn"));
		}
		else if (args[0] == "off") {
			await threadsData.set(event.threadID, false, "data.onlyAdminBox");
			message.reply(getLang("turnedOff"));
		}
		else
			return message.reply(getLang("syntaxError"));
	}
};