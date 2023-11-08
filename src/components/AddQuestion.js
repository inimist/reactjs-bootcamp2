import { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MultipleChoiceOneAnswer from './questionType/MultipleChoiceOneAnswer';

function AddQuestion() {
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [questionType, setQuestionType] = useState({});
    const [selQuestion, setSelQuestion] = useState();
    const [questionAnswers, setQuestionAnswers] = useState({});


    const arrayCombine = (keys, values) => {
        if (keys.length !== values.length) {
            throw new Error('Arrays must have the same length');
        }

        const combined = {};

        for (let i = 0; i < keys.length; i++) {
            combined[keys[i]] = values[i];
        }

        return combined;
    };
    const onSubmit = (data) => {
        
        let choices = {};
        setSelQuestion(data.question_type_id);
        if (data.answer_options) {
            choices = arrayCombine(data.answer_options, data.correct_answer);
        }
       // const { answer_options, correct_answer, ...newObject } = data;
      //  console.log( answer_options,data);return false;
        axios.post('/question/store', data).then((res) => {
            console.log(data);
            // setQuestionAnswers({
            //     question_id: res.data.question_id,
            //     answer_options: data.answer_options,
            //     correct_answer:data.correct_answer
            // })
        })
        console.log(questionAnswers);
    };
    useEffect(() => {
        axios.get('questionType').then((res) => {
            setQuestionType(res.data);
        })
        setLoading(false);
    }, [])




    return (
        <>
            {loading ? ( // Show loading spinner while data is being fetched
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            ) : (
                <div className="question-form-container">
                    <h2>Add Question</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <input type='hidden' {...register('creator_id')}  defaultValue="1"/> */}
                        <div className="form-group">
                            <label htmlFor="question-title">Question Title</label>
                            <input
                                type="text"
                                id="question-title"
                                className={`form-control ${errors.questionTitle ? 'is-invalid' : ''}`}
                                placeholder="Enter question title"
                                {...register('title', { required: 'Question title is required' })}
                            />
                            {errors.questionTitle && <span className="invalid-feedback">{errors.questionTitle.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                placeholder="Enter description"
                                {...register('description', { required: 'Description is required' })}
                            ></textarea>
                            {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="question-type">Question Type</label>
                            <select
                                id="question-type"
                                className={`form-control ${errors.questionType ? 'is-invalid' : ''}`}
                                {...register('question_type_id', { required: 'Question type is required' })}
                            >
                                <option value=''>Select</option>
                                {questionType.length && questionType.map((val) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.title}</option>
                                    )
                                })}
                            </select>
                            {errors.questionType && <span className="invalid-feedback">{errors.questionType.message}</span>}
                        </div>
                        {selQuestion === '5' && <MultipleChoiceOneAnswer formRegister={register} setValue={setValue} />}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default AddQuestion