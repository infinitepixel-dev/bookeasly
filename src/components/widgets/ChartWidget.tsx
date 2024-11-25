import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ChartWidgetProps {
  title: string;
  data: number[];
  labels: string[];
  color: string;
}

const ChartWidget = ({ title, data, labels, color }: ChartWidgetProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...data);

  useEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.bar');
      gsap.from(bars, {
        height: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-40" ref={chartRef}>
        <div className="flex items-end h-full gap-2">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`bar w-full ${color} rounded-t-sm transition-all duration-300 hover:opacity-80`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-500">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;