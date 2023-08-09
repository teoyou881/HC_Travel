const express = require("express");
const path = require("path");
const app = express();
/**
 * sop --> same origin policy
 * In today's browsers, clients can only send requests to resources of the same origin as the client's URL.
 * The protocol, port, and hostname in the client URL must all match the server the client is requesting.
 * cors(cross-origin resource sharing) is a scheme that uses additional HTTP headers to tell the browser
 * to grant permission to access selected resources from other sources.
 */
const cors = require("cors");
const port = 4000;

// can set options. --> cors(corsOptions)  search for it later if it is nedded.
// can also apply it to specific routes.
app.use(cors());
app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded (Values submitted in form)

app.get("/", (req, res) => {
    res.send("Hi");
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

// Use absolute paths because relative paths can cause errors.
// app.use(express.static("uploads"));
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(4000, () => {
    console.log(`port number is ${port}`);
});
