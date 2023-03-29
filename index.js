const express = require('express')
const createProduct = require("./products") //default import
const { fetchProducts } = require("./products") // named import 


const app = express()

app.use(express.json()) // global middleware -> runs each and every request


/* 
        Status codes
        2 - suc
        3 - redirect
        4   
            400
            401  // unauthautnticated  // user not logged in 
            403
            404
        5

*/

/*
 middleware 

    // function which has access to request and nesponse and also can mutate them  and also has access to next valid middleware
    - global middelware
     - route level middlewre
     - third party widdleware


*/

let logged_in = true

function checkAuthentication(req, res, next) {
    console.log("check authenticateion ");
    if (!logged_in) {
        return res.status(401).send({ msg: "unauthencated" })
    }
    next()
}

function checkAccess(req, res, next) {
    console.log("check access");
    let access = true;
    if (!access) {
        res.status(403).send({ msg: "Forbidden " })
    }
    next()
}




// app.use(checkAuthentication) // global middleware -> run on every requests

// checkAuthentication()




app.get('/', function (req, res) {
    console.log(req.user);
    res.send('Hello World')
})


app.get('/todos', function (req, res) {
    res.send([
        { tite: "one", status: false },
        { tite: "two", status: true },
    ])
})


app.get("/products", fetchProducts)

app.post('/products', checkAuthentication, checkAccess, createProduct)

app.post('/todos', checkAuthentication, function (req, res) {
    // if (!logged_in) {
    //     return res.status(401).send({ msg: "unauthencated" })
    // }

    console.log(req.body); // 
    // insert in dabase 
    res.send("data inserted")

})

app.listen(8000, () => {
    console.log("sever started");
})