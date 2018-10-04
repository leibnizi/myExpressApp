var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // res.render("index", { title: "myExpress" });
  // res.json({ user: "tobi" });
  res.render("index", { title: "MyExpress" }, function(err, html) {
    // res.send(html);
  });
});

module.exports = router;
