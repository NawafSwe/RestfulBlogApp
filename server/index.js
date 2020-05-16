/* -------------------- importing packages --------------------*/
const  express     = require('express'),
       bodyParser    = require('body-parser'),
       cors          = require('cors'),
       app           = express(),
       mongoose      = require('mongoose');

/* -------------------- setting up app --------------------*/
app.set(express.static('public'));
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/* -------------------- establish connection to database --------------------*/
const uri = 'mongodb://localhost/blog_app';
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    if (err) console.log('the error is', err);
    else console.log('successfully connected');
  }
);

/* -------------------- creating models --------------------*/


/* -------------------- app routes --------------------*/
    
    
/* -------------------- testing server connection --------------------*/
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
 });

       