const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
  name: "kiss",
  description: 'Renvoie un gif de kiss',
  
  async execute (message, args) {
    let member = message.mentions.users.first();
    
    let { body } = await superagent.get(`https://nekos.life/api/kiss`);
    
    if(!args.length) return message.channel.send(body.url);
    
    let embed = new Discord.MessageEmbed()
      .setColor('e410d3')
      .setTitle(`${message.author.username} fait un bisou à ${member.username}`)
      .setImage(body.url)
      .setFooter('kiss')
      .setTimestamp()
    
    message.channel.send(embed);
  }
}
