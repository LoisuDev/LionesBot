const Discord = require('discord.js');
const superagent = require('superagent');
const { execute } = require('./help');

module.exports = {
    name: "hug",
    aliases: ["calin", "câlin"],
    usage: "./calin <@user>",

    async execute(message, args) {
        let member = message.mentions.users.first();
        let { body } = await superagent.get('https://nekos.life/api/hug')
        if(!args.length) {
            let embed = new Discord.MessageEmbed()
                .setColor('db2744')
                .setTitle(`${message.author.username} fait un câlin à Liones Bot`)
                .setImage(body.url)
                .setFooter('hug')
                .setTimestamp()
            return message.channel.send(embed);
        };
        let embed2 = new Discord.MessageEmbed()
            .setColor('db2744')
            .setTitle(`${message.author.username} fait un câlin à ${member.username}`)
            .setImage(body.url)
            .setFooter('hug')
            .setTimestamp()
        message.channel.send(embed2);
    }
}