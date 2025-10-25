"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from 'lucide-react'
import Image from "next/image"
import SectionLabel from "../ui/secionLabel"

type FAQItem = {
    question: string
    answer: string
}

type FAQSectionProps = {
    title: string
    subtitle?: string
    items: FAQItem[]
    diamondIcon?: string 
}

const FAQSection: React.FC<FAQSectionProps> = ({
    title,
    subtitle = "FAQ",
    items,
    diamondIcon
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="py-10 md:py-20 flex flex-col items-center space-y-10 md:space-y-16 px-4 md:px-0">
            <div className="flex flex-col justify-center items-center space-y-3 md:space-y-5 w-full">
                <SectionLabel text={subtitle} />
                <h2 className="text-3xl md:text-[55px] text-[#040444] leading-tight md:leading-[69.12px]  text-center mt-5">
                    {title}
                </h2>
            </div>

            <div className="w-full md:max-w-[80%] ">
                {items.map((item, index) => (
                    <div key={index} className="border-b border-gray-300/50 pb-6 mb-6 md:mb-8">
                        <div
                            className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 sm:items-center w-full cursor-pointer"
                            onClick={() => toggleItem(index)}
                        >
                            <div className="flex items-start sm:items-center gap-2 md:gap-9 max-w-full sm:max-w-[85%] md:max-w-[90%]">
                                <div className="min-w-5 md:min-w-6 h-5 md:h-6 flex items-center justify-center mt-1 md:mt-0 text-[#040444]">
                                    {diamondIcon ? (
                                        <Image
                                            src={diamondIcon || "/placeholder.svg"}
                                            alt="Icon"
                                            width={16}
                                            height={16}
                                            className="w-4 h-4 md:w-5 md:h-5"
                                        />
                                    ) : (
                                        <span className="text-[#040444]">◆</span>
                                    )}
                                </div>
                                <h3 className="text-base sm:text-2xl md:text-[34px] font-medium text-[#040444]">
                                    {item.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-[#040444] md:hidden flex "
                                >
                                    <Plus size={openIndex === index ? 28 : 24} strokeWidth={openIndex === index ? 3 : 2} className="ml-auto" />
                                </motion.div>
                            </div>
                            <div className="min-w-[24px] hidden md:flex justify-end self-end sm:self-auto">
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="text-[#040444]"
                                >
                                    <Plus size={openIndex === index ? 28 : 24} strokeWidth={openIndex === index ? 3 : 2} className="ml-auto" />
                                </motion.div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: {
                                            height: { duration: 0.3 },
                                            opacity: { duration: 0.3, delay: 0.1 },
                                        },
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                            height: { duration: 0.3 },
                                            opacity: { duration: 0.15 },
                                        },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <motion.p
                                        initial={{ y: 10 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: 10 }}
                                        className="mt-4 md:mt-6 text-gray-600 text-sm md:text-base leading-relaxed pr-2 md:pr-8 ml-7 md:ml-9"
                                    >
                                        {item.answer}
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQSection
