import React from "react";
import MainPage from '../pages/MainPage';
import AuthPage from '../pages/AuthPage';
import Test from '../pages/Test';

export const publicRoutes = [
    { path: "/", component: <MainPage /> },
    { path: "/auth", component: <AuthPage /> },
    { path: "/test", component: <Test /> },
];

export const authRoutes = [
    // { path: "/notification", component: <Container component={<NotifyPage />} /> },
    // { path: "/favorite", component: <Container component={<FavoritePage />} /> },
]
