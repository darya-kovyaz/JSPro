import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import IconReturn from "../icons/IconReturn";
import IconAttach from "../icons/IconAttach";

import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";

export default function TaskPage() {
    const navigate = useNavigate();

    // const [code, setCode] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const onChange = React.useCallback((value, viewUpdate) => {
        // setCode(value);
        setIsButtonDisabled(!value.trim());
    }, []);

    return (
        <div className="h-full mt-14 flex items-start justify-center">
            <div className="flex flex-col w-[900px] mt-14">
                <div className="mb-5 flex justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-3">
                        <div className="h-10 w-10">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">Вернуться</p>
                    </button>
                    <button onClick={() => navigate()} className="flex items-center gap-3">
                        <div className="h-10 w-10 scale-x-[-1]">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">Следующее задание</p>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-[22px] w-[22px]">
                        <IconAttach />
                    </div>
                    <p className="font-montserrat text-xl font-semibold">Название задания</p>
                </div>
                <div className="mt-10">
                    <div>
                        <span className="font-montserrat text-lg text-justify">Текст задания</span>
                    </div>
                </div>
                <div className="flex justify-center my-10 cm-focused">
                    <CodeMirror
                        height="200px"
                        width="800px"
                        theme="light"
                        extensions={[javascript({ jsx: true })]}
                        onChange={onChange}
                    />
                </div>
                <div className="flex justify-end mt-5">
                    <button
                        disabled={isButtonDisabled}
                        className={`rounded-xl shadow py-2 px-8 font-montserrat text-lg font-medium ${
                            isButtonDisabled ? "bg-gray-200 text-gray-600" : "bg-[#B06AB3]/15 text-[#B06AB3]"
                        }`}
                    >
                        Проверить
                    </button>
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
                <div className="absolute h-52 w-52 -top-5 right-[40px] z-10">
                    <IconBackgroundCircle />
                </div>
                <div className="absolute h-52 w-52 -top-5 right-[40px] z-0 blur">
                    <IconBackgroundCircle />
                </div>
            </>
        </div>
    );
}
