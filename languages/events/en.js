module.exports = {
	// You can customize the language here
	autoUpdateThreadInfo: {},
	checkwarn: {
		text: {
			warn: "لقد تم تحذير العضو %1 ثلاث مرات من قبل و تم حظره من صندوق الدردشة\n- الاسم: %1\n- رقم المعرف: %2\n- لإلغاء الحظر، يرجى استخدام أمر \"%3warn unban <uid>\" (حيث يجب تعويض <uid> برقم معرف الشخص الذي ترغب في إلغاء حظره)",
			needPermission: "يحتاج البوت إلى صلاحية المسؤول لطرد الأعضاء المحظورين."
		}
	},
	leave: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left the group",
			leaveType2: "was kicked from the group"
		}
	},
	logsbot: {
		text: {
			title: "====== سجلات البوت ======",
			added: "\n✅\nحدث: تمت إضافة البوت إلى مجموعة جديدة\n- تمت الإضافة بواسطة: %1",
			kicked: "\n❌\nالحدث: تم طرد البوت\n- تم الطرد بواسطة: %1",
			footer: "\n- معرف المستخدم: %1\n- المجموعة: %2\n- معرف المجموعة: %3\n- الوقت: %4"
		}
	},
	onEvent: {},
	welcome: {
		text: {
			session1: "صباحًا",
			session2: "ظهرًا",
			session3: "العصر",
			session4: "مساء",
			welcomeMessage: `تم اتصال!`,
			multiple1: "انت",
			multiple2: "انتم"
		}
	}
};