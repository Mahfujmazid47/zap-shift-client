import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authenticaton/Login/Login";
import Register from "../Pages/Authenticaton/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import RejectedRiders from "../Pages/Dashboard/RejectedRiders/RejectedRiders";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/coverage',
        Component: Coverage,
      },
      {
        path: '/sendParcel',
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        )
      },
      {
        path: '/beARider',
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        )
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path:'/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: '/dashboard/myParcels',
        Component: MyParcels
      },
      {
        path: '/dashboard/payment/:parcelId',
        Component: Payment
      },
      {
        path: '/dashboard/paymentHistory',
        Component: PaymentHistory
      },
      {
        path: '/dashboard/pendingRiders',
        Component: PendingRiders
      },
      {
        path: '/dashboard/activeRiders',
        Component: ActiveRiders
      },
      {
        path: '/dashboard/rejectedRiders',
        Component: RejectedRiders
      },
      {
        path: '/dashboard/manageUsers',
        Component: ManageUsers
      },
    ]
  }
]);