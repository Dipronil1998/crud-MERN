const Post = require("../models/posts");

exports.create = async (req, res, next) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const posts = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
    });
    const createdPost = await posts.save();
    res.status(201).json({
      message: "Post Added Successfylly",
      post: {
        ...createdPost,
        id: createdPost._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Creating a post failed",
    });
  }
};

exports.find = async (req, res, next) => {
  try {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let posts = await Post.find();
    if (pageSize && currentPage) {
      posts = await Post.find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    const count = await Post.count();
    res.json({
      message: "posts fetch successfully",
      posts: posts,
      maxPosts: count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching posts failed",
    });
  }
};

exports.get = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Fetching post failed",
    });
  }
};

exports.update = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId,
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Could not update post",
        });
      });
  }

  exports.delete = async (req, res, next) => {
    try {
      const result = await Post.deleteOne({
        _id: req.params.id,
        creator: req.userData.userId,
      });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Delete Successfylly" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Fetching post failed",
      });
    }
  }


  // router.put("/:id", checkAuth, multer({storage:storage}).single("image"), async (req, res, next) => {
//   try {
//     let imagePath = req.body.imagePath;
//   if(req.file){
//     const url = req.protocol + '://' + req.get("host");
//     imagePath = url +  "/images/" + req.file.filename
//   }
//   const post = new Post({
//     // _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//     imagePath: imagePath,
//   });
//   console.log(post);
//   const result = await Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, {$set:post});
//   console.log(result)
//   res.status(200).json({ message: "Update Successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// });