const { MessageEmbed } = require("discord.js")

const { color } = require("../config.json");

module.exports = {
    name: "pause",
    commands: ['pause', 'ps'],
    description: "Поставить проигрыватель на паузу",
    execute(client, message, args) {
        const { channel } = message.member.voice;
        let embed = new MessageEmbed()
            .setColor(color);

        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Мне нечего останавливать :/")
            return message.channel.send(embed);
        }

        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true)

            embed.setAuthor("Песня остановлена")
            // embed.setThumbnail(client.user.displayAvatarURL())
            return message.channel.send(embed)
        }
    }
}