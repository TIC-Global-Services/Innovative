"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  Send,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
} from "lucide-react";
import SectionLabel from "../ui/secionLabel";
import ArrowBtn from "../ui/arrowBtn";
import { toast } from "react-toastify";
import { SlCalender } from "react-icons/sl";

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  type?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
}

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    type: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim()))
      return "Name can only contain letters and spaces";
    return undefined;
  };

  const validateMobile = (mobile: string): string | undefined => {
    if (!mobile.trim()) return "Mobile number is required";
    const cleanMobile = mobile.replace(/\D/g, ""); // Remove non-digits
    if (cleanMobile.length !== 10)
      return "Mobile number must be exactly 10 digits";
    if (!/^[6-9]/.test(cleanMobile))
      return "Mobile number must start with 6, 7, 8, or 9";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()))
      return "Please enter a valid email address";
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date.trim()) return "Preferred date is required";
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return "Date cannot be in the past";
    return undefined;
  };

  const validateTime = (time: string): string | undefined => {
    if (!time.trim()) return "Preferred time is required";
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time))
      return "Please enter a valid time format (HH:MM)";
    return undefined;
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        return validateName(value);
      case "mobile":
        return validateMobile(value);
      case "email":
        return validateEmail(value);
      case "type":
        return !value ? "Please select your type" : undefined;
      case "service":
        return !value ? "Please select a service" : undefined;
      case "date":
        return validateDate(value);
      case "time":
        return validateTime(value);
      default:
        return undefined;
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([field, value]) => {
      if (field !== "message") {
        // Message is optional
        const error = validateField(field, value);
        if (error) {
          newErrors[field as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;

    // For mobile number, only allow digits and limit to 10
    if (id === "mobile") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [id]: digits }));

      // Clear error on valid input
      if (errors[id]) {
        const error = validateMobile(digits);
        setErrors((prev) => ({ ...prev, [id]: error }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));

      // Clear error when user starts typing
      if (errors[id as keyof FormErrors]) {
        const error = validateField(id, value);
        setErrors((prev) => ({ ...prev, [id]: error }));
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, type } = e.target;
    setFocusedInput(id);

    // Change input type for time field only (date is already type="date")
    if (id === "time") {
      e.target.type = "time";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFocusedInput(null);

    // Validate field on blur
    const error = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: error }));

    // Reset input type if empty (only for time field)
    if (id === "time" && !value) {
      e.target.type = "text";
    }
  };

  const handleSelectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFocusedInput(null);

    // Validate select field on blur
    const error = validateField(id, value);
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateAllFields()) {
      toast.error("Please fix the errors in the form before submitting.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting appointment request...");

      // Prepare JSON payload matching Google Apps Script expectations
      const jsonData = {
        name: formData.name.trim(),
        mobile: formData.mobile,
        email: formData.email.trim().toLowerCase(),
        type: formData.type,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("Appointment data being sent:", jsonData);

      // Replace with your Apps Script Web App URL for appointments
      const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxYpFaiH4duxbrWWStrHrcpSXav1ssHHtNYyIBr2cI21v-6t6HX-HyjXMqDqxLtfbJm/exec";

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(jsonData),
      });

      // Since we can't read the response with no-cors, assume success
      console.log("Appointment request submitted");
      toast.success(
        "Appointment request submitted successfully! We will get in touch within 24 hours.",
        {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Reset form data and errors
      setFormData({
        name: "",
        mobile: "",
        email: "",
        type: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
      setErrors({});

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Appointment request error:", error);

      let errorMessage =
        "Error submitting appointment request. Please check your information and try again.";

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className=" mb-10 md:mb-16 md:mt-25 ">
        <h1 className="text-[#040444] text-3xl md:text-[60px] text-center">
          Let's Build Something Exceptional
        </h1>
        <p className="text-[#131313] text-center md:text-xl my-2">
          {" "}
          We're just a message away — reach out to start a conversation, request
          a quote, or schedule a meeting
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-3/5 relative">
          {/* Loading Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#040444]" />
                <div className="text-center">
                  <p className="text-[#040444] font-semibold text-lg">
                    Submitting Request
                  </p>
                  <p className="text-gray-600 text-sm">
                    Please wait while we process your appointment...
                  </p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-5 md:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                    errors.name
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  placeholder="Name*"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                    errors.mobile
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  placeholder="Mobile Number* (10 digits)"
                  maxLength={10}
                  disabled={isSubmitting}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                    errors.email
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  placeholder="Email ID*"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <select
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("type")}
                  onBlur={handleSelectBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all appearance-none ${
                    errors.type
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    I am a*
                  </option>
                  <option value="Client">Client</option>
                  <option value="Architect">Architect</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    focusedInput === "type" ? "text-[#040444]" : "text-gray-400"
                  } pointer-events-none w-5 h-5 transition-colors`}
                />
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.type}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <select
                id="service"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => setFocusedInput("service")}
                onBlur={handleSelectBlur}
                className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all appearance-none ${
                  errors.service
                    ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                    : "focus:ring-2 focus:ring-[#040444]/20"
                }`}
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Interested in*
                </option>
                <option value="Turnkey Interiors">Turnkey Interiors</option>
                <option value="Civil Works">Civil Works</option>
                <option value="Custom Furniture">Custom Furniture</option>
                <option value="Vendor Partnership">Vendor Partnership</option>
                <option value="Careers">Careers</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  focusedInput === "service"
                    ? "text-[#040444]"
                    : "text-gray-400"
                } pointer-events-none w-5 h-5 transition-colors`}
              />
              {errors.service && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.service}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("date")}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                    errors.date
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  placeholder="Preferred Date*"
                  disabled={isSubmitting}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  id="time"
                  type="text"
                  value={formData.time}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full h-12 md:h-16 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                    errors.time
                      ? "border-2 border-red-500 focus:ring-2 focus:ring-red-200"
                      : "focus:ring-2 focus:ring-[#040444]/20"
                  }`}
                  placeholder="Preferred Time*"
                  disabled={isSubmitting}
                />
                <Clock
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    focusedInput === "time" ? "text-[#040444]" : "text-gray-400"
                  } pointer-events-none w-5 h-5 transition-colors`}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedInput("message")}
                onBlur={() => setFocusedInput(null)}
                rows={6}
                className="w-full rounded-lg px-4 py-3 bg-[#F7F8FA] text-sm md:text-base lg:text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#040444]/20 transition-all resize-none"
                placeholder="Write a Message (Optional)"
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="flex flex-col items-center justify-center text-black gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:opacity-50 disabled:cursor-not-allowed "
              >
                <ArrowBtn
                  text={isSubmitting ? "Submitting..." : "Submit"}
                  backgroundColor="#040444"
                />
              </button>
              <p>We'll get in touch within 24 hours.</p>
            </div>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="w-full lg:w-2/5 bg-[#040444] rounded-2xl p-6 md:p-8 lg:p-10 text-white">
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-3">Address</h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                Plot No.7, V. V. Koil Street,Chinmaya Nagar,
                <br />
                Chennai - 600 092
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-3">Contact</h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                Phone: 044-24795133
              </p>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                Email: info@innovativeinteriors.in
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-3">
                Factory Address
              </h2>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                S.No: 50, Peruvoyal Village,Nainakuppam,
                <br />
                Gummidipoondi (TK),
                <br />
                Thiruvallur (DT) - 601206.
                <br />
                Tamilnadu.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-4">
                Stay connected
              </h2>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
