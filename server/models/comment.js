const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    song_Url: {
      type: String,
      required: false,
    },
    comment_text: {
      type: String,
      required: false,
    },
    song_name: {
      type: String, // Add a field for song name
      required: false,
    },
    song_url: {
      type: String, // Add a field for song URL
      required: false,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("comment", commentSchema);
