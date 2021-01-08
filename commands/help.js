const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")

const { color } = require("../config.json");

module.exports = {
    name: "help",
    commands: ['h', 'help'],
    description: "Изучить все команды",
    execute(client, message, args) {

        let embed = new MessageEmbed()
            .setAuthor("Помощь")
            // .setThumbnail(client.user.displayAvatarURL())
            .setColor(color)
            // .setDescription(`Это команда ${client.user.username}`)

        let command = readdirSync("./commands")

        for (let i = 0; i < command.length; i++) {
            console.log(command[i])

            const cmd = client.commands.get(command[i].replace(".js", ""))
            embed.addField(`**${cmd.name}**`, cmd.description, true)
        }

        message.channel.send(embed)
    }
}