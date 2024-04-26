import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layout/RootLayout'
import PrivateLayout from '../layout/PrivateLayout'
import PrivateLayoutPDF from '../layout/PrivateLayoutPDF'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Records from '../pages/Sheet/Records'
import Problemtree from '../pages/Sheet/ProblemTree'
import Description from '../pages/Sheet/Description'
import Goals from '../pages/Sheet/Goals'
import Justification from '../pages/Sheet/Justification'
import Methodology from "../pages/Sheet/Methodology";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import DashboardDocente from "../pages/Docente/DashboardDocente";
import EthicalImpacts from "../pages/Sheet/EthicalImpacts";
import FichaProject from "../pages/Docente/fichaProject";
import PrintToPdf from "../pages/Sheet/PrintToPdf";
import SettingsApp from "../pages/superUser/SettingsApp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                // element: <Login />
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "dashboard",
                element: <PrivateLayout />,
                // element: <PrivateLayoutDash />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            },
            {
                path: "docente",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardDocente/>
                    },
                    {
                        path: ":idProject",
                        element: <FichaProject />
                    }
                ]
            },
            /* {
                path: "estudiante",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardEstu />
                    },
                    {
                        path: ":idProject",
                        element: <FichaProject />
                    }
                ]
            }, */
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
                path: "ethicalimpacts",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <EthicalImpacts />
                    }
                ]
            },
            {
                path: "methodology",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Methodology />
                    }
                ]
            },
            {
                path: "print-to-pdf",
                element: <PrivateLayoutPDF />,
                children: [
                    {
                        index: true,
                        element: <PrintToPdf />
                    }
                ]
            },
            {
                path: "settings",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <SettingsApp />
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