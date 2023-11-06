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

    autoLogin() {
        return http.post("/maestro_chat/auth/v1/auto_login", {
        }, {
            headers: {
            }
        });
    }

    logout() {
        return http.post("/maestro_chat/auth/v1/logout", {
        }, {
            headers: {
            }
        });
    }
}

const loginService = new LoginService();

export default loginService;