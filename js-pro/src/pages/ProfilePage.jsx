import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import IconBackgroundCoding from "../icons/backgrounds/IconBackgroundCoding";
import IconBackgroundSecurity from "../icons/backgrounds/IconBackgroundSecurity";
import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";
import IconImageCamera from "../icons/IconImageCamera";

import { getUserData_EP, uploadPhoto_EP } from "../api/api";

export default function ProfilePage({ setIsAuthenticated, setUserPhoto }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const fileInputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.userRole !== "viewer") {
                navigate("/error/404");
            }
            axios
                .get(getUserData_EP, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setTimeout(() => {
                        setData(response.data);
                        setIsLoading(false);
                    }, 400);
                })
                .catch((error) => {
                    setTimeout(() => {
                        console.error(error);
                        if (error.response && error.response.status === 401) {
                            setIsAuthenticated(false);
                            localStorage.removeItem("jwtToken");
                        }
                    }, 400);
                });
        } else {
            setIsLoading(true);
            setIsAuthenticated(false);
            navigate("/");
            localStorage.removeItem("jwtToken");
            console.log("Token not found");
        }
    }, [setIsAuthenticated, navigate]);

    const handleFileUpload = (e) => {
        const img = e.target.files[0];

        if (!img) {
            console.log("No file selected");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        const formData = new FormData();
        formData.append("image", img);
        formData.append("userId", data._id);
        formData.append("userNickname", data.nickname);

        axios
            .post(uploadPhoto_EP, formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log("Photo uploaded successfully", response.data);
                navigate(0);
            })
            .catch((error) => {
                console.error("Error uploading photo", error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthenticated(false);
        setUserPhoto("");

        navigate("/");
    };

    return (
        <div className="h-full mt-14 flex items-center justify-center">
            <div className="flex flex-col mt-14">
                <div className="flex gap-24 items-center">
                    {isLoading ? (
                        <div className="animate-pulse">
                            <div className="flex justify-between gap-10 border-b-2 py-6">
                                <div className="flex flex-col gap-9">
                                    <div className="flex flex-col gap-1">
                                        <p className="h-[32px] w-[201px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        <p className="h-[20px] w-[201px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                    </div>
                                    <p className="h-[24px] w-[201px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                </div>
                                <div className="">
                                    <input
                                        className="h-32 w-32 rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"
                                        name="image"
                                    />
                                </div>
                            </div>
                            <div className="py-6">
                                <div>
                                    <p className="h-[28px] w-[353px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                    <div className="py-6 flex justify-center gap-16">
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="h-[28px] w-[105px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                            <p className="h-[24px] w-[148px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="h-[28px] w-[105px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                            <p className="h-[24px] w-[148px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t-2 py-6">
                                <div className="h-[28px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                    ) : (
                        <div key={data._id}>
                            <div className="flex justify-between gap-10 border-b-2 py-6">
                                <div className="flex flex-col gap-9">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-montserrat text-2xl font-semibold">
                                            {data.secondName} {data.firstName}
                                        </p>
                                        <p className="font-montserrat text-sm bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                            {data.nickname}
                                        </p>
                                    </div>
                                    <p className="font-montserrat text-medium text-gray-800">{data.email}</p>
                                </div>
                                {data.image ? (
                                    <div className="relative h-32 w-32 rounded-full overflow-hidden">
                                        <img
                                            src={`http://localhost:3010/api/getImage?imgName=${data.image}`}
                                            alt={`${data.nickname} Profile`}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer bg-black bg-opacity-20 opacity-0 hover:opacity-100 duration-300">
                                            <div className="h-[40px] w-[40px]">
                                                <IconImageCamera />
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                type="file"
                                                name="userPhoto"
                                                id="userPhoto"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleFileUpload}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-32 w-32 rounded-full bg-gray-300/70">
                                        <div className="rounded-full opacity-0 hover:opacity-100 hover:bg-black/10 ease-out duration-300">
                                            <div
                                                onClick={() => {
                                                    fileInputRef.current.click();
                                                }}
                                                className="relative h-32 w-32 flex justify-center items-center cursor-pointer"
                                            >
                                                <div className="h-[40px] w-[40px] flex">
                                                    <IconImageCamera />
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    className="h-32 w-32 absolute hidden rounded-full"
                                                    type="file"
                                                    name="userPhoto"
                                                    id="userPhoto"
                                                    accept=".jpg, .jpeg, .png"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="py-6">
                                <div>
                                    <p className="font-montserrat text-xl font-semibold">Статистика</p>
                                    <div className="py-6 flex justify-center gap-16">
                                        <div className="flex flex-col items-center">
                                            <p className="font-montserrat font-semibold text-lg bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                                null {data.rating}
                                            </p>
                                            <p className="font-montserrat font-medium text-gray-800">
                                                место в рейтинге
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="font-montserrat font-semibold text-lg bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                                null {data.points}
                                            </p>
                                            <p className="font-montserrat font-medium text-gray-800">очков опыта</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center border-t-2 py-6">
                                <button
                                    onClick={handleLogout}
                                    className="font-montserrat text-lg font-semibold text-gray-800 hover:bg-gradient-to-t hover:from-[#4568DC] hover:to-[#B06AB3] hover:inline-block hover:text-transparent hover:bg-clip-text"
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <>
                    <div className="absolute z-10 w-[230px] h-[230px] left-48 bottom-32 -rotate-6">
                        <IconBackgroundCoding />
                    </div>
                    <div className="absolute z-0 w-[230px] h-[230px] left-48 bottom-32 -rotate-6 blur">
                        <IconBackgroundCoding />
                    </div>
                    <div className="absolute z-10 scale-x-[-1] w-[200px] h-[200px] right-32 bottom-80 rotate-6">
                        <IconBackgroundSecurity />
                    </div>
                    <div className="absolute z-0 scale-x-[-1] w-[200px] h-[200px] right-32 bottom-80 rotate-6 blur">
                        <IconBackgroundSecurity />
                    </div>
                    <div className="absolute z-10 w-[400px] h-[400px] -top-36 left-32">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-0 w-[400px] h-[400px] -top-36 left-32 blur">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-10 w-[100px] h-[100px] bottom-40 right-96">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-0 w-[100px] h-[100px] bottom-40 right-96 blur">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-10 w-[250px] h-[250px] -bottom-0 right-10">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-0 w-[250px] h-[250px] -bottom-0 right-10 blur">
                        <IconBackgroundCircle />
                    </div>
                </>
            </div>
        </div>
    );
}
