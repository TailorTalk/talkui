export const ASSET_NAME_CLASS_MAP = {
    "default": "DefaultAsset",
}

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE__apiKey,
    authDomain: process.env.REACT_APP_FIREBASE__authDomain,
    projectId: process.env.REACT_APP_FIREBASE__projectId,
    storageBucket: process.env.REACT_APP_FIREBASE__storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE__messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE__appId,
    measurementId: process.env.REACT_APP_FIREBASE__measurementId
  };