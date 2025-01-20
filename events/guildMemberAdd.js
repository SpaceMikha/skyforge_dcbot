module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.systemChannel;
        if (channel) {
            channel.send(`👋 Welcome to SkyForge, ${member}! Make sure to read the rules.`);
        }

        // Auto-assign role
        let role = member.guild.roles.cache.find(r => r.name === "Member");
        if (role) {
            await member.roles.add(role);
        }
    },
};
