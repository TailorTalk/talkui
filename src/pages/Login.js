import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { useAuth } from '../contexts/AuthContext'

function Login() {
    const { login } = useAuth();
    const responseGoogle = (response) => {
        console.log("Response from google login: ", response);
        // Send token to backend
        const { tokenId } = response;
        fetch('YOUR_BACKEND_URL/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: tokenId }),
        })
            .then(res => res.json())
            .then(data => {
                // Handle session cookie, data, and redirection if necessary
                console.log("Data from google login: ", data);
            })
            .catch(error => {
                // Handle errors
                console.log("Error from google login: ", error);
            });
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    var userObject = jwt_decode(credentialResponse.credential);
                    console.log("User object after log in: ", userObject)
                    login(userObject);
                }}
                onError={() => {
                    console.log('Login Failed')
                }}
                useOneTap
            />
        </div>
    )
}

export default Login;

