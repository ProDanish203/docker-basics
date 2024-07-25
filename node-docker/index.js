import http from "http";
import _ from "lodash";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const numbers = [1, 2, 4];
  const max = _.max(numbers);
  res.end("Hello Docker: " + max);
});

server.listen(5000);
