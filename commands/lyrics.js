const { MessageEmbed } = require("discord.js")
const Genius = new (require("genius-lyrics")).Client("ZD_lLHBwRlRRfQvVLAnHKHksDHQv9W1wm1ZAByPaYo1o2NuAw6v9USBUI1vEssjq");

const { color } = require("../config.json");

module.exports = {
    name: "lyrics",
    commands: ['lyr', 'lyrics'],
    description: "Найти текст песни",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
            .setDescription("Ищу текст ...")
            .setColor("YELLOW")

        if (!args.length) {
            return message.channel.send("Вы не написали название песни :/")
        }

        const msg = await message.channel.send(embed)
        try {
            const songs = await Genius.songs.search(args.join(" "));
            // const songs = await Genius.tracks.search(args.join(" "));
            const lyrics = await songs[0].lyrics();

            if (lyrics.length > 4095) {
                msg.delete()
                return message.channel.send("Тексты песен слишком длинные :/");
            }
            if (lyrics.length < 2048) {
                const lyricsEmbed = new MessageEmbed()
                    .setColor(color)
                    .setDescription(lyrics.trim());
                return msg.edit(lyricsEmbed);
            } else {
                // lyrics.length > 2048
                const firstLyricsEmbed = new MessageEmbed()
                    .setColor(color)
                    .setDescription(lyrics.slice(0, 2048));
                const secondLyricsEmbed = new MessageEmbed()
                    .setColor(color)
                    .setDescription(lyrics.slice(2048, lyrics.length));
                msg.edit(firstLyricsEmbed);
                message.channel.send(secondLyricsEmbed);
                return;
            }
        } catch (error) {
            if (error == "No result was found") embed.setDescription("У меня нет текста к этой песне")
            else embed.setDescription("Произошла ошибка, обратитесь к Вячеславу")
            msg.edit(embed)
            console.log(error);
        }
    }
}