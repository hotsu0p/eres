const express = require('express');
const { ChannelType, version } = require('discord.js');
const passport = require('passport');
const dayjs = require('dayjs');
require('dayjs/plugin/duration');

const package = require('../package.json');

const router = express.Router();

const db = require('../database/manager');
const checkAuth = require('../backend/checkAuth');

router.get('/', async (req, res) => {
	res.render('index', {
		tag: (req.user ? req.user.tag : 'Login'),
		bot: req.client,
		user: req.user || null,
	});
});

router.get('/profile/:userID/me', checkAuth, async (req, res) => {
	const userReq = req.client.users.cache.get(req.params.userID);
	if (!userReq) {
		return res.status(404).send('Not allowed');
	}

	const { user } = await db.getUserById(req.user.id);

	const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));
	const level = calculateUserXp(user.xp);

	const minXp = (level * level) / 0.01;
	const maxXp = ((level + 1) * (level + 1)) / 0.01;

	res.render('profile/me', {
		bot: req.client,
		level: level || 0,
		xp: user.xp.toLocaleString() || 0,
		about: user.about || 0,
		balance: user.balance.toLocaleString() || 0,
		reputation: user.reputation.toLocaleString() || 0,
		user: req.user || null,
		minXp: minXp || 0,
		maxXp: maxXp || 0,
	});
});

router.get('/stats', async (req, res) => {
	res.render('stats', {
		tag: (req.user ? req.user.tag : 'Login'),
		bot: req.client,
		user: req.user || null,
		uptime: dayjs(req.client.uptime).format('D [d], H [h], m [m], s [s]'),
		channelType: ChannelType,
		djsVersion: version,
		mongoDBVersion: package.dependencies['mongoose'],
	});
});

router.get('/invite', async function(req, res) {
	res.redirect(`https://discord.com/oauth2/authorize?client_id=${req.client.user.id}&permissions=1098974625783&scope=bot%20applications.commands`);
});

router.get('/login', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/');}
});

router.get('/logout', async function(req, res) {
	req.logout(() => {
		req.session.destroy(() => {
			res.redirect('/');
		});
	});
});

module.exports = router;
