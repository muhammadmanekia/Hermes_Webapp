import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

function PostView(props) {
  console.log(props.posts);
  return (
    <div style={{ textAlign: "-webkit-center" }}>
      {props.posts
        .map((i, index) =>
          i.post[0] === "" ? null : (
            <Card key={index} sx={{ maxWidth: 600, margin: 5 }}>
              <CardActionArea>
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
                      to={`/profile/user/${i.user.name
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
                  <div style={{ padding: 10 }}>
                    <ThumbUpIcon style={{ paddingRight: 100 }} />
                    <CommentIcon style={{ paddingRight: 100 }} />
                    <ShareIcon />
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        )
        .reverse()}
    </div>
  );
}

export default PostView;
