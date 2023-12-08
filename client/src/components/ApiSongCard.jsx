import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ApiSongCard = ({ data, index,user }) => {
  const { name, imageURL, artist, _id } = data;
  const [replyVisible, setReplyVisible] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // Function to toggle the reply section visibility
  const toggleReply = (commentId) => {
    setReplyVisible((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const userName = user.user.user.name;
  const userEmail = user.user.user.email;
  console.log("User Name:", userName);
  console.log("User Name:", userEmail);
  
 const handleCommentSubmit = () => {
  if (newComment.trim() !== '') {
    // Add the new comment to the comments list
    setComments([...comments, { name: userName, comment_text: newComment }]); // Use user.name to get the user's name
    // Clear the input field
    setNewComment('');

    console.log(user.name);
    console.log(user.email);
    axios
      .post('http://localhost:4000/api/comments/save', {
        name: userName, // Use user.name to send the user's name
        email: user.email, // Use user.email to send the user's email
        song_name: name,
        comment_text: newComment,
      })
      .then((response) => {
        // You can handle the response if needed
      })
      .catch((error) => {
        console.error('Error posting comment:', error);
      });
  }
};

  useEffect(() => {
    // Fetch comments when the component mounts
    axios
      .get(`http://localhost:4000/api/comments/getBySongName/${name}`)
      .then((response) => {
        // Update the comments state with the fetched comments
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [name]);

  console.log(comments);
  return (
    <div className="flex justify-between">
      {/* Left side: Song Card */}
      <motion.div
        key={_id}
        initial={{ opacity: 0, translateX: -2 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="w-1/2 h-auto p-4 cursor-pointer hover:shadow-xl hover:bg-gray-100 shadow-md rounded-lg flex flex-col items-center mt-4"
      >
        <div className="w-90 rounded-lg overflow-hidden">
          <motion.img
            src={imageURL}
            alt=""
            className="w-full rounded-lg object-cover aspect-w-1 aspect-h-1"
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <p className="text-lg font-semibold my-2 truncate">
              {name.length > 25 ? `${name.slice(0, 25)}...` : name}
            </p>
            <p className="text-sm text-gray-400">{artist}</p>
          </div>
        </div>
      </motion.div>

      {/* Right side: Comment Section */}
      <div className="w-1/2 ml-4">
        <div className="mt-4">
          {/* Comment section */}
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
            onClick={handleCommentSubmit}
          >
            Comment
          </button>
        </div>
        <div className="mt-4">
          {/* Comments display section */}
          <h2 className="text-lg font-semibold">Comments</h2>
          <div className="mt-2">
            {comments.map((comment, commentIndex) => (
              <div key={commentIndex} className="bg-gray-100 p-2 rounded">
                <p className="text-sm font-semibold">{comment.name}</p>
                <p>{comment.comment_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSongCard;
