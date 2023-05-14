module.exports = {
  config: {
    name: "leaveall",
    version: "1.0",
    author: "YourName",
    role: 2,
    shortDescription: {
      vi: "Rời khỏi tất cả các nhóm",
      en: "Leave all groups",
    },
    longDescription: {
      vi: "Lệnh này sẽ rời khỏi tất cả các nhóm mà bot đang tham gia.",
      en: "This command will leave all groups that the bot is currently in.",
    },
    category: "admin",
    guide: {
      vi: "",
      en: "",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    // Get the list of all threads the bot is a member of
    const threads = await api.getThreadList(100, null, [], "INBOX");

    // Leave all groups except for the current group
    for (const thread of threads) {
      if (thread.isGroup && thread.threadID !== event.threadID) {
        await api.removeUserFromGroup(api.getCurrentUserID(), thread.threadID);
        console.log(`Left group ${thread.name} (${thread.threadID})`);
      }
    }

    // Send a reply to confirm that all groups have been left
    message.reply("I have left all groups except for this one.");
  },
};
