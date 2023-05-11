import React from "react";
import MainPage from '../pages/MainPage';
import AuthPage from '../pages/AuthPage';
import Test from '../pages/Test';
import Container from '../pages/Container';
import Studio from "../pages/Studio";

export const publicRoutes = [
    { path: "/", component: <Container component={<MainPage/>}/>},
    { path: "/auth", component: <AuthPage /> },
    { path: "/test", component: <Container component={<Test/>}/>},
    { path: "/studio", component: <Container component={<Studio/>}/>},
];

export const authRoutes = [
    // { path: "/notification", component: <Container component={<NotifyPage />} /> },
    // { path: "/favorite", component: <Container component={<FavoritePage />} /> },
]