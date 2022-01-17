export const QnaList = ({ questions, editHandler, deleteHandler }) => {
    return (
        <div id="qna-list"><h1>QnA(s): </h1>
            {questions.map((val, id) => {
                return (<details key={"qna-" + val.id}>
                    <summary id={"question-" + val.id}>
                        {val.question}
                        <button onClick={() => { editHandler(val.id) }}>Edit</button>
                        <button onClick={() => { deleteHandler(val.id) }}>Delete</button>
                    </summary>
                    <p id={"answer-" + val.id}>{val.answer}</p>
                </details>)
            })}
        </div>)
}