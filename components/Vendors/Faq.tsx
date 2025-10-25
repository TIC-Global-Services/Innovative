"use client"
import Diamond from "@/public/diamond.svg"
import FAQSection from "../ReusableComponenets/FaqSection"

const Faq = () => {
  const vendorFAQs = [
    {
      question: "How do I become a vendor for Innovative Interiors?",
      answer:
        "Complete the [Vendor Registration Form] with your company and product details. Our procurement team will review and respond if your profile fits our current needs.",
    },
    {
      question: "What kind of materials or services do you source?",
      answer:
        "We procure a wide range including plywood, MDF, laminates, hardware, adhesives, electricals, civil items, tools, fabrication support, and labor services.",
    },
    {
      question: "Do you accept niche or specialized vendors?",
      answer:
        "Yes. We welcome specialized vendors offering innovative, high-performance, or custom solutions for interiors and construction.",
    },
    {
      question: "Are samples required for approval?",
      answer:
        "Yes. We typically request product samples for quality checks before confirming vendor onboarding.",
    },
    {
      question: "What documents are needed for registration?",
      answer:
        "GST Certificate, PAN, company profile, and relevant past work orders or references.",
    },
    {
      question: "Do you charge a registration or onboarding fee?",
      answer:
        "No. Vendor registration with Innovative Interiors is completely free.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "We follow fair and transparent payment cycles. Specific terms are discussed at the time of contract finalization.",
    },
    {
      question: "Can I opt out or pause my vendor status?",
      answer:
        "Yes. You can notify our team to update or deactivate your vendor status at any time.",
    },
    {
      question: "Do you offer long-term vendor partnerships?",
      answer:
        "Absolutely. We value continuity and prefer working with vendors who grow with us across multiple projects.",
    },
  ]

  return (
    <div className="container mx-auto my-10 mb-40">
      <FAQSection title="Vendor Services FAQ" items={vendorFAQs} diamondIcon={Diamond} />
    </div>
  )
}

export default Faq
