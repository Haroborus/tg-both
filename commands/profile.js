const profiles = {};
const ROLES = {
    ADMIN: "Адміністратор",
    BOSS: "Бос",
    MEMBER: "Учасник",
};

function createProfile(userId, username) {
    profiles[userId] = {
        username,
        role: ROLES.MEMBER, // За замовчуванням учасник
        clan: null,
        balance: 0,
        completedTasks: [],
    };
}

// Налаштування команд для профілю
function setupProfileCommands(bot) {
    bot.hears("📄 Профіль", (ctx) => {
        const userId = ctx.from.id;
        const profile = profiles[userId];

        if (!profile) {
            return ctx.reply("❌ Ваш профіль не знайдено!");
        }

        const profileText = `
📄 Ваш профіль:
👤 Нік: ${profile.username}
🛡 Роль: ${profile.role}
🏅 Баланс: ${profile.balance} очок
🛡 Клан: ${profile.clan || "Немає"}
        `;
        ctx.reply(profileText);
    });
}

module.exports = { createProfile, setupProfileCommands, profiles, ROLES };