module.exports = {
	config: {
		name: "bad",
		aliases: ["badword"],
		version: "1.3",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Bật/tắt cảnh báo thô tục",
			en: "تشغيل/إيقاف تشغيل تحذير الكلمات السيئة."
		},
		longDescription: {
			vi: "Bật/tắt/thêm/xóa cảnh báo vi phạm từ thô tục, nếu thành viên vi phạm sẽ bị cảnh báo, lần 2 sẽ kick khỏi box chat",
			en: "تشغيل/إيقاف تشغيل/إضافة/إزالة تحذير الكلمات السيئة، إذا قام أي عضو بانتهاكها سيتم تحذيره، وفي المرة الثانية سيتم طرده من مجموعه."
		},
		category: "box chat",
		guide: {
			vi: "   {pn} add <words>: thêm từ cấm (có thể thêm nhiều từ cách nhau bằng dấu phẩy \",\" hoặc dấu gạch đứng \"|\""
				+ "\n   {pn} delete <words>: xóa từ cấm (có thể xóa nhiều từ cách nhau bằng dấu phẩy \",\" hoặc dấu gạch đứng \"|\""
				+ "\n   {pn} list <hide | để trống>: tắt cảnh báo (thêm \"hide\" để ẩn từ cấm)"
				+ "\n   {pn} unwarn [<userID> | <@tag>]: xóa 1 lần cảnh báo của 1 thành viên"
				+ "\n   {pn} on: tắt cảnh báo"
				+ "\n   {pn} off: bật cảnh báo",
			en: "   {pn} add <words>: add banned words (you can add multiple words separated by commas \",\" or vertical bars \"|\")"
				+ "\n   {pn} delete <words>: delete banned words (you can delete multiple words separated by commas \",\" or vertical bars \"|\")"
				+ "\n   {pn} list <hide | leave blank>: turn off warning (add \"hide\" to hide banned words)"
				+ "\n   {pn} unwarn [<userID> | <@tag>]: remove 1 warning of 1 member"
				+ "\n   {pn} on: turn off warning"
				+ "\n   {pn} off: turn on warning"
		}
	},

	langs: {
		vi: {
			onText: "bật",
			offText: "tắt",
			onlyAdmin: "⚠️ | Chỉ quản trị viên mới có thể thêm từ cấm vào danh sách",
			missingWords: "⚠️ | Bạn chưa nhập từ cần cấm",
			addedSuccess: "✅ | Đã thêm %1 từ cấm vào danh sách",
			alreadyExist: "❌ | %1 từ cấm đã tồn tại trong danh sách từ trước: %2",
			tooShort: "⚠️ | %1 từ cấm không thể thêm vào danh sách do có độ dài nhỏ hơn 2 ký tự: %2",
			onlyAdmin2: "⚠️ | Chỉ quản trị viên mới có thể xóa từ cấm khỏi danh sách",
			missingWords2: "⚠️ | Bạn chưa nhập từ cần xóa",
			deletedSuccess: "✅ | Đã xóa %1 từ cấm khỏi danh sách",
			notExist: "❌ | %1 từ cấm không tồn tại trong danh sách từ trước: %2",
			emptyList: "⚠️ | Danh sách từ cấm trong nhóm bạn hiện đang trống",
			badList: "📑 | Danh sách từ cấm trong nhóm bạn: %1",
			onlyAdmin3: "⚠️ | Chỉ quản trị viên mới có thể %1 tính năng này",
			turnedOnOrOff: "✅ | Cảnh báo vi phạm từ cấm đã %1",
			onlyAdmin4: "⚠️ | Chỉ quản trị viên mới có thể xóa cảnh báo vi phạm từ cấm",
			missingTarget: "⚠️ | Bạn chưa nhập ID người dùng hoặc tag người dùng",
			notWarned: "⚠️ | Người dùng %1 chưa bị cảnh báo vi phạm từ cấm",
			removedWarn: "✅ | Người dùng %1 | %2 đã được xóa bỏ 1 lần cảnh báo vi phạm từ cấm",
			warned: "⚠️ | Từ cấm \"%1\" đã được phát hiện trong tin nhắn của bạn, nếu tiếp tục vi phạm bạn sẽ bị kick khỏi nhóm.",
			warned2: "⚠️ | Từ cấm \"%1\" đã được phát hiện trong tin nhắn của bạn, bạn đã vi phạm 2 lần và sẽ bị kick khỏi nhóm.",
			needAdmin: "Bot cần quyền quản trị viên để kick thành viên bị ban",
			unwarned: "✅ | Đã xóa bỏ cảnh báo vi phạm từ cấm của người dùng %1 | %2"
		},
		en: {
			onText: "تفعيل",
			offText: "إيقاف",
			onlyAdmin: "⚠️ | يمكن للمسؤولين فقط إضافة كلمات محظورة للقائمة",
			missingWords: "⚠️ | لم تقم بإدخال الكلمات المحظورة",
			addedSuccess: "✅ | تم إضافة %1 كلمات محظورة إلى القائمة",
			alreadyExist: "❌ | %1 كلمات محظورة موجودة بالفعل في القائمة: %2",
			tooShort: "⚠️ | %1 لا يمكن إضافة الكلمات المحظورة إلى القائمة لأنها أقصر من 2 أحرف: %2",
			onlyAdmin2: "⚠️ | يمكن للمسؤولين فقط حذف الكلمات المحظورة من القائمة",
			missingWords2: "⚠️ | لم تقم بإدخال الكلمات المراد حذفها",
			deletedSuccess: "✅ | تم حذف %1 كلمات محظورة من القائمة",
			notExist: "❌ | %1 الكلمات المحظورة غير موجودة في القائمة من قبل: %2",
			emptyList: "⚠️ | قائمة الكلمات المحظورة في مجموعتك فارغة حاليًا",
			badList: "📑 | قائمة الكلمات المحظورة في مجموعتك: %1",
			onlyAdmin3: "⚠️ | يمكن للمسؤولين فقط %1 هذه الميزة",
			turnedOnOrOff: "✅ | تم %1 تحذير الكلمات المحظورة",
			onlyAdmin4: "⚠️ | يمكن للمسؤولين فقط حذف تحذير الكلمات المحظورة",
			missingTarget: "⚠️ | لم تدخل معرف المستخدم أو اسم المستخدم المميز",
			notWarned: "⚠️ | المستخدم %1 لم يتم تحذيره للكلمات المحظورة",
			removedWarn: "✅ | تمت إزالة تحذير الكلمات المحظورة من المستخدم %1 | %2",
			warned: "⚠️ | تم الكشف عن كلمات محظورة %1 في رسالتك، إذا استمريت في الان"
		}
	},

	onStart: async function ({ message, event, args, threadsData, usersData, role, getLang }) {
		if (!await threadsData.get(event.threadID, "data.bad"))
			await threadsData.set(event.threadID, {
				words: [],
				violationUsers: {}
			}, "data.bad");

		const bad = await threadsData.get(event.threadID, "data.bad.words", []);

		switch (args[0]) {
			case "add": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin"));
				const words = args.slice(1).join(" ").split(/[,|]/);
				if (words.length === 0)
					return message.reply(getLang("missingWords"));
				const badExist = [];
				const success = [];
				const failed = [];
				for (const word of words) {
					const oldIndex = bad.indexOf(word);
					if (oldIndex === -1) {
						bad.push(word);
						success.push(word);
					}
					else if (oldIndex > -1) {
						badExist.push(word);
					}
					else
						failed.push(word);
				}
				await threadsData.set(event.threadID, bad, "data.bad.words");
				message.reply(
					success.length > 0 ? getLang("addedSuccess", success.length) : ""
						+ (badExist.length > 0 ? getLang("alreadyExist", badExist.length, badExist.map(word => hideWord(word)).join(", ")) : "")
						+ (failed.length > 0 ? getLang("tooShort", failed.length, failed.join(", ")) : "")
				);
				break;
			}
			case "delete":
			case "del":
			case "-d": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin2"));
				const words = args.slice(1).join(" ").split(/[,|]/);
				if (words.length === 0)
					return message.reply(getLang("missingWords2"));
				const success = [];
				const failed = [];
				for (const word of words) {
					const oldIndex = bad.indexOf(word);
					if (oldIndex > -1) {
						bad.splice(oldIndex, 1);
						success.push(word);
					}
					else
						failed.push(word);
				}
				await threadsData.set(event.threadID, bad, "data.bad.words");
				message.reply(
					(success.length > 0 ? getLang("deletedSuccess", success.length) : "")
					+ (failed.length > 0 ? getLang("notExist", failed.length, failed.join(", ")) : "")
				);
				break;
			}
			case "list":
			case "all":
			case "-a": {
				if (bad.length === 0)
					return message.reply(getLang("emptyList"));
				message.reply(getLang("badList", args[1] === "hide" ? bad.map(word => hideWord(word)).join(", ") : bad.join(", ")));
				break;
			}
			case "on": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin3", getLang("onText")));
				await threadsData.set(event.threadID, true, "settings.bad");
				message.reply(getLang("turnedOnOrOff", getLang("onText")));
				break;
			}
			case "off": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin3", getLang("offText")));
				await threadsData.set(event.threadID, false, "settings.bad");
				message.reply(getLang("turnedOnOrOff", getLang("offText")));
				break;
			}
			case "unwarn": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin4"));
				let userID;
				if (Object.keys(event.mentions)[0])
					userID = Object.keys(event.mentions)[0];
				else if (args[1])
					userID = args[1];
				else if (event.messageReply)
					userID = event.messageReply.senderID;
				if (isNaN(userID))
					return message.reply(getLang("missingTarget"));
				const violationUsers = await threadsData.get(event.threadID, "data.bad.violationUsers", {});
				if (!violationUsers[userID])
					return message.reply(getLang("notWarned", userID));
				violationUsers[userID]--;
				await threadsData.set(event.threadID, violationUsers, "data.bad.violationUsers");
				const userName = await usersData.getName(userID);
				message.reply(getLang("unwarned", userID, userName));
			}
		}
	},

	onChat: async function ({ message, event, api, threadsData, prefix, getLang }) {
		if (!event.body)
			return;
		const threadData = global.db.allThreadData.find(t => t.threadID === event.threadID) || await threadsData.create(event.threadID);
		const isEnabled = threadData.settings.bad;
		if (!isEnabled)
			return;
		const allAliases = [...(global.GoatBot.commands.get("bad").config.aliases || []), ...(threadData.data.aliases?.["bad"] || [])];
		const isCommand = allAliases.some(a => event.body.startsWith(prefix + a));
		if (isCommand)
			return;
		const badWordList = threadData.data.bad?.words;
		if (!badWordList || badWordList.length === 0)
			return;
		const violationUsers = threadData.data.bad?.violationUsers || {};

		for (const word of badWordList) {
			if (event.body.match(new RegExp(`${word}`, "gi"))) {
				if ((violationUsers[event.senderID] || 0) < 1) {
					message.reply(getLang("warned", word));
					violationUsers[event.senderID] = violationUsers[event.senderID] ? violationUsers[event.senderID] + 1 : 1;
					await threadsData.set(event.threadID, violationUsers, "data.bad.violationUsers");
					return;
				}
				else {
					await message.reply(getLang("warned2", word));
					api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
						if (err)
							return message.reply(getLang("needAdmin"), (e, info) => {
								let { onEvent } = global.GoatBot;
								onEvent.push({
									messageID: info.messageID,
									onStart: ({ event }) => {
										if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
											const { TARGET_ID } = event.logMessageData;
											if (TARGET_ID == api.getCurrentUserID())
												api.removeUserFromGroup(event.senderID, event.threadID, () => onEvent = onEvent.filter(item => item.messageID != info.messageID));
										}
									}
								});
							});
					});
				}
			}
		}
	}
};


function hideWord(str) {
	return str.length == 2 ?
		str[0] + "*" :
		str[0] + "*".repeat(str.length - 2) + str[str.length - 1];
}