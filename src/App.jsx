import { Route, Routes } from 'react-router-dom';

//IMPORTING APP ROUTES
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Comment from './components/Comment';

const App = () => {
  return (
    <div className="lg:w-[80%] lg:mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/comments" element={<Comment />} />
      </Routes>
    </div>
  );
};
export default App;
