import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";

import LandingPage from "./pages/LandingPage";
import Auth from "./shared/Auth/Auth";
import UpdateCustomer from "./pages/Customer/UpdateCustomer";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AddCustomer from "./pages/Customer/AddCustomer";
import CustomerList from "./pages/Customer/CustomerList";

const dashboardRoutes = [
    {
        path: "/landing-page",
        name: "Dashboard",
        icon: Dashboard,
        component: LandingPage,
        layout: "/admin"
    },
    {
        path: "/customers",
        name: "User Profile",
        icon: Person,
        component: CustomerList,
        layout: "/admin"
    },
    {
        path: "/customer",
        name: "Table List",
        icon: "content_paste",
        component: AddCustomer,
        layout: "/admin"
    },
    {
        path: "/dashboard",
        name: "Typography",
        icon: LibraryBooks,
        component: MainNavigation,
        layout: "/admin"
    },
    {
        path: "/customers/:customerId",
        name: "Icons",
        icon: BubbleChart,
        component: UpdateCustomer,
        layout: "/admin"
    },
    {
        path: "/login-page",
        name: "Maps",
        icon: LocationOn,
        component: Auth,
        layout: "/admin"
    }
];

export default dashboardRoutes;
