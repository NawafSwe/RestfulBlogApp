/* -------------------- importing packages --------------------*/
const  express     = require('express'),
       bodyParser = require('body-parser'),
       methodOverride = require('method-override'),
       cors          = require('cors'),
       app           = express(),
       mongoose      = require('mongoose');

/* -------------------- setting up app --------------------*/
app.use(express.static('public'));
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));



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


/* -------------------- app  RESTFUL routes --------------------*/


/* the route '/' is redirecting to the index route '/blogs' */
app.get('/', (req, res) => { 
  res.redirect('/blogs');
});


/* the route is INDEX -- Restful route where it shows all blogs */

app.get('/blogs', (req, res) => { 
    Blog.find({}, (err, blogs) => {
        if (err) console.log('something were wrong');
        else {
            console.log(blogs);
          res.render('index', {blogs:blogs});
        }
     })
});

/* the route is NEW -- Restful route where it shows the form for creating new blog */
app.get('/blogs/new', (req, res) => { 
  res.render('new');
});


/* the route is CREATE -- Restful route where it posts the blog from the form to the database */
    
app.post('/blogs', (req, res) => { 
  Blog.create(req.body.blog, (err, blog) => { 
    if (err)
      res.render('new');
    else {
      // after adding new blog we redirect the user to the blogs page
      console.log(blog);
      res.redirect('/blogs');
    }
  });

});

/* this route is SHOW -- Restful  '/blogs/:id' where it shows more info about a particular blog */
app.get('/blogs/:id', (req, res) => { 
  Blog.findById(req.params.id, (err, target) => { 
    if (err) {
      res.redirect('/blogs');
    }
    else {
      res.render('show', {blog:target});
    }
  });
});

/* this route is EDIT -- where it display a form to edit some info about a particular blog*/

app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, blog) => { 
    if (err) { 
      res.redirect('/blogs');
    } else {
      res.render('edit',{blog:blog});
    }
  });
  
});
 
/* this route is UPDATE -- where it updates a blog from  a   form that comes from  edit to the data base*/
app.put('/blogs/:id', (req, res) => { 
  Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err, blog) => { 
    if (err) {
      res.redirect('/blogs');

    } else { 
      // we want to redirect the user to the same blog after updating it
      res.redirect('/blogs/'+req.params.id);
    }
  });
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

       