import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Records from '../pages/Records'
import Problemtree from '../pages/ProblemTree'
import Description from '../pages/Description'
import Goals from '../pages/Goals'
import Justification from '../pages/Justification'

export const router = createBrowserRouter([
    {
        path: "/",
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
                path: "records",
                element: <Records />
            },
            {
                path: "problem-tree",
                element: <Problemtree />
            },
            {
                path: "description",
                element: <Description />
            },
            {
                path: "goals",
                element: <Goals />
            },
            {
                path: "justification",
                element: <Justification />
            },
        ]
    }
])