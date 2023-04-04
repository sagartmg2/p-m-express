const express = require('express')
const mongoose = require('mongoose');

const app = express()
const Todo = require("./Modal/todo")

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todosDB')
    .then(() => console.log('Connected!'));

app.get("/todos", async (req, res) => {
    // Todo.find({})
    //     .then(res => {
    //         console.log(res);

    //     })

    let todos = await Todo.find({})

    res.send({
        data: todos
    })
})

app.post("/todos", async (req, res, next) => {
    // logics to insert in database
    /* db.todos.insertONe */
    try {
        await Todo.create(req.body)
        res.send("created")
    } catch (err) {
        next(err)
    }
})

app.put("/todos/:id", async (req, res) => {  // :id here is a slug
    console.log(req.params.id);
    /* db.todos.updateONe({_id:adfadf},{$set:}) */

    let todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(todo)


    return;

    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    res.send("update")
})

app.delete("/todos/:id", async (req, res) => {  // :id here is a slug
    console.log(req.params.id);
    let todo = await Todo.findByIdAndDelete(req.params.id)
    res.send(todo)

})

/* eroor handling */
app.use((req, res) => {
    res.status(404).send({ msg: "Resource not found" })
})

app.use((err, req, res, next) => {
    console.log(err.message)
    console.log(err.name)

    let status = 500
    let msg = "Server Error"
    let errors = null
    console.log(err.errors);


    if (err.name == "ValidationError") {
        status = 400;
        msg = "Bad Request"

        let errors_arr = Object.entries(err.errors)
        console.log(errors_arr);
        let temp = []

        errors_arr.forEach(el => {
            let obj = {}
            obj.params = el[0];
            obj.msg = el[1].message
            temp.push(obj)
        })

        errors = temp

    }

    res.status(status).send({ msg: msg, errors })
})


app.listen(8000, () => {
    console.log("server started");
})