/** WARNING
 *
 * The NSFW Image API is private, so it will be available only to our public client.
 * You can modify the command to use it with your own API.
* */

const Command = require('../../structures/CommandClass');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = class Ass extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ass')
				.setDescription('Sends a random 🍑 image')
				.setDMPermission(false)
				.setNSFW(true),
			usage: 'ass',
			category: 'Images',
			permissions: ['Use Application Commands', 'Send Messages'],
		});
	}
	/**
 * Runs the function.
 *
 * @param {Client} client - The client object.
 * @param {Interaction} interaction - The interaction object.
 * @return {Promise<void>} - A promise that resolves when the function is finished.
 */
	async run(client, interaction) {
		// Fetch a random 🍑 image from the API
		const result = await fetch(`https://api.eres.fun/ass/?key=${process.env.ANALYTICS_ID}`).then((res) => res.json());

		// Create an embed with the 🍑 image
		const embed = new EmbedBuilder()
			.setColor(0x2B2D31)
			.setTitle('ass 🍑')
			.setURL(result.url)
			.setImage(result.url)
			.setFooter({
				text: 'api.eres.fun',
			});

		// Send the embed as a reply to the interaction
		await interaction.reply({ embeds: [embed] });
	}
};