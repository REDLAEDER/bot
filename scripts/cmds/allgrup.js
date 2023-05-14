module.exports = {
    config: {
        name: "كروباتي",
        version: "1.0",
        author: "Your Name",
        role: 2, // Only owner bot can use this command
        shortDescription: {
            vi: "Lấy danh sách các nhóm được quản lý bởi bot",
            en: "Get list of groups managed by bot"
        },
        category: "admin",
        guide: {
            vi: "",
            en: ""
        }
    },

    langs: {
        vi: {
            list: "Danh sách các nhóm",
            noGroup: "Không có nhóm nào được quản lý bởi bot"
        },
        en: {
            list: "List of groups",
            noGroup: "No group managed by bot"
        }
    },

    onStart: async function ({ api, event, getLang }) {
        const threadList = await api.getThreadList(20, null, ["INBOX"], true); // Get thread list (20 threads per page, start from the beginning, filter by "INBOX" and exclude archived threads)

        const botID = api.getCurrentUserID();
        const groupList = threadList.filter(thread => thread.isGroup && thread.adminIDs.includes(botID)); // Filter only groups managed by bot

        let message = "";

        if (groupList.length === 0) {
            message = getLang("noGroup");
        } else {
            message = getLang("list") + ":\n\n";
            groupList.forEach(group => {
                message += `${group.name} (${group.threadID})\n`;
            });
        }

        api.sendMessage(message, event.threadID);
    }
};
