"use client";

import { useState } from "react";

type UnitSystem = "metric" | "imperial";

interface BMICategory {
  text: string;
  color: string;
}

interface BMIRange {
  category: string;
  range: string;
  color: string;
}

const bmiRanges: BMIRange[] = [
  { category: "Underweight", range: "< 18.5", color: "text-blue-600" },
  { category: "Normal weight", range: "18.5 - 24.9", color: "text-green-600" },
  { category: "Overweight", range: "25 - 29.9", color: "text-yellow-600" },
  { category: "Obese", range: "≥ 30", color: "text-red-600" },
];

const getBMICategory = (bmiValue: number): BMICategory => {
  if (bmiValue < 18.5) return { text: "Underweight", color: "text-blue-600" };
  if (bmiValue >= 18.5 && bmiValue < 25)
    return { text: "Normal weight", color: "text-green-600" };
  if (bmiValue >= 25 && bmiValue < 30)
    return { text: "Overweight", color: "text-yellow-600" };
  return { text: "Obese", color: "text-red-600" };
};

export default function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum && heightNum && weightNum > 0 && heightNum > 0) {
      let bmiValue: number;

      if (unit === "metric") {
        const heightInMeters = heightNum / 100;
        bmiValue = weightNum / (heightInMeters * heightInMeters);
      } else {
        bmiValue = (weightNum / (heightNum * heightNum)) * 703;
      }

      const roundedBmi = Math.round(bmiValue * 10) / 10;

      console.log(roundedBmi);
      setBmi(roundedBmi);
      setCategory(getBMICategory(roundedBmi));
    }
  };

  const handleResetForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory(null);
  };
  const handleUnitChange = (newUnit: UnitSystem): void => {
    setUnit(newUnit);
    handleResetForm();
  };
  const getUnitLabels = () => {
    return {
      weight: unit == "metric" ? "kg" : "lbs",
      height: unit == "metric" ? "cm" : "inches",
    };
  };

  const unitLabels = getUnitLabels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          BMI Calculator
        </h2>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition duration-200 font-medium ${
              unit === "metric"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => handleUnitChange("metric")}
          >
            Metric
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition duration-200 font-medium  ${
              unit === "imperial"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
            type="button"
            onClick={() => handleUnitChange("imperial")}
          >
            Imperial
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Weight ({unitLabels.weight})
            </label>
            <input
              type="number"
              placeholder={`Enter your weight in KG`}
              min="1"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Height ({unitLabels.height})
            </label>
            <input
              type="number"
              placeholder={`Enter your height in cm`}
              min="1"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-6 mt-8">
          <button
            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 font-semibold"
            type="button"
            onClick={calculateBMI}
          >
            Calculate
          </button>
          <button
            onClick={handleResetForm}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 font-semibold"
          >
            Reset Form
          </button>
        </div>

        { bmi !== null && category && (<div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Your Results
          </h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">{bmi}</p>
            <p className="text-lg mb-4">
              Category:{" "}
              <span className={`font-semibold ${category.color}`}>
                {category.text}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              BMI Scale Reference
            </p>
            <div className="space-y-2 text-sm">
              {bmiRanges.map((range: BMIRange, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className={range.color}>{range.category}</span>
                  <span className="text-gray-600">{range.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
}
