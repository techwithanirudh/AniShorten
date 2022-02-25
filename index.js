const Database = require("@replit/database")
const express = require('express');

const app = express();
const db = new Database()

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile('static/index.html', {root: __dirname})
});

app.get('/shorten', async (req, res) => {
	var exists = !!await db.get(req.query.key)
	if (!exists) {
		var exists = await db.set(req.query.key, req.query.url);
	    // res.redirect(req.query.url)
	    res.send(req.query.url)
		
	} else {
		res.sendStatus(409)
	}
});

app.get('/remove', (req, res) => {
	db.delete(req.query.key).then(() => {
		res.send('Deleted!')	
	})
});

app.get("/wipe", async (req, res) => {
  let keys = await db.list();
  keys.forEach((key) => db.delete(key));
  res.send(keys);
});

app.get('/:key', (req, res) => {
	db.get(req.params.key).then((url) => {
		if (url) return res.redirect(url);
		return res.redirect('/');
	});
});

app.listen(3000, () => {
  console.log('server started');
});
