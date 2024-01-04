import React, { Suspense, lazy } from "react";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FirebaseLogin from "./pages/FirebaseLogin";
import { GlobalsProvider } from "./contexts/GlobalsContext";
import { QueryStringProvider } from "./contexts/QueryStringContext";
import Layout from "./pages/Layout";
import DashboardRootLayout from "./pages/DashboardRootLayout";
import { createBrowserRouter } from "react-router-dom";
import LoadingOverlay from "./components/Overlay/LoadingOverlay";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
const AssetsPage = lazy(() => import("./pages/AssetsPage"));
const DashboardRoot = lazy(() => import("./pages/DashboardRoot"));

function App() {
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
      errorElement: <NotFoundErrorPage />,
      children: [
        {
          path: "/",
          element: <DashboardRootLayout />,
          children: [
            {
              index: true,
              path: "home",
              element: <HomePage />,
            },
            {
              path: "assets",
              element: (
                <Suspense fallback={<LoadingOverlay />}>
                  <AssetsPage />
                </Suspense>
              ),
            },
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<LoadingOverlay />}>
                  <DashboardRoot />
                </Suspense>
              ),
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
}

export default App;
