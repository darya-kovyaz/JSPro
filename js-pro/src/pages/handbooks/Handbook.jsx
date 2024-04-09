import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { data } from "./dataHandBook";

import "highlight.js/styles/github.css";
import hljs from "highlight.js";

import IconReturn from "../../icons/IconReturn";

export default function Handbook() {
    const navigate = useNavigate();
    const { section } = useParams();
    const sectionData = data[section];

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <div className="flex flex-col mt-14 items-center justify-start">
            <div className="flex flex-col w-[768px] mt-14">
                <div className="mb-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-3">
                        <div className="h-10 w-10">
                            <IconReturn />
                        </div>
                        <p className="font-montserrat font-medium">Вернуться</p>
                    </button>
                </div>
                <div className="overflow-auto flex justify-center items-center">
                    <span>{sectionData.content}</span>
                </div>
            </div>
        </div>
    );
}
