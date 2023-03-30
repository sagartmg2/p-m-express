const express = require("express") // default import   // common js 
const app = express();


/* create a todo api  */
/* reqeust methods

    get - fetch  
    post - insert 
    put/patch  - update
    detelte
*/

app.get("/todos", (req, res) => {
    res.send([{ title: "css", status: false }, {}, {}])
})

app.listen(8000,() =>{
    console.log("server started");
})