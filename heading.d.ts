import { Heading as RadixHeading } from "@/radix-ui/heading";
type RadixHeadingProps = React.ComponentProps<typeof RadixHeading>;
type HeadingVariant = "hero" | "pageTitle" | "sectionTitle" | "subsection";
type HeadingType = RadixHeadingProps & {
    children: React.ReactNode;
    variant?: HeadingVariant;
};
export declare const Heading: ({ children, variant, ...props }: HeadingType) => import("react").JSX.Element;
export {};
//# sourceMappingURL=heading.d.ts.map