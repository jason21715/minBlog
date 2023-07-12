var express = require("express");
var router = express.Router();
const api_controller = require("../controllers/apiController");

router.get("/posts/:count", api_controller.get_recent_posts);

router.get("/blogs", api_controller.get_blogs);

module.exports = router;
