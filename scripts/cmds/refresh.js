module.exports = {
	config: {
		name: "ريفش",
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 60,
		role: 0,
		shortDescription: {
			vi: "làm mới thông tin",
			en: "refresh information"
		},
		longDescription: {
			vi: "làm mới thông tin nhóm chat hoặc người dùng",
			en: "تحديث معلومات محادثة المجموعة أو المستخدم"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} [thread | group]: làm mới thông tin nhóm chat của bạn"
				+ "\n   {pn} group <threadID>: làm mới thông tin nhóm chat theo ID"
				+ "\n\n   {pn} user: làm mới thông tin người dùng của bạn"
				+ "\n   {pn} user [<userID> | @tag]: làm mới thông tin người dùng theo ID",
			en:" {pn} [thread | group]: تحديث معلومات مجموعتك في الدردشة"
				+ "\n   {pn} group <threadID>: تحديث معلومات مجموعة الدردشة بالمعرف"
				+ "\n\n   {pn} user: تحديث معلومات حسابك"
				+ "\n   {pn} user [<userID> | @tag]: تحديث معلومات حساب المستخدم بالمعرف"
		}
	},

	langs: {
		vi: {
			refreshMyThreadSuccess: "✅ | Đã làm mới thông tin nhóm chat của bạn thành công!",
			refreshThreadTargetSuccess: "✅ | Đã làm mới thông tin nhóm chat %1 thành công!",
			errorRefreshMyThread: "❌ | Đã xảy ra lỗi không thể làm mới thông tin nhóm chat của bạn",
			errorRefreshThreadTarget: "❌ | Đã xảy ra lỗi không thể làm mới thông tin nhóm chat %1",
			refreshMyUserSuccess: "✅ | Đã làm mới thông tin người dùng của bạn thành công!",
			refreshUserTargetSuccess: "✅ | Đã làm mới thông tin người dùng %1 thành công!",
			errorRefreshMyUser: "❌ | Đã xảy ra lỗi không thể làm mới thông tin người dùng của bạn",
			errorRefreshUserTarget: "❌ | Đã xảy ra lỗi không thể làm mới thông tin người dùng %1"
		},
		en: {
			refreshMyThreadSuccess: "✅ | تم تحديث معلومات محادثتك الجماعية بنجاح!",
			refreshThreadTargetSuccess: "✅ | تم تحديث معلومات محادثة جماعية %1 بنجاح!",
			errorRefreshMyThread: "❌ | حدث خطأ أثناء تحديث معلومات محادثتك الجماعية",
			errorRefreshThreadTarget: "❌ | حدث خطأ أثناء تحديث معلومات محادثة جماعية %1",
			refreshMyUserSuccess: "✅ | تم تحديث معلومات مستخدمك بنجاح!",
			refreshUserTargetSuccess: "✅ | تم تحديث معلومات مستخدم %1 بنجاح!",
			errorRefreshMyUser: "❌ | حدث خطأ أثناء تحديث معلومات مستخدمك",
			errorRefreshUserTarget: "❌ | حدث خطأ أثناء تحديث معلومات مستخدم %1"
		}
	},

	onStart: async function ({ args, threadsData, message, event, usersData, getLang }) {
		if (args[0] == "group" || args[0] == "thread") {
			const targetID = args[1] || event.threadID;
			try {
				await threadsData.refreshInfo(targetID);
				return message.reply(targetID == event.threadID ? getLang("refreshMyThreadSuccess") : getLang("refreshThreadTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.threadID ? getLang("errorRefreshMyThread") : getLang("errorRefreshThreadTarget", targetID));
			}
		}
		else if (args[0] == "user") {
			let targetID = event.senderID;
			if (args[1]) {
				if (Object.keys(event.mentions).length)
					targetID = Object.keys(event.mentions)[0];
				else
					targetID = args[1];
			}
			try {
				await usersData.refreshInfo(targetID);
				return message.reply(targetID == event.senderID ? getLang("refreshMyUserSuccess") : getLang("refreshUserTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.senderID ? getLang("errorRefreshMyUser") : getLang("errorRefreshUserTarget", targetID));
			}
		}
		else
			message.SyntaxError();
	}
};