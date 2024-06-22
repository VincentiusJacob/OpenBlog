import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { render } from "ejs";


const __dirname = dirname(fileURLToPath(import.meta.url));

let blogs = JSON.parse(fs.readFileSync(__dirname + "/public/blogs.json", "utf8"))

const upload = multer({dest: __dirname + "/public/uploads/"})
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    res.render("home.ejs", { blog : blogs });
})

app.post("/addblog", upload.single("image"), (req, res) => {
    const  { author, title, description, category } = req.body;
    const image = (req.file) ? "/uploads/" + req.file.filename : "";

    const date = new Date().getDate().toString().padStart(2, "0");
    const month = new Date().getMonth().toString().padStart(2, "0");
    const year = new Date().getFullYear();
    const newBlog = {
        "title": title,
        "description": description,
        "post_date": `${date}-${month}-${year}`,
        "image": image,
        "viewers": 0,
        "type": category,
        "author": author,
    }

    blogs.push(newBlog);
    fs.writeFileSync(__dirname + "/public/blogs.json", JSON.stringify(blogs, null, 2));
    res.redirect("/");
})


app.get("/CreateNewBlog", (req, res) => {
    res.render("write.ejs");
})

blogs.forEach((blog) => {
    const safeTitle = encodeURIComponent(blog.title.toLowerCase().replace(' ', '-'));
    app.get(`/blog/${safeTitle}`, (req, res) => {
        blog.viewers++;
        fs.writeFileSync(__dirname + "/public/blogs.json", JSON.stringify(blogs, null, 2));
        res.render('blogsDetail.ejs', { blog });
    });
});


app.get("/viewMore", (req, res) => {
    res.render("blogs.ejs", {blog:blogs})
})

app.get("/blogs", (req, res) => {
    res.json(blogs)
})

app.get("/write.ejs", (req, res) => {
    res.render("write.ejs");
})

app.listen(port, () => {
    console.log(`You are listening at port ${port}`);
})