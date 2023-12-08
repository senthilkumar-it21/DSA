import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import Header from "./Header";
import axios from "axios";
import { actionType } from "../Context/reducer";
const SongDetails = () => {

  const { id } = useParams();
  const [{ allSongs }] = useStateValue();
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
console.log("id:", id);
const song = allSongs.find((data) => data._id === id);
  const [{ comments }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/comments/getname/${song.name}`)
      .then((response) => {
        dispatch({
          type: "SET_COMMENTS", // Assuming "SET_COMMENTS" is your action type
          comments: response.data.comments
        });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [dispatch]);

  if (!song) {
    return <div>Loading...</div>;
  }
  const handlePostComment = () => {
    // Make an API call to post the new comment
    axios.post("http://localhost:4000/api/comments/save", {
      name: song.name, // Replace with the appropriate user's name
      email: "dhineshmusical@gmail.com", // Replace with the appropriate user's email
      song_Url: song.songUrl,
      comment_text: newComment,
    })
    .then((response) => {
      // Update the comments state with the new comment
      dispatch({
        type: actionType.SET_COMMENTS,
        comments: [...comments, response.data.comment],
      });
      setNewComment(""); // Clear the input field
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
    });
  };
  

  const handleDownload = (songUrl) => {
    const link = document.createElement("a");
    link.href = songUrl;
    link.download = "song.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <>
      
      <div className="min-h-screen">
        <div className="flex flex-row justify-center">
          <div className="w-full max-w-lg p-4">
            {/* Song container */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img src={song.imageURL} alt={song.name} className="w-full h-auto" />
              <p className="text-xl font-semibold my-2">{song.name}</p>
              <p className="text-gray-400">{song.artist}</p>
              <div className="mt-4 flex items-center">
                {/* Download icon */}
                <button
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => handleDownload(song.songUrl)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-lg p-4 ml-4">
          <div className="mt-2">
              <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="border rounded p-2 w-full"
        />
        <button
          className="mt-2 bg-blue-500 text-white rounded p-2"
          onClick={handlePostComment} // Attach the handler to the button
        >
          Post Comment
        </button>
      </div>
            {/* Comments section */}
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <div className="border rounded-lg p-2">
              {comments.map((comment) => (
                <div key={comment._id} className="mb-2">
                  <p>{comment.comment_text}</p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </>

  );
};

export default SongDetails;
