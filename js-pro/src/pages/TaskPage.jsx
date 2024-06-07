import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

    const [attemptInfo, setAttemptInfo] = useState([]);

    const [code, setCode] = useState(" ");
    const workerRef = useRef(null);

    const [activeTab, setActiveTab] = useState("task");

    const [firstTaskId, setFirstTaskId] = useState(null);
    const [buttonTextLeft, setButtonTextLeft] = useState("Вернуться");
    const [lastTaskId, setLastTaskId] = useState(null);
    const [buttonTextRight, setButtonTextRight] = useState("Завершить");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        const handleError = (error, message) => {
            console.error(message, error);
        };

        // Загрузка задания
        axios
            .get(`http://localhost:3010/api/getTask/${taskSection}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => handleError(error, "Error fetching the task"));

        // Загрузка первого и последнего задания в разделе
        Promise.all([
            axios.get(`http://localhost:3010/api/firstTask/${taskSection}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`http://localhost:3010/api/lastTask/${taskSection}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([firstResponse, lastResponse]) => {
                if (taskSection === firstResponse.data.sectionTaskEnglish) {
                    setFirstTaskId(firstResponse.data._id);
                }
                if (taskSection === lastResponse.data.sectionTaskEnglish) {
                    setLastTaskId(lastResponse.data._id);
                }
            })
            .catch((error) => handleError(error, "Error fetching task boundaries"));
    }, [setIsAuthenticated, setIsLogInFormOpen, taskSection, id]);

    // Обновление текста кнопок
    useEffect(() => {
        setButtonTextLeft(firstTaskId && id === firstTaskId ? "Вернуться" : "Предыдущее задание");
        setButtonTextRight(lastTaskId && id === lastTaskId ? "Завершить" : "Следующее задание");
    }, [firstTaskId, lastTaskId, id]);

    // Загрузка и отправка данных пользователя
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        axios
            .get("http://localhost:3010/api/getUserDataTask", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const relevantAttempts = response.data.tasks.filter((attempt) => attempt.taskId === id);
                setAttemptInfo(relevantAttempts[0]);
            })
            .catch((error) => console.error("Error fetching user task data:", error));
    }, [id, setIsAuthenticated]);

    useEffect(() => {
        workerRef.current = new Worker();

        workerRef.current.onmessage = (e) => {
            const token = localStorage.getItem("jwtToken");
            if (e.data.success) {
                const allTestsPassed = e.data.allTestsPassed;

                const decodedToken = jwtDecode(token);
                axios
                    .post(`http://localhost:3010/api/addInformationTask/${id}`, {
                        userId: decodedToken.userId,
                        success: allTestsPassed,
                        executionTime: e.data.executionTime,
                        sizeFormatted: e.data.sizeFormatted,
                        maxPoints: task.maxPointsTask,
                        difficulty: task.difficultyTask,
                        timeRequired: task.timeLimitTask,
                        timeCompletion: e.data.executionTime,
                        memoryRequired: task.memoryLimitTask,
                        memoryCompletion: e.data.sizeFormatted,
                    })
                    .then((response) => {
                        console.log("Data saved successfully");
                        setAttemptInfo(response.data);
                        showNotifications("Ответ успешно отправлен", "success");
                    })
                    .catch((error) => {
                        console.error("Error saving data:", error);
                        if (error.response && error.response.status === 400) {
                            showNotifications("Достигнуто максимальное количество попыток", "error");
                        }
                    });
            } else {
                showNotifications("Ошибка при отправке ответа", "error");
            }
        };

        workerRef.current.onerror = (error) => {
            console.error("Worker error:", error);
        };

        return () => {
            workerRef.current.terminate();
        };
        // eslint-disable-next-line
    }, [task]);

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

    const handlePreviousTask = () => {
        axios
            .get(`http://localhost:3010/api/previousTask/${taskSection}/${id}`)
            .then((response) => {
                const previousTaskId = response.data._id;
                navigate(`/task/${taskSection}/${previousTaskId}`);
            })
            .catch((error) => {
                console.error("Error fetching previous task:", error);
                navigate(`/section/${taskSection}`);
            });
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
                navigate(`/section/${taskSection}`);
            });
    };

    return (
        <div className="h-full w-full mt-14 flex items-start justify-center">
            <div className="flex flex-col mt-5">
                <div className="mt-4 mb-3 flex justify-between">
                    <button onClick={handlePreviousTask} className="z-20 flex items-center gap-3">
                        <div className="h-10 w-10">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">{buttonTextLeft}</p>
                    </button>
                    <button onClick={handleNextTask} className="z-20 flex items-center gap-3">
                        <div className="h-10 w-10 scale-x-[-1]">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">{buttonTextRight}</p>
                    </button>
                </div>
                <div className="flex justify-between items-start gap-8">
                    <div className="z-30 w-[600px] bg-white overflow-auto min-h-[300px] max-h-[550px] px-4 py-4 flex flex-col border rounded-lg">
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
                                                {attemptInfo?.attempts?.length > 0 ? (
                                                    <div className="text-xs font-medium font-montserrat text-gray-600">
                                                        {attemptInfo.attempts[attemptInfo.attempts.length - 1]
                                                            .attemptNumber +
                                                            1 ===
                                                        4
                                                            ? attemptInfo.attempts[attemptInfo.attempts.length - 1]
                                                                  .attemptNumber
                                                            : attemptInfo.attempts[attemptInfo.attempts.length - 1]
                                                                  .attemptNumber}
                                                        /{task.attemptLimitTask}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-medium font-montserrat text-gray-600">
                                                        1/3
                                                    </span>
                                                )}
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
                                        <div className="pt-2">
                                            <div className="pt-2">
                                                <p className="font-montserrat font-semibold">Формат ввода</p>
                                                <p className="font-montserrat text-[15px]">
                                                    На первой строке должна быть объявлена переменная, содержащая
                                                    входные данные.
                                                </p>
                                            </div>
                                            <div className="pt-2">
                                                <p className="font-montserrat font-semibold">Формат вывода</p>
                                                <p className="font-montserrat text-[15px]">
                                                    Программа должна возвращать результат выполнения.
                                                </p>
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
                                    <div className="mt-3 flex flex-col">
                                        {attemptInfo === undefined && (
                                            <div className="h-full w-full flex justify-center items-center">
                                                <div className="h-[300px] flex justify-center items-center">
                                                    <p className="font-montserrat text-gray-600 opacity-70 font-semibold">
                                                        Еще нет ответов
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {attemptInfo?.attempts?.map((attemptDetail) => (
                                            <div key={attemptDetail._id} className="mt-3 flex grow justify-between">
                                                <div className="mr-20 flex items-center gap-5">
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            No.
                                                        </p>
                                                        <div className="mt-1 flex justify-center">
                                                            <p className="font-montserrat ">
                                                                {attemptDetail.attemptNumber}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                            Статус ответа
                                                        </p>
                                                        <div className="mt-1">
                                                            <p
                                                                className={`font-montserrat font-medium ${
                                                                    attemptDetail.correct === true
                                                                        ? "text-[#3CAA3C]"
                                                                        : "text-[#CE2029]"
                                                                }`}
                                                            >
                                                                {attemptDetail.correct === true ? "Верно" : "Неверно"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Время
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p key={task._id} className="font-montserrat text-sm">
                                                            {attemptDetail.timeTaken} c / {task.timeLimitTask} c
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Память
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p key={task._id} className="font-montserrat text-sm">
                                                            {attemptDetail.memoryUsed < 0.01
                                                                ? (attemptDetail.memoryUsed * 1024).toFixed(2) + " KB"
                                                                : attemptDetail.memoryUsed.toFixed(2) + " MB"}
                                                            / {task.memoryLimitTask} MB
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-montserrat text-gray-600 font-medium">
                                                        Баллы
                                                    </p>
                                                    <div className="mt-1 flex justify-center">
                                                        <p key={task._id} className="font-montserrat text-sm">
                                                            {attemptDetail.score} / {task.maxPointsTask}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="z-30 w-[510px] h-[550px] flex flex-col py-4 border rounded-lg">
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
