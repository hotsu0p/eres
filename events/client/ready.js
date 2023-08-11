const Event = require('../../structures/EventClass');
const mongoose = require('mongoose');

const { ActivityType } = require('discord.js');

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		const client = this.client;

		mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(() => console.log('[Database]: Connected to 🥬 mongoose database server. '));

		const webPortal = require('../../server');
		webPortal.load(client);

		client.user.setActivity('🌴 ' + client.users.cache.size.toLocaleString() + ' users', { type: ActivityType.Watching });

		console.log(`[Deploy]: 🟢 ${client.user.tag} is online. `);
		console.log(`[Info]: Interacted with ${client.users.cache.size.toLocaleString()} users 👥 and ${client.guilds.cache.size.toLocaleString()} guilds 🈂️.`);
	}
};