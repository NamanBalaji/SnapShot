const express = require('express');
const app = express();
const mongoose = require('mongoose');
const{MONGOURI} = require('./config/keys');
const User = require('./models/user');
const Post = require('./models/post');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
app.use(express.json());
//YGcE8r5qiVFhKNHR
mongoose.connect(MONGOURI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server running at port 5000");
});