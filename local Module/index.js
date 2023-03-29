

/* Globl object in node js */

console.log(__filename)
console.log(__dirname)
// process


// setInterval(() => {
//     console.log("inside set interval");
// }, 1000)

// modules


/* 
    Node Modules
        - core module   
            - fs
            - http
            - path 
        - third party module // axios
        - local module 
*/

const fs = require("fs")
// fs.writeFile("custom.txt", "hello world", (error, data) => {
//     console.log("file created");
// }) // asynchronuos nature

fs.writeFileSync("sync.txt", "synchronous")

console.log("hello world ");

// 12345678 // @$#%@#$SDFSDFADSF
// const bcrypt = require("bcrypt")

// bcrypt.hash("12345678", 10, function (err, hash) {
//     // Store hash in your password DB.
//     console.log(err);
//     console.log(hash);
// });


// function hashPassword() {

// }


// const http = require("http")

// http.createServer((req, res) => {

//     if (req.url == "/todos" && req.method == "GET") {

//         res.write( JSON.stringify([{ title: "one", status: false }])  )
//         res.end()

//     }else if (req.url == "/todos" && req.method == "POST") {
//         res.write( JSON.stringify([{ title: "one", status: false }])  )
//         res.end()

//     }  else {
//         res.write("response from server")
//         res.end()
//     }


// }).listen(8000, () => {
//     console.log("server listening to port", 8000);
// })




/* 
    singup
    login
    product
        add
        delete

*/


