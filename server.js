const express = require('express');
const moment = require('moment');
const path = require('path')
const Parser = require('rss-parser');

const app = express();
moment.locale('sv-SE');
const parser = new Parser();
const RSS_URL = "http://www.di.se/rss"
let rss;

(async () => {
  rss = await parser.parseURL(RSS_URL);
  const slicedRss = rss.items.slice(0, 10); //Can you limit the RSS item response in the call ?items=10
  slicedRss.map(item => {
    item.date = moment(item.date).format('LLL'); 
  })
  rss.items = slicedRss;
})();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', (req, res)=> {
    res.render('index', {rss: rss})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})