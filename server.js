var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 7873;
var boydog = require("boydog");
var boy = boydog(server);

var scope = {
  word: "abc",
  title: "qwe",
  random: "iop",
};

boy.attach(scope);

app.use(express.static("public"));

app.get("/restart", function(req, res) {
  boy.restart();
  
  return res.json({ ok: true });
});

app.get("/test", function(req, res) {
  boy.doc.fetch(err => {
    return res.json({ v: boy.doc.version, data: boy.doc.data });
  });
});

app.get("/testChange", function(req, res) {
  boy.doc.fetch(() => {
    var op = [{ p: ["content"], t: "text0", o: [{ p: 0, i: "XYZ" }] }];
    boy.doc.submitOp(op, error => {
      if (error) {
        console.error("err", error);
      } else {
        console.log("success");
      }
    });

    return res.json({ change: "ok" });
  });
});

server.listen(port);
console.log("Listening on http://localhost:" + port);
