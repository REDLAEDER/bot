const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "بدايه",
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 1,
		shortDescription: "Thay đổi prefix của bot",
		longDescription: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",
		category: "config",
		guide: {
			vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
				+ "\n   Ví dụ:"
				+ "\n    {pn} #"
				+ "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
				+ "\n   Ví dụ:"
				+ "\n    {pn} # -g"
				+ "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
			en: "  {pn} <البادئة الجديدة>: تغيير البادئة الجديدة في صندوق الدردشة الخاص بك"
+ "\n   مثال:"
+ "\n    {pn} #"
+ "\n\n   {pn} <البادئة الجديدة> -g: تغيير البادئة الجديدة في نظام البوت الإداري (فقط البوت الإداري)"
+ "\n   مثال:"
+ "\n    {pn} # -g"
+ "\n\n   {pn} reset: تغيير البادئة في صندوق الدردشة الخاص بك إلى الإعداد الافتراضي"
		}
	},

	langs: {
		vi: {
			reset: "Đã reset prefix của bạn về mặc định: %1",
			onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
			confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
			confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
			successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
			successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
			myPrefix: "🌐 Prefix của hệ thống: %1\n🛸 Prefix của nhóm bạn: %2"
		},
		en: {
			reset: "تم إعادة ضبط البادئة إلى الإفتراضي: %1",
			onlyAdmin: "يمكن للمشرف فقط تغيير بادئة البوت النظامية",
			confirmGlobal: "يرجى الضغط على رد الفعل على هذه الرسالة لتأكيد تغيير بادئة البوت النظامية",
			confirmThisThread: "يرجى الضغط على رد الفعل على هذه الرسالة لتأكيد تغيير بادئة البوت في المحادثة الخاصة بك",
			successGlobal: "تم تغيير بادئة البوت النظامية إلى: %1",
			successThisThread: "تم تغيير بادئة المحادثة الخاصة بك إلى: %1",
			myPrefix: "🌐 بادئة النظام: %1\n🛸 بادئة المحادثة الخاصة بك: %2"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'reset') {
			const threadData = await threadsData.get(event.threadID);
			delete threadData.data.prefix;
			await threadsData.set(event.threadID, threadData.data, "data");
			return message.reply(getLang("success", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "بدايه")
			return () => {
				return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};