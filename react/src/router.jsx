import {createBrowserRouter, Navigate} from "react-router-dom";
import Personnel from "./views/Personnel.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import PersonnelForm from "./views/PersonnelForm.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/personnel' />
            },

            {
                path: '/personnel',
                element: <Personnel />
            },

            {
                path: '/personnel/new',
                element: <PersonnelForm />
            },

            {
                path: '/personnel/:id',
                element: <PersonnelForm />
            },
        ]
    },

    {
        path: '*',
        element: <NotFound />
    }


])

export default router;
