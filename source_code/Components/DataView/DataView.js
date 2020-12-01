import React from "react";
import "./DataView.css";
import MissionCard from "../MissionCard/MissionCard";

class DataView extends React.Component {
  state = { missions: [], loader: false, error: false };
  url = "https://api.spacexdata.com/v3/launches?limit=100";

  errorElement = (<h1 className="no-data">An error occured. Please try again</h1>);
  noDataElement = (<h1 className="no-data">No Data Found</h1>);
  loaderElement = (
    <div className="loader-area">
      <div className="loader"></div>
    </div>
  );

  fetchReq(year, launch, landing) {
    let url = this.url;
    url += year ? `&launch_year=${year}` : "";
    url += launch ? `&launch_success=${launch}` : "";
    url += landing ? `&land_success=${landing}` : "";
    return fetch(url);
  }

  populateMissionsWithResponse(year, launch, landing) {
    const fetchPromise = this.fetchReq(year, launch, landing);
    this.setState({ loader: true });
    const responsePromise = fetchPromise.then((response) => response.json());

    responsePromise
      .then((data) => {
        this.setState(() => {
          return {
            missions: data,
            loader: false,
          };
        });
      })
      .catch((error) => {
        this.setState(() => {
          return {
            missions: [],
            loader: false,
            error: true,
          };
        });
        console.error(error);
      });
  }

  componentDidMount() {
    this.populateMissionsWithResponse(this.props.year, this.props.launch, this.props.landing);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year || prevProps.launch !== this.props.launch || prevProps.landing !== this.props.landing) {
      this.populateMissionsWithResponse(this.props.year, this.props.launch, this.props.landing);
    }
  }

  render() {
    if (this.state.loader) return this.loaderElement;
    else if (this.state.error) return this.errorElement;
    else if (this.state.missions.length === 0) return this.noDataElement;

    return (
      <div className="mission-results" id="missionResults">
        {this.state.missions.map((mission) => (
          <MissionCard mission={mission} key={mission.mission_name} />
        ))}
      </div>
    );
  }
}

export default DataView;
