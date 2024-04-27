import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { showNotifications } from "./pullstate/Notifications";

// eslint-disable-next-line
import Worker from "worker-loader!./web-worker/worker.js";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";

import IconReturn from "../icons/IconReturn";
import IconAttach from "../icons/IconAttach";

import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";

export default function TaskPage({ setIsLogInFormOpen, setIsAuthenticated }) {
    const navigate = useNavigate();
    const { id, taskSection } = useParams();

    const [task, setTask] = useState([]);

    const [code, setCode] = useState(" ");
    const [success, setSuccess] = useState(" ");
    const workerRef = useRef(null);

    const [activeTab, setActiveTab] = useState("task");

    const [firstTaskId, setFirstTaskId] = useState(null);
    const [buttonTextLeft, setButtonTextLeft] = useState("Вернуться");
    const [lastTaskId, setLastTaskId] = useState(null);
    const [buttonTextRight, setButtonTextRight] = useState("Завершить");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            axios
                .get(`http://localhost:3010/api/getTask/${taskSection}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setTask(response.data);
                    if (!firstTaskId) {
                        setFirstTaskId(response.data._id);
                    }
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
            axios
                .get(`http://localhost:3010/api/lastTask/${taskSection}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (taskSection === response.data.sectionTaskEnglish) {
                        setLastTaskId(response.data._id);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching the last task ID:", error);
                });
        } else {
            navigate("/");
            navigate(0);
            setIsLogInFormOpen(true);
            setIsAuthenticated(false);
            localStorage.removeItem("jwtToken");
            console.log("Token not found");
        }

        if (firstTaskId && id === firstTaskId) {
            setButtonTextLeft("Вернуться");
        } else {
            setButtonTextLeft("Предыдущее задание");
        }

        if (lastTaskId && id === lastTaskId) {
            setButtonTextRight("Завершить");
        } else {
            setButtonTextRight("Следующее задание");
        }

        workerRef.current = new Worker();

        workerRef.current.onmessage = (e) => {
            if (e.data.success) {
                const anyTestPassed = e.data.testResults.some((test) => test.passed);
                setSuccess(anyTestPassed);
                showNotifications("Ответ успешно отправлен", "success");
                //console.log("Sanitized Code:", e.data);
            } else {
                showNotifications("Ошибка при отправке ответа", "error");
                //console.error("Error in worker:", e.data.error);
            }
        };

        workerRef.current.onerror = (error) => {
            console.error("Worker error:", error);
        };

        return () => {
            workerRef.current.terminate();
        };
    }, [navigate, code, setIsAuthenticated, setIsLogInFormOpen, id, firstTaskId, lastTaskId, taskSection]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleCheckCode = () => {
        if (workerRef.current) {
            const tests = task.testCaseTask;
            workerRef.current.postMessage({ tests: tests, code: code });
        }
    };

    const handleCodeChange = (value) => {
        setCode(value);
        setIsButtonDisabled(!value.trim());
    };

    const handleNextTask = () => {
        axios
            .get(`http://localhost:3010/api/nextTask/${taskSection}/${id}`)
            .then((response) => {
                const nextTaskId = response.data._id;
                navigate(`/task/${taskSection}/${nextTaskId}`);
            })
            .catch((error) => {
                console.error("Error fetching next task:", error);
                navigate("/");
            });
    };

    return (
        <div className="h-full w-full mt-14 flex items-start justify-center">
            <div className="flex flex-col mt-5">
                <div className="mt-4 mb-3 flex justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-3">
                        <div className="h-10 w-10">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">{buttonTextLeft}</p>
                    </button>
                    <button onClick={handleNextTask} className="flex items-center gap-3">
                        <div className="h-10 w-10 scale-x-[-1]">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">{buttonTextRight}</p>
                    </button>
                </div>
                <div className="flex justify-between items-start gap-8">
                    <div className="w-[600px] overflow-auto min-h-[300px] max-h-[550px] px-4 py-4 flex flex-col border rounded-lg">
                        <div className="w-[265px] pb-2 flex gap-5 border-b-[1px]">
                            <button
                                onClick={() => handleTabChange("task")}
                                className={`animated-100 font-montserrat text-sm font-medium  ${
                                    activeTab === "task" ? "text-[#B06AB3]" : "text-gray-600 hover:text-black"
                                }`}
                            >
                                Задача
                            </button>
                            <button
                                onClick={() => handleTabChange("answers")}
                                className={`animated-100 font-montserrat text-sm font-medium  ${
                                    activeTab === "answers" ? "text-[#B06AB3]" : "text-gray-600 hover:text-black"
                                }`}
                            >
                                Предоставленные ответы
                            </button>
                        </div>
                        <div>
                            <div key={task._id}>
                                {activeTab === "task" && (
                                    <div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-[22px] w-[22px]">
                                                    <IconAttach />
                                                </div>
                                                <p className="font-montserrat text-xl font-semibold">
                                                    {task.titleTask}
                                                </p>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className="text-xs font-medium font-montserrat text-gray-600">
                                                    Попытка:
                                                </p>
                                                <span className="text-xs font-medium font-montserrat text-gray-600">
                                                    1/{task.attemptLimitTask}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pt-4 flex gap-1">
                                            <p className="text-xs font-medium font-montserrat text-gray-600">
                                                Уровень сложности:
                                            </p>
                                            <span
                                                className={`text-xs font-medium font-montserrat ${
                                                    task.difficultyTask === "Начальный"
                                                        ? "text-[#3CAA3C]"
                                                        : task.difficultyTask === "Средний"
                                                        ? "text-[#FFB300]"
                                                        : task.difficultyTask === "Продвинутый"
                                                        ? "text-[#CE2029]"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {task.difficultyTask}
                                            </span>
                                        </div>
                                        <div className="pt-2">
                                            <div className="flex items-center">
                                                <span className="font-montserrat text-justify">
                                                    {task.descriptionTask}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="pt-7">
                                                <div className="flex flex-col">
                                                    <p className="font-montserrat font-semibold">Пример No.1</p>
                                                    <div className="mt-2  flex gap-5 justify-center">
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Ввод
                                                            </p>
                                                            <span
                                                                id="hs-clipboard-basic"
                                                                className="font-montserrat font-normal"
                                                            >
                                                                {task.inputExampleTask_1}
                                                            </span>
                                                        </div>
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Вывод
                                                            </p>
                                                            <span className="font-montserrat font-normal">
                                                                {task.outputExampleTask_1}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-7">
                                                <div className="flex flex-col">
                                                    <p className="font-montserrat font-semibold">Пример No.2</p>
                                                    <div className="mt-2  flex gap-5 justify-center">
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Ввод
                                                            </p>
                                                            <span
                                                                id="hs-clipboard-basic"
                                                                className="font-montserrat font-normal"
                                                            >
                                                                {task.inputExampleTask_2}
                                                            </span>
                                                        </div>
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Вывод
                                                            </p>
                                                            <span className="font-montserrat font-normal">
                                                                {task.outputExampleTask_2}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-7">
                                                <div className="flex flex-col">
                                                    <p className="font-montserrat font-semibold">Пример No.3</p>
                                                    <div className="mt-2  flex gap-5 justify-center">
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Ввод
                                                            </p>
                                                            <span
                                                                id="hs-clipboard-basic"
                                                                className="font-montserrat font-normal"
                                                            >
                                                                {task.inputExampleTask_3}
                                                            </span>
                                                        </div>
                                                        <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                            <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                                Вывод
                                                            </p>
                                                            <span className="font-montserrat font-normal">
                                                                {task.outputExampleTask_3}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 pt-7 flex gap-5 justify-center">
                                            <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Ограничение времени
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {task.timeLimitTask} c
                                                </span>
                                            </div>
                                            <div className="relative w-[270px] border px-2 pt-6 pb-2 rounded-lg">
                                                <p className="absolute top-0 px-1 py-1 left-0 text-xs font-medium font-montserrat text-gray-600">
                                                    Ограничение памяти
                                                </p>
                                                <span className="font-montserrat font-normal">
                                                    {task.memoryLimitTask} Мб
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "answers" && (
                                    <div className="flex">
                                        {success === " " && (
                                            <div className="h-full w-full flex justify-center items-center">
                                                <div className="h-[300px] flex justify-center items-center">
                                                    <p className="font-montserrat text-gray-600 opacity-70 font-semibold">
                                                        Еще нет ответов
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {success === true && (
                                            <div className="mt-3 flex grow justify-between">
                                                <div className="mr-20 flex items-center gap-5">
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            No.
                                                        </p>
                                                        <div className="mt-1 flex justify-center">
                                                            <p className="font-montserrat ">1</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            Статус ответа
                                                        </p>
                                                        <div className="mt-1">
                                                            <p className="font-montserrat font-medium text-[#3CAA3C]">
                                                                Верно
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Время
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p className="font-montserrat text-sm">
                                                            3/{task.timeLimitTask} c
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Память
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p className="font-montserrat text-sm">
                                                            3/{task.memoryLimitTask} Мб
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Баллы
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p className="font-montserrat text-sm">
                                                            3/{task.attemptLimitTask}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {success === false && (
                                            <div className="mt-3 flex grow justify-between">
                                                <div className="flex gap-5">
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            No.
                                                        </p>
                                                        <div className="mt-1 flex justify-center">
                                                            <p className="font-montserrat ">1</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            Статус ответа
                                                        </p>
                                                        <div className="mt-1">
                                                            <p className="font-montserrat font-medium text-[#CE2029]">
                                                                Неверно
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Баллы
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p className="font-montserrat">0/{task.attemptLimitTask}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-[510px] h-[550px] flex flex-col py-4 border rounded-lg">
                        <div className="flex items-center cm-focused">
                            <CodeMirror
                                height="450px"
                                width="508px"
                                theme={xcodeLight}
                                extensions={[javascript()]}
                                onChange={(value) => handleCodeChange(value)}
                            />
                        </div>
                        <div className="flex justify-end pr-4 mt-5">
                            <button
                                disabled={isButtonDisabled}
                                onClick={handleCheckCode}
                                className={`animated-200 rounded-xl py-2 px-5 font-montserrat text-lg font-semibold ${
                                    isButtonDisabled
                                        ? "bg-gray-200 text-gray-600"
                                        : "bg-[#B06AB3]/15 text-[#B06AB3] hover:bg-[#4568DC]/15 hover:text-[#4568DC]"
                                }`}
                            >
                                Проверить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <div className="absolute h-40 w-40 top-[100px] -left-20 z-10">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-40 w-40 top-[100px] -left-20 z-0 blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-10 w-10 top-[250px] left-[40px] z-10">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-10 w-10 top-[250px] left-[40px] z-0 blur">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-40 w-40 -top-5 right-[30px] z-10">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-40 w-40 -top-5 right-[30px] z-0 blur">
                    <IconBackgroundCircle />
                </div>
            </>
        </div>
    );
}
