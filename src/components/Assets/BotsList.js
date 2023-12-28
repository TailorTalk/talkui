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
  Skeleton,
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
import CustomCard from "../Card/CustomCard";
import { useSnackbar } from "notistack";

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
  const {enqueueSnackbar} = useSnackbar();
  // console.log("Selected org: ", orgId)

  useEffect(() => {
    // console.log("Org id in bots list: ", orgId)
    // fetch bots for the given org using /list_bots
    if (orgId) {
      // addMessage("Fetching bots...");
      enqueueSnackbar("Fetching bots...", {
        variant: "info",
      });
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
            // addMessage("Fetched bots successfully");
            enqueueSnackbar("Fetched bots successfully", {
              variant: "success",
            });
          } else {
            // addErrorMessage(
            //   "Could not fetch bots. Backend returned success false"
            // );

            enqueueSnackbar("Could not fetch bots. Backend returned success false", {
              variant: "error",
            });
          }
          setLoading(false);
        })
        .catch(() => {
          // console.log("Could not fetch bots");
          setLoading(false);
          // addErrorMessage("Could not fetch bots");
          enqueueSnackbar("Could not fetch bots", {
            variant: "error",
          });
        });
    }
  }, [orgId, userInfo]);

  const createBot = (botName, botDescription) => {
    // console.log("Creating bot for org: ", orgId, botName, botDescription)
    // addMessage("Creating bot...");
    enqueueSnackbar("Creating bot...", {
      variant: "info",
    });
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
          // addMessage("Created bot successfully");
          enqueueSnackbar("Created bot successfully", {
            variant: "success",
          });
        } else {
          // addErrorMessage(
          //   "Could not create bot. Backend returned success false"
          // );
          enqueueSnackbar("Could not create bot. Backend returned success false", {
            variant: "error",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not create bot");
        setLoading(false);
        // addErrorMessage("Could not create bot");
        enqueueSnackbar("Could not create bot", {
          variant: "error",
        });
      });
  };

  const onDelete = (botId) => {
    // console.log("Deleting bot: ", botId)
    // addMessage("Deleting bot...");
    enqueueSnackbar("Deleting bot...", {
      variant: "info",
    });
    assetsService
      .deleteBot(userInfo, orgId, botId)
      .then((response) => {
        // console.log("Response of delete bot: ", response.data);
        if (response.data.success) {
          // addMessage("Deleted bot successfully. Fetching updated bots list...");
          enqueueSnackbar("Deleted bot successfully. Fetching updated bots list...", {
            variant: "success",
          });
          return assetsService.listBots(userInfo, orgId);
        } else {
          // addErrorMessage(
          //   "Could not delete bot. Backend returned success false"
          // );
          enqueueSnackbar("Could not delete bot. Backend returned success false", {
            variant: "error",
          });

          throw new Error("Could not delete bot");
        }
      })
      .then((bots) => {
        // console.log("Result of list bots", bots.data)
        setBots(bots.data.result.bots);
      })
      .catch(() => {
        // console.log("Could not delete bot");
        // addErrorMessage("Could not delete bot");
        enqueueSnackbar("Could not delete bot", {
          variant: "error",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 max-2xl:gap-5">
      <h3 className="text-2xl max-2xl:text-[22px] text-white">Bots</h3>

      {loading ? (
        <List sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ListItem>
            <Skeleton
              animation="pulse"
              variant="rounded"
              width={170}
              height={160}
              sx={{ borderRadius: "12px", opacity: 0.5 }}
            />
          </ListItem>
          <ListItem>
            <Skeleton
              animation="pulse"
              variant="rounded"
              width={170}
              height={170}
              sx={{ borderRadius: "12px", opacity: 0.5 }}
            />
          </ListItem>
        </List>
      ) : (
        <List sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bots.map((bot,index) => (
            <ListItem key={index}>
              <CustomCard
                name={bot.bot_name}
                id={`bot-${bot.bot_name}`}
                onSelect={() => {
                  onSelect(bot);
                }}
                dataItem={bot}
                cardBody={`${bot.assets.length} Assets`}
                date={unixToFormattedDate(bot.created_at)}
                cardActions={[
                  {
                    name: "Delete",
                    action: () => {
                      onDelete(bot.org_chat_bot_id);
                    },
                  },
                ]}
              />
            </ListItem>
          ))}
        </List>
      )}
  
        <Fab
         variant="rounded"
         onClick={() => setOpen(true)}
         sx={{
           backgroundColor: "#F4F4F4",
           "&:hover": { backgroundColor: "#fff" },
         }}
       >
         <AddIcon color="primary"  />
        </Fab>
 
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
