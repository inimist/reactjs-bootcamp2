import React, { useState } from 'react';
function OptionButton({ setActivePage}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="option-button-container">
            <button className="option-button" onClick={toggleOptions}>
                <i className="fas fa-cog"></i>
            </button>
            {isOpen && (
                <div className="options-menu">
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
