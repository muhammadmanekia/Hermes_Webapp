import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../Auth/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const PostSubmit = (props) => {
  const [postInput, setPostInput] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
  );

  const handleChange = (event) => {
    setPostInput(event.target.value);
    event.preventDefault(); // instead of returning false, we have preventDefault. Mainly used when using an add event listener
  };

  useEffect(() => {
    console.log(props.user.profilePic);
    if (props.user.profilePic) {
      getDownloadURL(ref(storage, props.user.profilePic)).then((url) => {
        setProfilePic(url);
      });
    }
  }, [props.user.profilePic]);

  const onSubmit = async () => {
    console.log(auth.currentUser);
    await addDoc(collection(db, "posts"), {
      uid: auth.currentUser.uid,
      firstName: props.user.firstName ? props.user.firstName : "",
      lastName: props.user.lastName ? props.user.lastName : "",
      username: props.user.username ? props.user.username : "",
      profilePic: profilePic ? profilePic : "",
      post: postInput,
    });
    setPostInput("");
  };

  return (
    <Box component="main" style={{ textAlign: "-webkit-center" }}>
      <Card sx={{ maxWidth: 600, margin: 5 }}>
        <CardActionArea>
          <CardContent>
            <img
              src={profilePic}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                marginTop: 10,
                float: "left",
                objectFit: "cover",
              }}
              alt=""
            />
            <div style={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Submit a Post"
                variant="outlined"
                value={postInput}
                onChange={handleChange}
                fullWidth
                style={{ margin: 10 }}
              />
            </div>

            <Button
              style={{ float: "right", marginBottom: 10 }}
              variant="contained"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default PostSubmit;
