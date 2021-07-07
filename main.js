const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();

const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;

bot.login(token);

bot.on('ready', async () => {
    bot.user.setActivity("./help", {
        type: "STREAMING",
        url: "https://twitch.tv/ttackonneko"
    })
    .then(console.log(`${bot.user.username} est en ligne.`))
    .catch(console.error());
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on('message', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
	
	try {
	command.execute(message, args);
	} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
	}
})