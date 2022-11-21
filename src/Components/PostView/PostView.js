import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

const PostView = (props) => {
  const [like, setLike] = useState(new Array(props.posts.length).fill(false));
  console.log(props.posts);

  // displays the like button for liked posts
  const handleLikeButton = (position) => {
    var updatedLike = like.map((i, index) => (index === position ? !i : i));
    setLike(updatedLike);
    console.log(like);
  };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      {
        props.posts // Whatever posts we have, map them and take out their name, username, and post. Format and display accordingly
          .map((i, index) =>
            i.post[0] === "" ? null : (
              <Card key={index} sx={{ maxWidth: 600, margin: 5 }}>
                <CardContent>
                  <div style={{ textAlign: "left" }}>
                    <div>
                      <img
                        src={i.user.profilePic}
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: "green",
                          borderRadius: "50%",
                          marginTop: 10,
                          float: "left",
                          margin: 8,
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </div>
                    <Link
                      to={`/profile/user/${i.user.name //will be used in creating profile page
                        .split(" ")
                        .join("")
                        .toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div style={{ paddingTop: 10, marginLeft: 20 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {i.user.name}
                        </Typography>
                        <Typography gutterBottom variant="h8" component="div">
                          {i.user.username}
                        </Typography>
                      </div>
                    </Link>
                  </div>
                  <div style={{ textAlign: "left", paddingTop: 10 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {i.post}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                      marginRight: 80,
                      marginLeft: 80,
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <IconButton onClick={() => handleLikeButton(index)}>
                      <ThumbUpIcon
                        style={{ color: like[index] ? "red" : "black" }}
                      />
                    </IconButton>
                    <IconButton>
                      <CommentIcon />
                    </IconButton>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            )
          )
          .reverse() //reverse the list so the latest comes first
      }
    </div>
  );
};

export default PostView;
