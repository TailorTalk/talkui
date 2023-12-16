import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
  TextField,
  Button,
  ListSubheader,
  Fab,
  Chip,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthContext";
import assetsService from "../../services/assets.service";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { unixToFormattedDate } from "../../utils/utils";
import TextOverlay from "../Overlay/TextOverlay";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { useNotify } from "../../contexts/NotifyContext";

const ModalContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // or whatever width you desire
  background: "white",
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

function BotsList({ orgId, onSelect }) {
  const [bots, setBots] = useState([]);
  const [open, setOpen] = useState(false);
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const { addMessage, addErrorMessage } = useNotify();
  // console.log("Selected org: ", orgId)

  useEffect(() => {
    // console.log("Org id in bots list: ", orgId)
    // fetch bots for the given org using /list_bots
    if (orgId) {
      addMessage("Fetching bots...");
      // console.log("Fetching bots for org: ", orgId)
      setLoading(true);
      assetsService
        .listBots(userInfo, orgId)
        .then((response) => {
          // console.log("Result of list bots", response.data);
          return response.data;
        })
        .then((data) => {
          if (data.success) {
            setBots(data.result.bots);
            addMessage("Fetched bots successfully");
          } else {
            addErrorMessage(
              "Could not fetch bots. Backend returned success false"
            );
          }
          setLoading(false);
        })
        .catch(() => {
          // console.log("Could not fetch bots");
          setLoading(false);
          addErrorMessage("Could not fetch bots");
        });
    }
  }, [orgId, userInfo]);

  const createBot = (botName, botDescription) => {
    // console.log("Creating bot for org: ", orgId, botName, botDescription)
    addMessage("Creating bot...");
    setLoading(true);
    assetsService
      .createBot(userInfo, orgId, botName, botDescription)
      .then((response) => {
        // console.log("Response of create bot: ", response.data);
        return assetsService.listBots(userInfo, orgId);
      })
      .then((response) => {
        // console.log("Result of list bots", response.data);
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          setBots(data.result.bots);
          addMessage("Created bot successfully");
        } else {
          addErrorMessage(
            "Could not create bot. Backend returned success false"
          );
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not create bot");
        setLoading(false);
        addErrorMessage("Could not create bot");
      });
  };

  const onDelete = (botId) => {
    // console.log("Deleting bot: ", botId)
    addMessage("Deleting bot...");
    assetsService
      .deleteBot(userInfo, orgId, botId)
      .then((response) => {
        // console.log("Response of delete bot: ", response.data);
        if (response.data.success) {
          addMessage("Deleted bot successfully. Fetching updated bots list...");
          return assetsService.listBots(userInfo, orgId);
        } else {
          addErrorMessage(
            "Could not delete bot. Backend returned success false"
          );
          throw new Error("Could not delete bot");
        }
      })
      .then((bots) => {
        // console.log("Result of list bots", bots.data)
        setBots(bots.data.result.bots);
      })
      .catch(() => {
        // console.log("Could not delete bot");
        addErrorMessage("Could not delete bot");
      });
  };

  return (
    <div>
      <List>
        <ListSubheader sx={{
          backgroundColor:'#4764FC'
        }}>
          <Chip label={`${orgId} bots`} variant="outlined" sx={{borderColor:'#fff', color:'#fff', fontSize:'16px'}} />
        </ListSubheader>
        {bots.map((bot) => (
          <ListItem button key={bot.id} onClick={() => onSelect(bot)}>
            {/* <ListItemText
              primary={bot.bot_name}
              secondary={unixToFormattedDate(bot.created_at)}
            />
            <IconButton
              aria-label="delete"
              onClick={() => onDelete(bot.org_chat_bot_id)}
            >
              <DeleteIcon />
            </IconButton> */}

            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                <h3 className="text-xl font-medium font-[Roboto]">
                {bot.bot_name}
                </h3>
                
              </CardContent>
              <CardActions className="justify-between gap-4">
              <p className=" font-medium font-[Roboto] text-sm">
                {unixToFormattedDate(bot.created_at)}
                </p>
                <IconButton onClick={() => onDelete(bot.org_chat_bot_id)}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
      {loading && <LoadingOverlay message="Loading..." />}
      <IconButton onClick={() => setOpen(true)}>
        <Fab
          sx={{
            backgroundColor: "#fff",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          <AddIcon sx={{ color: "#4764FC" }} />
        </Fab>
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent style={{ padding: "10px" }}>
          <Typography
            variant="h6"
            component="h2"
            style={{ paddingBottom: "5px" }}
          >
            New Bot for {orgId}
          </Typography>
          <TextField
            label="Bot name"
            style={{ paddingBottom: "5px" }}
            onChange={(event) => setBotName(event.target.value)}
          />
          <TextField
            label="Bot description"
            onChange={(event) => setBotDescription(event.target.value)}
          />
          {/* Add any other input fields */}
          <Button
            onClick={() => {
              // Logic to create a new org
              createBot(botName, botDescription);
              setOpen(false);
            }}
          >
            Create
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BotsList;
