import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function Messages() {
  const [messageVal, setMessageVal] = useState("");
  const [secValue, setSecValue] = useState(4);

  //sample data
  const [messages, setMessages] = useState([
    {
      index: 4,
      image: "",
      label: "Elon Musk",
      messagesArr: [
        "Hey! This is Elon",
        "Twitter is all messed up so we'll be moving to this platform",
        "If you don't mind",
      ],
    },
    {
      index: 5,
      image: "",
      label: "Jonny Depp",
      messagesArr: ["UGS 285", "Messages 2", "Messages 3"],
    },
    {
      index: 6,
      image: "",
      label: "Snoop Dogg",
      messagesArr: ["UGS 285 Team 4", "Messages 2", "Messages 3"],
    },
    {
      index: 7,
      label: "New Individual Message",
    },
  ]);

  var sendMessageField = false;

  var categoryIndex = -1;
  var messageIndex = -1;
  var newMessage = "";

  const handleSecChange = (event, newValue) => {
    setSecValue(newValue);
  };

  const handleChangeMessage = (e) => {
    e.preventDefault();
    newMessage =
      e.target.value + "%&%?}}" + messageIndex + "{{?%&%" + categoryIndex; //styling to differentiate incoming and outgoing messages
    setMessageVal(newMessage);
  };

  //styling to differentiate incoming and outgoing messages
  const handleSubmitMessage = () => {
    let messageExtract = messageVal.split("%&%?}}")[0];

    console.log(messageExtract);

    var tempCopy = messages;

    for (let i = 0; i < tempCopy.length; i++) {
      if (tempCopy[i].index === parseInt(categoryIndex)) {
        tempCopy[i].messagesArr[parseInt(messageIndex) + 1] = messageVal;
      }
    }

    setMessages([...tempCopy]);
    console.log(messages);
    setMessageVal(null);
  };

  return (
    <div
      style={{
        textAlign: "center",
        justifySelf: "center",
        verticalAlign: "center",
        width: "100%",
        marginTop: "80px",
      }}
    >
      <Card
        sx={{
          display: "inline-block",
          verticalAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", textAlign: "left" }}
          >
            Messages
          </Typography>
          <Grid
            container
            spacing={4}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Grid
              item
              sx
              style={{
                borderRight: "solid",
                borderWidth: "0.1px",
                textAlign: "left",
              }}
            >
              <Tabs
                value={secValue}
                onChange={handleSecChange}
                orientation="vertical"
                variant="scrollable"
              >
                {messages.map((message) =>
                  !message.label.includes("New") ? (
                    <Tab
                      label={message.label}
                      value={message.index}
                      key={message.index}
                    />
                  ) : null
                )}
              </Tabs>
              <Button
                variant="contained"
                style={{ marginTop: 20, marginRight: 10 }}
              >
                New Conversation
              </Button>
            </Grid>
            <Grid item sx>
              <Box
                sx={{
                  overflow: "scroll",
                  height: 600,
                  width: "500px",
                }}
              >
                {messages.map((message, idx) =>
                  message.index === secValue
                    ? message.messagesArr
                      ? message.messagesArr.map((msg, i) => {
                          sendMessageField = true;
                          messageIndex = i;
                          categoryIndex = secValue;
                          return (
                            <div
                              style={{
                                textAlign: msg.includes("{{?%&%")
                                  ? "right"
                                  : "left",
                              }}
                            >
                              <Typography
                                sx={{
                                  margin: "10px",
                                  padding: ("10px", "40px", "20px", "10px"),
                                  backgroundColor: !msg.includes("{{?%&%")
                                    ? "#BF5700"
                                    : "#333f48",
                                  color: "white",
                                  display: "table",
                                  borderRadius: "30px",
                                  marginLeft: !msg.includes("{{?%&%")
                                    ? 0
                                    : "auto",
                                  maxWidth: 280,
                                }}
                                key={i}
                              >
                                {msg.includes("{{?%&%")
                                  ? msg.split("%&%?}}")[0]
                                  : msg}
                              </Typography>
                            </div>
                          );
                        })
                      : null
                    : null
                )}
              </Box>
              {sendMessageField ? (
                <div>
                  <TextField
                    label="Send Message"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleChangeMessage(e)}
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{ float: "right", margin: 1 }}
                    onClick={handleSubmitMessage}
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default Messages;
