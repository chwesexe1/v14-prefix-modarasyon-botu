const Discord = require("discord.js")
exports.run = (client, message,args) => {

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`"Mesajları Yönet" yetkin yok`);

  let miktar = args[0]
  if(!miktar) return message.reply("Bir miktar gir")
  message.channel.bulkDelete(miktar)
  return message.reply(`${miktar} tane mesaj sildim`).then(message => {
    setTimeout(() => message.delete(), 3000);
  });

 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sil'],
  permLevel: 0,
};

exports.help = {
  name: 'sil',
  description: 'sil',
  usage: 'sil'
};