const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");

module.exports = {
    name: "resume",
    commands: ['r', 'resume'],
    description: "Продолжить воспроизведение после паузы",
    execute(client, message, args) {
        let embed = new MessageEmbed()
            .setColor(color);

        const { channel } = message.member.voice;

        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume()
            embed.setAuthor("Играем дальше")
            // embed.setThumbnail(client.user.displayAvatarURL())
            return message.channel.send(embed)
        }
        embed.setDescription("Больше нечего продолжать :/")
        message.channel.send(embed)
    }
}