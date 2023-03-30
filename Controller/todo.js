module.exports.fetchTodos = (req, res) => {
    // fetch todos from dtabase 
    res.send([{ title: "css", status: false }, {}, {}])
}


module.exports.createTodos = (req, res) => {
    res.send("product created")
}

/* common js  vs es module */
// module.exports = {
//     fetchTodos,
//     createTodos
// }