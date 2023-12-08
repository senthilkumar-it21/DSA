const mongoose =require("mongoose");
const playlistSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required : true,
        },
        imageURL: {
            type: String,
            required: false,
          },
        songUrl: {
            type: String,
            required: false,
          },
        album: {
            type: String,
          },
        artist: {
            type: String,
            required: false,
          },
        language: {
            type: String,
            required: false,
          },
    },
    {timestamps : false}
);
const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = mongoose.model("playlist",playlistSchema);