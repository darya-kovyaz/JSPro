import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { getUserData_EP, uploadPhoto_EP } from "../api/api";

import IconImageCamera from "../icons/IconImageCamera";

export default function AdminPage({ setIsAuthenticated, setUserPhoto }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const fileInputRef = useRef();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.userRole !== "admin") {
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
                        setIsLoading(false);
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

    function handleButtonClick(theme) {
        navigate(`/admin/${theme}`);
    }

    function renderContent() {
        switch (params.theme) {
            case "sections":
                return (
                    <div>
                        <p>fff</p>
                    </div>
                );
            case "tasks":
                return (
                    <div>
                        <p>ffff</p>
                    </div>
                );
            default:
                return <></>;
        }
    }

    return (
        <div>
            <div className="absolute inset-0 w-full h-full">
                <div className="fixed top-14 mt-14 z-50 w-[370px] border-r-2">
                    <div className="flex justify-center">
                        {isLoading ? (
                            <div className="animate-pulse">
                                <div className="flex justify-start items-center gap-3 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="h-[24px] w-[139px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        </div>
                                        <p className="h-[20px] w-[139px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                    </div>
                                </div>
                                <div className="mt-10 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col gap-5">
                                        <button className="h-[28px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                        <button className="h-[28px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                    </div>
                                </div>
                                <div className="mt-10 py-4 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col gap-5">
                                        <button className="h-[24px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={data._id}>
                                <div className="flex justify-start items-center gap-5 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    {data.image ? (
                                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                                            <img
                                                src={`http://localhost:3010/api/getImage?imgName=${data.image}`}
                                                alt={`${data.nickname} Profile`}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer bg-black bg-opacity-20 opacity-0 hover:opacity-100 duration-300">
                                                <div className="h-[20px] w-[20px]">
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
                                        <div className="h-16 w-16 rounded-full bg-gray-300/70">
                                            <div className="rounded-full opacity-0 hover:opacity-100 hover:bg-black/10 ease-out duration-300">
                                                <div
                                                    onClick={() => {
                                                        fileInputRef.current.click();
                                                    }}
                                                    className="relative h-16 w-16 flex justify-center items-center cursor-pointer"
                                                >
                                                    <div className="h-[20px] w-[20px] flex">
                                                        <IconImageCamera />
                                                    </div>
                                                    <input
                                                        ref={fileInputRef}
                                                        className="h-20 w-20 absolute hidden rounded-full"
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
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-montserrat font-semibold">
                                                {data.secondName} {data.firstName}
                                            </p>
                                        </div>
                                        <p className="font-montserrat text-sm text-gray-800">{data.email}</p>
                                    </div>
                                </div>
                                <div className="mt-10 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col gap-5">
                                        <button
                                            onClick={() => handleButtonClick("sections")}
                                            className={`font-montserrat font-medium text-lg ${
                                                params.theme === "sections"
                                                    ? "bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text"
                                                    : "hover:bg-gradient-to-t hover:from-[#4568DC] hover:to-[#B06AB3] hover:inline-block hover:text-transparent hover:bg-clip-text"
                                            }`}
                                        >
                                            Разделы
                                        </button>
                                        <button
                                            onClick={() => handleButtonClick("tasks")}
                                            className={`font-montserrat font-medium text-lg ${
                                                params.theme === "tasks"
                                                    ? "bg-gradient-to-t from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text"
                                                    : "hover:bg-gradient-to-t hover:from-[#4568DC] hover:to-[#B06AB3] hover:inline-block hover:text-transparent hover:bg-clip-text"
                                            }`}
                                        >
                                            Задания
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-10 py-4 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col gap-5">
                                        <button
                                            onClick={handleLogout}
                                            className="font-montserrat font-semibold text-gray-800 hover:bg-gradient-to-t hover:from-[#4568DC] hover:to-[#B06AB3] hover:inline-block hover:text-transparent hover:bg-clip-text"
                                        >
                                            Выйти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="ml-[370px]">{renderContent()}</div>
        </div>
    );
}
