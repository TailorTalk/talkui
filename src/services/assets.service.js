import http from "./http-common";

class AssetsService {
    upload(userInfo, orgId, botId, file, onUploadProgress) {
        console.log("Uploading file in asset service: ", userInfo, orgId, botId, file)
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/maestro_chat/asset/v1/upload_file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId,
                "x-org-chat-bot-id": botId
            },
            onUploadProgress,
        });
    }

    listOrgs(userInfo) {
        return http.get("/maestro_chat/asset/v1/list_org", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            }
        });
    }

    listBots(userInfo, orgId) {
        console.log("List bots userInfo: ", userInfo, " orgId: ", orgId)
        return http.get("/maestro_chat/asset/v1/list_bots", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId
            }
        });
    }

    createBot(userInfo, orgId, botName, botDescription) {
        return http.post("/maestro_chat/asset/v1/create_bot", {
            "org_id": orgId,
            "bot_name": botName,
            "bot_description": botDescription
        }, {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            }
        });
    }

    deleteBot(userInfo, orgId, botId) {
        console.log("Delete bot userInfo: ", userInfo, " orgId: ", orgId, " botId: ", botId)
        return http.post("/maestro_chat/asset/v1/delete_bot", {
            "org_id": orgId,
            "org_chat_bot_id": botId
        }, {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name
            }
        });
    }

    listAssets(userInfo, orgId, botId) {
        console.log("List assets userInfo: ", userInfo, " orgId: ", orgId, " botId: ", botId)
        return http.get("/maestro_chat/asset/v1/bot/get", {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId,
                "x-org-chat-bot-id": botId
            }
        });
    }

    updateAsset(userInfo, orgId, botId, assetId, assetDict) {
        console.log("Update asset userInfo: ", userInfo, 
        " orgId: ", orgId, " botId: ", botId, " assetId: ", assetId, "assetDict: ", assetDict)
        return http.post("/maestro_chat/asset/v1/update_asset", {
            "asset_id": assetId,
            "asset": assetDict
        }, {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId,
                "x-org-chat-bot-id": botId
            }
        });
    }

    deleteAsset(userInfo, orgId, botId, assetId) {
        console.log("Delete asset userInfo: ", userInfo, 
        " orgId: ", orgId, " botId: ", botId, " assetId: ", assetId)
        return http.post("/maestro_chat/asset/v1/delete_asset", {
            "asset_id": assetId
        }, {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId,
                "x-org-chat-bot-id": botId
            }
        });
    }

    getSuggestions(userInfo, orgId, botId) {
        console.log("Delete asset userInfo: ", userInfo, 
        " orgId: ", orgId, " botId: ", botId)
        return http.post("/maestro_chat/asset/v1/suggestions", {}, {
            headers: {
                "X-USER-EMAIL": userInfo.email,
                "X-USER-NAME": userInfo.name,
                "X-ORG-ID": orgId,
                "x-org-chat-bot-id": botId
            }
        });
    }
}

const assetsService = new AssetsService();

export default assetsService;