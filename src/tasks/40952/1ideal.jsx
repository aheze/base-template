import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


const units = [
    { label: "meters", value: "m" },
    { label: "centimeters", value: "cm" },
    { label: "millimeters", value: "mm" },
    { label: "inches", value: "in" },
    { label: "feet", value: "ft" },
    { label: "yards", value: "yd" },
    { label: "kilometers", value: "km" },
    { label: "miles", value: "mi" },
    { label: "nautical miles", value: "nmi" },
    { label: "light years", value: "ly" },
];


const conversionRates = {
    m: 1,
    cm: 100,
    mm: 1000,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    km: 0.001,
    mi: 0.000621371,
    nmi: 0.000539957,
    ly: 1.057e-16,
};

export default function App() {
    const [activeTab, setActiveTab] = useState("overview");
    const [sideA, setSideA] = useState("");
    const [sideB, setSideB] = useState("");
    const [hypotenuse, setHypotenuse] = useState("");
    const [error, setError] = useState("");
    const [historySides, setHistorySides] = useState([]);
    const [historyHypotenuse, setHistoryHypotenuse] = useState([]);
    const [isCalculatingHypotenuse, setIsCalculatingHypotenuse] = useState(false);


    const [fromUnit, setFromUnit] = useState("m");
    const [toUnit, setToUnit] = useState("m");
    const [valueToConvert, setValueToConvert] = useState("");
    const [convertedValue, setConvertedValue] = useState("");
    const [conversionHistory, setConversionHistory] = useState([]);


    const [conversionError, setConversionError] = useState("");


    const handleCalculateSides = () => {
        const a = parseFloat(sideA);
        const c = parseFloat(hypotenuse);

        if (isNaN(a) || isNaN(c) || a <= 0 || c <= 0 || a >= c) {
            setError("Please enter valid positive numbers, and ensure the hypotenuse is greater than the side.");
            return;
        }

        const b = Math.sqrt(c * c - a * a);
        setHistorySides([...historySides, `Side: ${b.toFixed(2)}`]);
        setSideB(b.toFixed(2));
        setError("");

        setHypotenuse("");
    };


    const handleCalculateHypotenuse = () => {
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);

        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
            setError("Please enter valid positive numbers.");
            return;
        }

        const c = Math.sqrt(a * a + b * b);
        setHistoryHypotenuse([...historyHypotenuse, `Hypotenuse: ${c.toFixed(2)}`]);
        setHypotenuse(c.toFixed(2));
        setError("");

        setSideA("");
        setSideB("");
    };


    const resetCalculator = () => {
        setSideA("");
        setSideB("");
        setHypotenuse("");
        setError("");
    };


    const handleConvert = () => {
        const value = parseFloat(valueToConvert);
        if (isNaN(value) || value <= 0) {
            setConvertedValue("");
            setConversionError("Please enter a valid positive number.");
            return;
        }
        if (fromUnit === toUnit) {
            setConvertedValue("");
            setConversionError("From unit and To unit cannot be the same.");
            return;
        }
        const converted = (value * conversionRates[fromUnit]) / conversionRates[toUnit];
        setConvertedValue(converted.toString());
        setConversionError("");


        setConversionHistory([...conversionHistory, `${value} ${fromUnit} = ${converted.toFixed(2)} ${toUnit}`]);
        setValueToConvert("");
    };


    const resetConverter = () => {
        setValueToConvert("");
        setConvertedValue("");
        setFromUnit("m");
        setToUnit("m");
        setConversionError("");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center">Pythagorean Theorem Calculator</h1>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="calculator">Calculator</TabsTrigger>
                    <TabsTrigger value="unit-converter">Unit Converter</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Overview />
                </TabsContent>

                <TabsContent value="examples">
                    <Examples />
                </TabsContent>

                <TabsContent value="calculator">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calculate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <div className="flex justify-start mb-4 space-x-4">
                                    <button
                                        className={`p-2 ${isCalculatingHypotenuse ? "bg-gray-200" : "bg-blue-500 text-white"}`}
                                        onClick={() => {
                                            setIsCalculatingHypotenuse(false);
                                            resetCalculator();
                                        }}
                                    >
                                        Calculate Side
                                    </button>
                                    <button
                                        className={`p-2 ${isCalculatingHypotenuse ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => {
                                            setIsCalculatingHypotenuse(true);
                                            resetCalculator();
                                        }}
                                    >
                                        Calculate Hypotenuse
                                    </button>
                                </div>

                                {isCalculatingHypotenuse ? (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Side A"
                                            value={sideA}
                                            onChange={(e) => setSideA(e.target.value)}
                                            className="border p-2 mt-4"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Side B"
                                            value={sideB}
                                            onChange={(e) => setSideB(e.target.value)}
                                            className="border p-2 mt-4"
                                        />
                                        <button
                                            onClick={handleCalculateHypotenuse}
                                            className="bg-green-500 text-white p-2 mt-4"
                                        >
                                            Calculate
                                        </button>
                                        <button
                                            onClick={resetCalculator}
                                            className="bg-red-500 text-white p-2 mt-4 ml-2"
                                        >
                                            Reset
                                        </button>
                                        <div>{hypotenuse && <p>Hypotenuse: {hypotenuse}</p>}</div>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Side"
                                            value={sideA}
                                            onChange={(e) => setSideA(e.target.value)}
                                            className="border p-2 mt-4"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Hypotenuse"
                                            value={hypotenuse}
                                            onChange={(e) => setHypotenuse(e.target.value)}
                                            className="border p-2 mt-4"
                                        />
                                        <button
                                            onClick={handleCalculateSides}
                                            className="bg-green-500 text-white p-2 mt-4"
                                        >
                                            Calculate
                                        </button>
                                        <button
                                            onClick={resetCalculator}
                                            className="bg-red-500 text-white p-2 mt-4 ml-2"
                                        >
                                            Reset
                                        </button>
                                        <div>{sideB && <p>Side B: {sideB}</p>}</div>
                                    </div>
                                )}
                                {error && <p className="text-red-500 mt-4">{error}</p>}

                                {historySides.length > 0 && !isCalculatingHypotenuse && (
                                    <div className="p-4">
                                        <h2 className="font-bold">History</h2>
                                        <h3 className="font-semibold">Sides Calculated:</h3>
                                        <ul>
                                            {historySides.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {historyHypotenuse.length > 0 && isCalculatingHypotenuse && (
                                    <div className="p-4">
                                        <h2 className="font-bold">History</h2>
                                        <h3 className="font-semibold">Hypotenuses Calculated:</h3>
                                        <ul>
                                            {historyHypotenuse.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="unit-converter">
                    <Card>
                        <CardHeader>
                            <CardTitle>Unit Converter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <input
                                    type="text"
                                    placeholder="Value to Convert"
                                    value={valueToConvert}
                                    onChange={(e) => setValueToConvert(e.target.value)}
                                    className="border p-2 mt-4"
                                />
                                <div className="flex items-start justify-start mt-4 space-x-2">
                                    <select
                                        value={fromUnit}
                                        onChange={(e) => setFromUnit(e.target.value)}
                                        className="border p-2 rounded"
                                    >
                                        {units.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="font-bold text-lg">to</span>
                                    <select
                                        value={toUnit}
                                        onChange={(e) => setToUnit(e.target.value)}
                                        className="border p-2 rounded"
                                    >
                                        {units.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleConvert}
                                    className="bg-green-500 text-white p-2 mt-4 rounded hover:bg-green-600 transition"
                                >
                                    Convert
                                </button>
                                <button
                                    onClick={resetConverter}
                                    className="bg-red-500 text-white p-2 mt-4 ml-2 rounded hover:bg-red-600 transition"
                                >
                                    Reset
                                </button>
                                {convertedValue && (
                                    <p className="mt-4">
                                        Converted Value: <strong>{convertedValue} {toUnit}</strong>
                                    </p>
                                )}
                                {conversionHistory.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Conversion History:</h3>
                                        <ul>
                                            {conversionHistory.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {conversionError && <p className="text-red-500 mt-4">{conversionError}</p>}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}


function Overview() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview of the Pythagorean Theorem</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <h3 className="font-bold text-blue-600">Theorem Statement</h3>
                    <p className="bg-blue-100 p-2 rounded">
                        The Pythagorean Theorem states that in a right triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the lengths of the other two sides (a and b). This can be expressed with the formula:
                    </p>
                    <p className="font-bold text-blue-800">c² = a² + b²</p>

                    <h3 className="font-bold text-green-600 mt-4">Alternate Forms of the Formula</h3>
                    <p className="bg-green-100 p-2 rounded">
                        The Pythagorean Theorem can also be expressed in different ways:
                    </p>
                    <ul className="list-disc list-inside bg-green-50 p-2 rounded">
                        <li>a² = c² - b²</li>
                        <li>b² = c² - a²</li>
                        <li>c = √(a² + b²)</li>
                    </ul>

                    <h3 className="font-bold text-purple-600 mt-4">Visual Representation</h3>
                    <svg width="200" height="150" className="my-2">
                        <polygon points="10,140 10,40 70,140" fill="none" stroke="black" strokeWidth="2" />
                        <text x="12" y="90" fill="black">b</text>
                        <text x="35" y="150" fill="black">a</text>
                        <text x="75" y="85" fill="black">c</text>
                    </svg>

                    <h3 className="font-bold text-red-600 mt-4">Proof of the Theorem</h3>
                    <p className="bg-red-100 p-2 rounded">
                        The proof of the Pythagorean Theorem is often demonstrated through geometric representation. Here’s a detailed explanation:
                    </p>
                    <h4 className="font-bold mt-2 text-orange-600">The Setup:</h4>
                    <ol className="list-decimal list-inside bg-red-50 p-2 rounded">
                        <li>Start with a right triangle with legs of lengths <em>a</em> and <em>b</em>, and a hypotenuse of length <em>c</em>.</li>
                        <li>Construct squares on each of the three sides of the triangle.</li>
                    </ol>

                    <h4 className="font-bold mt-2 text-orange-600">Visualizing the Proof:</h4>
                    <ol className="list-decimal list-inside bg-red-50 p-2 rounded">
                        <li>The area of the square on the hypotenuse <em>c</em> represents the total area that can be formed from the right triangle.</li>
                        <li>Rearranging the areas of the squares on sides <em>a</em> and <em>b</em> can show how they fit into the area of the square on <em>c</em>.</li>
                    </ol>

                    <h4 className="font-bold mt-2 text-orange-600">Calculating Areas:</h4>
                    <p className="bg-red-100 p-2 rounded">
                        - Area of the square on hypotenuse: <strong>c²</strong><br />
                        - Combined area of the squares on the legs: <strong>a² + b²</strong>
                    </p>

                    <h4 className="font-bold mt-2 text-orange-600">Conclusion:</h4>
                    <p className="bg-red-100 p-2 rounded">
                        By demonstrating that the area <strong>c²</strong> is equal to the sum of the areas <strong>a² + b²</strong>, we confirm the Pythagorean Theorem:
                    </p>
                    <p className="font-bold text-blue-800">c² = a² + b²</p>

                    <h3 className="font-bold text-blue-600 mt-4">Visual Proof Representation</h3>
                    <p className="bg-blue-100 p-2 rounded">
                        Here’s a visual representation of the squares constructed on each side:
                    </p>
                    <svg width="200" height="150" className="my-2">
                        <rect x="10" y="10" width="40" height="40" fill="none" stroke="blue" />
                        <text x="15" y="35" fill="blue">a²</text>
                        <rect x="10" y="60" width="40" height="40" fill="none" stroke="green" />
                        <text x="15" y="85" fill="green">b²</text>
                        <rect x="60" y="10" width="40" height="40" fill="none" stroke="red" />
                        <text x="65" y="35" fill="red">c²</text>
                    </svg>
                </CardDescription>
            </CardContent>
        </Card>
    );
}


function Examples() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Examples of Pythagorean Theorem</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <h3 className="font-bold text-blue-600">Example 1: 3-4-5 Triangle</h3>
                    <p className="bg-blue-100 p-2 rounded">
                        For a triangle with sides 3 and 4, we can find the hypotenuse:
                    </p>
                    <p className="bg-blue-100 p-2 rounded">
                        <span className="font-bold">c = √(3² + 4²) = √(9 + 16) = √25 = 5</span>
                    </p>
                    <svg width="200" height="150" className="my-2">
                        <polygon points="10,140 10,40 70,140" fill="none" stroke="black" strokeWidth="2" />
                        <text x="12" y="90" fill="black">4</text>
                        <text x="35" y="150" fill="black">3</text>
                        <text x="75" y="85" fill="black">5</text>
                    </svg>

                    <h3 className="font-bold text-green-600 mt-4">Example 2: 5-12-13 Triangle</h3>
                    <p className="bg-green-100 p-2 rounded">
                        For a triangle with sides 5 and 12, we find the hypotenuse:
                    </p>
                    <p className="bg-green-100 p-2 rounded">
                        <span className="font-bold">c = √(5² + 12²) = √(25 + 144) = √169 = 13</span>
                    </p>
                    <svg width="200" height="150" className="my-2">
                        <polygon points="10,140 10,20 110,140" fill="none" stroke="black" strokeWidth="2" />
                        <text x="12" y="80" fill="black">12</text>
                        <text x="50" y="150" fill="black">5</text>
                        <text x="115" y="80" fill="black">13</text>
                    </svg>

                    <h3 className="font-bold text-purple-600 mt-4">Example 3: Finding a Side</h3>
                    <p className="bg-purple-100 p-2 rounded">
                        Given a triangle where one leg is 8 and the hypotenuse is 10, we can find the other leg:
                    </p>
                    <p className="bg-purple-100 p-2 rounded">
                        <span className="font-bold">b = √(c² - a²) = √(10² - 8²) = √(100 - 64) = √36 = 6</span>
                    </p>
                    <svg width="200" height="150" className="my-2">
                        <polygon points="10,140 10,60 90,140" fill="none" stroke="black" strokeWidth="2" />
                        <text x="12" y="100" fill="black">8</text>
                        <text x="40" y="150" fill="black">6</text>
                        <text x="100" y="100" fill="black">10</text>
                    </svg>
                </CardDescription>
            </CardContent>
        </Card>
    );
}