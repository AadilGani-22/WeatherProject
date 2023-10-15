const { response } = require("express");
const express = require("express");
const { copyFileSync } = require("fs");
const https = require("https")
const bodyParser = require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");
require("dotenv").config();



const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    // console.log(req.body.cityName);
    const query = req.body.cityName;

const apiKey = process.env.api_key;
const unit = "metric";

const url =" https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit

https.get(url,function(response){
    // console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        // console.log(weatherDescription);
        res.write("<h1>The weather is currently "+ weatherDescription+"</h1>");
        res.write("<h1>The temp in "+query+" is " + temp +" Degrees celcius</h1>");
        res.write("<img src="+ imageURL+">");
        res.send()
    })
})
    
})
// const query = "London"

// const apiKey = "";
// const unit = metric;

// const url =" https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit

// https.get(url,function(response){
//     console.log(response.statusCode);

//     response.on("data",function(data){
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon
//         const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
//         console.log(weatherDescription);
//         res.write("<h1>The weather is currently "+ weatherDescription+"</h1>");
//         res.write("<h1>The temp in london is "+temp+" Degrees celcius</h1>");
//         res.write("<img src="+ imageURL+">");
//         res.send()
//     })
// })

app.listen(3000,function(){
    console.log("Server is up and running  on port 3000")
})