import React, { useState, useEffect, useRef } from 'react';

function OptionButton({ setActivePage }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            // Clicked outside the menu, close it
            setIsOpen(false);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Clicked outside the menu, close it
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="option-button-container">
            <button className="option-button" onClick={toggleOptions}>
                <i className="fas fa-cog"></i>
            </button>
            {isOpen && (
                <div className="options-menu" ref={menuRef}>
                    <ul>
                        <li onClick={() => setActivePage('addQuestion')}>Add Question</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OptionButton;
