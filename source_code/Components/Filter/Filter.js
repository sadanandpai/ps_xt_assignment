import React from "react";
import "./Filter.css";
import qs from "query-string";

import { BrowserRouter as Router, Link } from "react-router-dom";

class Filter extends React.Component {
  state = { year: "", launch: "", landing: "" };

  // all the catergory filter values
  filters = {
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    launch: ["true", "false"],
    landing: ["true", "false"],
  };

  // custom url generator with query params for routing
  generateURLWithQueryParams(year, launch, landing) {
    return {
      ...qs.parse(location.search),
      year: year,
      launch: launch,
      landing: landing,
    };
  }

  render() {
    return (
      <aside className="filter-panel">
        <h3>Filters</h3>
        <div className="filters">
          <div className="filter">
            <div>Launch Year</div>
            <hr className="hr-75" />
            <div className="launch-years list-holder" onClick={this.props.onYearChange}>
              {this.filters.years.map((year) => (
                <Link
                  className={"filter-item " + (this.props?.year == year ? "selected" : "")}
                  key={year}
                  to={{ search: qs.stringify(this.generateURLWithQueryParams(year, this.props.launch, this.props.landing)) }}
                  data-year={year}
                >
                  {year}
                </Link>
              ))}
            </div>
          </div>
          <div className="filter">
            <div>Successful Launch</div>
            <hr className="hr-75" />
            <div className="succesful-launch list-holder" onClick={this.props.onLaunchChange}>
              {this.filters.launch.map((value) => (
                <Link
                  className={"filter-item " + (this.props?.launch === value ? "selected" : "")}
                  key={value}
                  to={{ search: qs.stringify(this.generateURLWithQueryParams(this.props.year, value, this.props.landing)) }}
                  data-launch={value}
                >
                  {value}
                </Link>
              ))}
            </div>
          </div>
          <div className="filter">
            <div>Successful Landing</div>
            <hr className="hr-75" />
            <div className="succesful-landing list-holder" onClick={this.props.onLandingChange}>
              {this.filters.landing.map((value) => (
                <Link
                  className={"filter-item " + (this.props?.landing === value ? "selected" : "")}
                  key={value}
                  to={{ search: qs.stringify(this.generateURLWithQueryParams(this.props.year, this.props.launch, value)) }}
                  data-landing={value}
                >
                  {value}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Link to={{ search: qs.stringify(this.generateURLWithQueryParams()) }} onClick={this.props.onClearFilter}>
              Clear Filters
            </Link>
          </div>
        </div>
      </aside>
    );
  }
}

export default Filter;
