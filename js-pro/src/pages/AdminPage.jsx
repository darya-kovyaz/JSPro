import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";

import {
    getUserData_EP,
    uploadPhoto_EP,
    addSection_EP,
    getSections_EP,
    updateSectionIndex_EP,
    addTask_EP,
    getAllTasks_EP,
} from "../api/api";

import IconImageCamera from "../icons/IconImageCamera";
import IconEmptyEdit from "../icons/admin-panel/IconEmptyEdit";
import IconFullEdit from "../icons/admin-panel/IconFullEdit";
import IconCloseGray from "../icons/admin-panel/IconCloseGray";
import IconUp from "../icons/admin-panel/IconUp";
import IconDown from "../icons/admin-panel/IconDown";
import IconPin from "../icons/admin-panel/IconPin";

export default function AdminPage({ setIsAuthenticated, setUserPhoto }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const [titleSection, setTitleSection] = useState(" ");
    const [titleSectionEnglish, setTitleSectionEnglish] = useState(" ");
    const [allTitleSections, setAllTitleSections] = useState([]);

    const [titleTask, setTitleTask] = useState(" ");
    const [sectionTask, setSectionTask] = useState("");
    const [sectionTaskEnglish, setSectionTaskEnglish] = useState("");
    const [difficultyTask, setDifficultyTask] = useState("");
    const [maxPointsTask, setMaxPointsTask] = useState(" ");
    const [attemptLimitTask, setAttemptLimitTask] = useState(" ");
    const [memoryLimitTask, setMemoryLimitTask] = useState(" ");
    const [timeLimitTask, setTimeLimitTask] = useState(" ");
    const [descriptionTask, setDescriptionTask] = useState(" ");
    const [testCaseTask, setTestCaseTask] = useState(" ");

    const [inputExampleTask_1, setInputExampleTask_1] = useState(" ");
    const [inputExampleTask_2, setInputExampleTask_2] = useState(" ");
    const [inputExampleTask_3, setInputExampleTask_3] = useState(" ");
    const [outputExampleTask_1, setOutputExampleTask_1] = useState(" ");
    const [outputExampleTask_2, setOutputExampleTask_2] = useState(" ");
    const [outputExampleTask_3, setOutputExampleTask_3] = useState(" ");

    const [allTasks, setAllTasks] = useState([]);

    const [currentSection, setCurrentSection] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(allTasks);

    const [activeSection, setActiveSection] = useState("all");

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
                            navigate("/");
                            navigate(0);
                            setIsAuthenticated(false);
                            localStorage.removeItem("jwtToken");
                            console.log("Token not found");
                        }
                    }, 400);
                });
        } else {
            navigate("/");
            navigate(0);
            setIsAuthenticated(false);
            localStorage.removeItem("jwtToken");
            console.log("Token not found");
        }

        if (currentSection) {
            const filtered = allTasks.filter((task) => task.sectionTask === currentSection);
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(allTasks);
        }
    }, [setIsAuthenticated, navigate, allTasks, currentSection]);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.userRole !== "admin") {
                navigate("/error/404");
            }
            axios
                .get(getSections_EP)
                .then((response) => {
                    setAllTitleSections(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.status === 401) {
                        navigate("/");
                        navigate(0);
                        setIsAuthenticated(false);
                        localStorage.removeItem("jwtToken");
                        console.log("Token not found");
                    }
                });
        } else {
            navigate("/");
            navigate(0);
            setIsAuthenticated(false);
            localStorage.removeItem("jwtToken");
            console.log("Token not found");
        }
    }, [navigate, setIsAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.userRole !== "admin") {
                navigate("/error/404");
            }
            axios
                .get(getAllTasks_EP)
                .then((response) => {
                    setAllTasks(response.data);
                })

                .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.status === 401) {
                        navigate("/");
                        navigate(0);
                        setIsAuthenticated(false);
                        localStorage.removeItem("jwtToken");
                        console.log("Token not found");
                    }
                });
        } else {
            navigate("/");
            navigate(0);
            setIsAuthenticated(false);
            localStorage.removeItem("jwtToken");
            console.log("Token not found");
        }
    }, [navigate, setIsAuthenticated]);

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
        navigate(0);
    };

    function handleButtonClick(theme) {
        navigate(`/admin/${theme}`);
    }

    //Все разделы
    const handleTitleSectionChange = (e) => {
        setTitleSection(e.target.value);
    };

    const handleTitleSectionEnglishChange = (e) => {
        setTitleSectionEnglish(e.target.value);
    };

    function handleSectionSubmit(e) {
        e.preventDefault();

        if (titleSection.trim() === "" || titleSectionEnglish.trim() === "") {
            return;
        }

        axios
            .post(addSection_EP, { titleSection, titleSectionEnglish })
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

    function updateNewIndex(newIndex) {
        newIndex.forEach((section, index) => {
            axios
                .post(updateSectionIndex_EP, {
                    id: section._id,
                    newIndex: index,
                })
                .then((response) => {
                    console.log(`Index updated`);
                    navigate(0);
                })
                .catch((error) => {
                    console.error(`Failed to update index`, error);
                });
        });
    }

    function handleMoveUp(indexSection) {
        if (indexSection === 0) return;
        setAllTitleSections((prevIndex) => {
            const newIndex = [...prevIndex];
            [newIndex[indexSection], newIndex[indexSection - 1]] = [newIndex[indexSection - 1], newIndex[indexSection]];
            updateNewIndex(newIndex);
            return newIndex;
        });
    }

    function handleMoveDown(indexSection) {
        if (indexSection === allTitleSections.length - 1) return;
        setAllTitleSections((prevIndex) => {
            const newIndex = [...prevIndex];
            [newIndex[indexSection], newIndex[indexSection + 1]] = [newIndex[indexSection + 1], newIndex[indexSection]];
            updateNewIndex(newIndex);
            return newIndex;
        });
    }

    //Все задания
    const handleCurrentSection = (sectionTask, theme, section) => {
        setCurrentSection(sectionTask);
        setActiveSection(section);
        navigate(`/admin/${theme}/${section}`);
    };

    const handleAllSectionsClick = (theme) => {
        setCurrentSection(null);
        setActiveSection("all");
        navigate(`/admin/${theme}`);
    };

    // Добавить задание
    const handleTitleTaskChange = (e) => {
        setTitleTask(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSectionTask(e.target.value);
    };

    const handleSectionEnglishChange = (e) => {
        setSectionTaskEnglish(e.target.value);
    };

    const handleDifficultyChange = (e) => {
        setDifficultyTask(e.target.value);
    };

    const handleMaxPointsChange = (e) => {
        setMaxPointsTask(e.target.value);
    };

    const handleAttemptLimitChange = (e) => {
        setAttemptLimitTask(e.target.value);
    };

    const handleMemoryLimitChange = (e) => {
        setMemoryLimitTask(e.target.value);
    };

    const handleTimeLimitChange = (e) => {
        setTimeLimitTask(e.target.value);
    };

    const handleTextareaDescriptionChange = (e) => {
        setDescriptionTask(e.target.value);
    };

    const handleInputExampleChange_1 = (e) => {
        setInputExampleTask_1(e.target.value);
    };

    const handleInputExampleChange_2 = (e) => {
        setInputExampleTask_2(e.target.value);
    };

    const handleInputExampleChange_3 = (e) => {
        setInputExampleTask_3(e.target.value);
    };

    const handleOutputExampleChange_1 = (e) => {
        setOutputExampleTask_1(e.target.value);
    };

    const handleOutputExampleChange_2 = (e) => {
        setOutputExampleTask_2(e.target.value);
    };

    const handleOutputExampleChange_3 = (e) => {
        setOutputExampleTask_3(e.target.value);
    };

    const handleTestCaseChange = (value) => {
        const jsonData = JSON.parse(value);
        setTestCaseTask(jsonData);
    };

    function handleTaskDelete(taskId) {
        axios
            .delete(`http://localhost:3010/api/deleteTask/${taskId}`)
            .then((response) => {
                console.log("Section deleted successfully");
                navigate(0);
            })
            .catch((error) => {
                console.error("Error deleting section:", error);
            });
    }

    function handleTaskSubmit(e) {
        e.preventDefault();

        if (
            titleTask.trim() === "" ||
            sectionTask.trim() === "" ||
            sectionTaskEnglish.trim() === "" ||
            difficultyTask.trim() === "" ||
            maxPointsTask.trim() === "" ||
            attemptLimitTask.trim() === "" ||
            memoryLimitTask.trim() === "" ||
            timeLimitTask.trim() === "" ||
            descriptionTask.trim() === "" ||
            inputExampleTask_1.trim() === "" ||
            inputExampleTask_2.trim() === "" ||
            inputExampleTask_3.trim() === "" ||
            outputExampleTask_1.trim() === "" ||
            outputExampleTask_2.trim() === "" ||
            outputExampleTask_3.trim() === ""
        ) {
            return;
        }

        axios
            .post(addTask_EP, {
                titleTask,
                sectionTask,
                sectionTaskEnglish,
                difficultyTask,
                maxPointsTask,
                attemptLimitTask,
                memoryLimitTask,
                timeLimitTask,
                descriptionTask,
                inputExampleTask_1,
                inputExampleTask_2,
                inputExampleTask_3,
                outputExampleTask_1,
                outputExampleTask_2,
                outputExampleTask_3,
                testCaseTask,
            })
            .then((response) => {
                console.log("Task added successfully", response.data);
                navigate(0);
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
    }

    function renderContent() {
        switch (params.theme) {
            case "all_tasks":
                return (
                    <div className="mt-28 mx-20">
                        <div className="flex justify-center items-center">
                            <div className="relative z-10 flex-wrap justify-center items-center flex mb-10 gap-7">
                                <div>
                                    <button
                                        onClick={() => handleAllSectionsClick("all_tasks")}
                                        className={`z-10 font-montserrat text-sm font-medium bg-white border border-zinc-200 rounded-3xl shadow-sm py-2 px-[18px] animated-200 ${
                                            activeSection === "all"
                                                ? " text-[#B06AB3]"
                                                : "text-gray-800 hover:text-[#B06AB3]"
                                        }`}
                                    >
                                        Все разделы
                                    </button>
                                </div>
                                {allTitleSections.map((sections) => (
                                    <div key={sections._id}>
                                        <button
                                            onClick={() =>
                                                handleCurrentSection(
                                                    sections.titleSection,
                                                    "all_tasks",
                                                    sections.titleSectionEnglish
                                                )
                                            }
                                            className={`z-10 font-montserrat text-sm font-medium bg-white border border-zinc-200 rounded-3xl shadow-sm py-2 px-[18px] animated-200 ${
                                                params.section === sections.titleSectionEnglish
                                                    ? " text-[#B06AB3]"
                                                    : "text-gray-800 hover:text-[#B06AB3]"
                                            }`}
                                        >
                                            {sections.titleSection}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5">
                            {filteredTasks.map((tasks) => (
                                <div
                                    key={tasks._id}
                                    className="relative h-full w-[750px] px-4 pt-2 pb-6 rounded-lg border"
                                >
                                    <button
                                        onClick={() => handleTaskDelete(tasks._id)}
                                        className="absolute z-10 top-2 right-2 h-6 w-6"
                                    >
                                        <IconCloseGray />
                                    </button>
                                    <div className="flex gap-2 items-center mt-2 mb-5">
                                        <div className="h-5 w-5">
                                            <IconPin />
                                        </div>
                                        <p className="font-montserrat text-xl font-semibold">{tasks.titleTask}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex">
                                            <div className="relative py-4">
                                                <p className="absolute top-0 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Описание
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.descriptionTask}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-10 justify-center">
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Раздел
                                                </p>
                                                <span className="font-montserrat font-normal">{tasks.sectionTask}</span>
                                            </div>
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Сложность
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.difficultyTask}
                                                </span>
                                            </div>
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Макс. количество очков
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.maxPointsTask}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-10 justify-center">
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Лимит попыток
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.attemptLimitTask}
                                                </span>
                                            </div>
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Ограничение памяти
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.memoryLimitTask} <span>Мб</span>
                                                </span>
                                            </div>
                                            <div className="relative w-[200px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Ограничение времени
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {tasks.timeLimitTask} <span>с</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ml-[90px]">
                                                <p className="font-montserrat font-semibold">Пример No.1</p>
                                            </div>
                                            <div className="mt-2 flex gap-10 justify-center">
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Ввод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.inputExampleTask_1}
                                                    </span>
                                                </div>
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Вывод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.outputExampleTask_1}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ml-[90px]">
                                                <p className="font-montserrat font-semibold">Пример No.2</p>
                                            </div>
                                            <div className="mt-2 flex gap-10 justify-center">
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Ввод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.inputExampleTask_2}
                                                    </span>
                                                </div>
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Вывод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.outputExampleTask_2}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ml-[90px]">
                                                <p className="font-montserrat font-semibold">Пример No.3</p>
                                            </div>
                                            <div className="mt-2 flex gap-10 justify-center">
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Ввод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.inputExampleTask_3}
                                                    </span>
                                                </div>
                                                <div className="relative w-[250px] border px-2 pt-6 pb-2 rounded-lg">
                                                    <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                        Вывод
                                                    </p>
                                                    <span className="font-montserrat font-normal">
                                                        {tasks.outputExampleTask_3}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="relative border px-2 pt-6 pb-2 rounded-lg">
                                                <CodeMirror
                                                    height="200px"
                                                    width="600px"
                                                    theme={xcodeLight}
                                                    className="flex justify-center "
                                                    extensions={[javascript()]}
                                                    value={JSON.stringify(tasks.testCaseTask, null, 1)}
                                                />
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Набор тестов
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "add_tasks":
                return (
                    <div className="mt-28 mx-20">
                        <div className="flex items-start justify-between gap-5">
                            <div className="flex flex-wrap gap-8">
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputTitleTask"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleTitleTaskChange}
                                    />
                                    <label
                                        htmlFor="inputTitleTask"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Название задания</span>
                                    </label>
                                    {titleTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <select
                                        id="inputSectionTask"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        value={sectionTask}
                                        onChange={handleSectionChange}
                                    >
                                        <option value="" disabled>
                                            Выберите раздел
                                        </option>
                                        {allTitleSections.map((sections) => (
                                            <option key={sections._id}>{sections.titleSection}</option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="inputSectionTask"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Раздел</span>
                                    </label>
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <select
                                        id="inputSectionTaskEnglish"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        value={sectionTaskEnglish}
                                        onChange={handleSectionEnglishChange}
                                    >
                                        <option value="" disabled>
                                            Выберите раздел в URL
                                        </option>
                                        {allTitleSections.map((sections) => (
                                            <option key={sections._id}>{sections.titleSectionEnglish}</option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="inputSectionTaskEnglish"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Раздел в URL</span>
                                    </label>
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <select
                                        id="inputDifficulty"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        value={difficultyTask}
                                        onChange={handleDifficultyChange}
                                    >
                                        <option value="" disabled>
                                            Выберите сложность
                                        </option>
                                        <option value="Начальный">Начальный</option>
                                        <option value="Средний">Средний</option>
                                        <option value="Продвинутый">Продвинутый</option>
                                    </select>
                                    <label
                                        htmlFor="inputDifficulty"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Сложность</span>
                                    </label>
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputMaxPoints"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleMaxPointsChange}
                                    />
                                    <label
                                        htmlFor="inputMaxPoints"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Макс. количество очков</span>
                                    </label>
                                    {maxPointsTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputAttemptLimit"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleAttemptLimitChange}
                                    />
                                    <label
                                        htmlFor="inputAttemptLimit"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Лимит попыток</span>
                                    </label>
                                    {attemptLimitTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputMemoryLimit"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleMemoryLimitChange}
                                    />
                                    <label
                                        htmlFor="inputMemoryLimit"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Ограничение памяти</span>
                                    </label>
                                    {memoryLimitTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputTimeLimit"
                                        className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleTimeLimitChange}
                                    />
                                    <label
                                        htmlFor="inputTimeLimit"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Ограничение времени</span>
                                    </label>
                                    {timeLimitTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="relative w-[550px] h-full flex flex-col items-center justify-center">
                                    <textarea
                                        type="text"
                                        id="textareaDescription"
                                        className=" resize-none peer py-4 px-2 w-[550px] h-[150px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleTextareaDescriptionChange}
                                    ></textarea>
                                    <label
                                        htmlFor="textareaDescription"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Описание</span>
                                    </label>
                                    {descriptionTask === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-[156px] text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="mt-8">
                                    <p className="font-montserrat font-semibold">Пример No.1</p>
                                    <div className="mt-2 gap-2 flex justify-center">
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputInputExample_1"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleInputExampleChange_1}
                                            />
                                            <label
                                                htmlFor="inputInputExample_1"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Ввод</span>
                                            </label>
                                            {inputExampleTask_1 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputOutputExample_1"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleOutputExampleChange_1}
                                            />
                                            <label
                                                htmlFor="inputOutputExample_1"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Вывод</span>
                                            </label>
                                            {outputExampleTask_1 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="font-montserrat font-semibold">Пример No.2</p>
                                    <div className="mt-2 gap-2 flex justify-center">
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputInputExample_2"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleInputExampleChange_2}
                                            />
                                            <label
                                                htmlFor="inputInputExample_2"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Ввод</span>
                                            </label>
                                            {inputExampleTask_2 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputOutputExample_2"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleOutputExampleChange_2}
                                            />
                                            <label
                                                htmlFor="inputOutputExample_2"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Вывод</span>
                                            </label>
                                            {outputExampleTask_2 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="font-montserrat font-semibold">Пример No.3</p>
                                    <div className="mt-2 gap-2 flex justify-center">
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputInputExample_3"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleInputExampleChange_3}
                                            />
                                            <label
                                                htmlFor="inputInputExample_3"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Ввод</span>
                                            </label>
                                            {inputExampleTask_3 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative w-[270px] h-full flex flex-col items-center justify-center">
                                            <input
                                                type="text"
                                                id="inputOutputExample_3"
                                                className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                                placeholder=" "
                                                onChange={handleOutputExampleChange_3}
                                            />
                                            <label
                                                htmlFor="inputOutputExample_3"
                                                className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out text-base duration-100 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                            >
                                                <span className="font-montserrat font-medium">Вывод</span>
                                            </label>
                                            {outputExampleTask_3 === "" && (
                                                <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                                    Заполните это поле
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-8 z-10 rounded-lg pt-6 pb-1 bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3]">
                                    <div className="flex justify-center">
                                        <CodeMirror
                                            height="300px"
                                            width="550px"
                                            theme={xcodeLight}
                                            className="mt-1 flex justify-center "
                                            extensions={[javascript()]}
                                            onChange={(value) => handleTestCaseChange(value)}
                                        />
                                        <p className="absolute top-0 left-0 py-4 px-2 font-montserrat font-medium text-xs text-gray-600 -translate-y-1.5">
                                            Набор тестов
                                        </p>
                                        {testCaseTask === "" && (
                                            <p className="absolute top-0 font-montserrat text-xs mt-[340px] text-[#B06AB3] font-medium">
                                                Заполните это поле
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button
                                        onClick={handleTaskSubmit}
                                        className="z-10 animated-200 font-montserrat font-semibold rounded-lg py-2 px-5 bg-[#B06AB3]/15 text-[#B06AB3] hover:bg-[#4568DC]/15 hover:text-[#4568DC]"
                                    >
                                        Добавить задание
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "all_sections":
                return (
                    <div className="mt-28 mx-20">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col items-center justify-center gap-5">
                                {allTitleSections
                                    .sort((a, b) => a.indexSection - b.indexSection)
                                    .map((sections) => (
                                        <div key={sections._id} className="flex items-center gap-3">
                                            <div className="relative flex justify-center items-center w-[350px] h-[58px] border rounded-lg">
                                                <button onClick={() => handleSectionDelete(sections._id)}>
                                                    <div className="absolute top-2 right-2 h-5 w-5">
                                                        <IconCloseGray />
                                                    </div>
                                                </button>
                                                <div className="font-montserrat font-semibold">
                                                    {sections.titleSection}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleMoveUp(sections.indexSection)}
                                                    className="z-10 h-[15px] w-[15px]"
                                                >
                                                    <IconUp />
                                                </button>
                                                <button
                                                    onClick={() => handleMoveDown(sections.indexSection)}
                                                    className="z-10 h-[15px] w-[15px]"
                                                >
                                                    <IconDown />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="flex flex-col gap-8 items-center">
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
                                </div>
                                <div className="relative w-[300px] h-full flex flex-col items-center justify-center">
                                    <input
                                        type="text"
                                        id="inputTitleSectionEnglish"
                                        className="peer py-4 px-2 w-[300px] font-montserrat text-base placeholder:text-transparent block bg-white border border-grey-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                        placeholder=" "
                                        onChange={handleTitleSectionEnglishChange}
                                    />
                                    <label
                                        htmlFor="inputTitleSectionEnglish"
                                        className="absolute top-0 left-0 h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                    >
                                        <span className="font-montserrat font-medium">Название раздела в URL</span>
                                    </label>
                                    {titleSectionEnglish === "" && (
                                        <p className="absolute top-0 font-montserrat text-xs mt-16 text-[#B06AB3] font-medium">
                                            Заполните это поле
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSectionSubmit}
                                        className="z-10 animated-200 font-montserrat font-semibold rounded-lg py-2 px-5 bg-[#B06AB3]/15 text-[#B06AB3] hover:bg-[#4568DC]/15 hover:text-[#4568DC]"
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
                                                className={`flex animated-200 gap-2 items-center font-montserrat font-medium text-base  ${
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
                                                className={`flex animated-200 gap-2 items-center font-montserrat font-medium text-base ${
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
                                            className={`flex gap-2 animated-200 items-center font-montserrat font-medium text-base  ${
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
