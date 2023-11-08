import { useState } from "react";

function MultipleChoiceOneAnswer({ formRegister, setValue }) {
    const [choices, setChoices] = useState([1, 2, 3, 4]);

    const handleRemove = (val, index) => {
        setChoices(prevChoices => prevChoices.filter(choice => choice !== val));
        const field = `answer_options[${index}]`;
        setValue(field, ""); // Clear input field va
    };

    const handleChoicesAdd = () => {
        const numberOfValuesToAdd = 3;
        const newValues = [];
        let choicesValue = choices[choices.length - 1];

        for (let i = 0; i < numberOfValuesToAdd; i++) {
            const newValue = choicesValue + 1;
            choicesValue = newValue
            newValues.push(newValue);
        }
        setChoices(prevChoices => [...prevChoices, ...newValues]);
    }

    const handleCheckboxChange = (index) => {
        const correctAnswerFields = choices.map((val, i) => `correct_answer[${i}]`);
        correctAnswerFields.forEach((field, i) => {
            setValue(field, i === index); // Set value to true for the selected checkbox, false for others
        });
    };

    return (
        <>
            <h4 className="mx-4 my-5">Question Choices</h4>

            <ul>
                {choices.length !== 0 && choices.map((val, index) => (
                    <li key={val} className="list-group-item">
                        <div className="form-group mb-0">
                            <label htmlFor={'answer_options' + val}>
                                Choice {val}
                            </label>
                            <span style={{ float: 'right', color: 'red', fontWeight: '300' }} onClick={() => { handleRemove(val, index) }} >Remove</span>


                            <input
                                {...formRegister(`answer_options[${index}]`)} className='form-control' id={'answer_options' + val} />
                        </div>
                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                {...formRegister(`correct_answer[${index}]`)} className='form-check-input' id={'correct_answer' + val} onChange={() => { handleCheckboxChange(index) }}
                            />
                            <label className="form-check-label" htmlFor={'correct_answer' + val}>check if correct</label>
                        </div>
                    </li>
                ))}
            </ul>
            <button type="button" className="btn btn-success btn-sm my-2" onClick={handleChoicesAdd}>Add 3 More Choices</button>
        </>
    )
}

export default MultipleChoiceOneAnswer