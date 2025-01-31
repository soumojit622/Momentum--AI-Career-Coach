"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, formatDistanceToNow } from "date-fns";
import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <Badge
          variant="outline"
          className="text-white bg-transparent border-white transition-colors duration-300"
        >
          Last updated: {lastUpdatedDate}
        </Badge>
        <div className="text-white text-xs italic dark:text-gray-300">
          {nextUpdateDistance}
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-purple-500">
          <div className="absolute inset-0 border-2 border-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-lg animate-border" />
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-x-2 relative z-10">
            <CardTitle className="text-lg font-semibold text-purple-400">
              Market Outlook
            </CardTitle>
            <OutlookIcon className="h-5 w-5 text-pink-400" />
          </CardHeader>
          <CardContent className="space-y-2 relative z-10">
            <div className="text-3xl font-bold text-white">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-gray-400">{`Next update ${nextUpdateDistance}`}</p>
          </CardContent>
        </Card>

        <Card className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-teal-500">
          <div className="absolute inset-0 border-2 border-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-lg animate-border" />
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-x-2 relative z-10">
            <CardTitle className="text-lg font-semibold text-teal-400">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent className="space-y-2 relative z-10">
            <div className="text-3xl font-bold text-white">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-red-500">
          <div className="absolute inset-0 border-2 border-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-lg animate-border" />
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-x-2 relative z-10">
            <CardTitle className="text-lg font-semibold text-red-400">
              Demand Level
            </CardTitle>
            <BriefcaseIcon className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent className="space-y-2 relative z-10">
            <div className="text-3xl font-bold text-white">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-indigo-500">
          <div className="absolute inset-0 border-2 border-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-lg animate-border" />
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-x-2 relative z-10">
            <CardTitle className="text-lg font-semibold text-indigo-400">
              Top Skills
            </CardTitle>
            <Brain className="h-5 w-5 text-violet-400" />
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="flex flex-wrap gap-3">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-white bg-opacity-80 rounded-full py-1 px-4 text-sm font-medium hover:bg-white hover:text-gray-800 transition-colors duration-300 transform hover:scale-105"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="col-span-4 shadow-lg bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Gradient Border Animation */}
        <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg animate-border" />

        <CardHeader className="pb-4 z-10 relative">
          <CardTitle className="text-2xl font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl">
            Salary Ranges by Role
          </CardTitle>
          <CardDescription className="text-sm text-gray-400 sm:text-xs md:text-sm lg:text-base">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[400px] bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#474747" />
                <XAxis dataKey="name" tick={{ fill: "#B3B3B3" }} />
                <YAxis tick={{ fill: "#B3B3B3" }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-md">
                          <p className="font-medium text-white">{label}</p>
                          {payload.map((item) => (
                            <p
                              key={item.name}
                              className="text-sm text-gray-300"
                            >
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#4B5563" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#6B7280" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#9CA3AF" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* <BorderBeam size={450} duration={12} delay={9} /> */}
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Industry Trends Card */}
        <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg animate-border" />
          <CardHeader className="p-4 relative z-10">
            <CardTitle className="text-2xl font-semibold text-white">
              Key Industry Trends
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg">
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="h-3 w-3 mt-1 rounded-full bg-gradient-to-r from-gray-400 via-gray-500 to-black" />
                  <span className="text-lg text-gray-300">{trend}</span>
                </li>
              ))}
            </ul>
            {/* <BorderBeam size={350} duration={12} delay={9} /> */}
          </CardContent>
        </Card>

        {/* Recommended Skills Card */}
        <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg animate-border" />
          <CardHeader className="p-4 relative z-10">
            <CardTitle className="text-2xl font-semibold text-white">
              Recommended Skills
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Skills to consider developing
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg">
            <div className="flex flex-wrap gap-3">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-gray-300 bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {/* <BorderBeam size={350} duration={12} delay={9} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
