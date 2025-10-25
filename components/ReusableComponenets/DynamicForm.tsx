"use client"

import React, { useState, useRef } from "react"
import { Upload } from "lucide-react"
import ArrowBtn from "../ui/arrowBtn"

export type FormField = {
  id: string
  label: string
  type: "text" | "email" | "select" | "textarea" | "file" | "number"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

export type FormStep = {
  title: string
  fields: FormField[]
}

type DynamicFormProps = {
  steps?: FormStep[]
  fields?: FormField[]
  title?: string
  subtitle?: string
  submitLabel?: string
  onSubmit: (data: Record<string, any>) => void
  className?: string
  showStepIndicator?: boolean
  rightArrowIcon?: React.ReactNode
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  steps,
  fields,
  title,
  subtitle,
  submitLabel = "Submit",
  onSubmit,
  className = "",
  showStepIndicator = true,
  rightArrowIcon,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  // Fix: Use a simple object to store refs instead of Map
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const isMultiStep = !!steps && steps.length > 0
  const currentFields = isMultiStep ? steps[currentStep].fields : fields || []
  const totalSteps = isMultiStep ? steps.length : 1

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleFileChange = (fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, [fieldId]: files[0] }))
    } else {
      setFiles((prev) => ({ ...prev, [fieldId]: null }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isMultiStep && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      return
    }

    // Combine form data and files
    const submitData = { ...formData }
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        submitData[key] = files[key]
      }
    })

    onSubmit(submitData)
  }

  const handleFocus = (fieldId: string) => {
    setFocusedInput(fieldId)
  }

  const handleBlur = () => {
    setFocusedInput(null)
  }

  const handleFileInputClick = (id: string) => {
    // Safely access the ref and trigger click if it exists
    const inputElement = fileInputRefs.current[id]
    if (inputElement) {
      inputElement.click()
      handleFocus(id)
    }
  }

  const renderField = (field: FormField) => {
    const { id, label, type, placeholder, required, options } = field

    switch (type) {
      case "select":
        return (
          <div className="space-y-1" key={id}>
            <label className="block text-black md:text-[16px] text-[10px] font-medium">
              {label}
              {required && "*"}
            </label>
            <select
              className="w-full md:h-[48px] h-[30px] px-3 bg-[#F1F1F6] text-[#B5B3B3] md:text-[14px] text-[10px] rounded-[4px]"
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              onFocus={() => handleFocus(id)}
              onBlur={handleBlur}
              required={required}
            >
              <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )

      case "textarea":
        return (
          <div className="space-y-1" key={id}>
            <label className="block text-black md:text-[16px] text-[10px] font-medium">
              {label}
              {required && "*"}
            </label>
            <textarea
              className="w-full p-2 bg-[#F1F1F6] text-[#B5B3B3] md:text-[14px] text-[10px] rounded-[4px] md:h-22 h-12"
              placeholder={placeholder}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              onFocus={() => handleFocus(id)}
              onBlur={handleBlur}
              required={required}
            />
          </div>
        )

      case "file":
        return (
          <div className="space-y-1" key={id}>
            <label className="block text-black md:text-[16px] text-[10px] font-medium">
              {label}
              {required && "*"}
            </label>
            <div className="w-full">
              <div
                className={`rounded-[4px] p-4 text-center cursor-pointer transition-colors relative md:h-[156px] h-[100px] ${focusedInput === id ? "bg-[#F1F1F6]/80" : "hover:bg-[#F1F1F6]"
                  }`}
                style={{
                  border: focusedInput === id ? "1px dashed #040444" : "1px dashed #B5B3B3",
                }}
                onClick={() => handleFileInputClick(id)}
              >
                <input
                  // Fix: Use callback ref pattern that TypeScript understands
                  ref={(element) => {
                    fileInputRefs.current[id] = element
                  }}
                  id={`file-${id}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(id, e)
                    handleFocus(id)
                  }}
                  onBlur={handleBlur}
                  accept=".pdf,.doc,.docx"
                  required={required}
                />
                <div className="flex flex-col items-center justify-center md:mt-6 gap-1 text-center">
                  {files[id] ? (
                    <span className="text-[#040444] text-sm md:text-base">{files[id]?.name}</span>
                  ) : (
                    <>
                      <Upload className={`w-6 h-6 ${focusedInput === id ? "text-[#040444]" : "text-[#B5B3B3]"} mb-2`} />
                      <span className="text-[#B5B3B3] text-xs md:text-sm">Drag and drop your file here <br/>or Click to upload</span>
                      {/* <span className="text-[#B5B3B3] text-xs md:text-sm">or</span>
                      <span className="text-[#040444] text-sm md:text-base font-medium">click to upload</span> */}
                    </>
                  )}
                </div>
              </div>
            </div>
            {files[id] && <p className="text-xs text-gray-600 mt-1">Selected: {files[id]?.name}</p>}
          </div>
        )

      default:
        return (
          <div className="space-y-1" key={id}>
            <label className="block text-black md:text-[16px] text-[10px] font-medium">
              {label}
              {required && "*"}
            </label>
            <input
              type={type}
              className="w-full md:h-[48px] h-[30px] px-3 bg-[#F1F1F6] text-[#B5B3B3] md:text-[14px] text-[10px] rounded-[4px]"
              placeholder={placeholder}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              onFocus={() => handleFocus(id)}
              onBlur={handleBlur}
              required={required}
            />
          </div>
        )
    }
  }

  const renderStepIndicator = () => {
    if (!isMultiStep || !showStepIndicator) return null

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${index <= currentStep ? "bg-[#040444] text-white" : "bg-gray-200 text-gray-500"
                  }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && <div className="w-8 h-[1px] bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-[23px] p-6 md:p-8 shadow-lg ${className}`}>
      {(title || (isMultiStep && steps[currentStep].title)) && (
        <h2 className="text-2xl md:text-3xl font-semibold text-[#040444] mb-6">
          {isMultiStep ? steps[currentStep].title : title}
        </h2>
      )}

      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}

      {renderStepIndicator()}

      <form onSubmit={handleSubmit} className="md:space-y-4 space-y-2">
        {currentFields.map(renderField)}

        <div className="text-center mt-10">
          <ArrowBtn backgroundColor="#040444" text={isMultiStep && currentStep < totalSteps - 1 ? "Next" : submitLabel} />
        </div>

      </form>
    </div>
  )
}

export default DynamicForm
