require('dotenv').config();
const express = require('express')
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const app = express();


app.use(express.static("css"));
app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5lsni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{useNewUrlParser: true,useUnifiedTopology: true });
//mongodb
const portfolioSchema = {
    email: String,
    name: String,
    comment: String,


};
const Portfolio = new mongoose.model("Portfolio",portfolioSchema);


app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});

 app.post("/",function(req, res){
const newPortfolio = new Portfolio({

    email: req.body.username,
    name: req.body.nameofperson,
    comment: req.body.message,

 });
 res.send("Sent");
 newPortfolio.save(function(err){
    if(err){
        console.log(err);
    }else{
        
        const comm = req.body.message;
        const na = req.body.nameofperson;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });

      var mailOptions = {
        from: process.env.USER,
        to: req.body.username,
        cc: 'anand.k4756@gmail.com',
        subject: 'Thanks for giving feedback ' + na,
        text: 'Thanks for your message you have sent to us --> ' + comm
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log("sent");
          
        }
      });
      
      
    }
    });
    });

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
   



app.listen(port, function() {
    console.log("server started at 8000");
});
