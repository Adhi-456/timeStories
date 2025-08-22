

const http = require("http");
const https = require("https");

// function to get the stories html and extract titles + links
function getStories(cb) {
    https.get("https://time.com", (res) => {
        let htmlData = "";

        // to collect chunks
        res.on("data", chunk => {
            htmlData += chunk.toString();
        });

        res.on("end", () => {
            // regex to roughly capture anchor links + text
            let regex = /<a href="(\/[^"]+)"[^>]*>(.*?)<\/a>/g;
            let stories = [];
            let match;

            while ((match = regex.exec(htmlData)) !== null) {
                let link = match[1];
                let title = match[2].replace(/<[^>]+>/g, "").trim();

                // filter out junk links, only take ones with some text and starting with /
                if (title && link.startsWith("/") && /\d/.test(link)) {
                    stories.push({
                        title: title,
                        link: "https://time.com" + link
                    });
                }

                if (stories.length >= 6) {
                    break; // max number required is acheived
                }
            }

            cb(stories);
        });

    }).on("error", (err) => {
        console.error("Error fetching page:", err);
        cb([]); //  if it fails just return empty list
    });
}

// creating  a server
const server = http.createServer((req, res) => {
    if (req.url === "/getTimeStories") {
        getStories((stories) => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(stories, null, 2));
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Not Found");
    }
});

// will run on port 8000
server.listen(8000, () => {
    console.log("Server started at http://localhost:8000/getTimeStories");
});
