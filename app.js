let express = require("express");
let request = require("request");
let ejs = require("ejs");
let app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/result/:no", function (req, res) {
    let query = req.query.Search;
    let page = req.params.no;
    request("http://www.omdbapi.com/?s=" + query + "&apikey=a56091af&page=" + page.toString(), function (error, response, body) {
        let data = JSON.parse(body);
        if(!error && response.statusCode === 200)
            if(data.Response === "True"){
                res.render("results", {movieData: data, query: query, no: parseInt(page)});
            }
            else{
                res.send("notFound");
            }
    });
})

app.get("/full/:id", function (req, res) {
    let id = req.params.id;
    request("http://www.omdbapi.com/?i=" + id + "&apikey=a56091af&plot=full", function (error, response, body) {
        let data = JSON.parse(body);
        if(!error && response.statusCode === 200)
            res.render("full", {data: data});
    })
});

app.listen(process.env.PORT || "5000", function () {
    console.log("Movie App is Started");
});