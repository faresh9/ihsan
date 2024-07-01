// PolarAreaChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

// Define a custom plugin to draw radial grid lines with different colors
const radialGridPlugin = {
  id: 'radialGridColors',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales: { r } } = chart;
    const stepSize = r.max / r.ticks.length;

    // DaisyUI color palette or any other colors you prefer
    const colors = [
      'rgba(255, 2, 132, 0.3)',
      'rgba(0, 182, 235, 0.9)',
      'rgba(255, 206, 86, 0.3)',
      'rgba(75, 192, 192, 0.3)',
      'rgba(153, 102, 255, 0.3)',
      'rgba(255, 159, 64, 0.3)',
    ];

    // Clear the previous chart background
    ctx.clearRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);

    // Draw each radial grid line with different colors
    r.ticks.forEach((tick, index) => {
      ctx.beginPath();
      ctx.arc(r.xCenter, r.yCenter, (index + 1) * stepSize * r.drawingArea / r.max, 0, 2 * Math.PI);
      ctx.strokeStyle = colors[1];
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    });
  }
};

// Register the custom plugin
Chart.register(radialGridPlugin);

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
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: 'Life Balance Ratings',
          data: data,
          backgroundColor: [
            'rgba(255, 2, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(199, 199, 199, 0.5)',
            'rgba(83, 102, 255, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            ticks: {
              display: false // Hide the numbers along the radial axis
            },
            grid: {
              color: () => 'transparent', // Set grid line color to transparent since we are drawing custom lines
            }
          }
        }
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
