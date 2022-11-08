const express = require('express');
const { body } = require('express-validator');
const routes = express.Router()
const { validationResult } = require('express-validator')
const notes = require('../models/addnotes')
const middleware = require('../middle/middleware')


routes.post('/addnotes', middleware, [
    body("title", "Enter your title").isLength({ min: 3 }),
    body("description", "Enter your description").isLength({ min: 5 }),
    body("tag", "Enter yoyr tag").isLength({ min: 3 })
], async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ "error": error.array() })
        }
        const User = await notes.create({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        res.json(User)
    } catch (error) {
        console.log(error)
    }
})

routes.put('/updatenote/:id', middleware, async (req, res) => {
    const { title, description, tag } = req.body;
    console.log("note update start")
    console.log(title)
    console.log(description)
    console.log(tag)
    try {
        console.log("1")
        const newnonte = {};
        if (title) {
            console.log("2")
            newnonte.title = title.toString()
        }
        if (description) {
            console.log("3")
            newnonte.description = description.toString()
        }
        if (tag) {
            console.log("4")
            newnonte.tag = tag.toString()
        }
        console.log("5")
        let unotes = notes.findById(req.params.id);
        // console.log(unotes)
        if (!unotes) {
            console.log("6")
            if (unotes.user.toString() != req.user.id) {
                return res.status(404).send("note not found");
            }
        }
        const unote = await notes.findByIdAndUpdate(req.params.id, { $set: newnonte }, { new: true })
        res.json(unote)

    } catch (error) {
        console.log(error)
    }
})

routes.delete('/deletenote/:id', middleware, async (req, res) => {
    let dnote = await notes.findById(req.params.id);
    if (!dnote) {
        if (dnote.user.toString() != req.user.id) {
            return res.status(404).send("Not Allow");
        }
    }

    dnote = await notes.findByIdAndDelete(req.params.id)
    res.json({ "sucess": "note deleted", dnote })
})


routes.get('/fatchnotes', middleware, async (req, res) => {
    const note = await notes.find({ user: req.user._id })
    res.json(note)
})


module.exports = routes