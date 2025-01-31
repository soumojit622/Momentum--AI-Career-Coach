"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="w-full bg-gray-600 rounded-lg shadow-lg"
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 p-4 rounded-lg shadow-lg">
            <p className="font-medium text-white">Improvement Tip:</p>
            <p className="text-gray-400">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-xl text-center text-teal-400">
            Question Review
          </h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 space-y-3 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-gray-300">
                <p>
                  Your answer:{" "}
                  <span className="font-semibold">{q.userAnswer}</span>
                </p>
                {!q.isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <span className="font-semibold text-teal-300">
                      {q.answer}
                    </span>
                  </p>
                )}
              </div>
              <div className="text-sm bg-gray-700 p-2 rounded">
                <p className="font-medium text-white">Explanation:</p>
                <p className="text-gray-400">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <RainbowButton
            onClick={onStartNew}
            className="w-full py-3 text-md font-semibold tracking-wide transition-all duration-300 hover:opacity-90 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start New Quiz 🚀
          </RainbowButton>
        </CardFooter>
      )}
    </div>
  );
}
