import { createBrowserRouter } from "react-router-dom";
// import { Login, Records, Problemtree, Description, Goals, Justification } from '../pages/'
import RootLayout from '../layout/RootLayout'
import PrivateLayout from '../layout/PrivateLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Records from '../pages/Records'
import Problemtree from '../pages/ProblemTree'
import Description from '../pages/Description'
import Goals from '../pages/Goals'
import Justification from '../pages/Justification'
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import { PrintToPdf } from "../pages/PrintToPdf";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "dashboard",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            },
            {
                path: "problem-tree",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Problemtree />
                    }
                ]
            },
            {
                path: "records",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Records />
                    }
                ]
            },
            {
                path: "description",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Description />
                    }
                ]
            },
            {
                path: "goals",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Goals />
                    }
                ]
            },
            {
                path: "justification",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Justification />
                    }
                ]
            },
            {
                path: "print-to-pdf",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <PrintToPdf />
                    }
                ]
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }
])