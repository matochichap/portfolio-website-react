import './App.css'
import NavBar from './components/NavBar'
import Buffer from './components/Buffer'
// import Intro from './components/Intro'
import IntroV2 from './components/IntroV2'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <>
    <NavBar></NavBar>
    <IntroV2></IntroV2>
    <Buffer id="about"></Buffer>
    <About></About>
    <Buffer id="projects"></Buffer>
    <Projects></Projects>
    <Buffer id="skills"></Buffer>
    <Skills></Skills>
    <Buffer id="contact"></Buffer>
    <Contact></Contact>
    </>
  );
}

export default App;
