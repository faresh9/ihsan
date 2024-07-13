import React, { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PolarAreaChart = ({ labels, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Life Balance Ratings',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
              beginAtZero: true,
              display: false,
            },
            grid: {
              color: 'rgba(0, 162, 0, 0.9)',
            },
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts or updates
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, data]);

  return (
    <div className="w-full max-w-lg mx-auto mt-8 bg-base-200">
      <canvas ref={chartRef} width="800" height="800"></canvas>
    </div>
  );
};

export default PolarAreaChart;
