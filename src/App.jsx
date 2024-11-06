import { Route, Routes } from 'react-router-dom';

//IMPORTING APP ROUTES
import Home from './pages/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Comment from './pages/Comment';
import Messaging from './pages/Messaging';
import ProfileInfo from './pages/ProfileInfo';
import Chat from './pages/Chat';

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
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/user-profile/:username" element={<ProfileInfo />} />
        <Route path="/messaging/:room" element={<Chat />} />
      </Routes>
    </div>
  );
};
export default App;
