import IconBackgroundLaptop from "../icons/backgrounds/IconBackgroundLaptop";
import IconBackgroundExclamation from "../icons/backgrounds/IconBackgroundExclamation";
import IconBackgroundCircle from "../icons/backgrounds/IconBackgroundCircle";

export default function AboutPage() {
    return (
        <div className="h-full mt-14 flex items-center">
            <div className="flex flex-col gap-10 px-96 pt-14">
                <div className="pl-28 z-30">
                    <p className="font-montserrat text-4xl font-bold">О проекте</p>
                </div>
                <>
                    <div className="w-[250px] h-[250px] absolute z-10 left-16 -rotate-12 bottom-32">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="w-[250px] h-[250px] absolute z-0 left-16 -rotate-12 bottom-32 blur">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="w-[200px] h-[200px] absolute z-10 left-[1250px] scale-x-[-1] -rotate-12 bottom-54">
                        <IconBackgroundExclamation />
                    </div>
                    <div className="w-[200px] h-[200px] absolute z-0 left-[1250px] scale-x-[-1] -rotate-12 bottom-54 blur">
                        <IconBackgroundExclamation />
                    </div>
                    <div className="w-[300px] h-[300px] absolute z-10 -left-28 top-0">
                        <IconBackgroundCircle />
                    </div>
                    <div className="w-[300px] h-[300px] absolute z-0 -left-28 top-0 blur">
                        <IconBackgroundCircle />
                    </div>

                    <div className="w-[250px] h-[250px] absolute z-10 -bottom-24 right-0">
                        <IconBackgroundCircle />
                    </div>
                    <div className="w-[250px] h-[250px] absolute z-0 -bottom-24 right-0 blur">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-10 h-[90px] w-[90px] bottom-[180px] right-[230px]">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-0 h-[90px] w-[90px] bottom-[180px] right-[230px] blur">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-10 h-[50px] w-[50px] top-[150px] left-[230px]">
                        <IconBackgroundCircle />
                    </div>
                    <div className="absolute z-0 h-[50px] w-[50px] top-[150px] left-[230px] blur">
                        <IconBackgroundCircle />
                    </div>
                </>
                <div className="z-10 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-montserrat font-semibold text-xl bg-gradient-to-b from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                Цель проекта
                            </p>
                        </div>
                        <div>
                            <p className="font-montserrat text-lg text-justify">
                                Цель данного проекта - сделать процесс изучения JavaScript{" "}
                                <span className="font-semibold text-[#3355d0] italic">увлекательным</span>,{" "}
                                <span className="font-semibold text-[#3355d0] italic">доступным</span> и
                                <span className="font-semibold text-[#3355d0] italic"> эффективным</span> для всех. Без
                                сомнений, каждый должен иметь возможность освоить основы программирования, и этот
                                веб-сервис поможет в этом.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-montserrat font-semibold text-xl bg-gradient-to-b from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                Как начать
                            </p>
                        </div>
                        <div>
                            <p className="font-montserrat text-lg text-justify">
                                Для начала увлекательного путешествия в мир JavaScript просто зарегистрируйтесь на
                                веб-сервисе и начните изучение. Не требуется никаких дополнительных программ или
                                скачиваний - все необходимое доступно{" "}
                                <span className="font-semibold text-[#3355d0] italic">прямо в вашем браузере</span>.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-montserrat font-semibold text-xl bg-gradient-to-b from-[#4568DC] to-[#B06AB3] inline-block text-transparent bg-clip-text">
                                Миссия
                            </p>
                        </div>
                        <div>
                            <p className="font-montserrat text-lg text-justify">
                                Миссия данного проекта состоит в том, чтобы сделать программирование{" "}
                                <span className="font-semibold text-[#3355d0] italic">доступным</span> для каждого,{" "}
                                <span className="font-semibold text-[#3355d0] italic">
                                    независимо от их уровня
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
