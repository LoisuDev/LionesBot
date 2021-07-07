const Discord = require('discord.js');

module.exports = {
  name: "help",
  aliases: ['aide'],
  description: "Une liste de mes commandes !",
  usage: './help (<commande>)',
  
  execute(message, args) {
    const data = [];
    const { commands } = message.client;
    
    if(!args.length) {
      data.push('Voici une liste de mes commandes :\n');
      data.push(commands.map(command => command.name).join(', '));
      data.push('\nVous pouvez taper ./help <commande> pour plus d\'informations concernant une commande spécifique !')
      
      return message.channel.send(data, { split: true })
    };
    
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
	  return message.reply('Ceci n\'est pas une commande valide !');
    }

    data.push(`**Nom :** ${command.name}`);
    

    if (command.aliases) data.push(`**Aliases :** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Utilisation :** ${command.usage}`);
    if (command.permissions) data.push(`**Permissions requises :** ${command.permissions.join(', ')}`);
    
    message.channel.send(data, { split: true });
    
    
  }
}