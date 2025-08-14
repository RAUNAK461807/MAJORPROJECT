  const express = require("express");
 const app = express();
 const cookieParser = require('cookie-parser');


app.use(cookieParser("secretCode"));

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("madeIn","India");
    res.send("Send you some cookies");
});

app.get("/getSignedCookies",(re,res)=>{
    res.cookie("mandeIn","India",{signed:true});
    res.send("Signed cookies Send");
});

app.get("verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});


app.get("greet",(req,res)=>{
    let {name= "amonomous"} = req.cookies;
    res.send(`hi ${name}`)
})


app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("hi I am root");
});

 app.listen(3000, () => {
  console.log("server is listening to port 8080");
});