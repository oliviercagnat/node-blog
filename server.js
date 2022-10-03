const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Here we put the name of our db (blog)
mongoose.connect('mongodb://localhost/blog', {
    // No need to mention in mongoose v6
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true 
});
// Set the view engine thourgh ejs
// It converts it to html
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'});
    res.render('articles/index', { articles: articles });
})

app.use('/articles', articleRouter);

app.listen(PORT);

// Test