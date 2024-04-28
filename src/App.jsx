import { Route, Routes } from 'react-router-dom';

//IMPORTING APP ROUTES 
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/create-account' element={<CreateAccount />} />
    </Routes>
  );
};
export default App;
