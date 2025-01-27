const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./utils/config.js');
const fs = require('fs');
const path = require('path');


require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ]
});

client.once('ready', async () => {
    console.log(`✅ Online!`);

    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for(const file of eventFiles){
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    }

    const channel = client.channels.cache.get(config.verificationChannelID);
    if (!channel) return console.error("❌ Verification channel not found!");

    const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("✅ SkyForge Verification")
        .setDescription("React with ✅ to verify yourself and access the server.")
        .setFooter({ text: "SkyForge Bot - Automated Verification" });

    let sentMessage = await channel.send({ embeds: [embed] });
    sentMessage.react("✅"); // React to the message automatically
});

client.login(process.env.TOKEN);
