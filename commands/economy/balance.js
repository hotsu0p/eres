const Command = require('../../structures/CommandClass');
const db = require('../../database/manager');

const { SlashCommandBuilder } = require('discord.js');

module.exports = class Balance extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('balance')
				.setDescription('Customize your profile, by setting a new about me text')
				.addUserOption(option => option.setName('target').setDescription('The user')
					.setRequired(false))
				.setDMPermission(false),
			usage: 'balance [user]',
			category: 'Economy',
			permissions: ['Use Application Commands', 'Send Messages'],
		});
	}
	async run(client, interaction) {
		const member = interaction.options.getUser('target') || interaction.user;
		const { user } = await db.getUserById(member.id);

		interaction.reply(`${client.emoji.balance} ${member.username} has **${user.balance.toLocaleString()}** coins in total.`);
	}
};