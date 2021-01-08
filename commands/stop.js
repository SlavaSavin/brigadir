const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");
// const discord = require("discord.js");

module.exports = {
    name: "stop",
    commands: ['stop', 's'],
    description: "Остановить музыку",
    execute(client, message, args) {
        let embed = new MessageEmbed()
            .setColor(color);

        const { channel } = message.member.voice;

        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Нечего останавливать :/")
            return message.channel.send(embed);
        }

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
};
