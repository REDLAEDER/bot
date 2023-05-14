module.exports = {
	config: {
		name: "leaveall",
		version: "1.0",
		author: "YourName",
		role: 2,
		shortDescription: {
			vi: "Rời khỏi tất cả các nhóm",
			en: "Leave all groups"
		},
		longDescription: {
			vi: "Lệnh này sẽ rời khỏi tất cả các nhóm mà bot đang tham gia.",
			en: "This command will leave all groups that the bot is currently in."
		},
		category: "admin",
		guide: {
			vi: "",
			en: ""
		}
	},

	onStart: async function ({ api, args, message, event }) {
		const threads = await api.getThreadList(100, null, [], "INBOX");
		for (let thread of threads) {
			if (thread.isGroup && thread.threadID !== event.threadID) {
				await api.removeUserFromGroup(api.getCurrentUserID(), thread.threadID);
				console.log(`Left group ${thread.name} (${thread.threadID})`);
			}
		}
		message.reply("I have left all groups.");
	}
};
