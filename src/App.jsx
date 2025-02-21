
import { useAuth } from './providers/AuthProvider'
import Login from './Login/Login';
import Navbar from './components/Navbar';
import Home from './Home/Home';

function App() {
  const {user, loading, googleSignIn, logout} = useAuth();

  return (
    <div>
      <Navbar user={user} login={googleSignIn} logout={logout}></Navbar>
     {
      user? (
        <Home></Home>
      ) : (
        <Login login={googleSignIn}></Login>
      )
     }
    </div>
  )
}

export default App;
