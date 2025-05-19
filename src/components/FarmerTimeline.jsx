import React, { useState } from "react";
import { jsPDF } from "jspdf";

const cropTypes = [
  { value: "tomatoes", label: "Tomatoes" },
  { value: "potatoes", label: "Potatoes" },
  { value: "lettuce", label: "Lettuce" },
  { value: "carrots", label: "Carrots" },
  { value: "spinach", label: "Spinach" },
  { value: "corn", label: "Corn" },
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
];

const soilTypes = [
  { value: "sandy", label: "Sandy Soil" },
  { value: "clay", label: "Clay Soil" },
  { value: "loamy", label: "Loamy Soil" },
  { value: "silt", label: "Silt Soil" },
];

const getTimeline = (soilType, area) => {
  const landSize = area <= 100 ? "small" : area <= 500 ? "medium" : "large";

  const timeline = [
    "🧪 Soil Testing & pH Check: 2-3 days",
    "🌿 Organic Treatment (compost/fertilizers): 5 days",
    "🪓 Tilling and Levelling: " +
      (soilType === "clay" ? "3 weeks (heavy effort)" : soilType === "sandy" ? "1 week" : "2 weeks"),
    "💧 Irrigation Setup: 2-3 days",
    "🌱 Seed Selection & Sowing: 1 week",
    "🌼 Weed Management & Pest Control: ongoing every 2 weeks",
    "📊 Crop Monitoring & Watering: weekly",
    "⏳ Growth Period: " +
      (soilType === "loamy"
        ? "8-10 weeks (optimal)"
        : soilType === "clay"
        ? "12-14 weeks (slow drainage)"
        : soilType === "sandy"
        ? "10-12 weeks (needs irrigation)"
        : "10-11 weeks (good water retention)"),
    "🌾 Harvesting & Post-Harvest Storage: 2-3 weeks",
    `📦 Logistics for ${landSize} land: ${landSize === "small" ? "manual labor preferred" : "mechanical support recommended"}`,
  ];

  return timeline;
};

const FarmPlanner = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilType, setSoilType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const downloadPlan = () => {
  const doc = new jsPDF();
  const area = Number(length) * Number(width);
  const cropLabel = cropTypes.find(crop => crop.value === selectedCrop)?.label;

  doc.setFontSize(18);
  doc.text("Farm Plan", 20, 20);

  doc.setFontSize(12);
  doc.text(`Land Area: ${area} square meters`, 20, 35);
  doc.text(`Selected Crop: ${cropLabel}`, 20, 45);
  doc.text(`Soil Type: ${soilType}`, 20, 55);

  doc.text("Recommended Timeline:", 20, 70);
  doc.text("- Soil Preparation: 2 weeks", 25, 80);
  doc.text("- Planting: 1 week", 25, 90);
  doc.text("- Growth Period: 8-12 weeks", 25, 100);
  doc.text("- Harvesting: 2-3 weeks", 25, 110);

  doc.text("Fertilizers (per 10 sq. meters):", 20, 125);
  doc.text("- Organic Compost: 5kg", 25, 135);
  doc.text("- Natural Nitrogen Mix: 2kg", 25, 145);
  doc.text("- Potassium-rich Organic Matter: 3kg", 25, 155);

  doc.save("farm-plan.pdf");
};


  const area = Number(length) * Number(width);

  return (
    <section className="py-16 bg-white" id="farm-planner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-green-800">Plan Your Farm</h2>
          <p className="text-xl max-w-2xl mx-auto text-green-700">
            Enter your land dimensions, soil type and crop preference to receive a customized growing plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-green-100 p-8 rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="length" className="text-green-800 font-medium">Land Length (meters)</label>
                  <input
                    id="length"
                    type="number"
                    placeholder="Enter length"
                    className="border border-green-300 rounded px-3 py-2"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="width" className="text-green-800 font-medium">Land Width (meters)</label>
                  <input
                    id="width"
                    type="number"
                    placeholder="Enter width"
                    className="border border-green-300 rounded px-3 py-2"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="crop-type" className="text-green-800 font-medium">Select Crop Type</label>
                <select
                  id="crop-type"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="border border-green-300 rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Choose a crop</option>
                  {cropTypes.map((crop) => (
                    <option key={crop.value} value={crop.value}>
                      {crop.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2 mb-6">
                <label htmlFor="soil-type" className="text-green-800 font-medium">Select Soil Type</label>
                <select
                  id="soil-type"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="border border-green-300 rounded px-3 py-2"
                  required
                >
                  <option value="" disabled>Choose soil type</option>
                  {soilTypes.map((soil) => (
                    <option key={soil.value} value={soil.value}>
                      {soil.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold flex justify-center items-center gap-2"
              >
                Generate Plan
                <span>&rarr;</span>
              </button>
            </form>
          </div>

          <div>
            {submitted ? (
              <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-green-700">Your Farm Plan</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-800">Land Details</h4>
                    <p>Area: {area} square meters</p>
                    <p>Crop: {cropTypes.find(crop => crop.value === selectedCrop)?.label}</p>
                    <p>Soil Type: {soilTypes.find(soil => soil.value === soilType)?.label}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800">Recommended Timeline</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {getTimeline(soilType, area).map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800">Recommended Fertilizers</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Organic Compost: 5kg per 10 square meters</li>
                      <li>Natural Nitrogen Mix: 2kg per 10 square meters</li>
                      <li>Potassium-rich Organic Matter: 3kg per 10 square meters</li>
                    </ul>
                  </div>

                  <button  onClick={downloadPlan} className="mt-4 border border-green-400 text-green-700 hover:bg-green-100 px-4 py-2 rounded">
                    Download Detailed Plan
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="https://placehold.co/400x300/f8faf5/689f38?text=Farm+Layout"
                  alt="Farm Planning Illustration"
                  className="mb-4 rounded-lg shadow-md"
                />
                <p className="text-green-700 text-center max-w-md">
                  Enter your land dimensions, soil type, and crop preferences to generate a smart farming plan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmPlanner;
