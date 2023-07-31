const Discord = require("discord.js");

exports.run = async (client, message, args) => {


  const ping = new Discord.EmbedBuilder()
.setDescription(`Gecikme sürem → ${client.ws.ping} ms`)
.setColor(Discord.Colors.Blue)
 message.channel.send({ embeds: [ping] })
     }

exports.conf = {
  aliases: []
}

exports.help = {
  name: "ping"
}