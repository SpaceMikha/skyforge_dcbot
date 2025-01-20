module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server',
    execute(message) {
        message.reply(`📌 Server Name: ${message.guild.name}\n👥 Members: ${message.guild.memberCount}`);
    },
};
