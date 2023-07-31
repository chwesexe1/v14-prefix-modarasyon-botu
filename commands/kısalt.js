const Discord = require("discord.js");
const shorten = require("isgd");

exports.run = (client, message, args, tools) => {
  let qyaz = new Discord.EmbedBuilder()
    .setDescription(
      "Kısaltmak istediğiniz URL linkini yazınız. \n\n Örnek : https://lourexe.neocities.org"
    )
    .setColor("Red");

  let qnx = args.slice(0).join(" ");
  if (!qnx) return message.reply({ embeds: [qyaz] });

  let hata = new Discord.EmbedBuilder()
    .setDescription("Bu URL geçerli mi?")
    .setColor("Red");

  shorten.shorten(qnx, function (q) {
    if (q.includes("Error")) return message.channel.send({ embeds: [hata] });
    let url = new Discord.EmbedBuilder()
      .setDescription(`İşte linkin burada : **<${q}>**`)
      .setColor("White");

    let buton = new Discord.ButtonBuilder()
      .setStyle(Discord.ButtonStyle.Link)
      .setLabel(`Linke Git!`)
      .setURL(q);
    const row = new Discord.ActionRowBuilder().addComponents(buton);

    message.channel.send({ embeds: [url], components: [row] });
  });
};
exports.conf = {
  aliases: ["link-kısalt", "link", "linkkısalt"],
};

exports.help = {
  name: "kısalt",
};
