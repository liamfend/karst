import http from "http";

const server = http.createServer({ insecureHTTPParser: true }, (req, res) => {
  console.log(req.url);
  res.write("aaa");
  res.end();
});

server.listen(3000);
