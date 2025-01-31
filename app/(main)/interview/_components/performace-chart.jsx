"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          Track your quiz scores over time and monitor your progress.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="h-[300px] sm:h-[350px] rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="date"
                stroke="#e0e0e0"
                tick={{ fontSize: 12, fill: "#e0e0e0" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#e0e0e0" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-black border rounded-lg p-4 shadow-lg">
                        <p className="text-lg font-semibold text-white">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-sm text-gray-300">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ffffff" // Gray line for a more subtle look
                strokeWidth={4}
                dot={{ r: 5, strokeWidth: 3, fill: "#888888" }} // Gray dots to match the line color
                activeDot={{ r: 6, strokeWidth: 4, fill: "#888888" }} // Active dot color to match the line
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
