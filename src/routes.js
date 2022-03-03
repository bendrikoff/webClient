import Main from "./pages/Main";
import {
    BUGTRACKER_ROUTE,
    FORUM_ROUTE,
    LOGIN_ROUTE, MAIN_ROUTE,
    NEWS_ROUTE,
    REGISTRATION_ROUTE,
    SUPPORT_ROUTE
} from "./utils/consts";
import bugTracker from "./pages/bugTracker";
import Forum from "./pages/Forum";
import NewsPage from "./pages/NewsPage";
import Auth from "./pages/Auth";
import oneNewsPage from "./pages/OneNewsPage";
import OneNewsPage from "./pages/OneNewsPage";
import Support from "./pages/Support";
import ForumSectionPage from "./pages/ForumSectionPage";
import ForumTopic from "./pages/ForumTopic";
import FAQpage from "./pages/FAQpage";

export const authRoutes = []

export const publicRoutes = [
    {
        path:MAIN_ROUTE,
        Component: Main
    },
    {
        path: BUGTRACKER_ROUTE,
        Component: bugTracker
    },
    {
        path: SUPPORT_ROUTE,
        Component: Support
    },
    {
        path: FORUM_ROUTE,
        Component: Forum
    },
    {
        path: NEWS_ROUTE+'/:id',
        Component: OneNewsPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: NEWS_ROUTE+'/page/:id',
        Component: NewsPage
    },
    {
        path: FORUM_ROUTE+'/:id',
        Component: ForumSectionPage
    },
    {
        path: FORUM_ROUTE+'/:subId/:id',
        Component: ForumTopic
    },
    {
        path: SUPPORT_ROUTE+'/:id',
        Component: FAQpage
    }



]