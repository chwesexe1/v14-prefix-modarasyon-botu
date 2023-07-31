const ms = require("ms");
const prefix = ("../config.json")
var mutelirolu = "" //MUTELENDİGİ ZAMAN VERİLECEK ROL ID  BURAYA YAZINIZ
const yetkilirol = "" //MUTE ATACAK YETKİLİ ROL İD BURAYA YAZIN

exports.run = async (client, message, args) => {
if(!message.member.roles.cache.has(yetkilirol)) return message.reply("Yetersiz Yetki!")

let mutekisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!mutekisi) return message.reply(`:x: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
if(mutekisi.roles.cache.has(yetkilirol)) return message.reply(`:x: Yetkili bir kişiyi muteleyemem!\nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)

let muterol = message.guild.roles.cache.get(mutelirolu);
if(!muterol) return message.reply("Cezalı Rolü Bulunamadı!")

let mutezaman = args[1]

if(!mutezaman) return message.reply(`:x: Lütfen bir zaman giriniz!\nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)

mutezaman = mutezaman.replace(`sn`, `s`).replace(`dk`, `m`).replace(`sa`, `h`).replace(`g`, `d`)

mutekisi.roles.add(muterol.id).catch(err => { 
if(err) return message.reply(`:x: Bu kullanıcıya muteli rolü verilemedi.`)
})

await message.reply(`<@${mutekisi.id}> kullanıcısı ${args[1]} süresi boyunca mutelendi!`);

setTimeout(async() => {
await mutekisi.roles.remove(muterol.id);
await message.channel.send(`<@${mutekisi.id}> Kullanıcı Muteleme Süresi Sona Erdi!`);
}, ms(mutezaman));

}

exports.conf = {
aliases: []
}

exports.help = {
name: "mute"
};