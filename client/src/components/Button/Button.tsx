import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './Button.css';

// Discriminated union for different types of elements
type ElementType = 'button' | 'anchor' | 'link';

/**
 * Props for the Button component.
 */
interface ButtonProps {
    type: ElementType;
    children: React.ReactNode;
    className?: string; // Optional class name
}

// Props specific to the button element
interface ButtonElementProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: 'button';
    onClick?: () => void;
    disabled?: boolean;
}

// Props specific to the anchor element
interface AnchorElementProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type: 'anchor';
    // Add any additional constraints for anchor-specific props here
}

// Props specific to the link element
interface LinkElementProps extends LinkProps {
    type: 'link';
}

// Union type for all possible prop types
type ElementProps = ButtonElementProps | AnchorElementProps | LinkElementProps;

/**
 * Button can render either a button, an anchor, or a React Router DOM Link component.
 *
 * @param {ButtonProps & ElementProps} props - Component props.
 * @returns {ReactNode} - The rendered element.
 */
export default function Button(
    props: ButtonProps & ElementProps
): React.ReactNode {
    const { type, children, className = '', ...rest } = props;
    const baseClassName = 'btn';

    switch (type) {
        case 'button':
            // Render button
            return (
                <button
                    className={`${baseClassName} ${className}`}
                    {...(rest as ButtonElementProps)}>
                    {children}
                </button>
            );
        case 'anchor':
            // Render anchor (<a>)
            return (
                <a
                    className={`${baseClassName} ${className}`}
                    {...(rest as AnchorElementProps)}>
                    {children}
                </a>
            );
        case 'link':
            // Render React Router DOM Link component
            return (
                <Link
                    className={`${baseClassName} ${className}`}
                    {...(rest as LinkElementProps)}>
                    {children}
                </Link>
            );
        default:
            throw new Error('Invalid element type');
    }
}
