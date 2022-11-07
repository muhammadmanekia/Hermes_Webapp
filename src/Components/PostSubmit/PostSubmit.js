import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import userProfile from "../../Data/userProfile.json";

const PostSubmit = (props) => {
  const [postInput, setPostInput] = useState("");

  const handleChange = (event) => {
    setPostInput(event.target.value);
    event.preventDefault();
  };

  const onSubmit = (event) => {
    props.post(postInput);
    setPostInput("");
  };

  return (
    <Box component="main" style={{ textAlign: "-webkit-center" }}>
      <Card sx={{ maxWidth: 600, margin: 5 }}>
        <CardActionArea>
          <CardContent>
            <img
              src={userProfile.profilePic}
              style={{
                width: 60,
                height: 60,
                backgroundColor: "green",
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
