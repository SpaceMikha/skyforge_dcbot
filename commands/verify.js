module.exports = {
    name: 'verify',
    description: 'Manually verify yourself',
    async execute(message) {
        let member = message.member;
        let unverifiedRole = message.guild.roles.cache.get(config.unverifiedRoleID);
        let memberRole = message.guild.roles.cache.get(config.memberRoleID);

        if (!memberRole) return message.reply("❌ Member role not found!");

        if (unverifiedRole) await member.roles.remove(unverifiedRole);
        await member.roles.add(memberRole);

        message.reply("✅ You have been verified!");
    },
};
