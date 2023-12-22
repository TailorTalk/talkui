import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  IconButton,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../contexts/AuthContext";
import orgsService from "../../services/orgs.service";
import CreateOrgModal from "./OrgModals/CreateOrg";
import CreateCollaboratorModal from "./OrgModals/Collaborate";
import OrgInfoModal from "./OrgModals/Info";
import { useNotify } from "../../contexts/NotifyContext";
import CustomCard from "../Card/CustomCard";
import { unixToFormattedDate } from "../../utils/utils";

function OrgsList({ onSelect }) {
  const [orgs, setOrgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [collaboratorOrg, setCollaboratorOrg] = useState(""); // TODO: Change this to false when done testing
  const [viewOrg, setViewOrg] = useState(null); // TODO: Change this to false when done testing
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const { addMessage, addErrorMessage } = useNotify();

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
    addMessage("Adding collaborator...");
    setLoading(true);
    orgsService
      .addCollaborator(orgName, collaboratorId)
      .then((response) => {
        // console.log("Response of create org: ", response.data);
        return response.data;
      })
      .then((data) => {
        if (!data.success) {
          addErrorMessage(
            "Could not add collaborator. Backend returned success false"
          );
        } else {
          addMessage("Added collaborator successfully");
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not add collaborator");
        setLoading(false);
        addErrorMessage("Could not add collaborator");
      });
  };

  const createOrg = (orgId) => {
    // console.log("Creating org: ", orgId)
    addMessage("Creating organisation ...");
    setLoading(true);
    orgsService
      .createOrg(orgId)
      .then((response) => {
        // console.log("Response of create org: ", response.data);
        addMessage("Created org successfully. Retrieving updated orgs list");
        return orgsService.listOrgs();
      })
      .then((response) => {
        addMessage("Retrieved updated orgs list");
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
        addErrorMessage("Could not create org");
      });
  };

  useEffect(() => {
    // fetch orgs using /list_orgs
    setLoading(true);
    addMessage("Retrieving organisation list...");
    orgsService
      .listOrgs()
      .then((response) => {
        // console.log("Result of list org", response.data);
        return response.data;
      })
      .then((data) => {
        // console.log("Orgs: ", data.result.orgs)
        if (data.success) {
          addMessage("Retrieved organisation list successfully");
          setOrgs(data.result.orgs);
        } else {
          addErrorMessage(
            "Could not list orgs. Backend returned success false"
          );
          throw new Error(
            "Could not list orgs. Backend returned success false"
          );
        }
        setLoading(false);
      })
      .catch(() => {
        // console.log("Could not list orgs");
        addErrorMessage("Could not list orgs. Backend error");
        setLoading(false);
      });
  }, [userInfo]);

  console.log(orgs);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h3 className="text-2xl text-white">Orgs</h3>
      <List sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {orgs.map((org) => (
          <ListItem key={org.name} >
            <CustomCard
              name={org.name}
              dataItem={org}
              id={`org-${org.name}`}
              onSelect={()=>{onSelect(org.name)}}
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
      {/* {loading && <LoadingOverlay message="Loading..." />} */}
      <IconButton onClick={() => setOpen(true)}>
        <Fab
          sx={{
            backgroundColor: "#fff",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          <AddIcon color="primary" />
        </Fab>
      </IconButton>
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
