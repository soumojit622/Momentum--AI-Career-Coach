// app/resume/_components/entry-form.jsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg border border-gray-700 p-6 sm:p-8 md:p-10 rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100 text-center sm:text-left">
              Add {type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Grid: Adjusts based on screen size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  placeholder="Title/Position"
                  className="bg-gray-800 text-white border border-gray-700 w-full"
                  {...register("title")}
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Organization/Company"
                  className="bg-gray-800 text-white border border-gray-700 w-full"
                  {...register("organization")}
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-400">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  type="month"
                  className="bg-gray-800 text-white border border-gray-700 w-full"
                  {...register("startDate")}
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-400">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="month"
                  className="bg-gray-800 text-white border border-gray-700 w-full"
                  {...register("endDate")}
                  disabled={current}
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-400">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="current"
                className="accent-gray-600"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label
                htmlFor="current"
                className="text-gray-300 text-sm sm:text-base"
              >
                Current {type}
              </label>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                className="h-32 bg-gray-800 text-white border border-gray-700 w-full"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* AI Improve Button */}
            <InteractiveHoverButton
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
            >
              {isImproving ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  Improving...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Improve with AI
                  <Sparkles className="h-4 w-4 text-gray-400" />
                </span>
              )}
            </InteractiveHoverButton>
          </CardContent>

          {/* Footer with Buttons */}
          <CardFooter className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <RainbowButton
              type="button"
              variant="outline"
              className="px-4 py-2 text-sm sm:text-base text-black hover:opacity-80 w-full sm:w-auto"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </RainbowButton>
            <RainbowButton
              type="button"
              className="px-4 py-2 text-sm sm:text-base text-black hover:opacity-80 w-full sm:w-auto"
              onClick={handleAdd}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Add Entry</span>
            </RainbowButton>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
