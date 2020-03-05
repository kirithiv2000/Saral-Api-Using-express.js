const express         = require('express')
const fs              = require("fs")
const app             = express()
const morgan          = require("morgan")
app.use(express.json())
app.use(morgan("dev"))

app.get("/comments",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data=[];
    for (var k in filedata){
        for (var r in filedata[k].submission){
            for (var u in filedata[k].submission[r].usersummision){
                data.push({
                    "id":filedata[k].submission[r].usersummision[u].id,
                    "courseid":filedata[k].submission[r].usersummision[u].courseid,
                    "username":filedata[k].submission[r].usersummision[u].username,
                    "usersubmissions":filedata[k].submission[r].usersummision[u].usersubmissions
        })
    };}}
    res.send(data)
})

app.get("/comments/:id",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data    =[];
    var k       =req.params.id-1;
    for (var r in filedata[k].submission){
        for (var u in filedata[k].submission[r].usersummision){
            data.push({
                "id":filedata[k].submission[r].usersummision[u].id,
                "courseid":filedata[k].submission[r].usersummision[u].courseid,
                "username":filedata[k].submission[r].usersummision[u].username,
                "usersubmissions":filedata[k].submission[r].usersummision[u].usersubmissions
                })
        };
    }
    res.send(data) 
})

app.get("/comments/:id/:courseid",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    var filedata    =JSON.parse(filedata);var data=[];
    for (var u in filedata[req.params.id-1].submission[req.params.courseid-1].usersummision){
        data.push({
            "id":filedata[req.params.id-1].submission[req.params.courseid-1].usersummision[u].id,
            "courseid":filedata[req.params.id-1].submission[req.params.courseid-1].usersummision[u].courseid,
            "username":filedata[req.params.id-1].submission[req.params.courseid-1].usersummision[u].username,
            "usersubmissions":filedata[req.params.id-1].submission[req.params.courseid-1].usersummision[u].usersubmissions
        })
    };
    res.send(data)
})

app.get("/excercises",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data=[];
    for (var i in filedata){
        for (var j in filedata[i].submission){
            data.push({
                "id":filedata[i].submission[j].id,
                "courseId":filedata[i].submission[j].courseid,
                "name":filedata[i].submission[j].name,
                "description":filedata[i].submission[j].description
            })
        }
    }
    res.send(data)
    })

app.get("/",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data=[];
    for (var i in filedata){
        data.push({
            "id":filedata[i].id,
            "name":filedata[i].name,
            "description":filedata[i].description
        })
    }
    res.send(data)
})

app.get("/:id",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data=[];
    for (var i in filedata){
        data.push({
            "id":filedata[i].id,
            "name":filedata[i].name,
            "description":filedata[i].description
        })
    };
    for (var j in data){
        if (data[j].id==req.params.id){
            res.send(data[j])
        }
    }
})

app.get("/excercises/:id",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);var data=[];
    for (var i in filedata[req.params.id-1].submission){
        data.push({
            "id":filedata[req.params.id-1].submission[i].id,
            "courseid":filedata[req.params.id-1].submission[i].courseid,
            "name":filedata[req.params.id-1].submission[i].name,
            "description":filedata[req.params.id-1].submission[i].description
        })
    }
    res.send(data)
})

app.get("/excercises/:id/:courseid",(req,res)=>{
    var filedata=fs.readFileSync('availableCourses.json');
    filedata    =JSON.parse(filedata);
    var data=[];
    data.push({
        "id":filedata[req.params.id-1].submission[req.params.courseid-1].id,
        "courseid":filedata[req.params.id-1].submission[req.params.courseid-1].courseid,
        "name":filedata[req.params.id-1].submission[req.params.courseid-1].name,
        "description":filedata[req.params.id-1].submission[req.params.courseid-1].description
    });
    res.send(data);
})

app.post("/comments/:username/:id/:courseid",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file)
    var flag = true;
    for (var i in file[req.params.id-1].submission[req.params.courseid-1].usersummision){
        if (file[req.params.id-1].submission[req.params.courseid-1].usersummision[i].username==req.params.username){
            file[req.params.id-1].submission[req.params.courseid-1].usersummision[i].usersubmissions.push(req.body.usersubmissions[0]);
            flag=false
        }
    }
    if (flag){
        file[req.params.id-1].submission[req.params.courseid-1].usersummision.push(req.body)
    }

    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send(req.body)
})

app.post("/",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file);
    name = req.body.name;
    var description=req.body.description;
    var id   = file.length+1
    file.push({"id":id,"name":name,"description":description,"submission":[]})
    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send({"id":id,"name":name,"description":description})       
})

app.post("/excercises/:id",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file);
    var courseid = file[req.params.id-1].submission.length+1
    name = file[req.params.id-1].name+" Level - "+courseid;
    var description=file[req.params.id-1].description+" step - "+courseid;
    var id   = req.params.id
    file[req.params.id-1].submission.push({"id":id,"courseid":courseid,"name":name,"description":description,"usersummision":[]})
    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send({"id":id,"name":name,"description":description})       
})

app.put("/id/courseid/:id/:courseid",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file);
    var id   = req.params.id-1
    var courseid = req.params.courseid-1
    file[id].submission[courseid].name = req.body.name
    file[id].submission[courseid].description = req.body.description

    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))

    delete file[id].submission[courseid].usersummision;
    res.send(file[id].submission[courseid])  
})

app.put("/id/:id",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file);
    var id   = req.params.id-1;
    file[id].name = req.body.name
    file[id].description = req.body.description
    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    delete file[id].submission;
    res.send(file[id])  
})

app.put("/comments/name/id/courseid/:username/:id/:courseid",(req,res)=>{
    var file=fs.readFileSync('availableCourses.json');
    file = JSON.parse(file);
    var id   = req.params.id-1;
    var courseid = req.params.courseid-1;
    var flag     = true;
    for (var i in file[id].submission[courseid].usersummision){
        if (file[id].submission[courseid].usersummision[i].username==req.params.username){
            console.log(file[id].submission[courseid].usersummision[i]);
            file[id].submission[courseid].usersummision[i]=req.body
            flag = false;
            console.log(file[id].submission[courseid].usersummision[i]);
        }
    }
    fs.writeFileSync('availableCourses.json',JSON.stringify(file,null,4))
    res.send(req.body)  
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
