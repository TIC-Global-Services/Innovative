"use client";

import type React from "react";
import { useState } from "react";
import DynamicForm, {
  type FormStep,
} from "@/components/ReusableComponenets/DynamicForm";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

type VendorRegistrationProps = {
  title?: string;
  description?: string;
  className?: string;
};

const VendorRegistration: React.FC<VendorRegistrationProps> = ({
  title = "Vendor Registration Form",
  description = "",
  className = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vendorFormSteps: FormStep[] = [
    {
      title: "Company Details",
      fields: [
        {
          id: "companyName",
          label: "Company Name",
          type: "text",
          placeholder: "Enter company name",
          required: true,
        },
        {
          id: "registeredAddress",
          label: "Registered Address",
          type: "text",
          placeholder: "Enter complete registered address",
          required: true,
        },
        {
          id: "yearEstablished",
          label: "Year of Establishment",
          type: "select",
          placeholder: "Select year",
          required: true,
          options: Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { value: year.toString(), label: year.toString() };
          }),
        },
        {
          id: "gstNumber",
          label: "GST Number",
          type: "text",
          placeholder: "Enter 15-digit GST number",
          required: true,
        },
        {
          id: "website",
          label: "Website (if any)",
          type: "text",
          placeholder: "https://www.example.com",
        },
      ],
    },
    {
      title: "Contact Information",
      fields: [
        {
          id: "contactName",
          label: "Contact Person Name",
          type: "text",
          placeholder: "Enter full name",
          required: true,
        },
        {
          id: "contactEmail",
          label: "Email",
          type: "email",
          placeholder: "contact@company.com",
          required: true,
        },
        {
          id: "contactPhone",
          label: "Phone Number",
          type: "text",
          placeholder: "Enter phone number with country code",
          required: true,
        },
        {
          id: "designation",
          label: "Designation",
          type: "text",
          placeholder: "Enter job title/designation",
          required: true,
        },
      ],
    },
    {
      title: "Product/Service Details",
      fields: [
        {
          id: "productCategory",
          label: "Product/Service Category",
          type: "select",
          placeholder: "Select category",
          required: true,
          options: [
            { value: "furniture", label: "Furniture" },
            { value: "lighting", label: "Lighting" },
            { value: "textiles", label: "Textiles" },
            { value: "flooring", label: "Flooring" },
            { value: "wallCoverings", label: "Wall Coverings" },
            { value: "accessories", label: "Accessories" },
            { value: "other", label: "Other" },
          ],
        },
        {
          id: "productDescription",
          label: "Brief Description of Products/Services",
          type: "textarea",
          placeholder:
            "Describe your products or services in detail (minimum 20 characters)",
          required: true,
        },
        {
          id: "productCatalog",
          label: "Product Catalog/Portfolio",
          type: "file",
          required: true,
        },
      ],
    },
    {
      title: "Business Information",
      fields: [
        {
          id: "businessType",
          label: "Business Type",
          type: "select",
          placeholder: "Select business type",
          required: true,
          options: [
            { value: "manufacturer", label: "Manufacturer" },
            { value: "wholesaler", label: "Wholesaler" },
            { value: "retailer", label: "Retailer" },
            { value: "distributor", label: "Distributor" },
            { value: "serviceProvider", label: "Service Provider" },
          ],
        },
        {
          id: "clientele",
          label: "Major Clientele",
          type: "textarea",
          placeholder: "List your major clients (optional)",
        },
        {
          id: "certifications",
          label: "Certifications (if any)",
          type: "text",
          placeholder: "ISO, Quality certifications, etc.",
        },
      ],
    },
    {
      title: "Terms & Conditions",
      fields: [
        {
          id: "paymentTerms",
          label: "Preferred Payment Terms",
          type: "select",
          placeholder: "Select payment terms",
          required: true,
          options: [
            { value: "advance", label: "100% Advance" },
            { value: "50-50", label: "50% Advance, 50% on Delivery" },
            { value: "net30", label: "Net 30 days" },
            { value: "net60", label: "Net 60 days" },
            { value: "other", label: "Other" },
          ],
        },
        {
          id: "deliveryTerms",
          label: "Delivery Terms",
          type: "textarea",
          placeholder:
            "Describe your delivery terms and conditions (minimum 10 characters)",
          required: true,
        },
        {
          id: "additionalInfo",
          label: "Additional Information",
          type: "textarea",
          placeholder: "Any other information you'd like to share (optional)",
        },
      ],
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    setIsSubmitting(true);

    try {
      // Convert product catalog to base64
      let catalogData = "";
      if (data.productCatalog instanceof File) {
        catalogData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.productCatalog);
        });
      } else {
        throw new Error("Product catalog file is required");
      }

      // Prepare JSON payload
      const jsonData = {
        companyName: (data.companyName || "").trim(),
        registeredAddress: (data.registeredAddress || "").trim(),
        yearEstablished: data.yearEstablished || "",
        gstNumber: (data.gstNumber || "").trim().toUpperCase(),
        website: (data.website || "").trim(),
        contactName: (data.contactName || "").trim(),
        contactEmail: (data.contactEmail || "").trim().toLowerCase(),
        contactPhone: (data.contactPhone || "").trim(),
        designation: (data.designation || "").trim(),
        productCategory: data.productCategory || "",
        productDescription: (data.productDescription || "").trim(),
        businessType: data.businessType || "",
        clientele: (data.clientele || "").trim(),
        certifications: (data.certifications || "").trim(),
        paymentTerms: data.paymentTerms || "",
        deliveryTerms: (data.deliveryTerms || "").trim(),
        additionalInfo: (data.additionalInfo || "").trim(),
        productCatalog: catalogData,
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting vendor registration...");

      // Replace with your Apps Script Web App URL for vendors
      const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycby-ElXKg_tKQKc_aa3P6X4NdiG4wdSswEyVNq8Xkt9yUebeQpX3bV0xhUxe5aWU6BnA/exec";

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(jsonData),
      });

      // Since we can't read the response with no-cors, assume success
      console.log("Vendor registration submitted");
      toast.success(
        "Vendor registration submitted successfully! We will review your application and get back to you soon.",
        {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Vendor registration error:", error);

      let errorMessage =
        "Error submitting vendor registration. Please check your information and try again.";

      if (error instanceof Error) {
        if (error.message.includes("Product catalog file is required")) {
          errorMessage =
            "Please select a product catalog file (PDF, DOC, DOCX, JPG, PNG).";
        } else if (error.message.includes("fetch")) {
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
    <div className={`relative min-h-screen mb-32 ${className}`}>
      {/* Background container */}
      <div className="bg-[#F5F5FE] w-full absolute top-0 left-0 md:h-[85%] h-[95%] z-0" />

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Content - Header Section */}
          <div className="flex flex-col justify-center lg:sticky lg:top-10 self-start">
            <h1 className="text-[#040444] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-semibold mb-4 leading-tight md:leading-[1.1]">
              {title}
            </h1>
            {description && (
              <p className="text-black text-base md:text-lg max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Right Content - Form Section */}
          <div className="lg:mt-[-120px]">
            <div className="bg-white rounded-[23px] shadow-xl relative">
              {/* Loading Overlay */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[23px] z-50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#040444]" />
                    <div className="text-center">
                      <p className="text-[#040444] font-semibold text-lg">
                        Submitting Registration
                      </p>
                      <p className="text-gray-600 text-sm">
                        Please wait while we process your application...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <DynamicForm
                steps={vendorFormSteps}
                onSubmit={handleSubmit}
                submitLabel={
                  isSubmitting ? "Submitting..." : "Submit Application"
                }
                rightArrowIcon={
                  isSubmitting ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white" />
                  )
                }
                showStepIndicator={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
