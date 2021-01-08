const { MessageEmbed } = require("discord.js");
const { color } = require("../config.json");

module.exports = {
    name: "queue",
    commands: ['queue', 'q'],
    description: "Получить названия всех песен в очереди",
    execute: (client, message, args) => {
        let embed = new MessageEmbed().setColor(color);
        const { channel } = message.member.voice;

        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Нечего показывать :/");
            return message.channel.send(embed);
        }

        embed.setDescription(
            `${serverQueue.songs
                .map((song, index) => index + 1 + ". " + song.title)
                .join("\n\n")}`,
            { split: true }
        );

        // embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
    }
}