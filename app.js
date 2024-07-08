//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to Daily Journal, your go-to platform for insightful articles, personal stories, and expert opinions on a wide range of topics. Whether you're seeking inspiration, looking for practical advice, or simply wanting to stay informed, our diverse content has something for everyone. Join our community, share your thoughts, and embark on a journey of discovery and growth with us every day.";
const aboutContent = "At Daily Journal, I believe in the power of words to inform, inspire, and connect. My mission is to provide our readers with a diverse array of articles that cover everything from daily tips to in-depth explorations of complex topics. Our team of passionate writers and contributors are dedicated to delivering high-quality, engaging content that adds value to your everyday life. Whether you're here to learn something new, find a moment of inspiration, or simply enjoy a good read, Daily Journal is here to be your trusted companion.";
const contactContent = "We'd love to hear from you! Whether you have questions, feedback, or just want to share your thoughts, feel free to reach out to us. You can contact us via email at [harshks.mit@gmail.com].  Our team is always ready to assist you and ensure your experience with Daily Journal is as enriching and enjoyable as possible. Let's stay connected and make every day a little more inspiring together.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/" , function(req,res){

  res.render("home" ,
  {
    kindOfHomeContent: homeStartingContent ,
    posts:posts
  });
});

app.get("/about" , function(req,res){
  res.render("about" , {kindOfAboutContent: aboutContent});
});

app.get("/contact" , function(req,res){
  res.render("contact" , {kindOfContactContent: contactContent});
});

app.get("/compose" , function(req,res){
  res.render("compose");
  console.log(posts);
});
// code to route to any page by tapping in the parameter topic


app.post("/compose" , function(req,res){
  const post = {
    title: req.body.titleName,
    content: req.body.newContent
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:topic", function(req, res) {
      // console.log(req.params.topic);
      const requestedTitle =_.lowerCase(req.params.topic);

      posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);
        if(storedTitle === requestedTitle){
          res.render("post" , {
            title:storedTitle ,
            content:post.content
          });
        }
      });
});

// app.post("/" , function(req,res){
//   let key =
//   res.redirect("compose")
// })





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
