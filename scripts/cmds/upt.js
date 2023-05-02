module.exports = {
	config: {
		name: "upt",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Quản lý người dùng",
			en: "Manage users"
		},

  onStart: async function({ message }) {
    const timeRun = process.uptime();
		const hours   = Math.floor(timeRun / 3600000);
		const minutes = Math.floor((timeRun % 3600) / 60);
		const seconds = Math.floor(timeRun % 60);
    message.reply(`Bot đã hoạt động được ${hours ? hours + "h" : ""}${minutes ? minutes + "p" : ""}${seconds}s\n[ 🐐 | Project Goat Bot ]`);
  }
};