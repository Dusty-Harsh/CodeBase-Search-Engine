import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import IndexPage from "./pages/IndexPage";
import WorkspacePage from "./pages/WorkspacePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },

    {
        path: "/index",
        element: <IndexPage />
    },

    {
        path: "/workspace",
        element: <WorkspacePage />
    }
]);