import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import PostSubmit from "../../Components/PostSubmit/PostSubmit";
import PostView from "../../Components/PostView/PostView";
import userProfile from "../../Data/userProfile.json";
import demoPosts from "../../Data/demoPosts.json";

function Home(props) {
  const [postInput, setPostInput] = useState("");
  const [postsArr, setPostsArr] = useState(demoPosts);

  const post = (input) => {
    setPostInput(input); //post coming from PostSubmit.js should be implemented here
  };

  useEffect(() => {
    // after every time component mounts or changes post input, this loop runs.
    if (postsArr.length === 0) {
      // if no posts, add a random post
      setPostsArr({
        user: {
          name: "Matthew McConaughey",
          username: "@matthewMcconaughey",
          profilePic:
            "https://www.celebritytalent.net/sampletalent/photos/sm/15105300.jpg",
        },
        post: [postInput],
      });
    } else {
      setPostsArr((posts) => [
        //if posts exist, take the previous ones and add the one currently sent
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
    //below is a comment to avoid a warning
    // eslint-disable-next-line
  }, [postInput]);
  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "rgba(255,255,255,0.2)",
        marginLeft: "auto",
        marginTop: "120px",
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
