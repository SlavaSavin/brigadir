const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");

module.exports = {
    name: "jump",
    commands: ['jump', 'j'],
    description: "Воспроизвести весню под номером",
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
            embed.setAuthor("Там ничего нет :/")
            return message.channel.send(embed);
        }
        if (!args[0]) {
            embed.setAuthor(`Вы не указали номер песни :/`)
            return message.channel.send(embed)
        }

        if (isNaN(args[0])) {
            embed.setAuthor("Номер песни можно указать только цифрами :/")
            return message.channel.send(embed)
        }

        if (serverQueue.songs.length < args[0]) {
            embed.setAuthor("Не могу найти такую песню :/")
            return message.channel.send(embed)
        }
        serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
        serverQueue.connection.dispatcher.end()

        embed.setDescription(`Воспроизвожу песню под номером - ${args[0]}`)
        message.channel.send(embed)

    }
}