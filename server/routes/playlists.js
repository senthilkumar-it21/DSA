const router = require("express").Router();
const { error } = require("firebase-functions/logger");

const { response } = require("express");
const playlist = require("../models/playlist");
router.post("/create", async (req, res) => {
    const { name } = req.body; // Assuming you send the name in the request body

    try {
        // Create a new playlist with only the name
        const newPlaylist = new playlist({
            name
        });

        // Save the playlist to the database
        await newPlaylist.save();

        // Respond with a success message
        return res.status(201).json({ message: "Playlist created successfully" });
    } catch (error) {
        console.error("Error creating playlist:", error);
        return res.status(500).json({ message: "Failed to create playlist" });
    }
});


router.post("/save", async (req, res) => {
    const newPlaylist = playlist({
        name : req.body.name,
        imageURL : req.body.imageURL,
        songUrl :req.body.songUrl,
        album:req.body.album,
        artist:req.body.artist,
        
    });
    
    try{
        const savedPlaylist = await newPlaylist.save();
        return res.status(200).send({success : true ,  playlist : savedPlaylist });
    }catch (error) {
        return res.status(400).send({success : false ,msg :error });
    }
        
});


router.get("/getOne/:id",async (req,res) => {
    const filter = { _id : req.params.id };

    const data = await playlist.findOne(filter)

    if(data){
        return res.status(200).send({success : true ,  playlist : data});
    }
    else{
        return res.status(400).send({success : false ,msg :"data not found" });
    }
});

router.get("/getAll", async (req ,res) => {
    const options = {
        sort : {
            createdAt : 1,
        },
    };

    const data = await playlist.find(options);
    if(data){
        return res.status(200).send({success : true ,  playlist : data});
    }
    else{
        return res.status(400).send({success : false ,msg :"data not found" });
    }

});

router.delete("/delete/:id",async (req, res) => {
    const filter = { _id: req.params.id};
    const result = await playlist.deleteOne(filter);
    if(result){
        return res.status(200).send({success : true ,  msg : "Data Deleted Successfully", data : result});
    }
    else{
        return res.status(400).send({success : false ,msg :"data not found" });
    }
});

router.put("update/:id", async (req, res) => {
    const filter = {_id :req.params.id};
    const options = {
        upsert : true,
        new :true
    };

    try {
        const result = await playlist.findOneAndUpdate(filter,
            {
            name : req.body.name,
            imageURL : req.body.imageURL,
            songUrl :req.body.songUrl,
            album:req.body.album,
            artist:req.body.artist,
            language:req.body.language,
        },
         options
        );
        return res.status(200).send({success:truw,data :result});
    }catch (error){
        return res.status(400).send({success : false ,msg :error });
    }
})
router.post("/create", async (req, res) => {
    const { name } = req.body; // Assuming you send the name in the request body
  
    try {
      // Create a new playlist with only the name
      const newPlaylist = new playlist({ name });
  
      // Save the playlist to the database
      await newPlaylist.save();
  
      // Respond with a success message
      return res.status(201).json({ message: "Playlist created successfully" });
    } catch (error) {
      console.error("Error creating playlist:", error);
      return res.status(500).json({ message: "Failed to create playlist" });
    }
  });
module.exports = router;