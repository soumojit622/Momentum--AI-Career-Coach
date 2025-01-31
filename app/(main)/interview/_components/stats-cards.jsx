import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-indigo-500">
        <div className="absolute inset-0 border-2 border-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg animate-border" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-indigo-400">
            Average Score
          </CardTitle>
          <Trophy className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">
            {getAverageScore()}%
          </div>
          <p className="text-xs text-gray-400">Across all assessments</p>
        </CardContent>
      </Card>

      <Card className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-500">
        <div className="absolute inset-0 border-2 border-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-lg animate-border" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-blue-400">
            Questions Practiced
          </CardTitle>
          <Brain className="h-5 w-5 text-cyan-400" />
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">
            {getTotalQuestions()}
          </div>
          <p className="text-xs text-gray-400">Total questions</p>
        </CardContent>
      </Card>

      <Card className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-green-500">
        <div className="absolute inset-0 border-2 border-gradient-to-r from-green-500 via-lime-500 to-yellow-500 rounded-lg animate-border" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-green-400">
            Latest Score
          </CardTitle>
          <Target className="h-5 w-5 text-lime-400" />
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-gray-400">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
