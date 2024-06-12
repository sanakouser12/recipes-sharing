const express = require("express");
const fs = require("fs");
const users = require("./app.json");

const app = express();
const PORT =8000;
app.use(express.urlencoded({extended:false}));

app.get('/users' ,(req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});
//routes
app.get('/api/users' ,(req,res)=>{
    return res.json(users);
    
});


app.route("/api/users/:id").get((req,res)=>{
    const id =Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req,res)=>{
    //edit user
    res.json({status:"pending"})

})
.delete((req,res)=>{
    //delete user
    res.json({status:"sucessfull"})
})

app.post('/api/users',(req,res)=>{
    //create new user
    const body = req.body;
    users.push({...body, id: users.length+1})
    fs.writeFile("./app.json",JSON.stringify(users),(err,data)=>
    {
       res.json({status:"success",id:users.length}); 
    });
    
});

app.listen(PORT, () => console.log(`server started at port:${PORT}`))