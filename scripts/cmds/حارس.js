const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "حارس",
		version: "1.4",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Chống đổi thông tin box chat",
			en: "منع تغير معلومات مجموعه"
		},
		longDescription: {
			vi: "Bật tắt chức năng chống thành viên đổi thông tin box chat của bạn",
			en: "تشغيل / إيقاف حمايه معلومات مجموعه"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} avt [on | off]: chống đổi avatar box chat"
				+ "\n   {pn} name [on | off]: chống đổi tên box chat"
				+ "\n   {pn} theme [on | off]: chống đổi theme (chủ đề) box chat"
				+ "\n   {pn} emoji [on | off]: chống đổi trạng emoji box chat",
			en: "   {pn} avt [تشغيل | إيقاف]: مربع مكافحة تغيير صورة الملف الشخصي في الدردشة"
				+ "\n   {pn} name [تشغيل | إيقاف]: مربع مكافحة تغيير الاسم في الدردشة"
				+ "\n   {pn} theme [تشغيل | إيقاف]: مربع مكافحة تغيير السمة (المظهر) في الدردشة"
				+ "\n   {pn} emoji [تشغيل | إيقاف]: مربع مكافحة تغيير الرموز التعبيرية في الدردشة"
		}
	},

	langs: {
		vi: {
			antiChangeAvatarOn: "Đã bật chức năng chống đổi avatar box chat",
			antiChangeAvatarOff: "Đã tắt chức năng chống đổi avatar box chat",
			missingAvt: "Bạn chưa đặt avatar cho box chat",
			antiChangeNameOn: "Đã bật chức năng chống đổi tên box chat",
			antiChangeNameOff: "Đã tắt chức năng chống đổi tên box chat",
			antiChangeThemeOn: "Đã bật chức năng chống đổi theme (chủ đề) box chat",
			antiChangeThemeOff: "Đã tắt chức năng chống đổi theme (chủ đề) box chat",
			antiChangeEmojiOn: "Đã bật chức năng chống đổi emoji box chat",
			antiChangeEmojiOff: "Đã tắt chức năng chống đổi emoji box chat",
			antiChangeAvatarAlreadyOn: "Hiện tại box chat của bạn đang bật chức năng cấm thành viên đổi avatar",
			antiChangeNameAlreadyOn: "Hiện tại box chat của bạn đang bật chức năng cấm thành viên đổi tên",
			antiChangeThemeAlreadyOn: "Hiện tại box chat của bạn đang bật chức năng cấm thành viên đổi theme (chủ đề)",
			antiChangeEmojiAlreadyOn: "Hiện tại box chat của bạn đang bật chức năng cấm thành viên đổi emoji"
		},
		en: {
			antiChangeAvatarOn: "تشغيل مجموعة مكافحة تغيير صورة الملف الشخصي في الدردشة",
			antiChangeAvatarOff: "إيقاف مجموعة مكافحة تغيير صورة الملف الشخصي في الدردشة",
			missingAvt: "لم تقم بتعيين صورة لمجموعة الدردشة",
			antiChangeNameOn: "تشغيل مجموعة مكافحة تغيير الاسم في الدردشة",
			antiChangeNameOff: "إيقاف مجموعة مكافحة تغيير الاسم في الدردشة",
			antiChangeThemeOn: "تشغيل مجموعة مكافحة تغيير السمة (المظهر) في الدردشة",
			antiChangeThemeOff: "إيقاف مجموعة مكافحة تغيير السمة (المظهر) في الدردشة",
			antiChangeEmojiOn: "تشغيل مجموعة مكافحة تغيير الرموز التعبيرية في الدردشة",
			antiChangeEmojiOff: "إيقاف مجموعة مكافحة تغيير الرموز التعبيرية في الدردشة",
			antiChangeAvatarAlreadyOn: "مجموعة الدردشة الخاصة بك تحتوي بالفعل على مكافحة تغيير صورة الملف الشخصي",
			antiChangeNameAlreadyOn: "مجموعة الدردشة الخاصة بك تحتوي بالفعل على مكافحة تغيير الاسم",
			antiChangeThemeAlreadyOn: "مجموعة الدردشة الخاصة بك تحتوي بالفعل على مكافحة تغيير السمة (المظهر)",
			antiChangeEmojiAlreadyOn: "مجموعة الدردشة الخاصة بك تحتوي بالفعل على مكافحة تغيير الرموز التعبيرية"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		if (!["on", "off"].includes(args[1]))
			return message.SyntaxError();
		const { threadID } = event;
		const dataAntiChangeInfoBox = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
		async function checkAndSaveData(key, data) {
			// dataAntiChangeInfoBox[key] = args[1] === "on" ? data : false;
			if (args[1] === "off")
				delete dataAntiChangeInfoBox[key];
			else
				dataAntiChangeInfoBox[key] = data;

			await threadsData.set(threadID, dataAntiChangeInfoBox, "data.antiChangeInfoBox");
			message.reply(getLang(`antiChange${key.slice(0, 1).toUpperCase()}${key.slice(1)}${args[1].slice(0, 1).toUpperCase()}${args[1].slice(1)}`));
		}
		switch (args[0]) {
			case "صوره":
			case "avatar": {
				const { imageSrc } = await threadsData.get(threadID);
				if (!imageSrc)
					return message.reply(getLang("missingAvt"));
				await checkAndSaveData("avatar", imageSrc);
				break;
			}
			case "اسم": {
				const { threadName } = await threadsData.get(threadID);
				await checkAndSaveData("name", threadName);
				break;
			}
			case "ثيم": {
				const { threadThemeID } = await threadsData.get(threadID);
				await checkAndSaveData("theme", threadThemeID);
				break;
			}
			case "ايموجي": {
				const { emoji } = await threadsData.get(threadID);
				await checkAndSaveData("emoji", emoji);
				break;
			}
			default: {
				return message.SyntaxError();
			}
		}
	},

	onEvent: async function ({ message, event, threadsData, role, api, getLang }) {
		const { threadID, logMessageType, logMessageData, author } = event;
		switch (logMessageType) {
			case "log:thread-image": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				if (!dataAntiChange.avatar)
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeAvatarAlreadyOn"));
						api.changeGroupImage(await getStreamFromURL(dataAntiChange.avatar), threadID);
					}
					else {
						const imageSrc = logMessageData.url;
						await threadsData.set(threadID, imageSrc, "data.antiChangeInfoBox.avatar");
					}
				};
			}
			case "log:thread-name": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const name = await threadsData.get(threadID, "data.antiChangeInfoBox.name");
				// if (name == false)
				if (!dataAntiChange.hasOwnProperty("name"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeNameAlreadyOn"));
						api.setTitle(dataAntiChange.name, threadID);
					}
					else {
						const threadName = logMessageData.name;
						await threadsData.set(threadID, threadName, "data.antiChangeInfoBox.name");
					}
				};
			}
			case "log:thread-color": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const themeID = await threadsData.get(threadID, "data.antiChangeInfoBox.theme");
				// if (themeID == false)
				if (!dataAntiChange.hasOwnProperty("theme"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeThemeAlreadyOn"));
						api.changeThreadColor(dataAntiChange.theme || "196241301102133", threadID); // 196241301102133 is default color
					}
					else {
						const threadThemeID = logMessageData.theme_id;
						await threadsData.set(threadID, threadThemeID, "data.antiChangeInfoBox.theme");
					}
				};
			}
			case "log:thread-icon": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const emoji = await threadsData.get(threadID, "data.antiChangeInfoBox.emoji");
				// if (emoji == false)
				if (!dataAntiChange.hasOwnProperty("emoji"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeEmojiAlreadyOn"));
						api.changeThreadEmoji(dataAntiChange.emoji, threadID);
					}
					else {
						const threadEmoji = logMessageData.thread_icon;
						await threadsData.set(threadID, threadEmoji, "data.antiChangeInfoBox.emoji");
					}
				};
			}
		}
	}
};