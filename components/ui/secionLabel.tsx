import { Link as LucideLink } from "lucide-react" // renamed to avoid confusion with next/link or anchor tag
import Link from "next/link" // assuming you're using Next.js

interface SectionLabelProps {
    text: string
    backgroundColor?: string
    textColor?: string
    showBullet?: boolean
    className?: string
    link?: string
    isNormal?: boolean
}

const SectionLabel = ({
    text,
    textColor = "black",
    showBullet = true,
    className = "",
    link,
    isNormal = true
}: SectionLabelProps) => {
    const content = (
        <div
            className={`inline-flex items-center px-4 py-1 mb-2 bg-[#F8F8F8] rounded-[8px] ${className}`}
            style={{ color: textColor }}
        >
            {showBullet && <span className="mr-2 text-lg">•</span>}
            <span className="font-medium tracking-wide text-xs">{text}</span>
        </div>
    );

    return isNormal ? content : (
        <Link href={link ?? "#"}>
            {content}
        </Link>
    );
}

export default SectionLabel;
