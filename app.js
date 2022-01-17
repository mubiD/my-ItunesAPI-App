const express = require('express');
const app = express();
const fetch = require('isomorphic-fetch');
const bodyParser = require('body-parser');
// const helmet = require("helmet");

// app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/search', (req, res,) => {
  let paramOne = req.body.paramOne.toLowerCase();
  let paramTwo = req.body.paramTwo.toLowerCase();
  let paramThree = req.body.paramThree.toLowerCase();
  
  fetch(`https://itunes.apple.com/search?term=${paramOne}&media=${paramTwo}&country=${paramThree}&limit=10`)
    .then(res => res.json())
    .then(data => {
      res.json({
        'results': data.results
    });   
  });
   
})

app.get('/searchTest', (req, res,) => {

   fetch(`https://itunes.apple.com/search?term=harry+potter&media=movie&country=za&limit=10`)
    .then(res => res.json())
    .then(data => {
      res.json({
        'results': data.results
    });  

  });
   
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {

    if(err) throw err;
  
    else
        console.log(`listening on port ${PORT}. Go to: http://localhost:${PORT}`);
})

module.exports = app;