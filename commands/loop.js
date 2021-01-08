const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");

module.exports = {
    name: "loop",
    commands: ['loop', 'l'],
    description: "Зациклить песню",
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
            embed.setAuthor("Мне нечего зацикливать :/")
            return message.channel.send(embed);
        }

        serverQueue.loop = !serverQueue.loop

        embed.setDescription(`Зацикливание **${serverQueue.loop ? "включено" : "выключено"}**`)
        // embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
    }
}