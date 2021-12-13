import { useSelector  } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage/HomePage';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import MenuAppBar from '../components/NavBar/AppBar';
import Tutorials from '../pages/Tutorials/Tutorials';
import Profile from '../pages/Profile/Profile';
import Challenges from '../pages/Challenges/Challenges';
import Challenge from '../pages/Challenges/Challenge';
import About from '../pages/About/About';
import Tutorial from '../pages/Tutorials/Tutorial';
import theme from '../static/theme';
import { selectUserToken } from '../redux/user/user-selectors';
import TutorialContextProvider from '../contexts/TutorialContext';
import ChallengeContextProvider from '../contexts/ChallengeContext';


export default function App() {
  const token = useSelector(selectUserToken);

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/about">
          <MenuAppBar />
          <About />
        </Route>
        
        <Route path="/signup">
          <MenuAppBar/>
          {(token)? <Redirect to="/" /> : <SignUp/>}
        </Route>

        <Route path="/signin">
          <MenuAppBar/>
          {(token)? <Redirect to="/" /> : <SignIn/>}
        </Route>
        
        <Route exact path="/tutorials">
          <MenuAppBar/>
          <TutorialContextProvider>
            <Tutorials />
          </TutorialContextProvider>
        </Route>

        <Route path="/tutorial/:id">
          <MenuAppBar/>
          <TutorialContextProvider>
            <Tutorial />
          </TutorialContextProvider>
        </Route>
        
        
        <Route path="/challenges">
          <MenuAppBar/>
          <ChallengeContextProvider>
            {(token)? <Challenges /> : <Redirect to="/signin" />}
          </ChallengeContextProvider>
        </Route>

        <Route path="/challenge/:id">
          <MenuAppBar/>
          <ChallengeContextProvider>
            {(token)? <Challenge /> : <Redirect to="/signin" />}
          </ChallengeContextProvider>
        </Route>

        <Route path="/profile">
          <MenuAppBar/>
          {(token)? <Profile /> : <Redirect to="/signin" />}
        </Route>

      </Switch>
      </ThemeProvider>
    </div>
  );
}