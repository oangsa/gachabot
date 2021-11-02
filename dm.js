//didnt work!!!
const config = require('./config.json')
const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let msg = message.content.split(`${config.prefix}script`).join(" ");
  
    const Scriptembed3 = new MessageEmbed()
      .setColor("GREY")
      .setTitle('SCRIPT')
      .addFields(
        { name: "Result", value: `loadstring(game:HttpGet("https://raw.githubusercontent.com/si1nnx/psxx/main/g"))()`}
      )
      .setTimestamp();
      
      const sent3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${message.author.tag} I sent the script. Check your DM's!!`)
      .setTimestamp();
      let dm3 = { embeds: [Scriptembed3] }
      let success3 = { embeds: [sent3] }
      let user = message.author
      user.send(dm3)
      message.channel.send(success3)
  }

  module.exports.config = {
      name: "script",
      description: "sent message",
      usage: "!script",
      accessableby: "everyone"
  }
