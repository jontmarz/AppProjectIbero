import { createBrowserRouter } from "react-router-dom";
// import { Login, Records, Problemtree, Description, Goals, Justification } from '../pages/'
import RootLayout from '../layout/RootLayout'
import PrivateLayout from '../layout/PrivateLayout'
import PrivateLayoutDoce from '../layout/PrivateLayoutDoce'
import PrivateLayoutDash from '../layout/PrivateLayoutDash'
import PrivateLayoutPDF from '../layout/PrivateLayoutPDF'
import Home from '../pages/WebPage/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Records from '../pages/Records'
import Problemtree from '../pages/ProblemTree'
import Description from '../pages/Description'
import Goals from '../pages/Goals'
import Justification from '../pages/Justification'
import Methodology from "../pages/Methodology";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import DashboardDocente from "../pages/docente/DashboardDocente";
import DashboardEstu from "../pages/estudiante/DashboardEstudiante";
import EthicalImpacts from "../pages/EthicalImpacts";
import FichaProject from "../pages/docente/fichaProject";
import { PrintToPdf } from "../pages/PrintToPdf";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />
                // element: <Home />
            },
            /* {
                path: "login",
                element: <Login />
            }, */
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "dashboard",
                element: <PrivateLayoutDash />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            },
            {
                path: "docente",
                element: <PrivateLayoutDoce />,
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