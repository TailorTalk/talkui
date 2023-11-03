import http from "./http-common";

class AuthService {
    googleAuth(code) {
        console.log("Google auth code: ", code)
        return fetch("/maestro_chat/v1/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"code": code})
        });
    }
}
const authService = new AuthService();

export default authService;