const { Events } = require('discord.js');
const config = require('../utils/config.js');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        if (user.bot) return; // Ignore bot reactions

        const { message, emoji } = reaction;
        const guild = message.guild;
        const member = guild.members.cache.get(user.id);

        if (!member) return;

        // Verify only in the correct channel & with the correct emoji
        if (message.channel.id === config.verificationChannelID && emoji.name === "✅") {
            let unverifiedRole = guild.roles.cache.get(config.unverifiedRoleID);
            let memberRole = guild.roles.cache.get(config.memberRoleID);

            if (!memberRole) return console.error("❌ Member role not found!");

            // Remove unverified role and give member role
            if (unverifiedRole) await member.roles.remove(unverifiedRole);
            await member.roles.add(memberRole);

            console.log(`✅ ${user.tag} has verified successfully!`);
            user.send("🎉 You have been verified and now have full access to the server!");
        }
    }
};
