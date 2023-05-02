const itunes = require("searchitunes");
const { getStreamFromURL } = global.utils;

module.exports = {
	config: {
		name: "ابل",
		version: "1.1",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tìm app trên appstore",
			en: "بحث في ابل ستور"
		},
		longDescription: {
			vi: "Tìm app trên appstore",
			en: "بحث في ابل ستور"
		},
		category: "software",
		guide: "   {pn}: <اسم تطبيق>"
			+ "\n   - Example:"
			+ "\n   {pn} PUBG",
		envConfig: {
			limitResult: 3
		}
	},

	langs: {
		vi: {
			missingKeyword: "Bạn chưa nhập từ khóa",
			noResult: "Không tìm thấy kết quả nào cho từ khóa %1"
		},
		en: {
			missingKeyword: "لم تدخل أي كلمة مفتاحية",
			noResult: "لم يتم العثور على نتائج للكلمة المفتاحية %1"
		}
	},

	onStart: async function ({ message, args, commandName, envCommands, getLang }) {
		if (!args[0])
			return message.reply(getLang("missingKeyword"));
		let results = [];
		try {
			results = (await itunes({
				entity: "software",
				country: "VN",
				term: args.join(" "),
				limit: envCommands[commandName].limitResult
			})).results;
		}
		catch (err) {
			return message.reply(getLang("noResult", args.join(" ")));
		}

		if (results.length > 0) {
			let msg = "";
			const pedningImages = [];
			for (const result of results) {
				msg += `\n\n- ${result.trackCensoredName} by ${result.artistName}, ${result.formattedPrice} and rated ${"🌟".repeat(result.averageUserRating)} (${result.averageUserRating.toFixed(1)}/5)`
					+ `\n- ${result.trackViewUrl}`;
				pedningImages.push(await getStreamFromURL(result.artworkUrl512 || result.artworkUrl100 || result.artworkUrl60));
			}
			message.reply({
				body: msg,
				attachment: await Promise.all(pedningImages)
			});
		}
		else {
			message.reply(getLang("noResult", args.join(" ")));
		}
	}
};