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


// server.get('/api/posts/:id', (req, res) => {
// 	Posts.findById(req.params.id)
// 	.then( post => {
// 		if ( post ) {
// 			res.status(200).json(post);
// 		} else {
// 			res.status(404).json(
// 			{ message: "The post with the specified ID does not exist!!!!"
// 			})
// 		}
// 	})
// 	.catch( () => {
// 		res.status(500).json(
// 		{ error: "The post information could not be retrieved."})
// 	})
// })

 server.get('/api/posts/:id', (req, res) => {
        Posts.findById(req.params.id)
            .then(post => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json(
                        { message: "The post with the specified ID does not exist." });
                    }
                })
            .catch(() => {
                res.status(500).json(
                    { error: "The post information could not be retrieved." }
            );
        });
    });

module.exports = server;