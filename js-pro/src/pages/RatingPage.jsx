import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import IconBackgroundPhone from "../icons/backgrounds/IconBackgroundPhone";
import IconBackgroundInterface from "../icons/backgrounds/IconBackgroundInterface";
import IconBackgroundServer from "../icons/backgrounds/IconBackgroundServer";
import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";
import IconBackgroundAnalytic from "../icons/backgrounds/IconBackgroundAnalytic";

import { getUserData_EP, getUsersData_EP, getImage_EP } from "../api/api";

export default function RatingPage({ setIsLogInFormOpen, setIsAuthenticated }) {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const currentUserReq = axios.get(getUserData_EP, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const allUsersReq = axios.get(getUsersData_EP, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Promise.all([currentUserReq, allUsersReq])
                .then(([currentUserRes, allUsersRes]) => {
                    setTimeout(() => {
                        setCurrentUser(currentUserRes.data);

                        const filteredUsers = allUsersRes.data.filter((user) => user.role !== "admin");
                        setUsers(filteredUsers);

                        setIsLoading(false);
                    }, 400);
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.status === 401) {
                        setIsAuthenticated(false);
                        localStorage.removeItem("jwtToken");
                    }
                });
        } else {
            setIsLogInFormOpen(true);
        }
    }, [setIsLogInFormOpen, setIsAuthenticated]);

    return (
        <div className="w-full h-full mt-14 flex items-center justify-center">
            {isLoading ? (
                <div className="z-20 mt-14 h-[550px] w-[430px] flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                    <div className="z-30 w-full h-full flex flex-col gap-5 justify-center animate-pulse">
                        <div className="flex justify-center items-center">
                            <p className="mt-5 h-[28px] mx-5 w-full bg-gradient-to-r rounded-full from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                </div>
                                <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                    </div>
                    <div className="z-40 w-full flex items-end justify-start py-5 border-t-2 animate-pulse">
                        <div className="flex items-center">
                            <div className="w-[24px] ml-5 pr-5 h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            <div className="w-[250px] px-5 flex gap-3 items-center">
                                <div className="h-12 w-12 rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="w-[150px] h-[24px] rounded-full  bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                            <div className="w-[100px] h-[24px] mx-5 flex justify-end rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="z-20 mt-14 h-[550px] w-[430px] flex flex-col gap-8 pt-5 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                    <div className="flex justify-center items-center">
                        <p className="font-montserrat font-semibold text-lg bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                            Общий рейтинг
                        </p>
                    </div>
                    <div className="z-30 w-full h-full flex flex-col gap-5 overflow-auto">
                        {users.map((user) => (
                            <div key={user._id} className="flex items-center">
                                <div className="w-[40px] px-5">
                                    <p className="text-center font-montserrat text-base font-semibold">{user.rating}</p>
                                </div>
                                <div className="w-[250px] px-5 flex gap-3 items-center">
                                    {user.image ? (
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={getImage_EP + "?imgName=" + user.image}
                                            alt={`${user.nickname} Profile`}
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-300/70"></div>
                                    )}
                                    <p className="font-montserrat text-base font-semibold">{user.nickname}</p>
                                </div>
                                <div className="w-[140px] flex px-5 justify-end">
                                    <p className="font-montserrat text-base font-medium text-gray-800">
                                        {user.points}
                                        <span> оч.</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {currentUser && (
                        <div key={currentUser._id} className="z-40 w-full flex items-end justify-start py-5 border-t-2">
                            <div className="flex items-center">
                                <div className="w-[40px] px-5">
                                    <p className="text-center font-montserrat text-base font-semibold">
                                        {currentUser.rating}
                                    </p>
                                </div>
                                <div className="w-[250px] px-6 flex gap-3 items-center">
                                    {currentUser.image ? (
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={getImage_EP + "?imgName=" + currentUser.image}
                                            alt={`${currentUser.nickname} Profile`}
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-300/70"></div>
                                    )}
                                    <p className="font-montserrat text-base font-semibold">{currentUser.nickname}</p>
                                </div>
                                <div className="w-[140px] flex gap-1 px-5 justify-end">
                                    <span className="font-montserrat text-base font-medium text-gray-800">
                                        {currentUser.points}
                                    </span>
                                    <p className="font-montserrat text-base font-medium text-gray-800">оч.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <>
                <div className="absolute z-10 h-[190px] w-[190px] bottom-14 left-10 -rotate-6">
                    <IconBackgroundInterface />
                </div>
                <div className="absolute z-0 h-[190px] w-[190px] bottom-14 left-10 -rotate-6 blur">
                    <IconBackgroundInterface />
                </div>
                <div className="absolute z-10 h-[150px] w-[150px] left-[330px] top-32">
                    <IconBackgroundServer />
                </div>
                <div className="absolute z-0 h-[150px] w-[150px] left-[330px] top-32 blur">
                    <IconBackgroundServer />
                </div>
                <div className="absolute z-10 h-[200px] w-[200px] left-[420px] bottom-16">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-0 h-[200px] w-[200px] left-[420px] bottom-16 blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-10 h-[50px] w-[50px] bottom-[250px] left-[390px]">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-0 h-[50px] w-[50px] bottom-[250px] left-[390px] blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-10 h-[250px] w-[250px] top-[100px] -left-[100px]">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-0 h-[250px] w-[250px] top-[100px] -left-[100px] blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-10 h-[210px] w-[210px] right-28 top-24 -rotate-3 scale-x-[-1]">
                    <IconBackgroundPhone />
                </div>
                <div className="absolute z-0 h-[210px] w-[210px] right-28 top-24 -rotate-3 scale-x-[-1] blur">
                    <IconBackgroundPhone />
                </div>
                <div className="absolute z-10 h-[190px] w-[190px] right-56 bottom-10">
                    <IconBackgroundAnalytic />
                </div>
                <div className="absolute z-0 h-[190px] w-[190px] right-56 bottom-10 blur">
                    <IconBackgroundAnalytic />
                </div>
                <div className="absolute z-10 h-[230px] w-[230px] right-[430px] top-36">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-0 h-[230px] w-[230px] right-[430px] top-36 blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-10 h-[90px] w-[90px] bottom-[200px] right-[70px]">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute z-0 h-[90px] w-[90px] bottom-[200px] right-[70px] blur">
                    <IconBackgroundCircle />
                </div>
            </>
        </div>
    );
}
