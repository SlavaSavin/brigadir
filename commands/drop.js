const { MessageEmbed } = require("discord.js");
const { color } = require("../config.json");

module.exports = {
    name: "drop",
    commands: ['drop', 'd'],
    description: "Удалить песню из очереди",
    execute(client, message, args) {
        let embed = new MessageEmbed().setColor(color);
        const { channel } = message.member.voice;
        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channe.send(embed);
        }

        const serverQueue = client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("Очередь пуста :/");
            return message.channel.send(embed);
        }

        if (isNaN(args[0])) {
            embed.setAuthor("Номер песни можно указать только цифрами :/")
            return message.channel.send(embed)
        }

        if (args[0] > serverQueue.songs.length) {
            embed.setAuthor("Не получилось :/")
            return message.channel.send(embed)
        }


        serverQueue.songs.splice(args[0] - 1, 1)
        embed.setDescription("Песня пропущенна")
        // embed.setThumbnail(client.user.displayAvatarURL())
        return message.channel.send(embed)
    }
};
