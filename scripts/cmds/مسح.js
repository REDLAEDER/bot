module.exports = {
	config: {
		name: "مسح",
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Gỡ tin nhắn của bot",
			en: "مسح رسايل بوت"
		},
		longDescription: {
			vi: "Gỡ tin nhắn của bot",
			en: "مسح رسايل بوت"
		},
		category: "box chat",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
			en: "رد على رساله البوت الي تريد مسحها {pn}"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
		},
		en: {
			syntaxError: "رد على رساله البوت الي تريد مسحها"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));
		message.unsend(event.messageReply.messageID);
	}
};