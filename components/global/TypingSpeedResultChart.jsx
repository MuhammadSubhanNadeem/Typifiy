"use client";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getCssVar } from "@/_helpers/css-variable-importer.helper";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function TypingSpeedResultChart() {
  const foregroundColor = getCssVar("--foreground-color");
  const labels = Array.from({ length: 15 }, (_, i) => i + 1);

  const errorIndexes = [5, 7, 14]; // ❌ error positions

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: [60, 58, 52, 48, 44, 40, 36, 30, 28, 26, 30, 34, 35, 37, 38],
        borderColor: foregroundColor,
        borderWidth: 2.5,
        tension: 0.45,
        pointRadius: 1.5,
      },
      {
        label: "Errors",
        data: labels.map((_, i) => (errorIndexes.includes(i) ? 99 : null)),
        showLine: false,
        pointStyle: "crossRot",
        pointRadius: 4,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ef4444",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: "#374151" },
        ticks: { color: "#9ca3af" },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "#374151" },
        ticks: { color: "#9ca3af", stepSize: 20 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full h-[220px] rounded-xl">
      <div className="w-full h-full flex items-center justify-center">
        <div>
          <span>
            <h3 className="text-content-light font-semibold text-3xl">wpm</h3>
            <p className="text-foreground-color font-semibold text-5xl">33</p>
          </span>
          <span>
            <h3 className="text-content-light font-semibold text-3xl">acc</h3>
            <p className="text-foreground-color font-semibold text-5xl">98%</p>
          </span>
        </div>
        <h6 className="text-xs font-normal text-content-light writing-mode-vertical-rl -rotate-90">
          Words Per Minute
        </h6>
        <div className="w-[calc(100%-50px)] h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
