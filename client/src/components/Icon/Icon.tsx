// Lib Dependencies
import { SVGAttributes } from "react";

// Dependencies
import "./Icon.css";
import IconPaths from "./IconPaths";

/**
 * Props for the Icon component.
 * 
 * @interface IconProps
 * @extends {SVGAttributes<SVGElement>} - SVG attributes that can be applied to the Icon component.
 * @property {keyof typeof IconPaths} type - The type of icon, corresponding to a key in the IconPaths.
 * @property {string} [className] - Additional CSS class name(s) for the icon.
 * @property {string} [size] - Custom size for the icon.
 * @property {string} [color] - Custom color for the icon.
 */
interface IconProps extends SVGAttributes<SVGElement> {
    type: keyof typeof IconPaths;
    className?: string;
    size?: string;
    color?: string;
}

/**
 * Icon component for rendering SVG icons with customizable attributes.
 * 
 * @component
 * @example
 * // Basic usage:
 * <Icon type="heart" />
 * 
 * // With additional attributes, custom class name, custom size, and custom color:
 * <Icon type="star" width={32} height={32} className="custom-icon" size="2rem" color="blue" />
 * 
 * @param {IconProps} props - The properties for the Icon component.
 * @returns {JSX.Element} JSX element representing the Icon component.
 */
export default function Icon({ type, size, color, className, ...props }: IconProps): JSX.Element {
    // Retrieve the SVG path based on the provided type
    const svgPath = IconPaths[type];

    // Set the custom size and color as CSS variables
    const cssCustomProps = {
        '--icon-size': size,
        '--icon-color': color,
    } as React.CSSProperties;

    // Extend base CSS class name.
    const combinedClassName = className ? `icon ${className}` : 'icon';

    return (
        <svg
            style={cssCustomProps}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={combinedClassName}
            {...props}
        >
            {/* Path element defining the shape of the icon */}
            <path d={svgPath} />
        </svg>
    );
}
