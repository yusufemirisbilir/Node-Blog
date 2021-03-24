const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = express();
const port = 3000;

const dbUrl = 'mongodb+srv://yusufisbilir:1234@nodejs-blog.691wr.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>{
        app.listen(port);
    }).catch((err)=>{
        console.log(err);
    })

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/add',(req,res)=>{
    const blog = new Blog({
        title:'new title',
        short:'short description',
        long:'writing'
    });
    
    blog.save()
        .then(result =>{
            res.send(result);
        })
        .catch(err => {console.log(err)});
});

app.get('/', (req, res) => {
    res.render('index',{title:'Main Page'})
});

app.get('/about', (req, res) => {
    res.render('about',{title:'About'})
});

app.get('/login', (req, res) => {
    res.render('login',{title:'Login'})
});

app.use((req,res)=>res.status(404).render('404',{title:'Error Page'}));