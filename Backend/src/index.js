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
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 4000;
dotenv.config();

// can set options. --> cors(corsOptions)  search for it later if it is nedded.
// can also apply it to specific routes.
// app.use(cors());
if (process.env.NODE_ENV === 'production') {
    app.use(
      cors({
         origin:true
      }),
    );
}else{
    app.use(
      cors({
          origin: true,
      }),
    );
}

app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded (Values submitted in form)
// Use absolute paths because relative paths can cause errors.
// app.use(express.static("uploads"));
app.use(express.static(path.join(__dirname, "../uploads")));
// error handling

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

// app.get("*", (req, res, next) => {
//     //throw new Error("enkfsnfl");

//     //When an error occurs in asynchronous communication, it should be passed to next().
//     setImmediate(() => {
//         next(new Error("asynchronous communication"));
//     });
// });

app.get('/', (req, res) => {
    console.log('Hello World!'  );
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "error occured at server side");
});
app.listen(4000, () => {
    console.log("server is running");
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("success to connect");
            console.log(`port number is ${port}`);
        })
        .catch((e) => {
            console.log(e);
            console.log("fail to connect");
        });
});
