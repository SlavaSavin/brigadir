const { MessageEmbed } = require("discord.js")

const { color } = require("../config.json");

module.exports = {
    name: "np",
    commands: ['np', 'name'],
    description: "Вывести название текущего трека",
    execute(client, message, args) {
        let embed = new MessageEmbed()
            .setColor(color)

        const { channel } = message.member.voice;
        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Больше нечего проигрывать :/")
            return message.channel.send(embed);
        }

        embed.setDescription(`**Сейчас играет** - ${serverQueue.songs[0].title}`)
            // .setThumbnail(serverQueue.songs[0].thumbnail);
            
        message.channel.send(embed);
    }
}