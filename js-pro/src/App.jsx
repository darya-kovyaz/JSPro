import React from "react";
import { useState, useLayoutEffect } from "react";
import { Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import RatingPage from "./pages/RatingPage";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import TaskPage from "./pages/TaskPage";

import LogInForm from "./pages/forms/LogInForm";

import Error404 from "./pages/errors/Error404";

import { getUserData_EP, getImage_EP } from "./api/api";

import { useStoreState } from "pullstate";
import { Notifications } from "./pages/pullstate/Notifications";

import IconUser from "./icons/IconUser";
import Handbook from "./pages/handbooks/Handbook";

export default function App() {
    const [isLogInFormOpen, setIsLogInFormOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const [userRole, setUserRole] = useState("");

    const notifications = useStoreState(Notifications).notifications;

    useLayoutEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setIsAuthenticated(true);

            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.userRole);

            axios
                .get(getUserData_EP, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.data.image) {
                        setUserPhoto(getImage_EP + "?imgName=" + response.data.image);
                    }
                })
                .catch((error) => {
                    console.error("Error while retrieving user data: ", error);
                    if (error.response && error.response.status === 401) {
                        setIsAuthenticated(false);
                        localStorage.removeItem("jwtToken");
                    }
                });
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem("jwtToken");
        }
    }, [isAuthenticated]);

    function toggleLogInForm() {
        setIsLogInFormOpen(!isLogInFormOpen);
    }

    return (
        <div className="inset-0 h-screen w-full bg-white">
            <div className="fixed w-full top-0 z-50 flex items-center justify-between bg-white py-5">
                <div className="ml-20">
                    <Link to={"/"}>
                        <button className="font-rubik text-3xl font-bold">JSPro</button>
                    </Link>
                </div>
                <div className="mr-20 flex gap-10 items-center">
                    {userRole === "admin" ? (
                        <></>
                    ) : (
                        <Link to={"/rating"}>
                            <button className="font-montserrat text-lg font-semibold hover:text-[#B06AB3] animated-200">
                                Рейтинг
                            </button>
                        </Link>
                    )}
                    <Link
                        to={"/about"}
                        className="font-montserrat text-lg font-semibold hover:text-[#B06AB3] animated-200"
                    >
                        О проекте
                    </Link>
                    {isAuthenticated ? (
                        <Link to={userRole === "admin" ? "/admin" : "/profile"}>
                            {userPhoto ? (
                                <button className="h-8 w-8 rounded-full bg-gray-300/70 hover:outline-[#B06AB3] hover:outline hover:outline-2 hover:outline-offset-2 animated-100">
                                    <img src={userPhoto} alt="User" className="h-8 w-8 rounded-full" />
                                </button>
                            ) : (
                                <button className="h-8 w-8 rounded-full bg-gray-300/70 hover:outline-[#B06AB3] hover:outline hover:outline-2 hover:outline-offset-2 animated-100"></button>
                            )}
                        </Link>
                    ) : (
                        <button
                            onClick={toggleLogInForm}
                            className="h-8 w-8 rounded-full hover: outline-[#B06AB3] hover:outline hover:outline-2 hover:outline-offset-4 animated-100"
                        >
                            <IconUser />
                        </button>
                    )}
                </div>
            </div>
            <div className="w-full fixed z-50 pointer-events-none">
                <div className="flex flex-col justify-end items-end ">
                    <div className="flex flex-col gap-2 mt-36 mr-10">
                        {notifications.slice(0, 5).map((notification) => {
                            return (
                                <div
                                    key={notification.id}
                                    className={`animated-200 w-[270px] font-montserrat font-semibold text-sm border px-6 h-[54px] flex flex-col justify-center items-center rounded-xl  ${
                                        notification.status === "inBuffer"
                                            ? "opacity-0"
                                            : notification.status === "onScreen"
                                            ? "opacity-100"
                                            : notification.status === "ghosting"
                                            ? "opacity-50"
                                            : "opacity-0"
                                    } ${notification.status === "offScreen" ? "-mt-[62px]" : ""} ${
                                        notification.type === "error"
                                            ? "text-[#CE2029] border-[#CE2029] bg-[#fcebe8]"
                                            : "text-[#B06AB3] border-[#B06AB3] bg-[#fdf6fd]"
                                    }`}
                                >
                                    {notification.message}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col justify-between" style={{ height: `calc(100vh-40px)` }}>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route
                            path="/section/:theme"
                            element={
                                <MainPage
                                    setIsAuthenticated={setIsAuthenticated}
                                    setIsLogInFormOpen={setIsLogInFormOpen}
                                />
                            }
                        />
                        <Route path="/about" element={<AboutPage />} />
                        <Route
                            path="/rating"
                            element={
                                <RatingPage
                                    setIsAuthenticated={setIsAuthenticated}
                                    setIsLogInFormOpen={setIsLogInFormOpen}
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProfilePage setIsAuthenticated={setIsAuthenticated} setUserPhoto={setUserPhoto} />
                            }
                        />
                        <Route path="/handbook/:section" element={<Handbook />} />
                        <Route
                            path="/task/:taskSection/:id"
                            element={
                                <TaskPage
                                    setIsAuthenticated={setIsAuthenticated}
                                    setIsLogInFormOpen={setIsLogInFormOpen}
                                />
                            }
                        />
                        <Route
                            path="/admin"
                            element={<AdminPage setIsAuthenticated={setIsAuthenticated} setUserPhoto={setUserPhoto} />}
                        />
                        <Route
                            path="/admin/:theme"
                            element={<AdminPage setIsAuthenticated={setIsAuthenticated} setUserPhoto={setUserPhoto} />}
                        />
                        <Route path="/error/404" element={<Error404 />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </Suspense>

                <div className="z-40 mt-14 pt-5 pb-5 border-t-2 flex flex-col gap-5 items-center justify-center bg-white">
                    <div className="flex gap-7">
                        {userRole === "admin" ? (
                            <></>
                        ) : (
                            <Link
                                to={"/rating"}
                                className="font-montserrat font-semibold text-sm hover:text-[#B06AB3] ease-out duration-200"
                            >
                                Рейтинг
                            </Link>
                        )}
                        <Link
                            to={"/about"}
                            className="font-montserrat font-semibold text-sm hover:text-[#B06AB3] ease-out duration-200"
                        >
                            О проекте
                        </Link>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="font-montserrat font-semibold text-sm">@2024 |</p>
                        <p className="font-rubik font-bold text-xl"> JSPro</p>
                    </div>
                </div>
            </div>

            {isLogInFormOpen && <LogInForm toggleLogInForm={toggleLogInForm} setIsAuthenticated={setIsAuthenticated} />}
        </div>
    );
}
