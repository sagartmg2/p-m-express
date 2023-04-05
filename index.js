const express = require("express")
require("./config/database")
const fs = require("fs")
let data = fs.readFileSync("./package.json")
console.log(data)

const app = express(); // return { .... }
app.use(express.json()) // global middleware  // we will get value in req.body

const auth_route = require("./route/auth")

app.use("/api", auth_route)



app.use((req, res) => {
    res.status(404).send({
        msg: "Resrource not found"
    })
})

app.use((err, req, res, next) => {
    let status = 500;
    let msg = "SERVER error"
    let errors = null

    if (err.name == "ValidationError") {
        status = 400;
        msg = "Bad Request"

        let errors_arr = Object.entries(err.errors)
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
    console.log("server started ");
})