const express = require("express")
require("./config/database")
const fileUpload = require("express-fileupload")

const app = express(); // return { .... }
app.use(express.json()) // global middleware  // we will get value in req.body
require('dotenv').config()

app.use(express.static('uploads'))
app.use(fileUpload()); // we can read data sent from form


app.use((req, res, next) => {

    function changeRequest(field) {


        if (req[field]) {
            let temp = {};
            let temp_arr = Object.entries(req[field])

            temp_arr.forEach(el => {
                if (el[0].endsWith("[]")) {
                    temp[el[0].slice(0, -2)] = Array.isArray(el[1]) ? el[1] : [el[1]]
                } else {
                    temp[el[0]] = el[1]
                }
            })
            req[field] = temp
        }


    }

    changeRequest("body")
    changeRequest("files")

    next()

})


const auth_route = require("./route/auth")
const product_route = require("./route/product")
const order_route = require("./route/order")

app.use("/api", auth_route)
app.use("/api/products", product_route)
app.use("/api/orders", order_route)



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

    res.status(status).send({ msg: msg, errors, error: err.message })

})

app.listen(8000, () => {
    console.log("server started ");
})