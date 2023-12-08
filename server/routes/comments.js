const router = require("express").Router();
const comment = require("../models/comment"); // Import the comment model

router.get("/getAll", async (req, res) => {
    return res.json("getting comments");
});
// POST route to save a new comment
router.post("/save", async (req, res) => {
    const newcomment = new comment({
        name:req.body.name,
        email: req.body.email,
        song_Url: req.body.song_Url,
        comment_text: req.body.comment_text,
        song_name:req.body.song_name,
        song_url:req.body.song_url,
    });

    try {
        const savedcomment = await newcomment.save();
        return res.status(200).send({ success: true, comment: savedcomment });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});
router.get("/getOne/:getOne", async (req, res) => {
    const filter = { _id: req.params.getOne };
  
    const cursor = await comment.findOne(filter);
  
    if (cursor) {
      res.status(200).send({ success: true, data: cursor });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  });


router.get("/get/:email", async (req, res) => {
    const filter = { email: req.params.email };

    try {
        const comments = await comment.find(filter);
        return res.status(200).send({ success: true, comments: comments });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getBySong/:name/:email", async (req, res) => {
    const { name, email } = req.params;
  
    try {
      const comments = await comment.find({ name: name, email: email });
      return res.status(200).send({ success: true, comments: comments });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });

  router.get("/getname/:name/", async (req, res) => {
    const { name, email } = req.params;
  
    try {
      const comments = await comment.find({ name: name });
      return res.status(200).send({ success: true, comments: comments });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });

// DELETE route to delete a comment by its ID
router.delete("/delete/:email", async (req, res) => {
    const filter = { email: req.params.email };

    try {
        const result = await comment.deleteOne(filter);
        if (result.deletedCount > 0) {
            return res.status(200).send({ success: true, msg: "comment deleted successfully" });
        } else {
            return res.status(404).send({ success: false, msg: "comment not found" });
        }
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

// PUT route to update a comment by its ID
router.put("/update/:email", async (req, res) => {
    const filter = { email: req.params.email };
    const update = { comment_text: req.body.comment_text };

    try {
        const updatedcomment = await comment.findOneAndUpdate(filter, update, { new: true });
        if (updatedcomment) {
            return res.status(200).send({ success: true, comment: updatedcomment });
        } else {
            return res.status(404).send({ success: false, msg: "comment not found" });
        }
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getBySongName/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const comments = await comment.find({ song_name: name });
      return res.status(200).send({ success: true, comments: comments });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });
  

module.exports = router;
