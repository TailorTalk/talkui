import React, { useState, useEffect } from "react";
import { List, ListItem, IconButton, Fab, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../contexts/AuthContext";
import orgsService from "../../services/orgs.service";
import CreateOrgModal from "./OrgModals/CreateOrg";
import CreateCollaboratorModal from "./OrgModals/Collaborate";
import OrgInfoModal from "./OrgModals/Info";
import { useNotify } from "../../contexts/NotifyContext";
import CustomCard from "../Card/CustomCard";
import { unixToFormattedDate } from "../../utils/utils";
import { useSnackbar } from "notistack";

function OrgsList({ onSelect }) {
  const [orgs, setOrgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [collaboratorOrg, setCollaboratorOrg] = useState(""); // TODO: Change this to false when done testing
  const [viewOrg, setViewOrg] = useState(null); // TODO: Change this to false when done testing
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const { addMessage, addErrorMessage } = useNotify();
  const {enqueueSnackbar,closeSnackbar} = useSnackbar();

  const handleOpen = (val) => {
    if (!!val) {
      setOpen(val);
    } else {
      setOpen(false);
      setCollaboratorOrg("");
      setViewOrg(null);
    }
  };

  const handleCollaborateClick = (event, orgName) => {
    event.stopPropagation();
    // console.log("Collaborate clicked for org: ", orgName);
    setCollaboratorOrg(orgName);
    handleOpen(true);
  };

  const handleInfoClick = (event, org) => {
    event.stopPropagation();
    // console.log("Info clicked for org: ", org);
    setViewOrg(org);
    handleOpen(true);
  };

  const addCollaborator = (orgName, collaboratorId) => {
    // console.log("Adding collaborator: ", orgName, collaboratorId) //addCollaborator(orgName, collaboratorId)
    // addMessage("Adding collaborator...");
    enqueueSnackbar("Adding collaborator...", {
      variant: "info",
    });
    setLoading(true);
    orgsService
      .addCollaborator(orgName, collaboratorId)
      .then((response) => {
        // console.log("Response of create org: ", response.data);
        return response.data;
      })
      .then((data) => {
        if (!data.success) {
          // addErrorMessage(
          //   "Could not add collaborator. Backend returned success false"
          // );
          enqueueSnackbar("Could not add collaborator", {
            variant: "error",
          });
        } else {
          // addMessage("Added collaborator successfully");
          enqueueSnackbar("Added collaborator successfully", {
            variant: "success",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not add collaborator");
        setLoading(false);
        // addErrorMessage("Could not add collaborator");
        enqueueSnackbar("Could not add collaborator", {
          variant: "error",
        });
      });
  };

  const createOrg = (orgId) => {
    // console.log("Creating org: ", orgId)
    // addMessage("Creating organisation ...");
    enqueueSnackbar("Creating organisation ...", {
      variant: "info",
    });
    setLoading(true);
    orgsService
      .createOrg(orgId)
      .then((response) => {
        // console.log("Response of create org: ", response.data);
        // addMessage("Created org successfully. Retrieving updated orgs list");
        enqueueSnackbar("Created org successfully. Retrieving updated orgs list", {
          variant: "info",
        });
        return orgsService.listOrgs();
      })
      .then((response) => {
        // addMessage("Retrieved updated orgs list");
        enqueueSnackbar("Retrieved updated orgs list", {
          variant: "success",
        });
        // console.log("Result of list org", response.data);
        return response.data;
      })
      .then((data) => {
        setOrgs(data.result.orgs);
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not create org");
        setLoading(false);
        // addErrorMessage("Could not create org");
        enqueueSnackbar("Could not create org", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    // fetch orgs using /list_orgs
    setLoading(true);
    // addMessage("Retrieving organisation list...");
    enqueueSnackbar("Retrieving organisation list...", {
      variant: "info",
    });
    orgsService
      .listOrgs({
        email:userInfo.email,userName: userInfo.name
      })
      .then((response) => {
        // console.log("Result of list org", response.data);
        return response.data;
      })
      .then((data) => {
        // console.log("Orgs: ", data.result.orgs)
        if (data.success) {
          // addMessage("Retrieved organisation list successfully");
          enqueueSnackbar("Retrieved organisation list successfully", {
            variant: "success",
          });
          setOrgs(data.result.orgs);
        } else {
          // addErrorMessage(
          //   "Could not list orgs. Backend returned success false"
          // );
          enqueueSnackbar("Could not list orgs. Backend returned success false", {
            variant: "error",
          });
          throw new Error(
            "Could not list orgs. Backend returned success false"
          );
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not list orgs");
        // addErrorMessage("Could not list orgs. Backend error");
        enqueueSnackbar("Could not list orgs. Backend error", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [userInfo]);


  return (
    <div className="flex flex-col justify-center items-center gap-4 max-2xl:gap-5">
      <h3 className="text-2xl max-2xl:text-[22px] text-white ">Orgs</h3>

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
          {orgs.map((org,index) => (
            <ListItem key={index}>
              <CustomCard
                name={org.name}
                dataItem={org}
                id={`org-${org.name}`}
                onSelect={() => {
                  onSelect(org.name);
                }}
                cardBody="2 Bots"
                date={unixToFormattedDate(org.created_on)}
                cardActions={[
                  {
                    name: "Collaborate",
                    action: (event) => {
                      handleCollaborateClick(event, org.name);
                    },
                  },
                  {
                    name: "Info",
                    action: (event) => {
                      handleInfoClick(event, org);
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
   
      {!collaboratorOrg ? (
        <CreateOrgModal
          open={open}
          setOpen={handleOpen}
          createOrg={createOrg}
        />
      ) : (
        <CreateCollaboratorModal
          open={open}
          setOpen={handleOpen}
          orgName={collaboratorOrg}
          addCollaborator={addCollaborator}
        />
      )}
      {viewOrg && (
        <OrgInfoModal org={viewOrg} open={open} setOpen={handleOpen} />
      )}
    </div>
  );
}

export default OrgsList;
