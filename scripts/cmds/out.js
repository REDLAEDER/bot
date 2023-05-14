module.exports = {
	config: {
		name: "out", // Name of command, it must be unique to identify with other commands
		version: "1.0", // Version of command
		author: "زعيم الاحمر", // Author of command
		countDown: 5, // Time to wait before executing command again (seconds)
		role: 2, // Role of user to use this command (0: normal user, 1: admin box chat, 2: owner bot)
		shortDescription: {
			
			en: "خروج من مجموعه "
		}, // Short description of command
		longDescription: {
			
			en: "امر حاص بمطور"
		}, // Long description of command
		category: "المطور", // Category of command
		guide: {
			
			en: ""
		} // Guide of command
	},

	langs: {
    en: {
    
        leftGroup: "You have left the group successfully.",
        groupNotFound: "No group found with the given name or ID."
    } // English language
},


	onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
        if (args.length !== 1) {
            message.reply(getLang("usage", commandName));
            return;
        }
        const groupId = args[0];
        try {
            await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
            message.reply(getLang("leftGroup"));
        } catch (e) {
            message.reply(getLang("groupNotFound"));
        }
    }
};

