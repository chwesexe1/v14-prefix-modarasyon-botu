const Discord = require("discord.js");
const db = require('croxydb');
let csl = "LOG KANAL ID YAZ"

exports.run = async(client, message, args) => {
let data = db.get(`tavsiye_${message.author.id}_${message.guild.id}`)
if(data){
if(Date.now() > data+86400000){
await db.delete(`tavsiye_${message.author.id}_${message.guild.id}`)
} else {
return message.channel.send("Tavsiye komutu 24 saat içinde 1 kez kullanılabilir. Son kullanılan zaman: <t:"+Math.floor(data/1000)+":R>")
}
}

let type = args.slice(0).join(" ");
if (type.length < 1) return message.channel.send("Lütfen önerinizi yazın. Örnek kullanım: `.öneri Bence Özel Gif Menü Kalkmalı`")

const embed2 = new Discord.EmbedBuilder()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
.setColor(Discord.Colors.Blue)
.addFields([
{ name: `Kullanıcı ID`, value: message.author.id, inline:true },
{ name: `Kullanıcı Adı`, value: message.author.username, inline:true },
{ name: `Kullanıcı Tagı`, value: message.author.discriminator, inline:true },
{ name: `Sunucu`, value: message.guild.name, inline:true },
{ name: "Öneri", value: type }
])
.setTimestamp()
await client.channels.cache.get(csl).send({embeds:[embed2]}).catch(e => {})

await db.set(`tavsiye_${message.author.id}_${message.guild.id}`, Date.now())
return message.reply("Öneriniz İçin Teşekkürler :heart_eyes: | Öneriniz Bot Sahibine İletildi!")
};

exports.conf = {
aliases: []
};

exports.help = {
name: "öneri"
};