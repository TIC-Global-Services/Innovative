"use client"
import Diamond from "@/public/diamond.svg"
import FAQSection from "../ReusableComponenets/FaqSection"

const ContactFaq = () => {
  const contactFAQs = [
    {
      question: "I already have an architect and design. Can Innovative Interiors execute our project?",
      answer:
        "Absolutely. We specialize in executing architect-designed projects with precision, finish, and full coordination with your design team — from concept to handover.",
    },
    {
      question: "I need to build a space from scratch, including design. Can Innovative help with that too?",
      answer:
        "Yes. Through our Design-Build Solutions, we offer end-to-end services — from planning and design to turnkey execution — all under one roof.",
    },
    {
      question: "I have a property that needs renovation. Does Innovative take up renovation works?",
      answer:
        "Definitely. We handle full-scale renovations across homes, hotels, offices, and more — with careful planning, structural coordination, and minimal disruption.",
    },
    {
      question: "Do you take up projects outside Chennai or Tamil Nadu?",
      answer:
        "Yes, we operate pan-India based on project scope and timeline.",
    },
  ]

  return (
    <div className="container mx-auto">
      <FAQSection title="Frequently Asked Questions" items={contactFAQs} diamondIcon={Diamond} />
    </div>
  )
}

export default ContactFaq
