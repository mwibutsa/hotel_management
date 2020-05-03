import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoomsPage from "./components/pages/rooms-page/Rooms";
import ListBookingPage from "./components/pages/list-booking-page/BookingList";
import ManageStaff from "./components/pages/manage-staff/ManageStaff";
import CategoryPage from "./components/pages/category-page/CategoryPage";

const DashboardRouter = (props) => (
  <Switch>
    <ProtectedRoute path="/dashboard/rooms" component={RoomsPage} {...props} />
    <ProtectedRoute
      path="/dashboard/bookings"
      component={ListBookingPage}
      {...props}
    />
    <ProtectedRoute
      path="/dashboard/manage-staff"
      component={ManageStaff}
      {...props}
    />
    <ProtectedRoute
      path="/dashboard/room-categories"
      component={CategoryPage}
      {...props}
    />
  </Switch>
);

export default DashboardRouter;
