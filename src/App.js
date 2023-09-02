import logo from './logo.svg';
import './App.css';

import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  return (
    <main>
      <Navbar/>
      <About />
      <Projects/>
      <Skills/>
      <Contact/>
      <p>Site under construction...</p>
    </main>
  );
}

export default App;
