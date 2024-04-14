import React, { useState } from 'react';

interface FadeInComponentProps {
    children: React.ReactNode;  // Explicitly type 'children' as ReactNode
    duration?: number;  // Duration of the fade effect in seconds
}

const FadeInComponent: React.FC<FadeInComponentProps> = ({ children, duration = 0.2 }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleVisibility = () => setIsVisible(!isVisible);

    const contentStyle: React.CSSProperties = {
        transition: `opacity ${duration}s ease-out`,
        opacity: isVisible ? 1 : 0,
        display: isVisible ? 'block' : 'none'  // Adjust display to block when visible
    };

    return (
        <div>
            <button onClick={handleToggleVisibility}>
                {isVisible ? 'Hide Content' : 'Show Content'}
            </button>
            <div style={contentStyle}>
                {children}  // The content to fade in
            </div>
        </div>
    );
};

export default FadeInComponent;
