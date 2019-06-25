require('dotenv/config');
const cors = require('cors'),
  app = require('express')(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session')


//DB Connection
var uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cca-cluster-6sx8x.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'hard work work',
  resave: true,
  saveUninitialized: false
}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//routes
app.use('/', require('./routes/router'));
app.get('/', (req, res) => {
  res.send('CCA Assessment/Interview');
});


app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`))
