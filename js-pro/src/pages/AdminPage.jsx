import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { getUserData_EP, uploadPhoto_EP, addSection_EP, getSections_EP } from "../api/api";

import IconImageCamera from "../icons/IconImageCamera";
import IconEmptyEdit from "../icons/IconEmptyEdit";
import IconFullEdit from "../icons/IconFullEdit";
import IconCloseGray from "../icons/IconCloseGray";

export default function AdminPage({ setIsAuthenticated, setUserPhoto }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const [titleSection, setTitleSection] = useState(" ");
    const [allTitleSections, setAllTitleSections] = useState([]);

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

        axios
            .get(getSections_EP)
            .then((response) => {
                setAllTitleSections(response.data);
            })
            .catch((error) => console.error("There was an error retrieving the sections: ", error));
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

    const handleTitleSectionChange = (e) => {
        setTitleSection(e.target.value);
    };

    function handleSectionSubmit(e) {
        e.preventDefault();

        if (titleSection.trim() === "") {
            return;
        }

        axios
            .post(addSection_EP, { titleSection })
            .then((response) => {
                console.log("Section added successfully", response.data);
                navigate(0);
            })
            .catch((error) => console.error("Error adding section:", error));
    }

    function handleSectionDelete(sectionId) {
        axios
            .delete(`http://localhost:3010/api/deleteSection/${sectionId}`)
            .then((response) => {
                console.log("Section deleted successfully");
                navigate(0);
            })
            .catch((error) => {
                console.error("Error deleting section:", error);
            });
    }

    function renderContent() {
        switch (params.theme) {
            case "all_tasks":
                return (
                    <div>
                        <p>fff</p>
                    </div>
                );
            case "add_tasks":
                return (
                    <div className="mt-28 mx-20">
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col gap-5">
                                <div className="relative w-[250px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputTitleTask"
                                        className="peer py-4 px-2 w-[250px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        // onChange={handleEmailChange}
                                    />
                                    <label
                                        htmlFor="inputTitleTask"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Название задания</span>
                                    </label>
                                </div>
                                <div className="relative w-[250px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputSectionTask"
                                        className="peer py-4 px-2 w-[250px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        // onChange={handleEmailChange}
                                    />
                                    <label
                                        htmlFor="inputSectionTask"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Раздел</span>
                                    </label>
                                </div>
                                <div className="relative w-[250px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputDifficulty"
                                        className="peer py-4 px-2 w-[250px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        // onChange={handleEmailChange}
                                    />
                                    <label
                                        htmlFor="inputDifficulty"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Сложность</span>
                                    </label>
                                </div>
                                <div className="relative w-[250px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputMaxPoints"
                                        className="peer py-4 px-2 w-[250px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        // onChange={handleEmailChange}
                                    />
                                    <label
                                        htmlFor="inputMaxPoints"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Макс. количество очков</span>
                                    </label>
                                </div>
                            </div>
                            <div className="relative w-[550px] h-full flex flex-col items-center justify-center">
                                <textarea
                                    type="text"
                                    id="textareaDescription"
                                    className=" resize-none peer py-4 px-2 w-[550px] h-[300px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder=" "
                                ></textarea>
                                <label
                                    htmlFor="textareaDescription"
                                    className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Описание</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end my-10">
                            <button className="z-10 font-montserrat font-semibold rounded-lg py-2 px-5 bg-[#B06AB3]/15 text-[#B06AB3] hover:bg-[#4568DC]/15 hover:text-[#4568DC]">
                                Добавить задание
                            </button>
                        </div>
                    </div>
                );
            case "all_sections":
                return (
                    <div className="mt-28 mx-20">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col items-center justify-center gap-5">
                                {allTitleSections.map((sections) => (
                                    <div
                                        key={sections._id}
                                        className="relative flex justify-center items-center w-[350px] h-[58px] border rounded-lg"
                                    >
                                        <button onClick={() => handleSectionDelete(sections._id)}>
                                            <div className="absolute top-2 right-2 h-5 w-5">
                                                <IconCloseGray />
                                            </div>
                                        </button>
                                        <p className="font-montserrat font-semibold">{sections.titleSection}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="relative w-[300px] h-full flex flex-col items-center justify-center">
                                <input
                                    type="text"
                                    id="inputTitleSection"
                                    className="peer py-4 px-2 w-[300px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder=" "
                                    onChange={handleTitleSectionChange}
                                />
                                <label
                                    htmlFor="inputTitleSection"
                                    className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Название раздела</span>
                                </label>
                                {titleSection === "" && (
                                    <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                                <div className="flex justify-end my-8">
                                    <button
                                        onClick={handleSectionSubmit}
                                        className="z-10 font-montserrat font-semibold rounded-lg py-2 px-5 bg-[#B06AB3]/15 text-[#B06AB3] hover:bg-[#4568DC]/15 hover:text-[#4568DC]"
                                    >
                                        Добавить раздел
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <></>;
        }
    }

    return (
        <div>
            <div className="absolute inset-0 w-full h-full">
                <div className="fixed bg-white top-14 mt-14 z-50 w-[370px] border-r-2">
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
                                <div className="mt-5 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col items-start gap-2">
                                        <p className="h-[24px] w-[82px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        <div className="flex flex-col items-start gap-1">
                                            <p className="h-[22px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                            <p className="h-[22px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        </div>
                                        <p className="mt-2 h-[24px] w-[82px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                        <p className="h-[22px] w-[223px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                                    </div>
                                </div>
                                <div className="mt-5 py-4 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
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
                                <div className="mt-5 py-6 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
                                    <div className="flex flex-col items-start gap-2">
                                        <p className="font-montserrat font-semibold text-lg">Задания</p>
                                        <div className="flex flex-col items-start gap-1">
                                            <button
                                                onClick={() => handleButtonClick("all_tasks")}
                                                className={`flex gap-2 items-center font-montserrat font-medium text-base  ${
                                                    params.theme === "all_tasks"
                                                        ? "text-[#B06AB3]"
                                                        : "text-gray-800 hover:text-[#B06AB3]"
                                                }`}
                                            >
                                                <div className="h-[20px] w-[20px]">
                                                    {params.theme === "all_tasks" ? (
                                                        <IconFullEdit />
                                                    ) : (
                                                        <IconEmptyEdit />
                                                    )}
                                                </div>
                                                Все задания
                                            </button>
                                            <button
                                                onClick={() => handleButtonClick("add_tasks")}
                                                className={`flex gap-2 items-center font-montserrat font-medium text-base ${
                                                    params.theme === "add_tasks"
                                                        ? "text-[#B06AB3]"
                                                        : " text-gray-800 hover:text-[#B06AB3]"
                                                }`}
                                            >
                                                <div className="h-[20px] w-[20px]">
                                                    {params.theme === "add_tasks" ? (
                                                        <IconFullEdit />
                                                    ) : (
                                                        <IconEmptyEdit />
                                                    )}
                                                </div>
                                                Добавить задание
                                            </button>
                                        </div>
                                        <p className="mt-2 font-montserrat font-semibold text-lg">Разделы</p>
                                        <button
                                            onClick={() => handleButtonClick("all_sections")}
                                            className={`flex gap-2 items-center font-montserrat font-medium text-base  ${
                                                params.theme === "all_sections"
                                                    ? "text-[#B06AB3]"
                                                    : "text-gray-800 hover:text-[#B06AB3]"
                                            }`}
                                        >
                                            <div className="h-[20px] w-[20px]">
                                                {params.theme === "all_sections" ? <IconFullEdit /> : <IconEmptyEdit />}
                                            </div>
                                            Все разделы
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-5 py-4 px-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
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
