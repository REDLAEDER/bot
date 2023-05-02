const axios = require("axios");

module.exports = {
  config: {
    name: "سمسم",
    version: "1.0",
    author: "زعيم الاحمر",
    shortDescription: {
      en: "Talk to SimSimi chatbot",
      vi: "Nói chuyện với chatbot SimSimi",
      es: "Habla con el chatbot SimSimi"
    },
    longDescription: {
      en: "Talk to SimSimi chatbot",
      vi: "Nói chuyện với chatbot SimSimi",
      es: "Habla con el chatbot SimSimi"
    },
    commands: [
      {
        name: "simsimi",
        description: {
          en: "Talk to SimSimi chatbot",
          vi: "Nói chuyện với chatbot SimSimi",
          es: "Habla con el chatbot SimSimi"
        },
        options: [
          {
            name: "message",
            description: {
              en: "The message to send to SimSimi chatbot",
              vi: "Tin nhắn muốn gửi tới chatbot SimSimi",
              es: "El mensaje para enviar al chatbot SimSimi"
            },
            type: 3,
            required: true
          }
        ]
      }
    ]
  },

  onStart: async function ({ message, args }) {
    const apiUrl = `https://api.simsimi.net/v2/?text=${encodeURIComponent(args.join(" "))}&lc=ar`;
    try {
      const response = await axios.get(apiUrl);
      message.reply(response.data.success ? response.data.success : response.data.failreason);
    } catch (error) {
      message.reply("An error occurred: " + error.message);
    }
  }
};
