import { useState, useEffect } from 'react'
import { AddEditQna } from './AddEditQna'
import { QnaList } from './QnaList'
import './App.css';

function App() {
  const TAB_KEY_ADD_QNA = 'addqna'
  const TAB_KEY_EDIT_QNA = 'editqna'
  const TAB_KEY_QNA_LIST = 'qnalist'
  const STORAGE_KEY_QNA_LIST = 'qnalist'
  const STORAGE_KEY_LAST_CREATED_ID = 'lastCreatedId'

  const [ tab, setTab ] = useState(TAB_KEY_ADD_QNA);
  const [ questions, setQuestions ] = useState([])
  const [ editQna, setEditQna ] = useState({id: '', question: '', answer: ''})

  useEffect(()=>{
    setQuestions(getItem(STORAGE_KEY_QNA_LIST))
  }, [])

  const getItem = (key) => {
    if (key === STORAGE_KEY_QNA_LIST) {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_QNA_LIST) || '[]')
    } else if (key === STORAGE_KEY_LAST_CREATED_ID) {
      return Number(localStorage.getItem(STORAGE_KEY_LAST_CREATED_ID)) || 0
    }
  } 

  const toggleTab = () => {
    setTab(tab === TAB_KEY_ADD_QNA ? TAB_KEY_QNA_LIST : TAB_KEY_ADD_QNA);
  }

  const addqna = (questionEl, answerEl) => {
    let qnalist = getItem(STORAGE_KEY_QNA_LIST)
    let newId = getItem(STORAGE_KEY_LAST_CREATED_ID) + 1

    qnalist.push({id: newId, question: questionEl.value, answer: answerEl.value})
    localStorage.setItem(STORAGE_KEY_LAST_CREATED_ID, newId)
    saveQuestions(qnalist)

    questionEl.value = ""
    answerEl.value = ""
    setTab(TAB_KEY_QNA_LIST);
  }

  const delqna = (id) => {
    let qnalist = getItem(STORAGE_KEY_QNA_LIST)

    qnalist = qnalist.filter((val) => val.id !== id)
    saveQuestions(qnalist)
  }

  const saveQuestions = (qnalist) => {
    localStorage.setItem(STORAGE_KEY_QNA_LIST, JSON.stringify(qnalist))
    setQuestions(qnalist)
  }

  const setEditMode = (id) => {
    setTab(TAB_KEY_EDIT_QNA);
    setEditQna(questions.find(val => val.id === id))
  }

  const editqna = (id, questionEl, answerEl) => {
    let qnalist = getItem(STORAGE_KEY_QNA_LIST)
    qnalist = qnalist.map((val)=>{
      if (val.id === id) {
        return {
          ...val,
          question: questionEl.value,
          answer: answerEl.value
        }
      }
      return val;
    })
    saveQuestions(qnalist)
    setTab(TAB_KEY_QNA_LIST);
  }
  return (
    <div className="App">
      <header className="App-header">QnA Book</header>
      {(tab === TAB_KEY_QNA_LIST || tab === TAB_KEY_EDIT_QNA) && <button className="add-btn" onClick={toggleTab}>Add question</button>}
      {tab === TAB_KEY_EDIT_QNA && <>&nbsp;</>}
      {(tab === TAB_KEY_ADD_QNA || tab === TAB_KEY_EDIT_QNA) && <button className="gotoqna-btn" onClick={toggleTab}>Go To QnA(s)</button>}
      <div id="app-container">
        {tab === TAB_KEY_ADD_QNA && <AddEditQna addEdit={'add'} saveHandler={addqna} submitText={'Add Question'} />}
        {tab === TAB_KEY_EDIT_QNA && <AddEditQna addEdit={'edit'} saveHandler={editqna} submitText={'Save'} editQna={editQna} />}
        {tab === TAB_KEY_QNA_LIST && <QnaList questions={questions} editHandler={setEditMode} deleteHandler={delqna}/> }
      </div>
    </div>
  );
}

export default App;
