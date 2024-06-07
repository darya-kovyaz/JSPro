import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { getSections_EP, getAllTasks_EP, updateRating_EP } from "../api/api";

import IconBook from "../icons/IconBook";

import IconEmptyFlag from "../icons/IconEmptyFlag";
import IconFullFlag from "../icons/IconFullFlag";

import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";
import IconBackgroundLaptopRotate from "../icons/backgrounds/IconBackgroundLaptopRotate";
import IconBackgroundKeyboard from "../icons/backgrounds/IconBackgroundKeyboard";
import IconBackgroundLaptop from "../icons/backgrounds/IconBackgroundLaptop";

export default function Main({ setIsLogInFormOpen }) {
    const navigate = useNavigate();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [allTitleTasks, setAllTitleTasks] = useState([]);
    const [allTitleSections, setAllTitleSections] = useState([]);

    useEffect(() => {
        axios.get(getSections_EP).then((response) => {
            setTimeout(() => {
                setIsLoading(false);
                setAllTitleSections(response.data);
            }, 400);
        });

        axios
            .get(getAllTasks_EP)
            .then((response) => {
                setTimeout(() => {
                    const tasksBySection = response.data.reduce((acc, task) => {
                        acc[task.sectionTaskEnglish] = [...(acc[task.sectionTaskEnglish] || []), task];
                        return acc;
                    }, {});

                    setIsLoading(false);
                    setAllTitleTasks(tasksBySection);
                }, 300);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });

        axios.post(updateRating_EP);
    }, []);

    function handleButtonClick(theme) {
        navigate(`/section/${theme}`);
    }

    function handleHandbookClick(section) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            navigate(`/handbook/${section}`);
        } else {
            setIsLogInFormOpen(true);
        }
    }

    function handleTaskClick(taskId, taskSection) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            navigate(`/task/${taskSection}/${taskId}`);
        } else {
            setIsLogInFormOpen(true);
        }
    }

    function renderContent() {
        const currentSectionTasks = allTitleTasks[params.theme];

        return (
            <div className="mt-28 flex flex-col items-center justify-center" style={{ height: "calc(100% - 245.6px)" }}>
                {isLoading ? (
                    <div>
                        <div className="relative w-[450px] h-[500px] z-30 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="animate-pulse sticky top-4 flex justify-center my-4">
                                <div className="h-[28px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                            <div className=" animate-pulse flex-1 flex flex-col justify-center items-center gap-9">
                                <button className="h-[24px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                <button className="h-[24px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                <button className="h-[24px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                <button className="h-[24px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                                <button className="h-[24px] w-[250px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></button>
                            </div>
                        </div>
                        <>
                            <div className="absolute h-52 w-52 -top-[50px] left-[470px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -top-[50px] left-[470px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 top-[160px] left-[630px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 top-[160px] left-[630px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 bottom-[120px] left-[630px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 bottom-[120px] left-[630px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 top-[230px] left-[460px] -rotate-2 z-10">
                                <IconBackgroundLaptop />
                            </div>
                            <div className="absolute h-40 w-40 top-[230px] left-[460px] -rotate-2 z-0 blur">
                                <IconBackgroundLaptop />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[100px] left-[440px] scale-x-[-1] z-10">
                                <IconBackgroundKeyboard />
                            </div>
                            <div className="absolute h-28 w-28 top-[140px] right-[290px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-28 w-28 top-[140px] right-[290px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -bottom-10 right-[100px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -bottom-10 right-[100px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 bottom-[120px] right-[100px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 bottom-[120px] right-[100px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 top-[260px] right-[70px] scale-x-[-1] z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-40 w-40 top-[260px] right-[70px] scale-x-[-1] z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                        </>
                    </div>
                ) : (
                    <div>
                        {currentSectionTasks ? (
                            <div>
                                <div className="relative w-[450px] h-[500px] z-30 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                                    <div className="sticky top-4 flex justify-center my-4">
                                        <button
                                            onClick={() => handleHandbookClick(params.theme)}
                                            className="animated-200 rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
                                        >
                                            <div className="h-8 w-8">
                                                <IconBook className="h-8 w-8" />
                                            </div>
                                            <p className="text-lg uppercase font-montserrat font-medium text-[#B06AB3]">
                                                Справочник
                                            </p>
                                        </button>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center items-center gap-9">
                                        {currentSectionTasks.map((task) => (
                                            <div key={task._id}>
                                                <button
                                                    onClick={() => handleTaskClick(task._id, task.sectionTaskEnglish)}
                                                    className="animated-200 text-base font-montserrat font-medium hover:text-[#4568DC]"
                                                >
                                                    {task.titleTask}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <>
                                    <div className="absolute h-52 w-52 -top-[50px] left-[470px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-52 w-52 -top-[50px] left-[470px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 top-[160px] left-[630px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 top-[160px] left-[630px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 bottom-[120px] left-[630px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 bottom-[120px] left-[630px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 top-[230px] left-[460px] -rotate-2 z-10">
                                        <IconBackgroundLaptop />
                                    </div>
                                    <div className="absolute h-40 w-40 top-[230px] left-[460px] -rotate-2 z-0 blur">
                                        <IconBackgroundLaptop />
                                    </div>
                                    <div className="absolute h-36 w-36 bottom-[100px] left-[440px] scale-x-[-1] z-10">
                                        <IconBackgroundKeyboard />
                                    </div>
                                    <div className="absolute h-28 w-28 top-[140px] right-[290px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-28 w-28 top-[140px] right-[290px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-52 w-52 -bottom-10 right-[100px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-52 w-52 -bottom-10 right-[100px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 bottom-[120px] right-[100px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 bottom-[120px] right-[100px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 top-[260px] right-[70px] scale-x-[-1] z-10">
                                        <IconBackgroundLaptopRotate />
                                    </div>
                                    <div className="absolute h-40 w-40 top-[260px] right-[70px] scale-x-[-1] z-0 blur">
                                        <IconBackgroundLaptopRotate />
                                    </div>
                                </>
                            </div>
                        ) : (
                            <div
                                className="mt-14 flex items-center justify-center"
                                style={{ height: "calc(100% - 245.6px)" }}
                            >
                                <div className="w-[480px] z-20 flex items-center justify-center flex-col gap-3">
                                    <p className="text-justify font-montserrat text-xl font-semibold">
                                        Здесь вы найдёте всё необходимое для изучения и закрепления знаний по
                                        JavaScript.{" "}
                                    </p>
                                    <p className="text-justify font-montserrat text-lg">
                                        Каждый раздел предлагает теоретические материалы и практические задания, которые
                                        помогут вам лучше усвоить информацию и развить навыки программирования.
                                    </p>
                                    <p className="text-justify font-montserrat text-lg">
                                        Выберите раздел, который вы хотите изучить, и начните своё путешествие в мир
                                        JavaScript уже сейчас!
                                    </p>
                                </div>
                                <>
                                    <div className="absolute h-56 w-56 -top-[50px] right-[90px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-56 w-56 -top-[50px] right-[90px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 top-[150px] right-[90px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-10 w-10 top-[150px] right-[90px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 -bottom-[10px] left-[450px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 -bottom-[10px] left-[450px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-20 w-20 top-[270px] left-[580px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-20 w-20 top-[270px] left-[580px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-9 w-9 top-[220px] left-[580px] z-10">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-9 w-9 top-[220px] left-[580px] z-0 blur">
                                        <IconBackgroundCircle />
                                    </div>
                                    <div className="absolute h-40 w-40 bottom-[140px] right-[100px] scale-x-[-1] z-10">
                                        <IconBackgroundLaptop />
                                    </div>
                                    <div className="absolute h-40 w-40 bottom-[140px] right-[100px] scale-x-[-1] z-0 blur">
                                        <IconBackgroundLaptop />
                                    </div>
                                </>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="absolute inset-0 w-full h-full">
                <div className="fixed bg-white top-14 mt-14 z-50 pl-14 w-[370px] border-r-2">
                    {isLoading ? (
                        <div className="animate-pulse">
                            <p className="h-[35px] w-[290px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></p>
                            <div className="mt-10 flex flex-col items-start gap-5">
                                <div className="my-1.5 h-[29px] w-[230px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="my-1.5 h-[29px] w-[160px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="my-1.5 h-[29px] w-[190px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="my-1.5 h-[29px] w-[160px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                                <div className="my-1.5 h-[29px] w-[280px] rounded-full bg-gradient-to-r from-[#4568DC]/70 to-[#B06AB3]/70"></div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="font-montserrat text-xl font-semibold">Разделы</p>
                            <div className="mt-10 flex flex-col items-start gap-5">
                                {allTitleSections
                                    .sort((a, b) => a.indexSection - b.indexSection)
                                    .map((sections) => (
                                        <div key={sections._id}>
                                            <button
                                                onClick={() => handleButtonClick(sections.titleSectionEnglish)}
                                                className={`animated-200 flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                                    params.theme === sections.titleSectionEnglish
                                                        ? "bg-[#B06AB3]/15 text-[#B06AB3]"
                                                        : "hover:bg-gray-100"
                                                }`}
                                            >
                                                <div className="h-[20px] w-[20px] pt-[1px]">
                                                    {params.theme === sections.titleSectionEnglish ? (
                                                        <IconFullFlag />
                                                    ) : (
                                                        <IconEmptyFlag />
                                                    )}
                                                </div>
                                                {sections.titleSection}
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="ml-[370px]">{renderContent()}</div>
        </div>
    );
}
