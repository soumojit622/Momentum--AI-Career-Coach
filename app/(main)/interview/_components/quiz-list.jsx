"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8 transition-all duration-300 transform hover:shadow-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-lg text-gray-400 mt-2">
                Review your past quiz performance and learn from your mistakes
              </CardDescription>
            </div>
            <InteractiveHoverButton
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform border border-transparent hover:border-blue-400"
            >
              Start New Quiz
            </InteractiveHoverButton>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer transition-all duration-300 bg-gray-700 rounded-xl p-6 shadow-lg transform"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader className="border-b border-gray-600 pb-4">
                  <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-100">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row justify-between w-full text-sm sm:text-base text-gray-400 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">Score:</span>{" "}
                      {/* Highlight "Score" label */}
                      <span className="font-semibold text-green-400">
                        {assessment.quizScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-left sm:text-left mt-2 sm:mt-0 sm:ml-0 text-cyan-400">
                      {" "}
                      {/* Make date text blue */}
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                {assessment.improvementTip && (
                  <CardContent className="bg-gray-800 rounded-lg p-4 mt-4 shadow-inner">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-cyan-500">
                        Improvement Tip:
                      </strong>{" "}
                      {/* Highlight Improvement Tip label */}
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
