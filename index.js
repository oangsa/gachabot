//Get discord.js

//Create client instance as bot
require("dotenv").config();

const fs = require("fs");
const { Client ,Intents, MessageEmbed, MessageButton, MessageActionRow, Collection, Interaction, DiscordAPIError, Constants } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes, ApplicationCommandOptionType } = require('discord-api-types/v9');

//const gacha = require('./gacha');
const gacha = require('./gacha');
const { create } = require("domain");
const { SlashCommandNumberOption } = require("@discordjs/builders");
const { ApplicationCommandOptionTypes } = require("discord.js/src/util/Constants");
const { channel } = require("diagnostics_channel");
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] })
const commands = [];

client.commands = new Collection();



//Set listener on 'ready'
client.once('ready', () => {
  console.log('Gacha bot ready!');

  let commands
  
  // const guildid = process.env.GUILD_ID
  const guild = client.guilds.cache.get(process.env.GUILD_ID)
  const rest = new REST({
    version: "9"
  }).setToken(process.env.TOKEN);

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: 'Replies with pong!',
  });

  commands?.create({
    name: 'gacha',
    description: 'Gachapon',
  });

  commands?.create({
    name: 'scriptpsx',
    description: 'Sent Roblox map Pet simulator X hack script!',
  });

  commands?.create({
    name: 'clear',
    description: 'clear message',
    options: [
      {name: 'num',
      description: 'test',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.NUMBER}
    ]
  });

})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName, options } = interaction

  if (commandName === 'ping') {
    interaction.reply({
      content: 'pong',
      ephemeral: true,
    })
  } else if (commandName === 'gacha') {
    const Target = interaction.options.getUser('target');
    const embed4 = new MessageEmbed()
    .setColor("GOLD")
    .setTitle('Gacha')
    .addFields(
      { name: "Result", value:`WOW! ${interaction.user.tag} ${gacha.pull()}!!`}
    )
    .setTimestamp()
    .setFooter("This Gacha bot made by Rimiru");


    const sent4 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`I sent your result. Check your DM's!!`)
      .setTimestamp()
      .setFooter("This Gacha bot made by Rimiru");

    interaction.reply({
      embeds: [sent4],
      ephemeral: true,
    })
    interaction.user.send({
      embeds: [embed4]
    })
  } else if (commandName === 'scriptpsx') {
    const Scriptembed = new MessageEmbed()
    .setColor("GREY")
    .setTitle('SCRIPT')
    .addFields(
      { name: "Result", value: `loadstring(game:HttpGet("https://raw.githubusercontent.com/si1nnx/psxx/main/g"))()`}
    )
    .setTimestamp()
    .setFooter("This Gacha bot made by Rimiru");

    const sent = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${interaction.user.tag} I sent the script. Check your DM's!!`)
      .setTimestamp()
      .setFooter("This Gacha bot made by Rimiru");
    
      interaction.reply({
        embeds: [sent],
        ephemeral: true,
      })
      interaction.user.send({
        embeds: [Scriptembed]
      })
  } else if (commandName === 'clear') {
    const num = options.getNumber('num')

    if(!num){
      const err1 = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Please provide me an Amount to delete message!`)
      .setTimestamp()
      .setFooter("ERR");
      return interaction.reply({
        embeds: [err1],
        ephemeral: true,
      })
    }
    if(isNaN(num)){
      const err2 = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Please provide me Valid amount!`)
      .setTimestamp()
      .setFooter("ERR");
      return interaction.reply({
        embeds: [err2],
        ephemeral: true,
      })
    }
    if(num >= 100){
      const err3 = new MessageEmbed()
      .setColor("RED")
      .setTitle(`I can't delete more than 100 message`)
      .setTimestamp()
      .setFooter("ERR");
      return interaction.reply({
        embeds: [err3],
        ephemeral: true,
      })
    }
    interaction.channel.bulkDelete(num);
    const succ = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`${num} Messages Deleted!!`)
      .setTimestamp()
      .setFooter("SUCCESS");
      return interaction.reply({
        embeds: [succ],
        ephemeral: true,
      })

  }
})































































////////////////////////////////////////////OUTDATE////////////////////////////////////////////////

// Set listener on 'message'
client.on('message', message => {

   if(message.content === '-Gacha'){
     message.channel.send(`"WOW! ${message.author.username} hatched ${gacha.pull()}"`)
   }
})

// work!!!
client.on('message', (message) => {
  if(message.content === "-gacha" && message.guild && !message.member.user.client){
    const embed = new MessageEmbed()
    .setColor("GOLD")
    .setTitle('Gacha')
    .addFields(
      { name: "Result", value:`WOW! ${message.author.username} ${gacha.pull()}!!`}
    )
    .setTimestamp()
    .setFooter("This Gacha bot made by Rimiru");


    const sent2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${message.author.tag} I sent your result. Check your DM's!!`)
      .setTimestamp()
      .setFooter("This Gacha bot made by Rimiru");



    let dm2 = { embeds: [embed] }
    let success2 = { embeds: [sent2] }
    let user = message.author
    user.send(dm2);
    message.channel.send(success2)
    .then(msg => {setTimeout(() => msg.delete(), 10000)});
  }
})

// work!!!
// client.on('message', (message) => {
//   if(message.content === "-scriptpsx" && message.guild && !message.member.user.client){
  //   const Scriptembed = new MessageEmbed()
  //   .setColor("GREY")
  //   .setTitle('SCRIPT')
  //   .addFields(
  //     { name: "Result", value: `loadstring(game:HttpGet("https://raw.githubusercontent.com/si1nnx/psxx/main/g"))()`}
  //   )
  //   .setTimestamp()
  //   .setFooter("This Gacha bot made by Rimiru");

  //   const sent = new MessageEmbed()
  //     .setColor("RANDOM")
  //     .setTitle(`${message.author.tag} I sent the script. Check your DM's!!`)
  //     .setTimestamp()
  //     .setFooter("This Gacha bot made by Rimiru");
    
  //   let dm = { embeds: [Scriptembed] }
  //   let success = { embeds: [sent] }
  //   let user = message.author
  //   user.send(dm);
  //   message.channel.send(success)
  //   .then(msg => {setTimeout(() => msg.delete(), 10000)});
  // }
// })


//TEST BUTTON

// client.on('message', (message) => {
//   if(message.content === '-button' && message.guild && !message.member.user.client){

//     const row = new MessageActionRow()
//     .addComponents(
//       new MessageButton()
//       .setStyle("PRIMARY")
//       .setCustomId('btn1')
//       .setLabel('Click me')
//     )
//   message.channel.send({content: "TEST" ,components: [row], ephemeral: true })
//   }
// })



client.login(process.env.TOKEN);
