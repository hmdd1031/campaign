"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RadarChart({ scores }) {
  const data = {
    labels: scores.map((s) => s.name),
    datasets: [
      {
        label: "위험 응답 수",
        data: scores.map((s) => s.value),
        backgroundColor: "rgba(17,17,17,0.08)",
        borderColor: "#111111",
        borderWidth: 2,
        pointBackgroundColor: "#111111",
        pointRadius: 3.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw} / 3 위험`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 3,
        ticks: { stepSize: 1, display: false },
        grid: { color: "#E5E5E0" },
        angleLines: { color: "#E5E5E0" },
        pointLabels: {
          font: { size: 11 },
          color: "#525252",
          padding: 6,
        },
      },
    },
    layout: {
      padding: 16,
    },
  };

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}
