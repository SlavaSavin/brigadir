const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { discordToken, prefix } = require("./config.json")

client.on("ready", () => {
    console.log('Bot is ready')
    client.user.setActivity(`${prefix}help | music`)
})

client.on("warn", info => console.log(info));

client.on("error", console.error)

client.commands = new discord.Collection()
client.prefix = prefix
client.queue = new Map();
client.vote = new Map();

const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
    const command = require(join(__dirname, "commands", file))
    for (const cmd of command.commands)
        client.commands.set(cmd, command)
    // client.commands.set(command.name, command)
}

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        if (message.channel.id === "793795591741505576") {
            message.reply('`Я не хочу здесь работать, иди в мой канал`')
            return
        };

        try {
            client.commands.get(command).execute(client, message, args)
            console.log(`${message.guild.name}: ${message.author.tag} exec ${client.commands.get(command).name} in #${message.channel.name}`)
        } catch (err) {
            console.log(err)
            message.reply("Я получил ошибку.(");
        }
    }
});

client.login(discordToken);