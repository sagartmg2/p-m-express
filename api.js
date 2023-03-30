const express = require("express") // default import   // common js 
const app = express();

const todos_route = require("./routes/todos")

/* create a todo api  */
/* reqeust methods

    get - fetch  
    post - insert 
    put/patch  - update
    detelte
*/

/* 
middleware  // function -> which has access to req and response and nextMiddleware
    - global middleware 
    - route level middlewawer
*/


const checkAuthentication = (req, res, next) => {
    let logged_in = false;

    if (!logged_in) {
        return res.status(401).send({ msg: "unauthenticated " })
    } else {
        next()
    }


}

// app.use(checkAuthentication) // globla-middle -> runs for each and every route
// cors()

/*
 MVC
    - M  - modal  // Databasee
    V- view // react  
    c - controller // logics 
 */

app.use("/todos",todos_route)

app.post("/products", checkAuthentication, (req, res) => {
    res.send("data created")
})

app.listen(8000, () => {
    console.log("server started");
})