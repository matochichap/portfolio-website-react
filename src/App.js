import './App.css';
import { NavBar, Buffer, Intro, About, Skills, Projects, Contact } from './Components.js'

function App() {
  return (
    <>
    <NavBar></NavBar>
    <Intro></Intro>
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
