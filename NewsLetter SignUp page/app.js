const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/sign-up.html");
});
app.post("/",function(req,res){
    const firstName=req.body.first;
    const LastName=req.body.last;
    const email=req.body.email;
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: 
                    {
                        FNAME: firstName,
                        LNAME: LastName
                    }
                
            }
        ]
    }
    const jsonData=JSON.stringify(data);

    const url="https://usXX.api.mailchimp.com/3.0/lists/xxxxxxxxxxxx";
    const options={
        method:"post",
        auth:"your key"
    }
    const request=https.request(url,options,function(response){
        // if(response.statusCode===200)
        // {
        //     res.sendFile(__dirname+"/success.html");
        // }
        // else
        // {
        //     res.sendFile(__dirname+"/failure.html");
        // }
        
        res.sendFile(__dirname+"/success.html");
        
        // response.on("data",function(data){
        //     console.log(JSON.parse(data));
        // });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});