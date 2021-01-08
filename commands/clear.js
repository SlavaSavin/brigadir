const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");

module.exports = {
    name: 'clear',
    commands: ['c', 'clear'],
    description: 'Удалить сообщения в чате',
    async execute(client, message, args) {
        let embed = new MessageEmbed().setColor(color);
        let deleteCount = 2;

        if (args[0] != null) {
            deleteCount = args[0];
        }

        if (deleteCount > 100) {
            embed.setAuthor('Пожалуйста, не удаляйте более 100 сообщений')
            message.channel.send(embed);
            deleteCount = 100;
        }

        const fetched = await message.channel.messages.fetch({
            limit: deleteCount,
        });

        message.channel.bulkDelete(fetched)
            .catch(error => {
                console.error(error);
                message.reply("Произошла ошибка на серверах discord: ");
            });
    },
};