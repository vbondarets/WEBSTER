import React from "react";
import MainPage from '../pages/MainPage';
import AuthPage from '../pages/AuthPage';
import Test from '../pages/Test';
import Container from '../pages/Container';
import Studio from "../pages/Studio";
import AboutPage from "../pages/AboutPage";
import SupportPage from "../pages/SupportPage";
import ProfilePage from "../pages/ProfilePage";

export const publicRoutes = [
    { path: "/", component: <Container component={<MainPage/>}/>},
    { path: "/auth", component: <AuthPage /> },
    { path: "/test", component: <Container component={<Test/>}/>},
    { path: "/studio", component: <Container component={<Studio/>}/>},
    { path: "/about", component: <Container component={<AboutPage/>}/>},
    { path: "/support", component: <Container component={<SupportPage/>}/>},
    { path: "/profile", component: <Container component={<ProfilePage/>}/>},
];

export const authRoutes = [
    // { path: "/notification", component: <Container component={<NotifyPage />} /> },
    // { path: "/favorite", component: <Container component={<FavoritePage />} /> },
]