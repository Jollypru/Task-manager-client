
import { useAuth } from './providers/AuthProvider'
import Login from './Login/Login';
import Navbar from './components/Navbar';
import TaskBoard from './TaskBoard/TaskBoard';

function App() {
  const {user, loading, googleSignIn, logout} = useAuth();

  return (
    <div>
      <Navbar user={user} login={googleSignIn} logout={logout}></Navbar>
     {
      user? (
        <TaskBoard></TaskBoard>
      ) : (
        <Login login={googleSignIn}></Login>
      )
     }
    </div>
  )
}

export default App;
