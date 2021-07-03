import './App.css';
import React from "react";
import Table from "./components/Table";
import {BrowserRouter, Route} from "react-router-dom";
import Chart from "./components/Chart";

class App extends React.Component {

  render() {
    return (
        <BrowserRouter>
        <div>
          <Route exact path="/" component={Table} />
          <Route exact path="/chart" component={Chart} />
        </div>
        </BrowserRouter>
    )
  }

}





export default App;
