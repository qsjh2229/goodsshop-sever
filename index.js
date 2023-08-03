var http = require("http");
var hostname = "127.0.0.1";
var port = "8080";

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          id: 0,
          name: "네시노 테이블 램프",
          price: "13,5000",
          seller: "유니스",
          imageUrl: "img/light/light-1.jpg",
          des: "네시노 지역에서 영감을 따 만든 네시노 테이블 램프",
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성링");
    }
  }
  res.end("Good Bye");
});

server.listen(port, hostname);
console.log("server on");
