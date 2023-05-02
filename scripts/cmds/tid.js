module.exports = {
	config: {
		name: "tid",
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem threadID",
			en: "View threadID"
		},
		longDescription: {
			vi: "Xem id nhóm chat của bạn",
			en: "عرض معرّف المحادثة الجماعية الخاصة بك (threadID)"
		},
		category: "info",
		guide: {
			en: "{pn}"
		}
	},

	onStart: async function ({ message, event }) {
		message.reply(event.threadID.toString());
	}
};