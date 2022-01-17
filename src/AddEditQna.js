export const AddEditQna = ({addEdit, saveHandler, submitText, editQna}) => {
    const onClickHandler = () => {
        if (addEdit === 'add') {
            saveHandler(document.getElementById('question'), document.getElementById('answer'));
        } else {
            saveHandler(editQna.id, document.getElementById('question'), document.getElementById('answer'));
        }
    }

    const question = (addEdit === 'add' && !editQna) ? '' : editQna.question
    const answer = (addEdit === 'add' && !editQna) ? '' : editQna.answer

    return (
        <div id="add-questions">
            <fieldset>
                <legend>Question</legend>
                <input type="text" id="question" name="question" defaultValue={question} autocomplete="off"/>
            </fieldset>
            <fieldset>
                <legend>Answer</legend>
                <textarea type="textarea" id="answer" name="answer" defaultValue={answer} autocomplete="off"/>
            </fieldset>
            <button className="add-edit-save-btn" onClick={onClickHandler}>{submitText}</button>
        </div>)
}