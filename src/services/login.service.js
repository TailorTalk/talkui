import http from "./http-common";

class LoginService {
    login(idToken) {
        return http.post("/maestro_chat/auth/v1/login", {
        }, {
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });
    }
}

const loginService = new LoginService();

export default loginService;