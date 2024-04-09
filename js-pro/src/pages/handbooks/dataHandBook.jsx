import IconBackgroundLaptop from "../../icons/backgrounds/IconBackgroundLaptop";
import IconBackgroundServer from "../../icons/backgrounds/IconBackgroundServer";
import IconBackgroundLaptopDiagram from "../../icons/backgrounds/IconBackgroundLaptopDiagram";
import IconBackgroundInterface from "../../icons/backgrounds/IconBackgroundInterface";
import IconBackgroundCoding from "../../icons/backgrounds/IconBackgroundCoding";
import IconBackgroundLaptopRotate from "../../icons/backgrounds/IconBackgroundLaptopRotate";
import IconBackgroundKeyboard from "../../icons/backgrounds/IconBackgroundKeyboard";
import IconBackgroundPhone from "../../icons/backgrounds/IconBackgroundPhone";
import IconBackgroundExclamation from "../../icons/backgrounds/IconBackgroundExclamation";

import IconAttach from "../../icons/IconAttach";

export const data = {
    section_JSbasics: {
        title: "Основы JavaScript",
        content: (
            <div className="">
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">Справочник по основам JavaScript</p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с основами JavaScript, чтобы открыть для себя мир веб-разработки и научиться
                        создавать динамичные, интерактивные веб-страницы
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Переменные</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Переменные в JavaScript используются для хранения данных, которые могут изменяться во
                                время выполнения программы. Они объявляются с помощью ключевых слов <code>let</code> или{" "}
                                <code>const</code>.
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <span className="font-montserrat">
                                <code>let</code> - используется для объявления переменных, которые могут изменяться.
                            </span>
                            <p className="font-montserrat">
                                <code>const</code> - используется для объявления констант, значения которых не могут
                                быть изменены после инициализации.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Типы данных</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Переменная в JavaScript может содержать любые данные. В один момент там может быть
                                строка, а в другой – число.
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <p className="font-montserrat">
                                <code>number</code> - для любых чисел: целочисленных или чисел с плавающей точкой.
                            </p>
                            <p className="font-montserrat">
                                <code>string</code> - для представления текстовой информации и могут включать любой
                                набор символов, заключённых в кавычки.
                            </p>
                            <p className="font-montserrat">
                                <code>boolean</code> - для <code>true / false</code>.
                            </p>
                            <p className="font-montserrat">
                                <code>undefined</code> - представляет переменную, которой не было присвоено значение.
                            </p>
                            <p className="font-montserrat">
                                <code>null</code> - используется для обозначения отсутствия какого-либо объектного
                                значения.
                            </p>
                            <p className="font-montserrat">
                                <code>object</code> - коллекции данных и/или функциональности, состоящие из набора пар
                                ключ-значение.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Функции</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Функции в JavaScript используются для группировки кода, который можно многократно
                                вызывать. Функции объявляются с помощью ключевого слова <code>function</code>.
                            </p>
                        </div>
                        <div className="my-3 flex gap-1 justify-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">function </span>
                                    {` имяФункции(параметры) {`}
                                </p>
                                <p>
                                    <span className="ml-5 hljs-comment">{`// тело функции`} </span>
                                </p>
                                <p>{`}`}</p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Циклы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Циклы используются для многократного выполнения блока кода.
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <p className="font-montserrat">
                                <code>for</code> - используется, когда известно, сколько раз должен выполниться блок
                                кода.
                            </p>
                            <p className="font-montserrat">
                                <code>while</code> - выполняется, пока заданное условие истинно.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Условные операторы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Условные операторы <code>if</code>, <code>else if</code>, <code>else</code> используются
                                для выполнения различных блоков кода в зависимости от условий.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="flex flex-col language-javascript">
                                <div className="flex gap-1">
                                    <span className="hljs-keyword">if </span> {` (условие) {`}
                                </div>
                                <span className="ml-5 hljs-comment">{`// блок кода, выполняемый, если условие истинно`}</span>
                                {`}`}
                                <div className="flex gap-1">
                                    <span className="hljs-keyword">else </span> {`{`}
                                </div>
                                <span className="ml-5 hljs-comment">{`// блок кода, выполняемый, если условие ложно`}</span>
                                {`}`}
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Работа со строками и массивами</p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <p className="font-montserrat">
                                Для работы со строками можно использовать методы, такие как <code>.length</code> для
                                определения длины строки или <code>.charAt()</code> для получения символа на
                                определенной позиции.
                            </p>
                            <p className="font-montserrat">
                                Массивы предоставляют методы для работы с коллекциями данных, например,{" "}
                                <code>.push()</code> для добавления элемента в конец массива или <code>.filter()</code>{" "}
                                для фильтрации массива по определенному критерию.
                            </p>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-52 w-52 top-[300px] left-[90px] -rotate-2 z-10">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="absolute h-52 w-52 top-[300px] left-[90px] -rotate-2 z-0 blur">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="absolute h-48 w-48 top-[700px] right-[90px] z-10">
                        <IconBackgroundServer />
                    </div>
                    <div className="absolute h-48 w-48 top-[700px] right-[90px] z-0 blur">
                        <IconBackgroundServer />
                    </div>
                    <div className="absolute h-52 w-52 top-[1200px] left-[90px] z-10">
                        <IconBackgroundLaptopDiagram />
                    </div>
                    <div className="absolute h-52 w-52 top-[1200px] left-[90px] z-0 blur">
                        <IconBackgroundLaptopDiagram />
                    </div>
                </>
            </div>
        ),
    },
    section_objects: {
        title: "Объекты",
        content: (
            <div>
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">
                            Справочник по работе с объектами в JavaScript
                        </p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с объектами как с основным способом структурирования сложных данных через пары
                        ключ-значение в JavaScript
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Объекты</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Объекты в JavaScript — это коллекции пар ключ-значение. Они используются для хранения
                                разнородных данных и сложных сущностей. Объекты создаются с помощью фигурных скобок{" "}
                                <code>{`{}`}</code>.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let </span>
                                    {` person = {`}
                                </p>
                                <p>
                                    <span className="ml-5 hljs-attr">name</span>
                                    {`:`} <span className="hljs-string">"Алексей"</span>
                                    {`,`}
                                </p>
                                <p>
                                    <span className="ml-5 hljs-attr">age</span>
                                    {`:`} <span className="hljs-string">30</span>
                                </p>
                                <p>{`}`}</p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Доступ к свойствам</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Доступ к свойствам объекта можно получить двумя способами: через точку <code>.</code>{" "}
                                или квадратные скобки <code>[]</code>.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let </span>
                                    {` name = person.name;`} <span className="hljs-comment">{`// через точку`}</span>
                                </p>
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let </span>
                                    {` age = person["`}
                                    <span className="hljs-string">age</span>
                                    {`"];`} <span className="hljs-comment">{`// через квадратные скобки`}</span>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Изменение объектов</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Вы можете изменять объекты, добавляя, изменяя или удаляя свойства.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    {`person.email = `}
                                    <span className="hljs-string">"alexey@example.com"</span>
                                    {`;`}
                                    <span className="hljs-comment">{`// добавление нового свойства`}</span>
                                </p>
                                <p className="flex gap-1">
                                    {`person.age = `}
                                    <span className="hljs-number">31</span>
                                    {`;`}
                                    <span className="hljs-comment">{`// изменение существующего свойства`}</span>
                                </p>
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">delete</span>
                                    {`person.age;`}
                                    <span className="hljs-comment">{`// удаление свойства`}</span>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Методы объекта</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Методы объекта — это функции, связанные с объектом. Они определяются так же, как и
                                другие свойства объекта, но их значения являются функциями.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let </span>
                                    {` user = {`}
                                </p>
                                <p>
                                    <span className="ml-5 hljs-attr">name</span>
                                    {`:`} <span className="hljs-string">"Алексей"</span>
                                    {`,`}
                                </p>
                                <p>
                                    <span className="ml-5 hljs-title">greet</span>
                                    {`() {`}
                                </p>
                                <p>
                                    <span className=" ml-10 hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <span className="hljs-string">"Привет, "</span> {`+`}{" "}
                                    <span className="hljs-variable">this</span>
                                    {`.name);`}
                                </p>
                                <p className="ml-5">{`}`}</p>
                                <p>{`};`}</p>
                                <p>
                                    {`user.`}
                                    <span className="hljs-title">greet</span>
                                    {`();`} <span className="hljs-comment">{`// вызов метода объекта`}</span>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Массивы объектов</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Массивы объектов управляются так же, как и массивы примитивных типов, но они предлагают
                                дополнительную гибкость для работы со сложными данными.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let </span>
                                    {` users = [{`} <span className="hljs-attr">name</span>
                                    {`:`}
                                    <span className="hljs-string">"Алексей"</span>
                                    {`,`}
                                    <span className="hljs-attr">age</span>
                                    {`:`}
                                    <span className="hljs-number">30</span>
                                    {`}, {`}
                                    <span className="hljs-attr">name</span>
                                    {`:`}
                                    <span className="hljs-string">"Ирина"</span>
                                    {`,`}
                                    <span className="hljs-attr">age</span>
                                    {`:`}
                                    <span className="hljs-number">25</span>
                                    {`}];`}
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-52 w-52 top-[600px] left-[90px] z-10">
                        <IconBackgroundCoding />
                    </div>
                    <div className="absolute h-52 w-52 top-[600px] left-[90px] z-0 blur">
                        <IconBackgroundCoding />
                    </div>
                    <div className="absolute h-40 w-40 top-[150px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundLaptopDiagram />
                    </div>
                    <div className="absolute h-40 w-40 top-[150px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundLaptopDiagram />
                    </div>
                    <div className="absolute h-44 w-44 top-[1100px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundLaptopRotate />
                    </div>
                    <div className="absolute h-44 w-44 top-[1100px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundLaptopRotate />
                    </div>
                </>
            </div>
        ),
    },
    section_datatypes: {
        title: "Типы данных",
        content: (
            <div>
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">
                            Справочник по работе с типами данных в JavaScript
                        </p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с разнообразием и особенностями типов данных в JavaScript, а также узнайте более
                        сложные структуры данных, чтобы понять, как хранить, изменять и взаимодействовать с ними
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Определение типа данных</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Используйте оператор <code>typeof</code> для определения типа переменной или значения.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex gap-1">
                                        <span className="hljs-keyword">typeof</span>{" "}
                                        <span className="hljs-string">"Hello"</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`);`}
                                        <span className="hljs-comment">{` // "string"`}</span>
                                    </div>
                                </p>
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex gap-1">
                                        <span className="hljs-keyword">typeof</span>{" "}
                                        <span className="hljs-number">32</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`);`}
                                        <span className="hljs-comment">{` // "number"`}</span>
                                    </div>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Преобразование типов</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                JavaScript допускает преобразование типов данных, как явное, так и неявное. Явное
                                преобразование выполняется с помощью функций, таких как <code>String()</code>,{" "}
                                <code>Number()</code>, и <code>Boolean()</code>. Неявное преобразование происходит
                                автоматически, когда контекст операции требует определенного типа.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p>
                                    <span className="hljs-comment">{`// явное преобразование`}</span>
                                </p>
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`numberAsString = `}
                                    <span className="hljs-string">"123"</span>
                                    {`;`}
                                </p>
                                <p className="flex">
                                    <div className="flex gap-1">
                                        <span className="hljs-keyword">let</span>
                                        {`convertedNumber = `}
                                    </div>
                                    <span className="hljs-title">Number</span>
                                    {`(numberAsString);`}
                                </p>
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex gap-1">
                                        <span className="hljs-keyword">typeof</span> {`convertedNumber);`}
                                        <span className="hljs-comment">{` // "number"`}</span>
                                    </div>
                                </p>
                            </code>
                        </div>
                        <div className="ml-28 my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p>
                                    <span className="hljs-comment">{`// неявное преобразование`}</span>
                                </p>
                                <p className="flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`result = `}
                                    <span className="hljs-string">"3"</span>
                                    {`+`} <span className="hljs-number">2</span>
                                    {`;`} <span className="hljs-comment">{`// "32"`}</span>
                                </p>
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(result);`}
                                    <span className="hljs-comment">{` // неявное преобразование числа в строку`}</span>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Сравнение</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Используйте <code>==</code> для нестрогого сравнения (с преобразованием типов) и{" "}
                                <code>===</code> для строгого сравнения (без преобразования типов).
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <p>
                                    <span className="hljs-comment">{`// нестрогое сравнение`}</span>
                                </p>
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex gap-1">
                                        <span className="hljs-string">"2"</span>
                                        {"=="}
                                        <span className="hljs-number">2</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`);`}
                                        <span className="hljs-comment">{` // true, происходит преобразование типов`}</span>
                                    </div>
                                </p>
                                <p className="mt-3">
                                    <span className="hljs-comment">{`// строгое сравнение`}</span>
                                </p>
                                <p className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex gap-1">
                                        <span className="hljs-string">"2"</span>
                                        {"==="}
                                        <span className="hljs-number">2</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`);`}
                                        <span className="hljs-comment">{` // false, типы различны`}</span>
                                    </div>
                                </p>
                            </code>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-48 w-48 top-[300px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundInterface />
                    </div>
                    <div className="absolute h-48 w-48 top-[300px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundInterface />
                    </div>
                    <div className="absolute h-48 w-48 top-[800px] left-[90px] z-10">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="absolute h-48 w-48 top-[800px] left-[90px] z-0 blur">
                        <IconBackgroundLaptop />
                    </div>
                </>
            </div>
        ),
    },
    section_functions: {
        title: "Функции",
        content: (
            <div>
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">
                            Справочник по работе с функциями в JavaScript
                        </p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с функциями в JavaScript, чтобы научиться создавать повторно используемые блоки
                        кода, улучшая структуру и эффективность вашего программирования
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Функциональные выражения</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Функцию можно определить и через функциональное выражение, присвоив анонимную функцию
                                переменной.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-attr">const</span>
                                    {`square = `}
                                    <span className="hljs-keyword">function</span>
                                    {`(number) {`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-variable">return</span>
                                    {`number * number;`}
                                </span>
                                <span>{`};`}</span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex">
                                        <span className="hljs-title">square</span>
                                        {"("}
                                        <span className="hljs-number">4</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`));`}
                                        <span className="hljs-comment">{` // вывод: 16`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Стрелочные функции</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Стрелочные функции предоставляют сокращённый синтаксис для написания функциональных
                                выражений.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-attr">const</span>
                                    <span className="hljs-title">add</span>
                                    {`= (a, b) => a + b;`}
                                </span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex">
                                        <span className="hljs-title">add</span>
                                        {"("}
                                        <span className="hljs-number">5</span>
                                        <div className="flex gap-1">
                                            {`,`}
                                            <span className="hljs-number">3</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {`));`}
                                        <span className="hljs-comment">{` // вывод: 8`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Параметры по умолчанию</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Функции могут иметь параметры по умолчанию, которые используются, если при вызове
                                функции отсутствует соответствующий аргумент.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">function</span>
                                    <div className="flex">
                                        <span className="hljs-title">createUser</span>
                                        {`(name, age = `}
                                    </div>
                                    <div className="flex">
                                        <span className="hljs-number">16</span>
                                        {`) {`}
                                    </div>
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-variable">return</span>
                                    {`{`}
                                    <span className="hljs-attr">name</span>
                                    {`: name, `}
                                    <span className="hljs-attr">age</span>
                                    {": age };"}
                                </span>
                                <span>{`}`}</span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex">
                                        <span className="hljs-title">createUser</span>
                                        {"("}
                                        <span className="hljs-string">"Алексей"</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`));`}
                                        <span className="hljs-comment">{` // вывод: { name: "Алексей", age: 18 }`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Асинхронные функции</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Асинхронные функции в JavaScript позволяют работать с асинхронным кодом так, как будто
                                он синхронный. Это достигается за счёт использования ключевых слов <code>async</code> и{" "}
                                <code>await</code>.
                            </p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <span className="font-montserrat">
                                <code>async</code> - превращает функцию в асинхронную, что означает, что эта функция
                                возвращает промис.
                            </span>
                            <p className="font-montserrat">
                                <code>await</code> - используется для ожидания результата асинхронной операции, не
                                блокируя выполнение остального кода.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">async</span>
                                    <span className="hljs-keyword">function</span>
                                    <div className="flex">
                                        <span className="hljs-title">fetchData</span>
                                        {`(url) { `}
                                    </div>
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`response = `} <span className="hljs-keyword">await</span>
                                    <div className="flex">
                                        <span className="hljs-keyword">fetch</span>
                                        {`(url);`}
                                    </div>
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`data = `} <span className="hljs-keyword">await</span>
                                    <div className="flex">
                                        {`response.`}
                                        <span className="hljs-title">json</span>
                                        {`();`}
                                    </div>
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-variable">return</span>
                                    {`data;`}
                                </span>
                                <span>{`}`}</span>
                            </code>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-52 w-52 top-[400px] right-[90px] z-10 scale-x-[-1]">
                        <IconBackgroundLaptopRotate />
                    </div>
                    <div className="absolute h-52 w-52 top-[400px] right-[90px] z-0 blur scale-x-[-1]">
                        <IconBackgroundLaptopRotate />
                    </div>
                    <div className="absolute h-40 w-40 top-[150px] left-[90px] z-10">
                        <IconBackgroundKeyboard />
                    </div>
                    <div className="absolute h-40 w-40 top-[150px] left-[90px] z-0 blur">
                        <IconBackgroundKeyboard />
                    </div>
                    <div className="absolute h-40 w-40 top-[860px] left-[90px] z-10">
                        <IconBackgroundInterface />
                    </div>
                    <div className="absolute h-40 w-40 top-[860px] left-[90px] z-0 blur">
                        <IconBackgroundInterface />
                    </div>
                </>
            </div>
        ),
    },
    section_inheritance: {
        title: "Прототипы, наследование",
        content: (
            <div>
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">
                            Справочник по работе с прототипами и наследованием в JavaScript
                        </p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с механизмом прототипов и наследования в JavaScript, который позволяет объектам
                        наследовать свойства и методы от других объектов, обеспечивая мощный способ повторного
                        использования и расширения кода
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Прототипы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                В JavaScript объекты наследуют свойства и методы от других объектов через механизм
                                прототипов. Каждый объект имеет прототип, который является другим объектом, от которого
                                он наследует свойства.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`animal = {`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">eats</span>
                                        {`:`}
                                    </div>
                                    <span className="hljs-literal">true</span>
                                    {`,`}
                                </span>
                                <span className="ml-5 flex">
                                    <span className="hljs-title">walk</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex">
                                        <span className="hljs-string">"Животное идет"</span>
                                        {");"}
                                    </div>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`};`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`rabbit = `}
                                    <div className="flex">
                                        <span className="hljs-title">Object</span>
                                        {`.`}
                                        <span className="hljs-title">create</span>
                                        {`(animal);`}
                                    </div>
                                    <span className="hljs-comment">{` // 'rabbit' наследует от 'animal'`}</span>
                                </span>
                                <span className="flex gap-1">
                                    {`rabbit.jump = `}
                                    <span className="hljs-literal">true</span>
                                    {`;`}
                                    <span className="hljs-comment">{` // добавляем свойство 'rabbit'`}</span>
                                </span>
                                <span className="mt-5 flex">
                                    {`rabbit.`}
                                    <span className="hljs-title">walk</span>
                                    <div className="flex gap-1">
                                        {`();`}
                                        <span className="hljs-comment">{` // используется метод из прототипа'animal'`}</span>
                                    </div>
                                </span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    <div className="flex gap-1">
                                        {`(rabbit.eats);`}
                                        <span className="hljs-comment">{` // true`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Конструкторы и функции-конструкторы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Функции-конструкторы используются для создания объектов. При вызове с оператором{" "}
                                <code>new</code>, функция-конструктор создает новый объект, и <code>this</code> внутри
                                функции ссылается на этот новосозданный объект.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">function</span>
                                    <div className="flex">
                                        <span className="hljs-title">User</span>
                                        {`(name) {`}
                                    </div>
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">this</span>
                                        {`.name = name;`}
                                    </div>
                                </span>
                                <span className="ml-5 flex">
                                    <span className="hljs-attr">this</span>
                                    <div className="flex gap-1">
                                        {`.sayHi = `}
                                        <span className="hljs-keyword">function</span>
                                    </div>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <div className="flex">
                                        <div className="flex gap-1">
                                            <span className="hljs-string">"Привет, "</span>
                                            {"+"}
                                            <span className="hljs-attr">this</span>
                                        </div>
                                        {`.name);`}
                                    </div>
                                </span>
                                <span className="ml-5">{`};`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`user = `}
                                    <span className="hljs-keyword">new</span>
                                    <div className="flex">
                                        <span className="hljs-title">User</span>
                                        {`(`}
                                        <span className="hljs-string">"Алексей"</span>
                                        {`);`}
                                    </div>
                                </span>
                                <span className="flex">
                                    {`user. `}
                                    <span className="hljs-title">sayHi</span>
                                    {`();`}
                                    <span className="hljs-comment">{` // Привет, Алексей`}</span>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Классы</p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <p className="text-base font-montserrat">
                                Синтаксис классов предоставляет более чистый и понятный способ создания конструкторов и
                                обработки наследования.
                            </p>
                            <p className="text-base font-montserrat">
                                Классы могут наследовать свойства и методы от других классов с помощью ключевого слова{" "}
                                <code>extends</code>.
                            </p>
                            <p className="text-base font-montserrat">
                                Метод <code>super</code> используется для вызова конструктора родительского класса.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Animal</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">constructor</span>
                                        {`(name) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.name = name; `}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex">
                                    <span className="hljs-title">speak</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`('`}
                                    <span className="hljs-subs flex">
                                        {`$`}
                                        {`{`}
                                        <span className="hljs-variable">this</span>
                                        {`.name} издает звук.');`}
                                    </span>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Dog</span>
                                    <span className="hljs-keyword">extends</span>
                                    <span className="hljs-title">Animal</span> {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">constructor</span>
                                        {`(name) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">super</span>
                                    <div className="flex gap-1">
                                        {`(name);`}
                                        <span className="hljs-comment">{`// вызывает конструктор родительского класса`}</span>
                                    </div>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex">
                                    <span className="hljs-title">speak</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`('`}
                                    <span className="hljs-subs flex">
                                        {`$`}
                                        {`{`}
                                        <span className="hljs-variable">this</span>
                                        {`.name} лает.');`}
                                    </span>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`dog = `}
                                    <span className="hljs-keyword">new</span>
                                    <div className="flex">
                                        <span className="hljs-title">Dog</span>
                                        {`(`}
                                        <span className="hljs-string">"Рекс"</span>
                                        {`);`}
                                    </div>
                                </span>
                                <span className="flex">
                                    {`dog. `}
                                    <span className="hljs-title">speak</span>
                                    <div className="flex gap-1">
                                        {`();`}
                                        <span className="hljs-comment">{` // Рекс лает.`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Переопределение методов</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                В наследуемом объекте можно переопределить методы родительского объекта, сохраняя при
                                этом возможность вызова метода родительского объекта через <code>super</code>.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Animal</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex">
                                    <span className="hljs-title">speak</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <span className="hljs-string flex">"Животное издает звук"</span>
                                    {`);`}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Dog</span>
                                    <span className="hljs-keyword">extends</span>
                                    <span className="hljs-title">Animal</span> {`{`}
                                </span>
                                <span className="ml-5 flex">
                                    <span className="hljs-title">speak</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">super</span>
                                    {`.`}
                                    <span className="hljs-title">speak</span>
                                    <div className="flex gap-1">
                                        {`();`}
                                        <span className="hljs-comment">{`// вызов метода из родительского класса`}</span>
                                    </div>
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <span className="hljs-string flex">"Собака лает"</span>
                                    {`);`}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`dog = `}
                                    <span className="hljs-keyword">new</span>
                                    <div className="flex">
                                        <span className="hljs-title">Dog</span>
                                        {`();`}
                                    </div>
                                </span>
                                <span className="flex">
                                    {`dog. `}
                                    <span className="hljs-title">speak</span>
                                    {`();`}
                                </span>
                                <span className="hljs-comment">{` // Животное издает звук`}</span>
                                <span className="hljs-comment">{` // Собака лает`}</span>
                            </code>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-44 w-44 top-[180px] right-[90px] z-10 scale-x-[-1]">
                        <IconBackgroundLaptopRotate />
                    </div>
                    <div className="absolute h-44 w-44 top-[180px] right-[90px] z-0 blur scale-x-[-1]">
                        <IconBackgroundLaptopRotate />
                    </div>
                    <div className="absolute h-48 w-48 top-[700px] left-[90px] z-10">
                        <IconBackgroundPhone />
                    </div>
                    <div className="absolute h-48 w-48 top-[700px] left-[90px] z-0 blur">
                        <IconBackgroundPhone />
                    </div>
                    <div className="absolute h-44 w-44 top-[1300px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundServer />
                    </div>
                    <div className="absolute h-44 w-44 top-[1300px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundServer />
                    </div>
                    <div className="absolute h-48 w-48 top-[1800px] left-[90px] z-10">
                        <IconBackgroundLaptop />
                    </div>
                    <div className="absolute h-48 w-48 top-[1800px] left-[90px] z-0 blur">
                        <IconBackgroundLaptop />
                    </div>
                </>
            </div>
        ),
    },
    section_classes: {
        title: "Классы",
        content: (
            <div>
                <div className="border-b-2 pb-6">
                    <div className="mb-4">
                        <p className="text-xl font-montserrat font-bold">
                            Справочник по работе с классами в JavaScript
                        </p>
                    </div>
                    <p className="text-base font-montserrat font-medium text-gray-800 text-justify">
                        Ознакомьтесь с классами в JavaScript как с мощным средством для структурирования и организации
                        вашего кода
                    </p>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Классы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Класс определяется с помощью ключевого слова <code>class</code>.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Person</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">constructor</span>
                                        {`(name, age) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.name = name; `}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.age = age; `}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex">
                                    <span className="hljs-title">greet</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    <div className="flex gap-1">
                                        {`('Привет, меня зовут`}
                                        <span className="hljs-subs flex">
                                            {`$`}
                                            {`{`}
                                            <span className="hljs-variable">this</span>
                                            {`.name}, мне `}
                                            {`$`}
                                            {`{`}
                                        </span>
                                    </div>
                                    <span className="hljs-variable">this</span>
                                    {`.age}, лет.');`}
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Статические методы и свойства</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Статические методы и свойства принадлежат самому классу, а не его экземплярам. Они
                                вызываются на самом классе.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Utils</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <span className="hljs-keyword">static</span>
                                    <div className="flex">
                                        <span className="hljs-title">max</span>
                                        {`(a, b) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex gap-1">
                                    <span className="hljs-keyword">return</span>
                                    {`a > b ? a : b;`}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(`}
                                    <span className="hljs-title">Utils</span>
                                    {`.`}
                                    <span className="hljs-title">max</span>
                                    {`(`}
                                    <span className="hljs-number">10</span>
                                    <div className="flex gap-1">
                                        {`,`}
                                        <span className="hljs-number">20</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {`));`}
                                        <span className="hljs-comment">{`// 20`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Геттеры и сеттеры</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                Геттеры и сеттеры позволяют определить методы для получения <code>get</code> и установки{" "}
                                <code>set</code> значений, которые работают как обычные свойства объекта.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Rectangle</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-attr">constructor</span>
                                        {`(width, height) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.width = width; `}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.height = height; `}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex gap-1">
                                    <span className="hljs-keyword">get</span>
                                    <div className="flex">
                                        <span className="hljs-title">area</span>
                                        {`() {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex gap-1">
                                    <span className="hljs-keyword">return</span>
                                    <div className="flex">
                                        <span className="hljs-variable">this</span>
                                        {`.width`}
                                    </div>
                                    {`*`}
                                    <div className="flex">
                                        <span className="hljs-variable">this</span>
                                        {`.height;`}
                                    </div>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex gap-1">
                                    <span className="hljs-keyword">set</span>
                                    <div className="flex">
                                        <span className="hljs-title">area</span>
                                        {`(value) {`}
                                    </div>
                                </span>
                                <span className="ml-10 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-variable">this</span>
                                        {`.width = `}
                                    </div>
                                    <div className="flex">
                                        <span className="hljs-title">Math</span>
                                        {`.`}
                                        <span className="hljs-title">sqrt</span>
                                        {`(value);`}
                                    </div>
                                </span>
                                <span className="ml-10 flex gap-1">
                                    <div className="flex">
                                        <span className="hljs-variable">this</span>
                                        {`.height = `}
                                    </div>
                                    <div className="flex">
                                        <span className="hljs-variable">this</span>
                                        {`.width;`}
                                    </div>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`rect = `}
                                    <span className="hljs-keyword">new</span>
                                    <div className="flex">
                                        <span className="hljs-title">Rectangle</span>
                                        {`(`}
                                        <span className="hljs-number">4</span>
                                        <div className="flex gap-1">
                                            {`,`}
                                            <span className="hljs-number">5</span>
                                        </div>
                                        {`);`}
                                    </div>
                                </span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    <div className="flex gap-1">
                                        {`(rect.area);`}
                                        <span className="hljs-comment">{`// 20`}</span>
                                    </div>
                                </span>
                                <span className="flex">
                                    <div className="flex gap-1">
                                        {`rect.area = `}
                                        <span className="hljs-number">36</span>
                                    </div>
                                    {`;`}
                                </span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    <div className="flex gap-1">
                                        {`(rect.width);`}
                                        <span className="hljs-comment">{`// 6`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="h-[20px] w-[20px]">
                                <IconAttach />
                            </div>
                            <p className="text-lg font-montserrat font-semibold">Приватные поля и методы</p>
                        </div>
                        <div>
                            <p className="text-base font-montserrat">
                                В классах можно определить приватные поля и методы, которые недоступны за пределами
                                класса, используя <code>#</code> перед именем.
                            </p>
                        </div>
                        <div className="my-3 flex flex-col gap-1 items-center">
                            <code className="language-javascript flex flex-col">
                                <span className="flex gap-1">
                                    <span className="hljs-keyword">class</span>
                                    <span className="hljs-title">Counter</span>
                                    {`{`}
                                </span>
                                <span className="ml-5 flex gap-1">
                                    {`#count = `}
                                    <div className="flex">
                                        <span className="hljs-number">0</span>
                                        {`;`}
                                    </div>
                                </span>
                                <span className="mt-5 ml-5 flex">
                                    <span className="hljs-title">increment</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex">
                                    <span className="hljs-attr">this</span>
                                    {`.#count++;`}
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span className="mt-5 ml-5 flex">
                                    <span className="hljs-title">getCount</span>
                                    {`() {`}
                                </span>
                                <span className="ml-10 flex gap-1">
                                    <span className="hljs-keyword">return</span>
                                    <div className="flex">
                                        <span className="hljs-attr">this</span>
                                        {`.#count;`}
                                    </div>
                                </span>
                                <span className="ml-5">{`}`}</span>
                                <span>{`}`}</span>
                                <span className="mt-5 flex gap-1">
                                    <span className="hljs-keyword">let</span>
                                    {`counter = `}
                                    <span className="hljs-keyword">new</span>
                                    <div className="flex">
                                        <span className="hljs-title">Counter</span>
                                        {`();`}
                                    </div>
                                </span>
                                <span className="flex">
                                    {`counter.`}
                                    <span className="hljs-title">increment</span>
                                    {`();`}
                                </span>
                                <span className="flex">
                                    <span className="hljs-variable">console</span>
                                    {`.`}
                                    <span className="hljs-title">log</span>
                                    {`(counter.`}
                                    <span className="hljs-title">getCount</span>
                                    <div className="flex gap-1">
                                        {`());`}
                                        <span className="hljs-comment">{`// 1`}</span>
                                    </div>
                                </span>
                            </code>
                        </div>
                    </div>
                </div>
                <>
                    <div className="absolute h-40 w-40 top-[290px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundInterface />
                    </div>
                    <div className="absolute h-40 w-40 top-[290px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundInterface />
                    </div>
                    <div className="absolute h-36 w-36 top-[700px] left-[90px] z-10">
                        <IconBackgroundKeyboard />
                    </div>
                    <div className="absolute h-36 w-36 top-[700px] left-[90px] z-0 blur">
                        <IconBackgroundKeyboard />
                    </div>
                    <div className="absolute h-44 w-44 top-[1200px] right-[90px] scale-x-[-1] z-10">
                        <IconBackgroundExclamation />
                    </div>
                    <div className="absolute h-44 w-44 top-[1200px] right-[90px] scale-x-[-1] z-0 blur">
                        <IconBackgroundExclamation />
                    </div>
                    <div className="absolute h-36 w-36 top-[1600px] left-[90px] z-10">
                        <IconBackgroundCoding />
                    </div>
                    <div className="absolute h-36 w-36 top-[1600px] left-[90px] z-0 blur">
                        <IconBackgroundCoding />
                    </div>
                </>
            </div>
        ),
    },
};
