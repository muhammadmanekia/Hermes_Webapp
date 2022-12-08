import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Auth/firebase";

const PostView = (props) => {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(new Array(props.posts.length).fill(false));

  // displays the like button for liked posts
  const handleLikeButton = (position) => {
    var updatedLike = like.map((i, index) => (index === position ? !i : i));
    setLike(updatedLike);
  };

  useEffect(() => {
    getDocuments();
  }, [props.posts.length]);

  const getDocuments = async () => {
    const colRef = collection(db, "posts");
    var postsArr = [];

    await getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        postsArr.push(doc.data());
      });
    });
    setPosts(postsArr);
    console.log(posts);
  };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      {posts.length > 0
        ? posts // Whatever posts we have, map them and take out their name, username, and post. Format and display accordingly
            .map((i, index) =>
              i.post[0] === "" ? null : (
                <Card key={index} sx={{ maxWidth: 600, margin: 5 }}>
                  <CardContent>
                    <div style={{ textAlign: "left" }}>
                      <div>
                        <img
                          src={
                            i.profilePic
                              ? i.profilePic
                              : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                          }
                          style={{
                            width: 60,
                            height: 60,
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
                        to={`/profile/user/${
                          i.firstName + i.lastName //will be used in creating profile page
                          // .split(" ")
                          // .join("")
                          // .toLowerCase()
                        }`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div style={{ paddingTop: 10, marginLeft: 20 }}>
                          <div style={{ display: "flex" }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              style={{ paddingRight: 4 }}
                            >
                              {i.firstName}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {i.lastName}
                            </Typography>
                          </div>
                          <Typography gutterBottom variant="h8" component="div">
                            @{i.username}
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
        : //reverse the list so the latest comes first
          null}
    </div>
  );
};

export default PostView;
