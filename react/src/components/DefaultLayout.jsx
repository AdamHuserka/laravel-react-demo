import {Link, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export  default function DefaultLayout() {
    const { notification } = useStateContext();
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="centering text-primary py-2">
                    <h1>Demo application</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 content">
                    <Outlet/>
                </div>
            </div>
            {notification && <div className="notification">
                {notification}
            </div>}
        </div>
    );
}
