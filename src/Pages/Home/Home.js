import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import PostSubmit from "../../Components/PostSubmit/PostSubmit";
import PostView from "../../Components/PostView/PostView";
import userProfile from "../../Data/userProfile.json";
import demoPosts from "../../Data/demoPosts.json";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, storage } from "../../Components/Auth/firebase";
import { getDownloadURL, ref } from "firebase/storage";

function Home(props) {
  const [user, setUser] = useState({});
  const [postsArr, setPostsArr] = useState(demoPosts);

  useEffect(() => {
    const colRef = collection(db, "user");

    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().uid === auth.currentUser.uid) {
          setUser(doc.data());
        }
      });
    });
  }, []);

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
        <PostSubmit myProfile={props.myProfile} user={user} />
        <PostView posts={postsArr} user={user} />
      </Grid>
    </Grid>
  );
}

export default Home;
