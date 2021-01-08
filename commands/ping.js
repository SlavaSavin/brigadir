module.exports = {
    name: "ping",
    commands: ['test', 'ping'],
    description: "Проверить бота на признаки жизни",
    execute(client, message) {
        message.reply("pong .)");
    }
};