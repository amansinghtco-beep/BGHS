import { createBrowserRouter } from "react-router";
import { Layout } from "./components";
import {
  About,
  Academics,
  Admissions,
  Campus,
  Contact,
  Events,
  Home,
  NotFound,
  Programme,
  Sports,
  StudentLife,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "academics", Component: Academics },
      { path: "academics/:programme", Component: Programme },
      { path: "campus", Component: Campus },
      { path: "student-life", Component: StudentLife },
      { path: "sports", Component: Sports },
      { path: "events", Component: Events },
      { path: "admissions", Component: Admissions },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
