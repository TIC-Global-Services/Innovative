// "use client"

// import type React from "react"
// import { useState } from "react"
// import { ArrowRight, Loader2, ChevronDown, Upload, X } from "lucide-react"
// import { toast } from 'react-toastify'
// import ArrowBtn from "../ui/arrowBtn"

// interface FormErrors {
//   name?: string
//   email?: string
//   department?: string
//   experience?: string
//   location?: string
//   message?: string
//   cv?: string
// }

// interface FormData {
//   name: string
//   email: string
//   department: string
//   experience: string
//   location: string
//   message: string
//   cv: File | null
// }

// type ApplyHereProps = {
//   title?: string
//   description?: string
//   className?: string
// }

// const ApplyHere: React.FC<ApplyHereProps> = ({
//   title = "Apply here!",
//   description = "",
//   className = "",
// }) => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     department: "",
//     experience: "",
//     location: "",
//     message: "",
//     cv: null,
//   })

//   const [errors, setErrors] = useState<FormErrors>({})
//   const [focusedInput, setFocusedInput] = useState<string | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Validation functions
//   const validateName = (name: string): string | undefined => {
//     if (!name.trim()) return "Name is required"
//     if (name.trim().length < 2) return "Name must be at least 2 characters"
//     if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces"
//     return undefined
//   }

//   const validateEmail = (email: string): string | undefined => {
//     if (!email.trim()) return "Email is required"
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email.trim())) return "Please enter a valid email address"
//     return undefined
//   }

//   const validateSelect = (value: string, fieldName: string): string | undefined => {
//     if (!value) return `Please select ${fieldName}`
//     return undefined
//   }

//   const validateFile = (file: File | null): string | undefined => {
//     if (!file) return "cv is required"
    
//     // Check file size (5MB limit)
//     const maxSize = 5 * 1024 * 1024 // 5MB in bytes
//     if (file.size > maxSize) return "File size must be less than 5MB"
    
//     // Check file type
//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ]
//     if (!allowedTypes.includes(file.type)) {
//       return "Only PDF, DOC, and DOCX files are allowed"
//     }
    
//     return undefined
//   }

//   const validateField = (field: string, value: string | File | null): string | undefined => {
//     switch (field) {
//       case 'name':
//         return validateName(value as string)
//       case 'email':
//         return validateEmail(value as string)
//       case 'department':
//         return validateSelect(value as string, "department")
//       case 'experience':
//         return validateSelect(value as string, "experience level")
//       case 'location':
//         return validateSelect(value as string, "location")
//       case 'cv':
//         return validateFile(value as File | null)
//       default:
//         return undefined
//     }
//   }

//   const validateAllFields = (): boolean => {
//     const newErrors: FormErrors = {}
//     let isValid = true

//     // Validate text fields
//     const textFields = ['name', 'email', 'department', 'experience', 'location']
//     textFields.forEach(field => {
//       const error = validateField(field, formData[field as keyof FormData] as string)
//       if (error) {
//         newErrors[field as keyof FormErrors] = error
//         isValid = false
//       }
//     })

//     // Validate file
//     const fileError = validateField('cv', formData.cv)
//     if (fileError) {
//       newErrors.cv = fileError
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { id, value } = e.target
    
//     setFormData(prev => ({ ...prev, [id]: value }))
    
//     // Clear error when user starts typing
//     if (errors[id as keyof FormErrors]) {
//       const error = validateField(id, value)
//       setErrors(prev => ({ ...prev, [id]: error }))
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null
//     setFormData(prev => ({ ...prev, cv: file }))
    
//     // Clear error and validate file
//     const error = validateFile(file)
//     setErrors(prev => ({ ...prev, cv: error }))
//   }

//   const handleFocus = (field: string) => {
//     setFocusedInput(field)
//   }

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { id, value } = e.target
//     setFocusedInput(null)
    
//     // Validate field on blur (except file)
//     if (id !== 'cv') {
//       const error = validateField(id, value)
//       setErrors(prev => ({ ...prev, [id]: error }))
//     }
//   }

//   const removeFile = () => {
//     setFormData(prev => ({ ...prev, cv: null }))
//     setErrors(prev => ({ ...prev, cv: "cv is required" }))
//   }

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault()
    
//   //   // Validate all fields before submission
//   //   if (!validateAllFields()) {
//   //     toast.error('Please fix the errors in the form before submitting.', {
//   //       position: "top-right",
//   //       autoClose: 5000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //     })
//   //     return
//   //   }

//   //   setIsSubmitting(true)
    
//   //   try {
//   //     const formDataToSend = new FormData()
      
//   //     // Append all form fields
//   //     formDataToSend.append('name', formData.name.trim())
//   //     formDataToSend.append('email', formData.email.trim().toLowerCase())
//   //     formDataToSend.append('department', formData.department)
//   //     formDataToSend.append('experience', formData.experience)
//   //     formDataToSend.append('location', formData.location)
//   //     formDataToSend.append('message', formData.message.trim())
      
//   //     if (formData.cv) {
//   //       formDataToSend.append('cv', formData.cv)
//   //     }

//   //     console.log('Submitting career application...')

//   //     const response = await fetch('/api/careers', {
//   //       method: 'POST',
//   //       body: formDataToSend,
//   //     })

//   //     const result = await response.json()
      
//   //     if (response.ok) {
//   //       console.log('Career application successful:', result)
//   //       toast.success('Application submitted successfully! We will get back to you soon.', {
//   //         position: "top-right",
//   //         autoClose: 5000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         draggable: true,
//   //       })

//   //       setTimeout(() => {
//   //         window.location.href = '/' 
//   //       }, 2000)
        
//   //       // Reset form
//   //       setFormData({
//   //         name: "",
//   //         email: "",
//   //         department: "",
//   //         experience: "",
//   //         location: "",
//   //         message: "",
//   //         cv: null,
//   //       })
//   //       setErrors({})
        
//   //     } else {
//   //       console.error('Application failed:', result)
//   //       toast.error(result.message || 'Failed to submit application. Please try again.', {
//   //         position: "top-right",
//   //         autoClose: 5000,
//   //         hideProgressBar: false,
//   //         closeOnClick: true,
//   //         pauseOnHover: true,
//   //         draggable: true,
//   //       })
//   //     }
//   //   } catch (error) {
//   //     console.error('Application error:', error)
//   //     toast.error('Error submitting application. Please check your files and try again.', {
//   //       position: "top-right",
//   //       autoClose: 5000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //     })
//   //   } finally {
//   //     setIsSubmitting(false)
//   //   }
//   // }


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     // Validate all fields before submission
//     if (!validateAllFields()) {
//       toast.error('Please fix the errors in the form before submitting.', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//       return
//     }
  
//     setIsSubmitting(true)
    
//     try {
//       // Convert cv file to base64 if exists
//       let cvData = '';
//       if (formData.cv) {
//         const reader = new FileReader();
//         cvData = await new Promise((resolve) => {
//           reader.onload = () => resolve(reader.result as string);
//           reader.readAsDataURL(formData.cv!);
//         });
//       }
  
//       // Prepare JSON data for Apps Script
//       const jsonData = {
//         name: formData.name.trim(),
//         email: formData.email.trim().toLowerCase(),
//         department: formData.department,
//         experience: formData.experience,
//         location: formData.location,
//         message: formData.message.trim(),
//         cv: cvData,
//         timestamp: new Date().toISOString()
//       };
  
//       console.log('Submitting career application...')
  
//       const response = await fetch('https://script.google.com/macros/s/AKfycbwiNcmnNOB6TWlfAjPVEh7eLvvo6aTQmfi_999-f9nIRF9z7B3_FLQsAdwlkCeudz--Kw/exec', {
//         method: 'POST',
//         body: JSON.stringify(jsonData),
//       })
  
//       const result = await response.json()
      
//       if (response.ok && result.status === 'success') {
//         console.log('Career application successful:', result)
//         toast.success('Application submitted successfully! We will get back to you soon.', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         })
  
//         setTimeout(() => {
//           window.location.href = '/' 
//         }, 2000)
        
//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           department: "",
//           experience: "",
//           location: "",
//           message: "",
//           cv: null,
//         })
//         setErrors({})
        
//       } else {
//         console.error('Application failed:', result)
//         toast.error(result.message || 'Failed to submit application. Please try again.', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         })
//       }
//     } catch (error) {
//       console.error('Application error:', error)
//       toast.error('Error submitting application. Please check your files and try again.', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className={`relative md:min-h-[130vh] h-[115vh] mt-30 ${className}`}>
//       {/* Background container */}
//       <div className="bg-[#F5F5FE] w-full absolute top-0 left-0 md:h-[85%] h-[90%] z-0" />

//       {/* Content container */}
//       <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-10 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Left Content - Header Section */}
//           <div className="flex flex-col items-center md:-mt-30 md:self-center self-start  justify-center lg:sticky lg:top-10">
//             <h1 className="text-[#040444] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[118px] font-semibold mb-4 leading-tight md:leading-[1.1]">
//               {title}
//             </h1>
//             {description && (
//               <p className="text-black text-center md:text-left lg:text-left text-sm md:text-lg max-w-xl">
//                 {description}
//               </p>
//             )}
//           </div>

//           {/* Right Content - Form Section */}
//           <div className="lg:mt-[-180px]">
//             <div className="bg-white rounded-[23px] shadow-xl relative p-6 md:p-8">
//               {/* Loading Overlay */}
//               {isSubmitting && (
//                 <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[23px] z-50 flex items-center justify-center">
//                   <div className="flex flex-col items-center gap-4">
//                     <Loader2 className="w-8 h-8 animate-spin text-[#040444]" />
//                     <div className="text-center">
//                       <p className="text-[#040444] font-semibold text-lg">Submit</p>
//                       <p className="text-gray-600 text-sm">Please wait while we process your application...</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name Field */}
//                 <div className="relative">
//                   <input
//                     id="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("name")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
//                       errors.name 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     placeholder="Your full name*"
//                     disabled={isSubmitting}
//                   />
//                   {errors.name && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
//                   )}
//                 </div>

//                 {/* Email Field */}
//                 <div className="relative">
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("email")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
//                       errors.email 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     placeholder="email@example.com*"
//                     disabled={isSubmitting}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Department Field */}
//                 <div className="relative">
//                   <select
//                     id="department"
//                     value={formData.department}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("department")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 focus:outline-none transition-all appearance-none ${
//                       errors.department 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     disabled={isSubmitting}
//                   >
//                     <option value="">Select department*</option>
//                     <option value="Project Engineers">Project Engineers</option>
//                     <option value="Design Draftsman">Design Draftsman</option>
//                     <option value="Production">Production</option>
//                     <option value="Purchase">Purchase</option>
//                     <option value="Coordinators">Coordinators</option>
//                     <option value="Costing & estimation">Costing & Estimation</option>
//                     <option value="Accounts">Accounts</option>
//                     <option value="HR">HR</option>
//                     <option value="It">IT</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Others">Others</option>
//                   </select>
//                   <ChevronDown
//                     className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
//                       focusedInput === "department" ? "text-[#040444]" : "text-gray-400"
//                     } pointer-events-none w-5 h-5 transition-colors`}
//                   />
//                   {errors.department && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.department}</p>
//                   )}
//                 </div>

//                 {/* Experience Field */}
//                 <div className="relative">
//                   <select
//                     id="experience"
//                     value={formData.experience}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("experience")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 focus:outline-none transition-all appearance-none ${
//                       errors.experience 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     disabled={isSubmitting}
//                   >
//                     <option value="">Select experience level*</option>
//                     <option value="entry">Entry Level (0-2 years)</option>
//                     <option value="mid">Mid Level (2-5 years)</option>
//                     <option value="senior">Senior Level (5+ years)</option>
//                   </select>
//                   <ChevronDown
//                     className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
//                       focusedInput === "experience" ? "text-[#040444]" : "text-gray-400"
//                     } pointer-events-none w-5 h-5 transition-colors`}
//                   />
//                   {errors.experience && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.experience}</p>
//                   )}
//                 </div>


//                 <div className="relative">
//                   <input
//                     id="location"
                  
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("location")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
//                       errors.email 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     placeholder="Current Location*"
//                     disabled={isSubmitting}
//                   />
//                   {errors.location && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>
//                   )}
//                 </div>

//                 {/* Location Field */}
//                 {/* <div className="relative">
//                   <select
//                     id="location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("location")}
//                     onBlur={handleBlur}
//                     className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 focus:outline-none transition-all appearance-none ${
//                       errors.location 
//                         ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
//                         : 'focus:ring-2 focus:ring-[#040444]/20'
//                     }`}
//                     disabled={isSubmitting}
//                   >
//                     <option value="">Select location*</option>
//                     <option value="remote">Remote</option>
//                     <option value="hybrid">Hybrid</option>
//                     <option value="onsite">On-site</option>
//                   </select>
//                   <ChevronDown
//                     className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
//                       focusedInput === "location" ? "text-[#040444]" : "text-gray-400"
//                     } pointer-events-none w-5 h-5 transition-colors`}
//                   />
//                   {errors.location && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>
//                   )}
//                 </div> */}

//                 {/* Message Field */}
//                 <div className="relative">
//                   <textarea
//                     id="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     onFocus={() => handleFocus("message")}
//                     onBlur={handleBlur}
//                     rows={4}
//                     className="w-full rounded-lg px-4 py-3 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#040444]/20 transition-all resize-none"
//                     placeholder="Tell us about yourself... (Optional)"
//                     disabled={isSubmitting}
//                   />
//                 </div>

//                 {/* File Upload Field */}
//                 <div className="relative">
//                   <div className={`w-full min-h-[80px] rounded-lg border-2 border-dashed transition-all ${
//                     errors.cv 
//                       ? 'border-red-500 bg-red-50' 
//                       : formData.cv 
//                         ? 'border-green-500 bg-green-50' 
//                         : 'border-gray-300 bg-[#F7F8FA] hover:border-[#040444]'
//                   }`}>
//                     <input
//                       id="cv"
//                       type="file"
//                       onChange={handleFileChange}
//                       accept=".pdf,.doc,.docx"
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                       disabled={isSubmitting}
//                     />
                    
//                     <div className="flex flex-col items-center justify-center p-4 text-center pointer-events-none">
//                       {formData.cv ? (
//                         <div className="flex items-center gap-3 w-full">
//                           <div className="flex-1 text-left">
//                             <p className="text-sm font-medium text-gray-700 truncate">
//                               {formData.cv.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={removeFile}
//                             className="p-1 hover:bg-red-100 rounded-full transition-colors pointer-events-auto"
//                             disabled={isSubmitting}
//                           >
//                             <X className="w-4 h-4 text-red-500" />
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium text-[#040444]">Click to upload</span> your cv*
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             PDF, DOC, DOCX (Max 5MB)
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                   {errors.cv && (
//                     <p className="text-red-500 text-xs mt-1 ml-1">{errors.cv}</p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4  w-full">
//                 <div className="flex flex-col items-center justify-center text-black gap-2">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="disabled:opacity-50 disabled:cursor-not-allowed "
//               >
//                 <ArrowBtn 
//                   text={isSubmitting ? "Submitting..." : "Submit"} 
//                   backgroundColor="#040444" 
//                 />
//               </button>
            
//             </div> 
//                   {/* <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-[#040444] text-white h-12 md:h-14 rounded-lg font-medium text-sm md:text-base hover:bg-[#040444]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : (
//                       <>
//                         Submit Application
//                         <ArrowRight className="w-4 h-4" />
//                       </>
//                     )}
//                   </button> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplyHere






"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Loader2, ChevronDown, Upload, X } from "lucide-react"
import { toast } from 'react-toastify'
import ArrowBtn from "../ui/arrowBtn"

interface FormErrors {
  name?: string
  email?: string
  department?: string
  experience?: string
  location?: string
  message?: string
  cv?: string
}

interface FormData {
  name: string
  email: string
  department: string
  experience: string
  location: string
  message: string
  cv: File | null
}

type ApplyHereProps = {
  title?: string
  description?: string
  className?: string
}

const ApplyHere: React.FC<ApplyHereProps> = ({
  title = "Apply here!",
  description = "",
  className = "",
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "",
    experience: "",
    location: "",
    message: "",
    cv: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces"
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address"
    return undefined
  }

  const validateSelect = (value: string, fieldName: string): string | undefined => {
    if (!value) return `Please select ${fieldName}`
    return undefined
  }

  const validateFile = (file: File | null): string | undefined => {
    if (!file) return "cv is required"
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) return "File size must be less than 5MB"
    
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, DOC, and DOCX files are allowed"
    }
    
    return undefined
  }

  const validateField = (field: string, value: string | File | null): string | undefined => {
    switch (field) {
      case 'name':
        return validateName(value as string)
      case 'email':
        return validateEmail(value as string)
      case 'department':
        return validateSelect(value as string, "department")
      case 'experience':
        return validateSelect(value as string, "experience level")
      case 'location':
        return validateSelect(value as string, "location")
      case 'cv':
        return validateFile(value as File | null)
      default:
        return undefined
    }
  }

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Validate text fields
    const textFields = ['name', 'email', 'department', 'experience', 'location']
    textFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData] as string)
      if (error) {
        newErrors[field as keyof FormErrors] = error
        isValid = false
      }
    })

    // Validate file
    const fileError = validateField('cv', formData.cv)
    if (fileError) {
      newErrors.cv = fileError
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    
    setFormData(prev => ({ ...prev, [id]: value }))
    
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      const error = validateField(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
    
    // Clear error and validate file
    const error = validateFile(file)
    setErrors(prev => ({ ...prev, cv: error }))
  }

  const handleFocus = (field: string) => {
    setFocusedInput(field)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFocusedInput(null)
    
    // Validate field on blur (except file)
    if (id !== 'cv') {
      const error = validateField(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
    }
  }

  const removeFile = () => {
    setFormData(prev => ({ ...prev, cv: null }))
    setErrors(prev => ({ ...prev, cv: "cv is required" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields before submission
    if (!validateAllFields()) {
      toast.error('Please fix the errors in the form before submitting.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
  
    setIsSubmitting(true)
    
    try {
      let resumeData = '';
      if (formData.cv) {
        const reader = new FileReader();
        resumeData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.cv!);
        });
      }
  

      const jsonData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        department: formData.department,
        experience: formData.experience,
        location: formData.location,
        message: formData.message.trim(),
        resume: resumeData,
        timestamp: new Date().toISOString()
      };
  
      console.log('Submitting career application...')
  
      const response = await fetch('https://script.google.com/macros/s/AKfycbyB2xSx5noKGNuyGa7HUuF2MvKGgGxtKwRveVpvcILnbBTjtsFsnpwFwn6XalocwRQDMg/exec', {
        method: 'POST',
        body: JSON.stringify(jsonData),
      })
  
      const result = await response.json()
      
      if (response.ok && result.status === 'success') {
        console.log('Career application successful:', result)
        toast.success('Application submitted successfully! We will get back to you soon.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
  
        setTimeout(() => {
          window.location.href = '/' 
        }, 2000)
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          department: "",
          experience: "",
          location: "",
          message: "",
          cv: null,
        })
        setErrors({})
        
      } else {
        console.error('Application failed:', result)
        toast.error(result.message || 'Failed to submit application. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      console.error('Application error:', error)
      toast.error('Error submitting application. Please check your files and try again.', {
        position: "top-right",
        autoClose: 5000,
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
    <div className={`relative md:min-h-[130vh] h-[115vh] mt-30 ${className}`}>
      {/* Background container */}
      <div className="bg-[#F5F5FE] w-full absolute top-0 left-0 md:h-[85%] h-[90%] z-0" />

      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Content - Header Section */}
          <div className="flex flex-col items-center md:-mt-30 md:self-center self-start  justify-center lg:sticky lg:top-10">
            <h1 className="text-[#040444] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[118px] font-semibold mb-4 leading-tight md:leading-[1.1]">
              {title}
            </h1>
            {description && (
              <p className="text-black text-center md:text-left lg:text-left text-sm md:text-lg max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Right Content - Form Section */}
          <div className="lg:mt-[-180px]">
            <div className="bg-white rounded-[23px] shadow-xl relative p-6 md:p-8">
              {/* Loading Overlay */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[23px] z-50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#040444]" />
                    <div className="text-center">
                      <p className="text-[#040444] font-semibold text-lg">Submit</p>
                      <p className="text-gray-600 text-sm">Please wait while we process your application...</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                    className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'focus:ring-2 focus:ring-[#040444]/20'
                    }`}
                    placeholder="Your full name*"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                      errors.email 
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'focus:ring-2 focus:ring-[#040444]/20'
                    }`}
                    placeholder="email@example.com*"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
                  )}
                </div>

                {/* Department Field */}
                <div className="relative">
                  <select
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("department")}
                    onBlur={handleBlur}
                    className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 focus:outline-none transition-all appearance-none ${
                      errors.department 
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'focus:ring-2 focus:ring-[#040444]/20'
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select department*</option>
                    <option value="Project Engineers">Project Engineers</option>
                    <option value="Design Draftsman">Design Draftsman</option>
                    <option value="Production">Production</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Coordinators">Coordinators</option>
                    <option value="Costing & estimation">Costing & Estimation</option>
                    <option value="Accounts">Accounts</option>
                    <option value="HR">HR</option>
                    <option value="It">IT</option>
                    <option value="Admin">Admin</option>
                    <option value="Others">Others</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      focusedInput === "department" ? "text-[#040444]" : "text-gray-400"
                    } pointer-events-none w-5 h-5 transition-colors`}
                  />
                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.department}</p>
                  )}
                </div>

                {/* Experience Field */}
                <div className="relative">
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("experience")}
                    onBlur={handleBlur}
                    className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 focus:outline-none transition-all appearance-none ${
                      errors.experience 
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'focus:ring-2 focus:ring-[#040444]/20'
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select experience level*</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                  </select>
                  <ChevronDown
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      focusedInput === "experience" ? "text-[#040444]" : "text-gray-400"
                    } pointer-events-none w-5 h-5 transition-colors`}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.experience}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("location")}
                    onBlur={handleBlur}
                    className={`w-full h-12 md:h-14 rounded-lg px-4 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all ${
                      errors.location 
                        ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'focus:ring-2 focus:ring-[#040444]/20'
                    }`}
                    placeholder="Current Location*"
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    rows={4}
                    className="w-full rounded-lg px-4 py-3 bg-[#F7F8FA] text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#040444]/20 transition-all resize-none"
                    placeholder="Tell us about yourself... (Optional)"
                    disabled={isSubmitting}
                  />
                </div>

                {/* File Upload Field */}
                <div className="relative">
                  <div className={`w-full min-h-[80px] rounded-lg border-2 border-dashed transition-all ${
                    errors.cv 
                      ? 'border-red-500 bg-red-50' 
                      : formData.cv 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 bg-[#F7F8FA] hover:border-[#040444]'
                  }`}>
                    <input
                      id="cv"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    
                    <div className="flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                      {formData.cv ? (
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-700 truncate">
                              {formData.cv.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors pointer-events-auto"
                            disabled={isSubmitting}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-[#040444]">Click to upload</span> your cv*
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.cv && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.cv}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4  w-full">
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
            
            </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyHere