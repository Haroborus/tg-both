const { Bot } = require("grammy");
const { createProfile, setupProfileCommands, profiles, ROLES } = require("./profile");
const { setupTaskCommands, tasks } = require("./tasks");

const bot = new Bot(process.env.BOT_TOKEN);

// Генерація головної клавіатури
function mainKeyboard() {
    return {
        reply_markup: {
            keyboard: [
                [{ text: "📄 Профіль" }, { text: "📜 Завдання" }],
                [{ text: "🏆 Рейтинг клану" }, { text: "🛡 Клан" }],
            ],
            resize_keyboard: true,
        },
    };
}

// Обробка команди старту
bot.command("start", (ctx) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || "Анонім";

    if (!profiles[userId]) {
        createProfile(userId, username);
    }

    ctx.reply(`👋 Привіт, ${username}! Ваш профіль створено.`, mainKeyboard());
});

// Налаштування модулів
setupProfileCommands(bot);
setupTaskCommands(bot);

// Запуск бота
bot.start();