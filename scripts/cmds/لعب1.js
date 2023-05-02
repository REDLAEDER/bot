const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "لعب1",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "game đuổi hình bắt chữ",
			en: "اسم اغنيه مغني"
		},
		longDescription: {
			vi: "chơi game đuổi hình bắt chữ",
			en: "تعرف على اسم اغنيه مغني"
		},
		category: "game",
		guide: {
			en: "{pn}"
		},
		envConfig: {
			reward: 1000
		}
	},

	langs: {
		vi: {
			reply: "Hãy reply tin nhắn này với câu trả lời\n%1",
			isSong: "Đây là tên bài hát của ca sĩ %1",
			notPlayer: "⚠️ Bạn không phải là người chơi của câu hỏi này",
			correct: "🎉 Chúc mừng bạn đã trả lời đúng và nhận được %1$",
			wrong: "⚠️ Bạn đã trả lời sai"
		},
		en: {
			reply: "يرجى الرد على هذه الرسالة مع الإجابة\n%1",
			isSong: "هذا هو اسم أغنية المغني %1",
			notPlayer: "⚠️ أنت لست لاعب هذا السؤال",
			correct: "🎉 تهانينا لقد أجبت بشكل صحيح وحصلت على %1$",
			wrong: "⚠️ لقد أجبت بشكل غير صحيح"
		}
	},

	onStart: async function ({ message, event, commandName, getLang }) {
		const datagame = (await axios.get("https://goatbotserver.onrender.com/api/duoihinhbatchu")).data;
		const { wordcomplete, casi, image1, image2 } = datagame.data;

		message.reply({
			body: getLang("reply", wordcomplete.replace(/\S/g, "█ ")) + (casi ? getLang("isSong", casi) : ''),
			attachment: [
				await getStreamFromURL(image1),
				await getStreamFromURL(image2)
			]
		}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID,
				wordcomplete
			});
		});
	},

	onReply: async ({ message, Reply, event, getLang, usersData, envCommands, commandName }) => {
		const { author, wordcomplete, messageID } = Reply;
		if (event.senderID != author)
			return message.reply(getLang("notPlayer"));

		if (formatText(event.body) == formatText(wordcomplete)) {
			global.GoatBot.onReply.delete(messageID);
			await usersData.addMoney(event.senderID, envCommands[commandName].reward);
			message.reply(getLang("correct", envCommands[commandName].reward));
		}
		else
			message.reply(getLang("wrong"));
	}
};

function formatText(text) {
	return text.normalize("NFD")
		.toLowerCase()
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[đ|Đ]/g, (x) => x == "đ" ? "d" : "D");
}