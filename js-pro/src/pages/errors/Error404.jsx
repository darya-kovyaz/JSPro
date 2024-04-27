import { useNavigate } from "react-router-dom";

export default function Error404() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    };
    return (
        <div className="h-screen w-full flex items-center justify-center z-50 fixed bg-white">
            <div className="h-full w-[900px] flex flex-col justify-center gap-5">
                <span className="font-montserrat text-3xl font-semibold">
                    Ой! Кажется, мы не можем найти эту страницу.
                </span>
                <span className="font-montserrat text-xl font-medium">
                    К сожалению, страница, которую вы ищете, не существует или была перемещена. Возможно, вы неправильно
                    ввели адрес или перешли по устаревшей ссылке.
                </span>
                <span className="font-montserrat text-xl font-medium">
                    Вернитесь на{" "}
                    <button onClick={handleButtonClick} className="text-[#B06AB3]/85 hover:text-[#B06AB3] animated-200">
                        главную страницу
                    </button>{" "}
                    и попробуйте начать сначала.
                </span>
            </div>
        </div>
    );
}
