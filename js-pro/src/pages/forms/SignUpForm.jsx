import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconClose from "../../icons/IconClose";
import IconEyeOpen from "../../icons/IconEyeOpen";
import IconEyeClose from "../../icons/IconEyeClose";

import { signUp_EP } from "../../api/api";

export default function SignUpForm({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(true);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [firstName, setFirstName] = useState(" ");
    const [secondName, setSecondName] = useState(" ");
    const [nickname, setNickname] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [nicknameError, setNicknameError] = useState("");

    const validateEmail = (email) => {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    };

    const handleSecondNameChange = (e) => {
        setSecondName(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setNicknameError("");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        setEmailError("");

        const isEmpty = e.target.value.trim() === "";

        if (!isEmpty) {
            setIsEmailInvalid(!validateEmail(e.target.value));
        } else {
            setIsEmailInvalid(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    function handleSubmit(e) {
        e.preventDefault();

        setIsEmailInvalid(isEmailInvalid);

        if (
            secondName.trim() === "" ||
            firstName.trim() === "" ||
            nickname.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            isEmailInvalid
        ) {
            return;
        }

        axios
            .post(signUp_EP, { secondName, firstName, nickname, email, password })
            .then((response) => {
                if (response.status === 201) {
                    localStorage.setItem("jwtToken", response.data.token);
                    localStorage.setItem("tokenTimestamp", Date.now().toString());
                    localStorage.setItem("tokenExpiresIn", "3600"); // Токен живет 1 час = 3600 секунд
                    console.log("User added");
                    navigate("/profile");
                    setIsSignUpFormOpen(false);
                    setIsAuthenticated(true);
                }
            })
            .catch((error) => {
                console.error("Error adding user: ", error);
                if (error.response && error.response.status === 409) {
                    const message = error.response.data;
                    if (message.includes("Email") || message.includes("Nickname")) {
                        setEmailError("Почта уже используется");
                        setNicknameError("Имя пользователя уже занято");
                    }
                }
            });
    }

    return (
        <>
            {isSignUpFormOpen && (
                <div className="w-full h-full z-50 fixed inset-0 bg-gray-700/50 flex items-center justify-center">
                    <div className="relative w-[450px] h-[650px] bg-white rounded-3xl">
                        <div className="flex items-center justify-center py-5">
                            <div className="flex items-start">
                                <div className="">
                                    <p className="font-rubik font-bold text-2xl">JSPro</p>
                                </div>
                                <div className="absolute right-5">
                                    <button onClick={() => setIsSignUpFormOpen(false)} className="h-9 w-9">
                                        <IconClose />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-9 pt-5">
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <input
                                    type="text"
                                    id="inputSecondName"
                                    className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder="Ivanov"
                                    onChange={handleSecondNameChange}
                                />
                                <label
                                    htmlFor="inputSecondName"
                                    className="absolute top-0 left-[90px] h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Фамилия</span>
                                </label>
                                {secondName === "" && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                            </div>
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <input
                                    type="text"
                                    id="inputFirstName"
                                    className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder="Ivan"
                                    onChange={handleFirstNameChange}
                                />
                                <label
                                    htmlFor="inputFirstName"
                                    className="absolute top-0 left-[90px] h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Имя</span>
                                </label>
                                {firstName === "" && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                            </div>
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <input
                                    type="text"
                                    id="inputNickname"
                                    className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder="ivanivanov"
                                    onChange={handleNicknameChange}
                                />
                                <label
                                    htmlFor="inputNickname"
                                    className="absolute top-0 left-[90px] h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Имя пользователя</span>
                                </label>
                                {nickname === "" && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                                {nicknameError && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        {nicknameError}
                                    </p>
                                )}
                            </div>
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder="email@gmail.com"
                                    onChange={handleEmailChange}
                                />
                                <label
                                    htmlFor="inputEmail"
                                    className="absolute top-0 left-[90px] h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Почта</span>
                                </label>
                                {email === "" && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                                {isEmailInvalid && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Неверный формат
                                    </p>
                                )}
                                {emailError && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        {emailError}
                                    </p>
                                )}
                            </div>
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="inputPassword"
                                    className="peer py-4 px-2 w-[270px] font-montserrat text-base placeholder:text-transparent block bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B06AB3] focus:border-[#B06AB3] rounded-lg pt-6 pb-2"
                                    placeholder="********"
                                    onChange={handlePasswordChange}
                                />
                                <label
                                    htmlFor="inputPassword"
                                    className="absolute top-0 left-[90px] h-full py-4 px-2 transition ease-in-out duration-100 text-md peer-focus:text-xs peer-focus:text-gray-600 peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-600"
                                >
                                    <span className="font-montserrat font-medium">Пароль</span>
                                </label>
                                <button
                                    type="button"
                                    disabled={!password}
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-[90px] -translate-y-1/2 py-2 px-2"
                                >
                                    {isPasswordVisible ? <IconEyeOpen /> : <IconEyeClose />}
                                </button>
                                {password === "" && (
                                    <p className="absolute font-montserrat text-sm mt-20 text-[#B06AB3] font-medium">
                                        Заполните это поле
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-center" style={{ height: "calc(100% - 524px)" }}>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="font-montserrat text-lg font-semibold bg-[#B06AB3]/15 text-[#B06AB3] text-center rounded-lg w-[270px] py-2 hover:bg-[#4568DC]/15 hover:text-[#4568DC] hover:ease-out hover:duration-200"
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
