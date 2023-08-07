const CronJob = require("cron").CronJob;
const Sequelize = require("sequelize");
const Chat = require("../models/chatModel");
const ArchivedChat = require("../models/archivedchatModel");

const archivedchat = new CronJob("0 0 * * *", async () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const chats = await Chat.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: yesterday,
        },
      },
    });
    await ArchivedChat.bulkCreate(chats);
    await Chat.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: yesterday,
        },
      },
    });
  } catch (error) {
    console.error("Error archiving old chats:", error);
  }
});

module.exports = archivedchat;