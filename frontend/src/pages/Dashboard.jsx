import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Card from '../components/Card';

// dashboard for admin, diaplaying all quizzes, and some metadata about quizzes
function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [ifAdded, setIfAdded] = React.useState(false);
  const token = localStorage.getItem('token')

  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  // console.log(token)
  React.useEffect(() => {
    if (!token) {
      console.log('NO TOKEN')
      navigate('/login')
    }
  })

  const processEditClick = (quiz) => {
    navigate('/editGame/' + quiz.id)
  }

  // Game Results Page
  const processResultsClick = (quiz, session) => {
    console.log('Navigating to results page: ' + session)
    navigate('/admin/quiz/' + session)
  }

  const processAllResultsClick = (quiz) => {
    console.log('Navigating to results page: ' + quiz.id)
    navigate('/admin/quiz/' + quiz.id + '/results')
  }

  // calls backend to create a new quiz
  const createQuiz = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 400) {
      // console.log('BANANa')
      console.log(await response.text())
    }
    // toggle ifAdded
    ifAdded ? setIfAdded(false) : setIfAdded(true);
  }

  React.useEffect(() => {
    // calls backend to get information about quiz, to display
    const loadDashboard = async () => {
      const response = await fetch('http://localhost:5005/admin/quiz/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error)
      } else {
        // for each quiz in the list, make it into a card
        const list = data.quizzes.map((quiz, index) => {
          return <Card quiz = { quiz }
            toEdit = { () => { processEditClick(quiz) } }
            getResults = { processResultsClick }
            getAllResults = { () => processAllResultsClick(quiz) }
            key = {'card' + index}
          />
        }
        );
        setQuizzes(list)
        // console.log('LOAD DASHBOARD')
      }
    }
    loadDashboard()
  }, [ifAdded])

  // reuturns a nave bar, and all quizes
  return (<>
    <NavBar token = {token}/>
    <h1>QuizNew</h1>
    Quiz name: <input
      type="text"
      onChange={e => setName(e.target.value)}
    />
    <button onClick={ createQuiz}>create</button>

    <div>{quizzes}</div>

  </>)
}

export default Dashboard;
