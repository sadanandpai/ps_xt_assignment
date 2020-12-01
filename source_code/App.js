import React from "react";

import DataView from "./Components/DataView/DataView";
import Filter from "./Components/Filter/Filter";

import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initState();
  }

  // state from query params if present
  initState() {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get("year");
    const launch = urlParams.get("launch");
    const landing = urlParams.get("landing");
    this.state = { year: year, launch: launch, landing: landing };
  }

  onClearFilter = () => {
    this.setState({ year: undefined, launch: undefined, landing: undefined });
  };

  onYearChange = (event) => {
    if (event.target.dataset.year) this.setState({ year: event.target.dataset.year });
  };

  onLaunchChange = (event) => {
    if (event.target.dataset.launch) this.setState({ launch: event.target.dataset.launch });
  };

  onLandingChange = (event) => {
    if (event.target.dataset.landing) this.setState({ landing: event.target.dataset.landing });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <h2>SpaceX Launch Programs</h2>
          </header>
          <main>
            <Filter
              year={this.state.year}
              launch={this.state.launch}
              landing={this.state.landing}
              onYearChange={this.onYearChange}
              onLaunchChange={this.onLaunchChange}
              onLandingChange={this.onLandingChange}
              onClearFilter={this.onClearFilter}
            />
            <DataView year={this.state.year} launch={this.state.launch} landing={this.state.landing} />
          </main>
          <footer className="footer">
            <strong>Developed by:</strong> Sadanand Pai
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
