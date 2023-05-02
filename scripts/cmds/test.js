module.exports = {
	config: {
		name: "upt",
		version: "1.0",
		author: "زعيم الاحمر",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem tất cả các nhóm",
			en: "View all groups"
		},
		longDescription: {
			vi: "Xem tất cả các nhóm mà bạn đã tham gia",
			en: "View all groups you've joined"
		},
		category: "info",
		guide: {
			en: "{pn}"
		}
	},

	onstart: async function({ message }) {
    const timeRun = process.uptime();
		const hours   = Math.floor(timeRun / 3600);
		const minutes = Math.floor((timeRun % 3600) / 60);
		const seconds = Math.floor(timeRun % 60);
    message.reply(`Bot đã hoạt động được ${hours ? hours + "h" : ""}${minutes ? minutes + "p" : ""}${seconds}s\n[ 🐐 | Project Goat Bot ]`);
	}
};
