import { Navigate, createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AchievedGoals from "../pages/AchievedGoals/AchievedGoals";
import Applications from "../pages/Applications/Applications";
import Cameras from "../pages/Cameras/Cameras";
import Device from "../pages/Device/Device";
import Devices from "../pages/Devices/Devices";
import Docs from "../pages/Docs/Docs";
import GoalAchieve from "../pages/GoalAchieve/GoalAchieve";
import Goals from "../pages/Goals/Goals";
import GoalsStatistics from "../pages/GoalsStatistics/GoalsStatistics";
import Login from "../pages/Login/Login";
import Monitoring from "../pages/Monitoring/Monitoring";
import NotFound from "../pages/NotFound/NotFound";
import Organizations from "../pages/Organizations/Organizations";
import Params from "../pages/Params/Params";
import Reports from "../pages/Reports/Reports";
import Users from "../pages/Users/Users";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={routes.auth} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: routes.auth,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.organizations,
        element: (
          <PrivateRoute>
            <Organizations />
          </PrivateRoute>
        ),
      },
      {
        path: routes.users,
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: routes.params,
        element: (
          <PrivateRoute>
            <Params />
          </PrivateRoute>
        ),
      },
      {
        path: routes.cameras,
        element: (
          <PrivateRoute>
            <Cameras />
          </PrivateRoute>
        ),
      },
      {
        path: routes.devices,
        element: (
          <PrivateRoute>
            <Devices />
          </PrivateRoute>
        ),
      },
      {
        path: routes.device,
        element: (
          <PrivateRoute>
            <Device />
          </PrivateRoute>
        ),
      },
      {
        children: [
          {
            path: routes.goalList,
            element: (
              <PrivateRoute>
                <Goals />
              </PrivateRoute>
            ),
          },
          {
            path: routes.goalsStatistics,
            element: (
              <PrivateRoute>
                <GoalsStatistics />
              </PrivateRoute>
            ),
          },
          {
            path: routes.goalAchieve,
            element: (
              <PrivateRoute>
                <GoalAchieve />
              </PrivateRoute>
            ),
          },
          {
            path: routes.achievedGoals,
            element: (
              <PrivateRoute>
                <AchievedGoals />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: routes.applications,
        element: (
          <PrivateRoute>
            <Applications />
          </PrivateRoute>
        ),
      },
      {
        children: [
          {
            path: routes.monitoring,
            element: (
              <PrivateRoute>
                <Monitoring />
              </PrivateRoute>
            ),
          },
          {
            path: routes.reports,
            element: (
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: routes.docs,
        element: (
          <PrivateRoute>
            <Docs />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
