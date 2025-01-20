module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (command) {
            command.execute(message, args);
        }
    },
};
