import { Grid, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import PostSubmit from "../../Components/PostSubmit/PostSubmit";
import PostView from "../../Components/PostView/PostView";
import userProfile from "../../Data/userProfile.json";
import demoPosts from "../../Data/demoPosts.json";

function Home(props) {
  const [postInput, setPostInput] = useState("");
  const [postsArr, setPostsArr] = useState(demoPosts);

  const post = (input) => {
    setPostInput(input);
  };

  useEffect(() => {
    if (postsArr.length === 0) {
      setPostsArr({
        user: {
          name: "Matthew McConaughey",
          username: "Film Major",
          profilePic:
            "https://www.celebritytalent.net/sampletalent/photos/sm/15105300.jpg",
        },
        post: [postInput],
      });
    } else {
      setPostsArr((posts) => [
        ...posts,
        {
          user: {
            name: userProfile.name,
            username: userProfile.username,
            profilePic: userProfile.profilePic,
          },
          post: [postInput],
        },
      ]);
    }
    // eslint-disable-next-line
  }, [postInput]);
  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "rgba(255,255,255,0.2)",
        marginLeft: "auto",
      }}
    >
      <Grid item xs={12}>
        <PostSubmit post={post} myProfile={props.myProfile} />
        <PostView posts={postsArr} />
      </Grid>
    </Grid>
  );
}

export default Home;
