const express = require("express");

const postController = require("../controllers/post")
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const exactFile = require("../middleware/file");

router.post(
  "",
  checkAuth,
  exactFile,
  postController.create
);

router.get("", postController.find);

router.get("/:id", postController.get);

router.put(
  "/:id",
  checkAuth,
  exactFile,
  postController.update);

router.delete("/:id", checkAuth, postController.delete);

module.exports = router;
