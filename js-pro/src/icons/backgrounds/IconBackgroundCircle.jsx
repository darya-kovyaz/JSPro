import React from "react";

export default function IconBackgroundCircle() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <defs>
                <linearGradient
                    id="color-1"
                    x1="15.002"
                    x2="33.584"
                    y1="6.494"
                    y2="42.647"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#4568dc"></stop>
                    <stop offset="1" stopColor="#b06ab3"></stop>
                </linearGradient>
            </defs>
            <path
                fill="url(#color-1)"
                strokeMiterlimit="10"
                d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
                fontFamily="none"
                fontSize="none"
                fontWeight="none"
                textAnchor="none"
                transform="scale(5.33333)"
            ></path>
        </svg>
    );
}
