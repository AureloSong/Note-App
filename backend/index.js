require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.conectionString);

const User = require("./models/user.model")
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
)

app.get("/", (req, res) => {
    res.json({
        data: "hello"
    });
});

// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full name is required." })
    }

    if (!email) {
        return res
            .status(400)
            .json({
                error: true, message: "Email is required."
            })
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required." })
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            message: "User already exists",
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save();

    const accessToken = jwt.sign({
        user
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "300000m"
    }
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registrarion Successful",
    })
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({
                error: true, message: "Email is required."
            })
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required." })
    }
    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400)
            .json({
                error: true,
                message: "User does not exist",
            })
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30000m"
        });


        return res.json({
            error: false,
            user: userInfo,
            accessToken,
            message: "Login Successful",
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials",
        })
    }
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({
            error: true,
            message: "Title is required."
        })
    }
    if (!content) {
        return res.status(400).json({
            error: true,
            message: "Content is required."
        })
    }
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });

        await note.save();

        return res.json({
            error: false,
            message: "Note added successfully",
            note
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
})

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: "No changes provide"
        });
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal server error",
        });
    }
})

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1, createdOn: -1 });

        return res.json({
            error: false,
            notes
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            });
        }

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
})

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found."
            });
        }

        note.isPinned = !isPinned;

        await note.save();

        return res.json({
            error: false,
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || "Internal server error",
        });
    }
})

app.listen(8000);

module.exports = app;