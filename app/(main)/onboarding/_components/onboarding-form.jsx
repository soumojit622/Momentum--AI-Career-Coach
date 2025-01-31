"use client";

import { updateUser } from "@/actions/user";
import { onboardingSchema } from "@/app/lib/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 bg-background">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mt-10 mx-auto p-6 sm:p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 shadow-xl shadow-black/50 rounded-xl backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100 text-center">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-gray-400 text-center text-sm sm:text-base">
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Industry Selection */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-gray-300">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger className="w-full bg-gray-900 text-white border-gray-700 focus:ring-gray-500">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
                  <SelectGroup>
                    <SelectLabel className="text-gray-500">
                      Industries
                    </SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem
                        key={ind.id}
                        value={ind.id}
                        className="hover:bg-gray-800"
                      >
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Specialization Dropdown */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry" className="text-gray-300">
                  Specialization
                </Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger className="w-full bg-gray-900 text-white border-gray-700 focus:ring-gray-500">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
                    <SelectGroup>
                      <SelectLabel className="text-gray-500">
                        Specializations
                      </SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem
                          key={sub}
                          value={sub}
                          className="hover:bg-gray-800"
                        >
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience Input */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-gray-300">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                className="w-full bg-gray-900 text-white border-gray-700 focus:ring-gray-500"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills Input */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-300">
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                className="w-full bg-gray-900 text-white border-gray-700 focus:ring-gray-500"
                {...register("skills")}
              />
              <p className="text-xs sm:text-sm text-gray-500">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Bio Textarea */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-24 sm:h-32 w-full bg-gray-900 text-white border-gray-700 focus:ring-gray-500"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <RainbowButton
              type="submit"
              className="w-full bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold py-3 sm:py-4 rounded-lg hover:opacity-80 transition duration-300 ease-in-out shadow-md shadow-gray-900/50 disabled:opacity-50 text-black"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </RainbowButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
