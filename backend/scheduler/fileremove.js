var cron = require('node-cron');
const fs = require("fs");
const path = require("path");
const Post = require("../models/posts");

exports.fileRemove = cron.schedule('0 0 * * *', async () => {
    const fullPath = path.join(__dirname, '..', 'images');
    fs.readdir(fullPath, async (err, files) => {
        if (err) console.log(err);
        const images = [];
        const postImages = await Post.find({}, { _id: 0, imagePath: 1 });
        postImages.forEach(postImage => {
            slicePart = postImage.imagePath.split('/')[4]
            images.push(slicePart)
        });
        const unMatchedDatas = files.filter((item) => { 
            return images.indexOf(item) === -1 
          });
          for (const unMatchedData of unMatchedDatas) {
            fs.unlink(path.join(fullPath, unMatchedData), (err) => {
              if (err) throw err;
            });
        }
    })
});