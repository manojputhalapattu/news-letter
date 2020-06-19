const express = require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const https=require('https');
const { Http2ServerRequest } = require('http2');
const { request } = require('http');

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/index.html");
    
});
app.use(express.static("public"));

app.post('/',function (req, res) {
   
    const firstName=req.body.first;
    const lastName=req.body.last;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const  jsonData=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/5d422b4468"
    const options={
        method:"POST",
        auth:"manoj:7334356d9b1ecfd7bffa7e0d9444eac7-us10"
    }
    const request = https.request(url,options,function(response) {
        if(response.statusCode==200) {
            res.sendFile(__dirname+"/sucess.html")
        }
        else{
            res.sendfile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
console.log(JSON.parse(data));
        
    })
})
request.write(jsonData);
request.end();
});
app.post("/failure", function(req,res) {
     res.redirect('/');
  
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Server started on port`);
});
//7334356d9b1ecfd7bffa7e0d9444eac7-us10
//5d422b4468
