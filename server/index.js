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
const blogSchema = mongoose.Schema({
    title: String,
    image_url: String,
    body: String,
    created: {type:Date, default:Date.now}
});
const Blog = mongoose.model('blog', blogSchema);

/*
Blog.create(
  generate_blog(
    'ios dev',
    'https://relevant.software/wp-content/uploads/2020/01/photo-1484417894907-623942c8ee29-1-scaled.jpeg','good bro'
  )
);*/

/* -------------------- app  RESTFUL routes --------------------*/


app.get('/blogs', (req, res) => { 
    Blog.find({}, (err, blogs) => {
        if (err) console.log('something were wrong');
        else {
            console.log(blogs);
            res.render('index', {blogs: blogs});
        }
     })
});
    
    
/* -------------------- testing server connection --------------------*/
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
 


/* -------------------- helper functions --------------------*/

 function generate_blog(title, image_url, body){ 
    return {
        title: title,
        image_url: image_url,
        body: body,}
}

       