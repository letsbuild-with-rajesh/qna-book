import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        QnA Book
      </header>
      <nav>
        <div />
      </nav>
      <button className="add-btn">Add question</button>
      <button className="gotoqna-btn">Go To QnA(s)</button>
      <div id="app-container">
      <form method="post" action="/api/request">
        <fieldset>
          <legend>Question</legend>
          <input type="text" name="question"/>
        </fieldset>
        <fieldset>
          <legend>Answer</legend>
          <textarea type="textarea" name="answer"/>
        </fieldset>
        <button className="add-save-btn" type="submit">Add Question</button>
      </form>
      <div id="qna-list"><h1>QnA(s): </h1>
        <details>
          <summary id="question-">Question?<button>Edit</button><button>Delete</button></summary>
          <p id="answer-">Answer: Hey, I am the answer</p>
          <button className="edit-save-btn">Save</button>
        </details>
        <details>
          <summary>Question2?<button>Edit</button><button>Delete</button></summary>
          <p>Answer: Hey, I am the answer2</p>
          <button className="edit-save-btn">Save</button>
        </details>
        </div>
      </div>
    </div>
  );
}

export default App;
