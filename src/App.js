import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Assets from "./pages/Assets";
import FirebaseLogin from "./pages/FirebaseLogin";
import { GlobalsProvider } from "./contexts/GlobalsContext";
import { useAuth } from "./contexts/AuthContext";
import { QueryStringProvider } from "./contexts/QueryStringContext";
import AppBarComponent from "./components/AppBar/AppBarComponent";
import Layout from "./pages/Layout";
import DashboardRootLayout from "./pages/DashboardRootLayout";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import DashboardRoot from "./pages/DashboardRoot";

function App() {
  const { isLoggedIn } = useAuth();
  // console.log("akash", "is logged in", isLoggedIn)

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GlobalsProvider>
          <QueryStringProvider>
            <Layout />
          </QueryStringProvider>
        </GlobalsProvider>
      ),
      children: [
        {
          path: "/",
          element: <DashboardRootLayout />,
          children: [
            {
              path: "assets",
              element: <Assets />,
            },
            {
              path: "dashboard",
              element: <DashboardRoot />,
            },
          ],
        },
        {
          index: true,
          path: "/login",
          element: <FirebaseLogin />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  // return (
  //   // <Router>
  //   <GlobalsProvider>
  //     <QueryStringProvider>
  //       {/* <Routes>
  //           <Route path="/" element={<Layout />}>
  //             <Route
  //               path="/"
  //               element={
  //                 isLoggedIn ? <Navigate to="/assets" /> : <FirebaseLogin />
  //               }
  //             />
  //             <Route
  //               path="/login"
  //               element={
  //                 isLoggedIn ? <Navigate to="/assets" /> : <FirebaseLogin />
  //               }
  //             />
  //             <Route path="/" element={<DashboardRootLayout />}>
  //               <Route
  //                 path="/assets"
  //                 element={isLoggedIn ? <Assets /> : <Navigate to="/login" />}
  //               />
  //               <Route
  //                 path="/dashboard"
  //                 element={
  //                   isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
  //                 }
  //               />
  //             </Route>
  //           </Route>
  //           {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/assets" /> : <FirebaseLogin />} />
  //             <Route path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/assets" />} />
  //             <Route path="/chats" element={!isLoggedIn ? <Navigate to="/login" /> : <Chat />} />
  //             <Route path="/assets" element={!isLoggedIn ? <Navigate to="/login" /> : <Assets />} /> */}
  //       {/* </Routes> */}
  //       <RouterProvider router={router} />
  //     </QueryStringProvider>
  //   </GlobalsProvider>
  //   // </Router>
  // );
}

export default App;
