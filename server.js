const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs')


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.use('/user', (req, res) => {
    res.render('forbidden')
});

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/home', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.post('/contact/send-message', upload.single("projectDesign"), (req, res) => {

    try {
      const { author, sender, title, message } = req.body;
      const { filename, originalname } = req.file;
  
      if (author && sender && title && message && filename) {
        res.render("contact", { isSent: true, projectDesignFile: originalname });
      }
    } catch (error) {
      res.render("contact", { isError: true });
    }
  
  });

app.use((req, res) => {
    res.status(404).render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});