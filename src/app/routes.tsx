import { createBrowserRouter } from "react-router";
import { Layout } from "./components";
import {
  About,
  Academics,
  Admissions,
  Campus,
  Contact,
  Events,
  Facilities,
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
      { path: "facilities", Component: Facilities },
      { path: "campus", Component: Campus },
      { path: "student-life", Component: StudentLife },
      { path: "campus-life", Component: StudentLife },
      { path: "sports", Component: Sports },
      { path: "events", Component: Events },
      { path: "news", Component: Events },
      { path: "news-events", Component: Events },
      { path: "admissions", Component: Admissions },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
