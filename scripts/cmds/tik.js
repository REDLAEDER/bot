const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");
const { getStreamFromURL, shortenURL, randomString } = global.utils;

module.exports = {
	config: {
		name: "تيكتوك",
		aliases: ["تيك"],
		version: "1.8",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: "Tiktok",
		longDescription: {
			vi: "Tải video/slide (image), audio từ link tiktok",
			en: "تنزيل الفيديو / الشريحة (الصورة) ، الصوت من رابط تيك توك."
		},
		category: "media",
		guide: {
			vi: "   {pn} [video|-v|v] <url>: dùng để tải video/slide (image) từ link tiktok."
				+ "\n   {pn} [audio|-a|a] <url>: dùng để tải audio từ link tiktok",
			en: "   {pn} [فيديو|-ف|ف] <رابط>: لتحميل الفيديو/ الصورة من رابط تيك توك."
				+ "\n   {pn} [صوت|-ص|ص] <رابط>: لتحميل الصوت من رابط تيك توك."
		}
	},

	langs: {
		vi: {
			invalidUrl: "⚠️ Vui lòng nhập url tiktok hợp lệ",
			downloadingVideo: "📥 Đang tải video: %1...",
			downloadedSlide: "✅ Đã tải slide: %1\n%2",
			downloadedVideo: "✅ Đã tải video: %1\n🔗 Url Download: %2",
			downloadingAudio: "📥 Đang tải audio: %1...",
			downloadedAudio: "✅ Đã tải audio: %1",
			errorOccurred: "❌ Đã xảy ra lỗi:\n\n%1",
			tryAgain: "❌ Đã xảy ra lỗi, vui lòng thử lại sau"
		},
		en: {
			invalidUrl: "⚠️ يرجى إدخال رابط صالح لـ تيك توك",
			downloadingVideo: "📥 جارٍ تحميل الفيديو: %1...",
			downloadedSlide: "✅ تم تنزيل الشريحة: %1\n%2",
			downloadedVideo: "✅ تم تنزيل الفيديو: %1\n🔗 رابط التنزيل: %2",
			downloadingAudio: "📥 جارٍ تحميل الصوت: %1...",
			downloadedAudio: "✅ تم تنزيل الصوت: %1",
			errorOccurred: "❌ حدث خطأ:\n\n%1",
			tryAgain: "❌ حدث خطأ، يرجى المحاولة مرة أخرى لاحقًا"
		}
	},

	onStart: async function ({ args, message, getLang }) {
		const messageErrorInvalidUrl = 'It seems that TikTok is changed something on their website, so we are not able to reach their data. Please wait for 5 minutes and try to request your link again. We are looking into this issue.';

		switch (args[0]) {
			case "video":
			case "فيدو":
			case "v": {
				if (!(args[1] || "").trim().match(/^http(s|):\/\/.*(tiktok)\.com.*\/.*$/gi))
					return message.reply(getLang("invalidUrl"));
				const data = await query(args[1]);
				if (data.status == 'error') {
					if (data.message == messageErrorInvalidUrl)
						return message.reply(getLang("invalidUrl"));
					else
						return message.reply(getLang("errorOccurred"), JSON.stringify(data, null, 2));
				}

				const msgSend = message.reply(getLang("downloadingVideo", data.title));
				const linksNoWatermark = data.downloadUrls;
				if (!linksNoWatermark)
					return message.reply(getLang("tryAgain"));

				if (Array.isArray(linksNoWatermark)) {
					console.log(linksNoWatermark);
					const allStreamImage = await Promise.all(linksNoWatermark.map(link => getStreamFromURL(link, `${randomString(10)}.jpg`)));
					const allImageShortUrl = await Promise.all(linksNoWatermark.map((link, index) => shortenURL(link)
						.then(shortUrl => `${index + 1}: ${shortUrl}`)
					));
					message.reply({
						body: getLang("downloadedSlide", data.title, allImageShortUrl.join('\n')),
						attachment: allStreamImage
					}, async () => message.unsend((await msgSend).messageID));
					return;
				}
				const streamFile = await getStreamFromURL(linksNoWatermark, 'video.mp4');
				message.reply({
					body: getLang("downloadedVideo", data.title, await shortenURL(linksNoWatermark)),
					attachment: streamFile
				}, async () => message.unsend((await msgSend).messageID));
				break;
			}
			case "audio":
			case "a":
			case "صوت": {
				if (!(args[1] || "").trim().match(/^http(s|):\/\/.*(tiktok)\.com.*\/.*$/gi))
					return message.reply(getLang("invalidUrl"));
				const dataAudio = await query(args[1], true);
				if (dataAudio.status == 'error') {
					if (dataAudio.message == messageErrorInvalidUrl)
						return message.reply(getLang("invalidUrl"));
					else
						return message.reply(dataAudio.message);
				}

				const urlAudio = dataAudio.downloadUrls;
				const audioName = dataAudio.title;
				if (!urlAudio)
					return message.reply(getLang("tryAgain"));
				const msgSendAudio = message.reply(getLang("downloadingAudio", audioName));

				const streamFileAudio = await getStreamFromURL(urlAudio, "audio.mp3");
				message.reply({
					body: getLang("downloadedAudio", audioName),
					attachment: streamFileAudio
				}, async () => message.unsend((await msgSendAudio).messageID));
				break;
			}
			default: {
				message.SyntaxError();
			}
		}
	}
};

async function query(url, isMp3 = false) {
	const res = await axios.get("https://ssstik.io/en");
	const tt = res.data.split(`"tt:'`)[1].split(`'"`)[0];
	const { data: result } = await axios({
		url: "https://ssstik.io/abc?url=dl",
		method: "POST",
		data: qs.stringify({
			id: url,
			locale: 'en',
			tt
		}),
		"headers": {
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33"
		}
	});

	const $ = cheerio.load(result);
	if (result.includes('<div class="is-icon b-box warning">'))
		throw {
			status: "error",
			message: $('p').text()
		};

	const allUrls = $('.result_overlay_buttons > a');
	const format = {
		status: 'success',
		title: $('.maintext').text()
	};

	const slide = $(".slide");
	if (slide.length != 0) {
		const url = [];
		slide.each((index, element) => {
			url.push($(element).attr('href'));
		});
		format.downloadUrls = url;
		return format;
	}
	format.downloadUrls = $(allUrls[isMp3 ? allUrls.length - 1 : 0]).attr('href');
	return format;
}