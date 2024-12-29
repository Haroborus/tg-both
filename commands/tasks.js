const tasks = [];

function createTask(name, description, deadline = null, requiredRole = null) {
    const task = {
        id: tasks.length + 1,
        name,
        description,
        deadline,
        requiredRole,
        completedBy: [],
    };
    tasks.push(task);
}

function completeTask(userId, taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
        return "❌ Завдання не знайдено!";
    }

    if (task.completedBy.includes(userId)) {
        return "❌ Ви вже виконали це завдання!";
    }

    task.completedBy.push(userId);
    profiles[userId].completedTasks.push(task);
    profiles[userId].balance += 10; // Нагорода за виконання
    return `✅ Завдання "${task.name}" успішно виконано!`;
}

// Налаштування команд для завдань
function setupTaskCommands(bot) {
    bot.hears("📜 Завдання", (ctx) => {
        if (tasks.length === 0) {
            return ctx.reply("❌ Завдань поки що немає!");
        }

        const taskList = tasks
            .map(
                (t) => `
📌 ${t.name}
📖 ${t.description}
⏰ Дедлайн: ${t.deadline || "Без дедлайну"}
🎯 Роль: ${t.requiredRole || "Будь-яка"}
        `
            )
            .join("\n");

        ctx.reply(`📜 Список завдань:\n${taskList}`);
    });

    bot.command("complete", (ctx) => {
        const [_, taskId] = ctx.message.text.split(" ");
        const userId = ctx.from.id;

        if (!profiles[userId]) {
            return ctx.reply("❌ Ваш профіль не знайдено!");
        }

        const result = completeTask(userId, parseInt(taskId));
        ctx.reply(result);
    });
}

module.exports = { setupTaskCommands, tasks, createTask, completeTask };