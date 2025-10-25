"use client"

import type React from "react"
import { useState } from "react"
import DynamicForm, { type FormStep } from "@/components/ReusableComponenets/DynamicForm"
import { ArrowRight, Loader2 } from "lucide-react"
import { toast } from 'react-toastify'

type VendorRegistrationProps = {
  title?: string
  description?: string
  className?: string
}

const VendorRegistration: React.FC<VendorRegistrationProps> = ({
  title = "Vendor Registration Form",
  description = "",
  className = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formKey, setFormKey] = useState(0)

  // Validation functions
  const validateCompanyName = (name: string): string | undefined => {
    if (!name || !name.trim()) return "Company Name is required"
    if (name.trim().length < 2) return "Company Name must be at least 2 characters"
    return undefined
  }

  const validateAddress = (address: string): string | undefined => {
    if (!address || !address.trim()) return "Registered Address is required"
    if (address.trim().length < 10) return "Please provide a complete address"
    return undefined
  }

  const validateGSTNumber = (gst: string): string | undefined => {
    if (!gst || !gst.trim()) return "GST Number is required"
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    if (!gstRegex.test(gst.trim().toUpperCase())) {
      return "Please enter a valid GST number (15 characters)"
    }
    return undefined
  }

  const validateWebsite = (website: string): string | undefined => {
    if (!website || !website.trim()) return undefined // Optional field
    const urlRegex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?(\?[;&a-z\d%_\.~+=-]*)?(#[a-z\d_-]*)?$/i
    if (!urlRegex.test(website.trim())) {
      return "Please enter a valid website URL"
    }
    return undefined
  }

  const validateContactName = (name: string): string | undefined => {
    if (!name || !name.trim()) return "Contact Person Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces"
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email || !email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address"
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone || !phone.trim()) return "Phone Number is required"
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
    if (!phoneRegex.test(phone.trim())) return "Please enter a valid phone number"
    return undefined
  }

  const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value || !value.trim()) return `${fieldName} is required`
    return undefined
  }

  const validateTextarea = (text: string, fieldName: string, minLength = 10): string | undefined => {
    if (!text || !text.trim()) return `${fieldName} is required`
    if (text.trim().length < minLength) return `${fieldName} must be at least ${minLength} characters`
    return undefined
  }

  const validateFile = (file: File | null): string | undefined => {
    if (!file) return "Product Catalog is required"
    
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) return "File size must be less than 10MB"
    
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, DOC, DOCX, JPG, and PNG files are allowed"
    }
    
    return undefined
  }

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
            const year = new Date().getFullYear() - i
            return { value: year.toString(), label: year.toString() }
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
          placeholder: "Describe your products or services in detail (minimum 20 characters)",
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
          placeholder: "Describe your delivery terms and conditions (minimum 10 characters)",
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
  ]

  const validateAllFields = (data: Record<string, any>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    // Validate each field
    const companyNameError = validateCompanyName(data.companyName)
    if (companyNameError) errors.push(companyNameError)

    const addressError = validateAddress(data.registeredAddress)
    if (addressError) errors.push(addressError)

    const yearError = validateRequired(data.yearEstablished, "Year of Establishment")
    if (yearError) errors.push(yearError)

    const gstError = validateGSTNumber(data.gstNumber)
    if (gstError) errors.push(gstError)

    const websiteError = validateWebsite(data.website)
    if (websiteError) errors.push(websiteError)

    const contactNameError = validateContactName(data.contactName)
    if (contactNameError) errors.push(contactNameError)

    const emailError = validateEmail(data.contactEmail)
    if (emailError) errors.push(emailError)

    const phoneError = validatePhone(data.contactPhone)
    if (phoneError) errors.push(phoneError)

    const designationError = validateRequired(data.designation, "Designation")
    if (designationError) errors.push(designationError)

    const categoryError = validateRequired(data.productCategory, "Product Category")
    if (categoryError) errors.push(categoryError)

    const descriptionError = validateTextarea(data.productDescription, "Product Description", 20)
    if (descriptionError) errors.push(descriptionError)

    const fileError = validateFile(data.productCatalog)
    if (fileError) errors.push(fileError)

    const businessTypeError = validateRequired(data.businessType, "Business Type")
    if (businessTypeError) errors.push(businessTypeError)

    const paymentError = validateRequired(data.paymentTerms, "Payment Terms")
    if (paymentError) errors.push(paymentError)

    const deliveryError = validateTextarea(data.deliveryTerms, "Delivery Terms", 10)
    if (deliveryError) errors.push(deliveryError)

    return { isValid: errors.length === 0, errors }
  }

  const handleSubmit = async (data: Record<string, any>) => {
    // Validate all fields before submission
    const validation = validateAllFields(data)
    if (!validation.isValid) {
      const errorMessage = validation.errors.length > 3 
        ? `Please fix the following errors:\n• ${validation.errors.slice(0, 3).join('\n• ')}\n...and ${validation.errors.length - 3} more`
        : `Please fix the following errors:\n• ${validation.errors.join('\n• ')}`
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create FormData object for file upload
      const formData = new FormData()
      
      // Append all form fields with proper validation and sanitization
      formData.append('companyName', (data.companyName || '').trim())
      formData.append('registeredAddress', (data.registeredAddress || '').trim())
      formData.append('yearEstablished', data.yearEstablished || '')
      formData.append('gstNumber', (data.gstNumber || '').trim().toUpperCase())
      formData.append('website', (data.website || '').trim())
      formData.append('contactName', (data.contactName || '').trim())
      formData.append('contactEmail', (data.contactEmail || '').trim().toLowerCase())
      formData.append('contactPhone', (data.contactPhone || '').trim())
      formData.append('designation', (data.designation || '').trim())
      formData.append('productCategory', data.productCategory || '')
      formData.append('productDescription', (data.productDescription || '').trim())
      formData.append('businessType', data.businessType || '')
      formData.append('clientele', (data.clientele || '').trim())
      formData.append('certifications', (data.certifications || '').trim())
      formData.append('paymentTerms', data.paymentTerms || '')
      formData.append('deliveryTerms', (data.deliveryTerms || '').trim())
      formData.append('additionalInfo', (data.additionalInfo || '').trim())
      
      // Handle product catalog file upload
      if (data.productCatalog instanceof File) {
        formData.append('productCatalog', data.productCatalog)
        console.log('Product catalog file attached:', data.productCatalog.name)
      } else {
        throw new Error('Product catalog file is required')
      }
      
      console.log('Submitting vendor registration with form data...')
      
      const response = await fetch('/api/vendors', {
        method: 'POST',
        body: formData,
      })
      
      const result = await response.json()
      
      if (response.ok) {
        console.log('Vendor registration successful:', result)
        toast.success('Vendor registration submitted successfully! We will review your application and get back to you soon.', {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        setTimeout(() => {
          window.location.href = '/' 
        }, 2000)
        
      } else {
        console.error('Vendor registration failed:', result)
        
        // Handle specific error cases
        let errorMessage = 'Failed to submit vendor registration. Please try again.'
        
        if (result.message) {
          if (result.message.includes('Missing required fields')) {
            errorMessage = `Please fill in all required fields: ${result.message.split(': ')[1]}`
          } else if (result.message.includes('Invalid GST')) {
            errorMessage = 'Please enter a valid GST number in the correct format.'
          } else if (result.message.includes('Invalid email')) {
            errorMessage = 'Please enter a valid email address.'
          } else if (result.message.includes('File too large')) {
            errorMessage = 'Product catalog file is too large. Please select a file smaller than 10MB.'
          } else if (result.message.includes('Invalid file type')) {
            errorMessage = 'Please upload a valid file format (PDF, DOC, DOCX, JPG, PNG).'
          } else if (result.message.includes('Sheet') && result.message.includes('not found')) {
            errorMessage = 'System configuration error. Please contact support.'
          } else if (result.message.includes('Permission denied')) {
            errorMessage = 'System access error. Please contact support.'
          } else {
            errorMessage = result.message
          }
        }
        
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      console.error('Vendor registration error:', error)
      
      let errorMessage = 'Error submitting vendor registration. Please check your information and try again.'
      
      if (error instanceof Error) {
        if (error.message.includes('Product catalog file is required')) {
          errorMessage = 'Please select a product catalog file (PDF, DOC, DOCX, JPG, PNG).'
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else if (error.message.includes('file size')) {
          errorMessage = 'Product catalog file is too large. Please select a smaller file.'
        }
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            {description && <p className="text-black text-base md:text-lg max-w-xl">{description}</p>}
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
                      <p className="text-[#040444] font-semibold text-lg">Submitting Registration</p>
                      <p className="text-gray-600 text-sm">Please wait while we process your application...</p>
                    </div>
                  </div>
                </div>
              )}
              
              <DynamicForm
                steps={vendorFormSteps}
                onSubmit={handleSubmit}
                submitLabel={isSubmitting ? "Submitting..." : "Submit Application"}
                rightArrowIcon={
                  isSubmitting ? 
                    <Loader2 className="w-4 h-4 text-white animate-spin" /> : 
                    <ArrowRight className="w-4 h-4 text-white" />
                }
                showStepIndicator={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorRegistration