import { useNavigate, useParams } from "react-router-dom";

import IconBook from "../icons/IconBook";

import IconEmptyFlag from "../icons/IconEmptyFlag";
import IconFullFlag from "../icons/IconFullFlag";

import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";
import IconBackgroundLaptopRotate from "../icons/backgrounds/IconBackgroundLaptopRotate";
import IconBackgroundKeyboard from "../icons/backgrounds/IconBackgroundKeyboard";
import IconBackgroundLaptopDiagram from "../icons/backgrounds/IconBackgroundLaptopDiagram";
import IconBackgroundCoding from "../icons/backgrounds/IconBackgroundCoding";
import IconBackgroundSecurity from "../icons/backgrounds/IconBackgroundSecurity";
import IconBackgroundLaptop from "../icons/backgrounds/IconBackgroundLaptop";

export default function Main({ setIsAuthenticated, setIsLogInFormOpen }) {
    const navigate = useNavigate();
    const params = useParams();

    function handleButtonClick(theme) {
        navigate(`/${theme}`);
    }

    function handleHandbookClick(section) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            navigate(`/handbook/${section}`);
        } else {
            setIsLogInFormOpen(true);
        }
    }

    function renderContent() {
        switch (params.theme) {
            case "JSbasics":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4 ">
                                <button
                                    onClick={() => handleHandbookClick("section_JSbasics")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Суммирование чисел
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Переворот строки
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Поиск максимального элемента в массиве
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Фильтрация массива
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Счетчик символов
                                </button>
                            </div>
                        </div>
                        <>
                            <div className="absolute h-36 w-36 left-[630px] top-[150px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 left-[630px] top-[150px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 left-[630px] top-[290px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 left-[630px] top-[290px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-44 w-44 left-[430px] bottom-[70px] -rotate-3 z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-44 w-44 left-[430px] bottom-[70px] -rotate-3 z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-36 w-36 left-[480px] top-[90px] z-10">
                                <IconBackgroundKeyboard />
                            </div>
                            <div className="absolute h-36 w-36 left-[480px] top-[90px] z-0 blur">
                                <IconBackgroundKeyboard />
                            </div>
                            <div className="absolute h-44 w-44 right-[260px] bottom-[120px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-44 w-44 right-[260px] bottom-[120px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-20 w-20 right-[190px] bottom-[110px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-20 w-20 right-[190px] bottom-[110px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 right-[240px] top-[200px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 right-[240px] top-[200px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 right-[60px] bottom-[260px] z-10 scale-x-[-1]">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute h-40 w-40 right-[60px] bottom-[260px] z-0 blur scale-x-[-1]">
                                <IconBackgroundLaptopDiagram />
                            </div>
                        </>
                    </div>
                );
            case "objects":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4 ">
                                <button
                                    onClick={() => handleHandbookClick("section_objects")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                            </div>
                        </div>
                        <>
                            <div className="absolute w-44 h-44 top-0 left-[450px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-44 h-44 top-0 left-[450px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[150px] left-[610px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[150px] left-[610px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-44 h-44 -bottom-10 left-[540px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-44 h-44 -bottom-10 left-[540px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-20 h-20 bottom-[280px] left-[420px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-20 h-20 bottom-[280px] left-[420px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[190px] left-[520px] z-10">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[190px] left-[520px] z-0 blur">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[190px] right-[260px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[190px] right-[260px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-16 h-16 bottom-[130px] right-[240px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-16 h-16 bottom-[130px] right-[240px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[130px] right-[100px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[130px] right-[100px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-44 h-44 scale-x-[-1] top-[200px] right-[90px] z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute w-44 h-44 scale-x-[-1] top-[200px] right-[90px] z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                        </>
                    </div>
                );
            case "datatypes":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4 ">
                                <button
                                    onClick={() => handleHandbookClick("section_datatypes")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                            </div>
                        </div>
                        <>
                            <div className="absolute h-36 w-36 bottom-[100px] left-[640px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[100px] left-[640px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-16 w-16 bottom-[230px] left-[600px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-16 w-16 bottom-[230px] left-[600px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-44 w-44 top-[100px] left-[410px] z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-44 w-44 top-[100px] left-[410px] z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-10 w-10 top-[270px] left-[410px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-10 w-10 top-[270px] left-[410px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[90px] left-[430px] z-10">
                                <IconBackgroundCoding />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[90px] left-[430px] z-0 blur">
                                <IconBackgroundCoding />
                            </div>
                            <div className="absolute h-40 w-40 top-[270px] right-[270px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 top-[270px] right-[270px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -top-5 right-[100px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -top-5 right-[100px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-14 w-14 top-[170px] right-[90px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-14 w-14 top-[170px] right-[90px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-20 w-20 bottom-[60px] right-[240px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-20 w-20 bottom-[60px] right-[240px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 bottom-[120px] right-[50px] z-10 scale-x-[-1]">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute h-40 w-40 bottom-[120px] right-[50px] z-0 blur scale-x-[-1]">
                                <IconBackgroundLaptopDiagram />
                            </div>
                        </>
                    </div>
                );
            case "functions":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4 ">
                                <button
                                    onClick={() => handleHandbookClick("section_functions")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                            </div>
                        </div>
                        <>
                            <div className="absolute w-28 h-28 top-10 left-[400px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-28 h-28 top-10 left-[400px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[160px] left-[400px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-10 h-10 top-[160px] left-[400px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-48 h-48 top-[300px] left-[600px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-48 h-48 top-[300px] left-[600px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-14 h-14 bottom-[100px] left-[420px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-14 h-14 bottom-[100px] left-[420px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-40 h-40 top-[140px] left-[530px] scale-x-[-1] z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute w-40 h-40 top-[140px] left-[530px] scale-x-[-1] z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute w-36 h-36 bottom-[200px] left-[420px] -rotate-2 z-10">
                                <IconBackgroundSecurity />
                            </div>
                            <div className="absolute w-36 h-36 bottom-[200px] left-[420px] -rotate-2 z-0 blur">
                                <IconBackgroundSecurity />
                            </div>
                            <div className="absolute w-52 h-52 top-[160px] right-[250px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-52 h-52 top-[160px] right-[250px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-20 h-20 top-[350px] right-[250px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-20 h-20 top-[350px] right-[250px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-32 h-32 -bottom-5 right-[100px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-32 h-32 -bottom-5 right-[100px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute w-44 h-44 top-[190px] right-[40px] scale-x-[-1] z-10">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute w-44 h-44 top-[190px] right-[40px] scale-x-[-1] z-0 blur">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[100px] right-[150px] z-10">
                                <IconBackgroundKeyboard />
                            </div>
                            <div className="absolute w-40 h-40 bottom-[100px] right-[150px] z-0 blur">
                                <IconBackgroundKeyboard />
                            </div>
                        </>
                    </div>
                );
            case "inheritance":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4">
                                <button
                                    onClick={() => handleHandbookClick("section_inheritance")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                            </div>
                        </div>
                        <>
                            <div className="absolute h-52 w-52 -bottom-[50px] left-[450px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-52 w-52 -bottom-[50px] left-[450px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-16 w-16 bottom-[170px] left-[420px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-16 w-16 bottom-[170px] left-[420px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 top-[170px] left-[630px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 top-[170px] left-[630px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[190px] left-[530px] z-10">
                                <IconBackgroundCoding />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[190px] left-[530px] z-0 blur">
                                <IconBackgroundCoding />
                            </div>
                            <div className="absolute h-44 w-44 top-[150px] left-[400px] -rotate-2 z-10">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-44 w-44 top-[150px] left-[400px] -rotate-2 z-0 blur">
                                <IconBackgroundLaptopRotate />
                            </div>
                            <div className="absolute h-40 w-40 -top-5 right-[130px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-40 w-40 -top-5 right-[130px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[140px] right-[250px] z-10">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 bottom-[140px] right-[250px] z-0 blur">
                                <IconBackgroundCircle />
                            </div>
                            <div className="absolute h-36 w-36 top-[200px] right-[130px] scale-x-[-1] z-10">
                                <IconBackgroundSecurity />
                            </div>
                            <div className="absolute h-36 w-36 top-[200px] right-[130px] scale-x-[-1] z-0 blur">
                                <IconBackgroundSecurity />
                            </div>
                            <div className="absolute h-44 w-44 bottom-[60px] right-[50px] rotate-2 scale-x-[-1] z-10">
                                <IconBackgroundLaptopDiagram />
                            </div>
                            <div className="absolute h-44 w-44 bottom-[60px] right-[50px] rotate-2 scale-x-[-1] z-0 blur">
                                <IconBackgroundLaptopDiagram />
                            </div>
                        </>
                    </div>
                );
            case "classes":
                return (
                    <div
                        className="mt-28 flex flex-col items-center justify-center"
                        style={{ height: "calc(100% - 245.6px)" }}
                    >
                        <div className="w-[450px] h-[500px] z-20 flex flex-col bg-white border border-zinc-100 rounded-3xl shadow-sm">
                            <div className="sticky top-4 flex justify-center my-4 ">
                                <button
                                    onClick={() => handleHandbookClick("section_classes")}
                                    className="rounded-xl py-2 px-8 flex gap-3 items-center hover:bg-[#B06AB3]/15"
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
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
                                <button className="text-base font-montserrat font-medium hover:text-[#4568DC]">
                                    Задание
                                </button>
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
                );
            default:
                return (
                    <div className="mt-28 flex items-center justify-center" style={{ height: "calc(100% - 245.6px)" }}>
                        <div className="w-[480px] h-[500px] z-20 flex items-center justify-center flex-col gap-3">
                            <p className="text-justify font-montserrat text-xl font-semibold">
                                Здесь вы найдёте всё необходимое для изучения и закрепления знаний по JavaScript.{" "}
                            </p>
                            <p className="text-justify font-montserrat text-lg">
                                Каждый раздел предлагает теоретические материалы и практические задания, которые помогут
                                вам лучше усвоить информацию и развить навыки программирования.
                            </p>
                            <p className="text-justify font-montserrat text-lg">
                                Выберите раздел, который вы хотите изучить, и начните своё путешествие в мир JavaScript
                                уже сейчас!
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
                            <div className="absolute h-24 w-24 top-[80px] left-[780px] -rotate-2 z-10">
                                <IconBackgroundCoding />
                            </div>
                            <div className="absolute h-24 w-24 top-[80px] left-[780px] -rotate-2 z-0 blur">
                                <IconBackgroundCoding />
                            </div>
                        </>
                    </div>
                );
        }
    }

    return (
        <div>
            <div className="absolute inset-0 w-full h-full">
                <div className="fixed bg-white top-14 mt-14 z-50 pl-14 w-[370px] border-r-2">
                    <p className="font-montserrat text-xl font-semibold">Разделы</p>
                    <div className="mt-10 flex flex-col items-start gap-5">
                        <button
                            onClick={() => {
                                handleButtonClick("JSbasics");
                            }}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "JSbasics" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            {" "}
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "JSbasics" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Основы JavaScript
                        </button>
                        <button
                            onClick={() => handleButtonClick("objects")}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "objects" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "objects" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Объекты
                        </button>
                        <button
                            onClick={() => handleButtonClick("datatypes")}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "datatypes" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "datatypes" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Типы данных
                        </button>
                        <button
                            onClick={() => handleButtonClick("functions")}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "functions" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "functions" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Функции
                        </button>
                        <button
                            onClick={() => handleButtonClick("inheritance")}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "inheritance" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "inheritance" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Прототипы, наследование
                        </button>
                        <button
                            onClick={() => handleButtonClick("classes")}
                            className={`flex gap-2 items-center rounded-xl font-medium px-8 py-2.5 ${
                                params.theme === "classes" ? "bg-[#B06AB3]/15 text-[#B06AB3]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-[20px] w-[20px] pt-[1px]">
                                {params.theme === "classes" ? <IconFullFlag /> : <IconEmptyFlag />}
                            </div>
                            Классы
                        </button>
                    </div>
                </div>
            </div>
            <div className="ml-[370px]">{renderContent()}</div>
        </div>
    );
}
