// export const BASE_URL = "https://tailortalk-production.up.railway.app";
// export const BASE_URL = "https://tailortalk-preview.up.railway.app";
// export const BASE_URL = "http://localhost:8000";
let BASE_URL;
console.log("REACT_APP_ENV_NAME is: ", process.env.REACT_APP_ENV_NAME)

switch (process.env.REACT_APP_ENV_NAME.toLowerCase()) {
    case 'production':
        BASE_URL = "https://tailortalk-production.up.railway.app";
        break;
    case 'preview':
        BASE_URL = "https://tailortalk-preview.up.railway.app";
        break;
    default:
        BASE_URL = "http://localhost:8000";
        break;
}

export { BASE_URL };
