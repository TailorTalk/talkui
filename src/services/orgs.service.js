import http from "./http-common";

class OrgsService {

    createOrg(orgName) {
        return http.post("/maestro_chat/org/v1/create_org", {
            "org_name": orgName
        }, {
            headers: {
            }
        });
    }

    listOrgs() {
        return http.get("/maestro_chat/org/v1/list_orgs", {
            headers: {
            }
        });
    }
}

const orgsService = new OrgsService();

export default orgsService;