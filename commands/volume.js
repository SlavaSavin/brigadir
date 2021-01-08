const { MessageEmbed } = require("discord.js");
const { color } = require("../config.json");

module.exports = {
    name: "volume",
    commands: ['volume', 'v'],
    description: "работа со звуком",
    execute(client, message, args) {
        // if (!message.member.hasPermission("ADMINISTRATOR")) {
        //     return message.channel.send("Только администрация может настраивать громкость звука :/")
        // }

        let embed = new MessageEmbed().setColor(color);

        const { channel } = message.member.voice;
        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Сейчас не играет ни одна песня :/")
            return message.channel.send(embed);
        }

        if (!args[0]) {
            embed.setAuthor(`Громкость: ${serverQueue.volume}`)
            return message.channel.send(embed)
        }

        if (isNaN(args[0])) {
            embed.setAuthor("Пожалуйста, используйте только цифры :/")
            return message.channel.send(embed)
        }

        if (args[0] > 200) {
            embed.setAuthor("Лимит громкости: 200 :/")
            return message.channel.send(embed)
        }

        serverQueue.volume = args[0]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
        embed.setDescription(`Установлена громкость ${args[0]}`)
        // embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
    }
};
