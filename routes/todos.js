
const express = require("express")
const { fetchProducts } = require("../Controller/todo")

const router = express.Router()

router.get("/", (req, res) => { res.send("list of todos") })
router.post("/", (req, res) => { res.send("todos created") })

module.exports = router