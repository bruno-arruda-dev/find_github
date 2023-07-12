import { Outlet } from "react-router-dom"
import classes from './App.module.css';
import Rotas from "./components/Routes/Routes";

function App() {

  return (
    <div className={classes.app}>
      <h1>Finder GitHub</h1>
      <Rotas />
    </div>
  )
}

export default App
