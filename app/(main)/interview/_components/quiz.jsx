"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 relative bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white shadow-xl rounded-xl border border-gray-800 overflow-hidden p-6">
        {/* Animated Glowing Border */}
        <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-glow-dark" />

        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 drop-shadow-lg">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-gray-400 text-lg leading-relaxed">
            This quiz contains{" "}
            <span className="font-semibold text-blue-400">10 questions </span>
            specific to your industry and skills. Take your time and choose the
            <span className="font-semibold text-cyan-400">
              {" "}
              best answer
            </span>{" "}
            for each question.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <RainbowButton
            onClick={generateQuizFn}
            className="w-full py-3 text-lg font-semibold tracking-wide transition-all duration-300 hover:opacity-90 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Start Quiz
          </RainbowButton>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-4 relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-lg shadow-2xl p-6 sm:p-8 dark:border dark:border-gray-700 transition-all transform ">
      <CardHeader>
        <CardTitle className="text-lg sm:text-2xl font-semibold text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-lg font-medium text-center sm:text-left text-gray-300 dark:text-gray-200">
          {question.question}
        </p>

        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-3 sm:space-y-4"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="text-base sm:text-lg text-gray-300 dark:text-gray-200 transition-colors duration-300 hover:text-cyan-400"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-5 p-6 bg-muted dark:bg-gray-700 rounded-lg shadow-lg transform  transition-all">
            <p className="font-medium text-white">Explanation:</p>
            <p className="text-muted-foreground dark:text-gray-400">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
        {!showExplanation && (
          <ShimmerButton
            className="shadow-2xl text-white w-full sm:w-auto"
            onClick={() => setShowExplanation(true)}
            disabled={!answers[currentQuestion]}
          >
            <span className="text-white text-sm sm:text-lg">
              Show Explanation
            </span>
          </ShimmerButton>
        )}

        <RainbowButton
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="w-full sm:w-auto ml-auto sm:ml-0 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base transition-all duration-200 transform hover:scale-105"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </RainbowButton>
      </CardFooter>
    </Card>
  );
}
