//This is the controller 
const express = require('express');
var router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

//Set up the server 
const PORT = process.env.PORT || 5000;


const app = express();

// app.post(function (req, res, next) {
//   next();
// });


app.use(bodyParser.urlencoded({ extended: true }));

//Set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs') //extension of views 

//set up the root endpoint
app.get('/', (req, res) => {
  res.render('index');

})

app.get('/getRate', (req, res) => {

  var weight = Number(req.query.weight);
  var options = req.query.options;
  var total = calculateRate(weight, options)

  var params = { weight: weight, options: options, total: total }
  console.log(weight, options, total);
  res.render('display', params);

  //res.render('display', param)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function calculateRate(weight, options) {

  switch (options) {
    case ('stamped'):
      if (weight == 1) {
        var sum = (weight * .55);
        total = sum.toFixed(2);
      } else if (weight >= 2) {
        var base = .55;
        for (var i = 1; i = weight; i++) {

          base += (weight * .20) - .20;
          total = base.toFixed(2);
          return total;
        }


      }


      break;

    case ('metered'):
      if (weight == 1) {
        var sum = (weight * .51);
        total = sum.toFixed(2);
      } else if (weight >= 2) {
        var base = .51;
        for (var i = 1; i = weight; i++) {

          base += (weight * .20) - .20;
          total = base.toFixed(2);
          return total;
        }


      }
      break;

    case ('flats'):
      if (weight == 1) {
        var sum = (weight * 1.00);
        total = sum.toFixed(2);
      } else if (weight >= 2) {
        var base = 1.00;
        for (var i = 1; i = weight; i++) {

          base += (weight * .20) - .20;
          total = base.toFixed(2);
          return total;
        }


      }
      break;

    case ('retail'):
      if (weight == 1 || weight == 2 || weight == 3 || weight == 4) {
        var sum = 4.00;
        var total = sum.toFixed(2);
        return total; 
      } else if (weight == 5 || weight == 6 || weight == 7 || weight == 8) {
        var sum = 4.80;
        total = sum.toFixed(2);
        return total;
      } else if (weight == 9 || weight == 10 || weight == 11 || weight == 12) {
        var sum = 5.50;
        total = sum.toFixed(2);
        return total;
      } else if (weight == 13) {
        var sum = 6.25;
        total = sum.toFixed(2);
        return total;
      }
      break;

  }//closes the switch 
}//closes the function 
