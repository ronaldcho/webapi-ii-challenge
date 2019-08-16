const express = require('express');

const Posts = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send(`
		<h2> Posts API </h2>
		<p> Welcome to the Posts API </P>
	`);
});

server.get('/api/posts', (req, res) => {
	Posts.find(req.query)
	.then(Posts => {
		res.status(200).json(Posts);
	})
	.catch(error => {
		res.status(500).json({
			message: 'Error retrieving the Posts',
		})
	})
});

module.exports = server;