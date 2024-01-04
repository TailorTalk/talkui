import { InputAdornment, Skeleton, TextField } from "@mui/material";
import React, { useState, useCallback, useMemo } from "react";
import { Search } from "@mui/icons-material";
import BasicTable from "../components/Table/Table";
import useDashboardData from "../hooks/useDashboardata";
import Chat from "../components/Chat/Chat";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import chatServiceInstance from "../services/chat.service";
import { useSnackbar } from "notistack";
import { botsAndSelectedBot,orgsAndSelectedOrg } from "../store/OrganisationSlice";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { userInfo } = useAuth();
  const { selectedBot } = useSelector(botsAndSelectedBot);
  // const { organisationId } = useSelector((state) => state.organisation.orgs);
  const [chats, setChats] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { data } = useDashboardData();
  const [loadingChats, setLoadingChats] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  console.log("DATA: ", data);

  let filteredData = data;

  const getConversations = useCallback(async (conversationId) => {
    try {
      setIsSidePanelOpen(true);
      setLoadingChats(true);
      const response = await chatServiceInstance.getConversations(
        selectedBot.org_chat_bot_id,
        conversationId
      );

      const chatsHistory = response.data.result;
      console.log(chatsHistory)
      setChats(chatsHistory);
    } catch (err) {
      setChats([]);
      enqueueSnackbar("Something went wrong!", {
        variant: "error",
      });
    } finally {
      setLoadingChats(false);
    }
  }, []);

  filteredData = useMemo(
    () =>
      filteredData.filter((dataObj) => {
        return dataObj.User.toLowerCase().includes(search.toLowerCase());
      }),
    [filteredData,search]
  );

  return (
    <div className="px-4 pt-4 max-sm:py-8  flex justify-center overflow-hidden flex-1 ">
      <div className="relative overflow-hidden w-full h-full pt-2 flex flex-col">
        <TextField
          id="outlined-basic"
          label="Search leads"
          className="mb-4"
          variant="outlined"
          size="small"
          sx={{
            maxWidth: "240px",
            marginBottom: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: {
              color: "#717171",
            },
          }}
        />
        <BasicTable data={filteredData} getConversations={getConversations} />
      </div>

      <div
        className={`fixed z-30 w-[40%] h-screen top-0 right-0 bg-coral-red transition-all duration-300 flex items-end justify-end  ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div className="  h-[100%] w-full ">
          {loadingChats ? (
            <div className="bg-white h-full">
              <div className="py-12 px-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 flex-row-reverse">
                  <Skeleton variant="circular" width={40} height={40} />
                  <span className="flex-1">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width={40} height={40} />
                  <span className="flex-1">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-row-reverse">
                  <Skeleton variant="circular" width={40} height={40} />
                  <span className="flex-1">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width={40} height={40} />
                  <span className="flex-1">
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Chat
              hideSessions={true}
              isAnAgent={true}
              hide={false}
              disable={true}
              chats={chats}
            />
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 z-20 bg-[rgba(0,0,0,0.2)]  h-screen w-screen ${
          isSidePanelOpen ? "block " : "hidden "
        } `}
        onClick={() => {
          setIsSidePanelOpen((prev) => !prev);
        }}
      />
    </div>
  );
};

export default Dashboard;
