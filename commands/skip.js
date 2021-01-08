const { MessageEmbed } = require("discord.js")
const { color } = require("../config.json");

module.exports = {
    name: "skip",
    commands: ['skip', 'sk', 'sp'],
    description: "Пропустить одну песню",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
            .setColor(color);

        const { channel } = message.member.voice;

        if (!channel) {
            embed.setAuthor("Вам надо зайти на канал :/")
            return message.channel.send(embed);
        }
        const serverQueue = message.client.queue.get(message.guild.id);
        const vote = message.client.vote.get(message.guild.id)
        if (!serverQueue) {
            embed.setAuthor("Нечего пропускать :/")
            return message.channel.send(embed);
        }

        const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
        const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
        console.log(message.guild.me.voice.channel.members.size)

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            if (vote.vote > okie) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("Голосование за пропуск")
                // embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed);
            }

            if (vote.voters.includes(message.author.id)) {
                return message.channel.send("Вы уже проголосовали за пропуск")
            }

            if (vcvote === 2) {
                serverQueue.connection.dispatcher.end();
                embed.setDescription("Песня пропущена")
                // embed.setThumbnail(client.user.displayAvatarURL())
                return message.channel.send(embed);
            }

            vote.vote++
            vote.voters.push(message.author.id)
            return message.channel.send(`Вы проголосовали за пропуск песни, осталось ${Math.floor(vcvote - vote.vote)} голоса(ов)`)
        }

        serverQueue.connection.dispatcher.end();
        embed.setDescription("Песня пропущена")
        // embed.setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
    }
};
