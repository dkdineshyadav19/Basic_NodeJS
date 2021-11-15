const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
require('dotenv').config();

var port = process.env.PORT || 8080;
var posts=[{
    id:1,
    title:"WHat is a paragraph",
    content:"A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.",
    time:"1:58:25 pm",
    date:"13/11/2021"
},
{
    id:1,
    title:"Image Ai ",
    content:"A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.",
    time:"5:28:20 pm",
    date:"12/11/2021"
},
{
    id:1,
    title:"New Nividia Graphic card",
    content:"A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.",
    time:"2:25:55 pm",
    date:"11/11/2021"
},
];

// Initialize Express
const app = express();

// Setting up template engine
app.set('view engine', 'ejs');

// bodyParser Initialized
app.use(bodyParser.urlencoded({
    extended: true
}));

//Static Files Served
app.use('/public', express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.render("home.ejs", {
        posts: posts,
        // title: posts
    });
});
app.get('/posts/:activepost',(req,res)=>{
    posts.forEach((post)=>{
        if(_.lowerCase(post.title)==_.lowerCase(req.params.activepost)){
            res.render('post.ejs',{
                title:post.title,
                content:post.content
            });
        }
    });
});

app.get('/compose',(req,res)=>{
    res.render('compose.ejs');
});

app.post('/compose',(req,res)=>{
    const post={
        content:req.body.post,
        title:req.body.title,
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString()
    }
    posts.push(post);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server Up At " + port);
});