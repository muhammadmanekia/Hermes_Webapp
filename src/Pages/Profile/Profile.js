import React, { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import user from "../../Data/userProfile.json";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../Components/Auth/firebase";

const UserProfile = (props) => {
  var inituser = user;
  var currentProfile = "";
  var url = useLocation();
  const [tempUser, setTempUser] = useState({});
  const [thisUser, setThisUser] = useState(inituser);
  const [profilePicSrc, setProfilePic] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
  );
  const [bio, setBio] = useState(tempUser.bio);
  const [coverPicSrc, setCoverPic] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
  const [documentId, setDocId] = useState("");
  const [bioModal, setBioModal] = useState(false);
  const [editPost, setEditPost] = useState({ docId: "", data: { post: "" } });
  const [post, setPost] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [pronounModal, setPronounModal] = useState(false);
  const [pronouns, setPronouns] = useState(inituser.pronouns);

  const profilePicInput = React.useRef(null); //profile picture button reference to input field
  const coverPicInput = React.useRef(null);

  const colRef = collection(db, "user");
  const postRef = collection(db, "posts");

  useEffect(() => {
    var postsArr = [];

    async function fetchData() {
      await getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === auth.currentUser.uid) {
            setDocId(doc.id);
            setTempUser(doc.data());
          }
        });
      });

      await getDocs(postRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === auth.currentUser.uid) {
            postsArr.push({ docId: doc.id, data: doc.data() });
          }
        });
        setPost(postsArr);
        console.log(post);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (tempUser.profilePic) {
      getProfilePic();
    }
    if (tempUser.coverPic) {
      getCoverPic();
    }
  }, [tempUser]);

  const getProfilePic = async () => {
    await getDownloadURL(ref(storage, tempUser.profilePic)).then((url) => {
      console.log(url);
      setProfilePic(url);
    });
  };

  const getCoverPic = async () => {
    await getDownloadURL(ref(storage, tempUser.coverPic)).then((url) => {
      console.log(url);
      setCoverPic(url);
    });
  };
  const profilePicRef = (event) => {
    // profile picture button updates the input field
    profilePicInput.current.click();
  };

  const coverPicRef = (event) => {
    coverPicInput.current.click();
  };

  const handleEditPosts = (e) => {
    console.log(editPost);
    setEditPost((prevState) => ({
      ...prevState,
      data: { post: e.target.value },
    }));
  };

  const handleSendPost = async (docId) => {
    console.log("EDITPOST: ", editPost);
    console.log("EDITPOST: ", docId);
    const postRef = doc(db, "posts", docId);
    await updateDoc(postRef, {
      post: editPost.data.post,
      profilePic: profilePicSrc,
    });
  };

  const handlePronouns = async () => {
    const userRef = doc(db, "user", documentId);
    await updateDoc(userRef, {
      pronouns: pronouns,
    });
    setPronounModal(false);
  };

  const handleProfilePic = async (e) => {
    // get files from desktop and save as src link
    var picture = e.target.files[0];
    var src = URL.createObjectURL(picture);
    var urlStr = documentId + "222" + picture.name;
    const storageRef = ref(storage, `images/${urlStr}`);
    const userRef = doc(db, "user", documentId);

    uploadBytes(storageRef, picture).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      updateDoc(userRef, {
        profilePic: storageRef.fullPath,
      });
    });

    setProfilePic(src);
  };

  const handleCoverPic = async (e) => {
    var picture = e.target.files[0];
    var src = URL.createObjectURL(picture);
    var urlStr = documentId + "222" + picture.name;
    const storageRef = ref(storage, `images/${urlStr}`);
    const userRef = doc(db, "user", documentId);

    await uploadBytes(storageRef, picture).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      updateDoc(userRef, {
        coverPic: storageRef.fullPath,
      });
    });

    setCoverPic(src);
  };

  const handleDeletePost = async (data, index) => {
    // delete post from an array of posts

    const postRef = doc(db, "posts", data.docId);

    await deleteDoc(postRef);
  };

  const handleEditPost = (post) => {
    setEditPost(post);
  };

  const handleSubmitBio = async () => {
    const userRef = doc(db, "user", documentId);
    await updateDoc(userRef, {
      bio: bio,
    });
    setBioModal(false);
  };

  console.log(url);
  return (
    <div style={{ textAlign: "-webkit-center", marginLeft: 240 }}>
      {thisUser.coverPhoto && (
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            src={coverPicSrc}
            alt="cover"
            style={{ height: "460px", width: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", bottom: "2%", right: "46%" }}>
            <img
              src={profilePicSrc}
              alt="profile"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "7px solid white",
                objectFit: "cover",
                backgroundColor: "white",
                position: "relative",
                left: "30%",
              }}
            />
            <IconButton
              style={{ position: "relative", backgroundColor: "white" }}
              onClick={profilePicRef}
            >
              <EditIcon />
            </IconButton>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={handleProfilePic}
              ref={profilePicInput}
            />
          </div>
          {thisUser.name !== currentProfile && (
            <div>
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  left: "87%",
                  backgroundColor: "#BF5700",
                  width: 150,
                  height: 50,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                Connect
              </Button>
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  left: "85%",
                  bottom: "3%",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  width: 200,
                  height: 50,
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "black",
                }}
                onClick={coverPicRef}
              >
                Edit Cover Photo
              </Button>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={handleCoverPic}
                ref={coverPicInput}
              />
            </div>
          )}
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize={25}
            sx={{ fontWeight: "bold", marginRight: "5px" }}
          >
            {tempUser.firstName} {tempUser.lastName}
          </Typography>

          <div style={{ display: "flex", marginTop: "5px" }}>
            <Typography fontSize={14} sx={{ fontWeight: "500", paddingTop: 1 }}>
              {tempUser.pronouns ? tempUser.pronouns : "Add Pronouns"}
            </Typography>
            <IconButton onClick={() => setPronounModal(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        </div>

        <Typography fontSize={18} sx={{ fontWeight: "500", paddingTop: 0.5 }}>
          @{tempUser.username}
        </Typography>
        {/* display user social media links*/}
        <div style={{ display: "inline-flex", textAlign: "center" }}>
          <Typography fontSize={18} sx={{ fontWeight: "500", padding: 2 }}>
            <a href={thisUser.fbLink}>
              <FacebookIcon fontSize="large" style={{ color: "black" }} />
            </a>
          </Typography>
          <Typography fontSize={18} sx={{ fontWeight: "500", padding: 2 }}>
            <a href={thisUser.igLink}>
              <InstagramIcon fontSize="large" style={{ color: "black" }} />
            </a>
          </Typography>
          <Typography fontSize={18} sx={{ fontWeight: "500", padding: 2 }}>
            <a href={thisUser.twtrLink}>
              <TwitterIcon fontSize="large" style={{ color: "black" }} />
            </a>
          </Typography>
          <Typography fontSize={18} sx={{ fontWeight: "500", padding: 2 }}>
            <a href={thisUser.lkdinLink}>
              <LinkedInIcon fontSize="large" style={{ color: "black" }} />
            </a>
          </Typography>
        </div>
        <div style={{ margin: 20 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* display  user bio*/}

            <Grid item xs={8} sm={5} md={5}>
              <Box>
                <Card sx={{ margin: 1 }}>
                  <CardActionArea>
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            margin: 10,
                          }}
                        >
                          Bio
                        </Typography>
                        <IconButton onClick={() => setBioModal(true)}>
                          <EditIcon />
                        </IconButton>
                      </div>

                      <Typography
                        fontSize={14}
                        component="div"
                        sx={{ textAlign: "left", paddingLeft: "2vh" }}
                      >
                        {tempUser.bio && tempUser.bio}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ margin: 1 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          margin: 10,
                        }}
                      >
                        College Experience
                      </Typography>

                      <Typography
                        fontSize={14}
                        component="div"
                        sx={{ textAlign: "left", paddingLeft: "2vh" }}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {tempUser.experience && tempUser.experience}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <div style={{ display: "flex" }}>
                  <Grid item xs={6}>
                    <Card sx={{ margin: 1 }}>
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            style={{
                              fontWeight: "bold",
                              textAlign: "left",
                              margin: 10,
                            }}
                          >
                            Clubs {"&"} Organizations
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={8}>
                    <Card sx={{ margin: 1 }}>
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            style={{
                              fontWeight: "bold",
                              textAlign: "left",
                              margin: 10,
                            }}
                          >
                            Following Accounts
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </div>
              </Box>
            </Grid>

            {/* display timeline of user posts*/}
            <Grid item xs={8} sm={7} md={7}>
              <Box>
                <Card sx={{ margin: 1, maxHeight: "600px" }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        fontWeight: "bold",
                        textAlign: "left",
                        margin: 10,
                      }}
                    >
                      Timeline
                    </Typography>
                    <Divider />
                    {post &&
                      post.map((post, index) => (
                        <div style={{ textAlign: "left" }} key={index}>
                          <div>
                            <img
                              src={profilePicSrc}
                              alt="Profile"
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                marginTop: 10,
                                float: "left",
                                margin: 8,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div style={{ paddingTop: 10, marginLeft: 20 }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {tempUser.firstName} {tempUser.lastName}
                              </Typography>
                              <div>
                                <IconButton
                                  onClick={() => {
                                    handleEditPost(post);
                                    setPostModal(true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton>
                                  <DeleteIcon
                                    onClick={() =>
                                      handleDeletePost(post, index)
                                    }
                                  />
                                </IconButton>
                              </div>
                            </div>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="div"
                            >
                              @{tempUser.username}
                            </Typography>
                          </div>
                          <div style={{ textAlign: "left" }}>
                            <Typography
                              gutterBottom
                              component="div"
                              style={{ padding: 10, fontSize: 14 }}
                            >
                              {post.data.post}
                              {/* {editPost.index === index
                                ? editPost.post
                                : post.post} */}
                            </Typography>
                          </div>
                          {index !== thisUser.posts.length - 1 ? (
                            <Divider />
                          ) : null}
                        </div>
                      ))}
                  </CardContent>
                </Card>
                <Card sx={{ margin: 1 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{
                          fontWeight: "bold",
                          textAlign: "left",
                          margin: 10,
                        }}
                      >
                        Gallery
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>

      {/*Modal for changing user bio*/}
      <Modal
        open={bioModal}
        onClose={() => setBioModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 10 }}
          >
            Edit Bio
          </Typography>
          <TextField
            id="standard-multiline-flexible"
            multiline
            maxRows={4}
            value={bio ? bio : tempUser.bio}
            onChange={(e) => setBio(e.target.value)}
            variant="standard"
            fullWidth
          />
          <Button
            style={{ float: "right", margin: 10 }}
            variant="contained"
            onClick={() => handleSubmitBio()}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/*Modal for editing user post*/}
      <Modal
        open={postModal}
        onClose={() => setPostModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 10 }}
          >
            Edit Post
          </Typography>
          <TextField
            id="standard-multiline-flexible"
            multiline
            maxRows={4}
            value={editPost.data.post && editPost.data.post}
            onChange={(e) => handleEditPosts(e)}
            variant="standard"
            fullWidth
          />
          <Button
            style={{ float: "right", margin: 10 }}
            variant="contained"
            onClick={() => {
              handleSendPost(editPost.docId);
              setPostModal(false);
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/*Modal for editing user pronouns*/}
      <Modal
        open={pronounModal}
        onClose={() => setPronounModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 10 }}
          >
            Edit Pronouns
          </Typography>
          <TextField
            id="standard-multiline-flexible"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            variant="standard"
            fullWidth
          />
          <Button
            style={{ float: "right", margin: 10 }}
            variant="contained"
            onClick={() => handlePronouns()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;
