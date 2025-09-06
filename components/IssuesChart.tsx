"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


interface WeeklyIssuesChartProps {
  data: { week: string; OPEN: number; IN_PROGRESS: number; CLOSED: number }[];
}

export default function WeeklyIssuesChart({ data }: WeeklyIssuesChartProps) {
    
  return (
    <div className="w-full h-100 bg-zinc-900  rounded-xl p-7">
      <h2 className="text-white mb-4">Issue Status Overview</h2>
      <ResponsiveContainer  width="100%" height="100%">
        <BarChart   data={data}>
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip/>
          <Legend />
          <Bar dataKey="OPEN" fill="#22c55e" />
          <Bar dataKey="IN_PROGRESS" fill="#3b82f6" />
          <Bar dataKey="CLOSED" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
