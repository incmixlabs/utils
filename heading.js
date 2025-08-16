import { jsx as _jsx } from "react/jsx-runtime";
import { Heading as RadixHeading } from "@/radix-ui/heading";
const headingVariants = {
    hero: { as: "h1", size: "8", weight: "bold" },
    pageTitle: { as: "h2", size: "6", weight: "medium" },
    sectionTitle: { as: "h3", size: "5", weight: "medium" },
    subsection: { as: "h4", size: "4", weight: "regular" },
};
export const Heading = ({ children, variant, ...props }) => {
    const variantProps = variant ? headingVariants[variant] : {};
    return (_jsx(RadixHeading, { ...variantProps, ...props, children: children }));
};
//# sourceMappingURL=heading.js.map