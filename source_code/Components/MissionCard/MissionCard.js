import React from "react";

export default function MissionCard(props) {
  return (
    <div className="mission-card">
      <img src={props.mission.links.mission_patch_small} alt="image" loading="lazy" />
      <div className="mission-title" title={props.mission.mission_name + " #" + props.mission.flight_number}>
        <span className="mission-name">{props.mission.mission_name}</span> #
        <span className="flight-number">{props.mission.flight_number}</span>
      </div>
      {props.mission.mission_id.length > 0 && <label className="strong">Mission Ids:</label>}
      {props.mission.mission_id.length > 0 && (
        <ul className="mission-ids">
          {props.mission.mission_id.map((missionId) => (
            <li key={missionId}>{missionId}</li>
          ))}
        </ul>
      )}
      <div className="mission-detail">
        <div className="strong">Launch year:</div>
        <div className="detail-value">{props.mission.launch_year}</div>
      </div>
      <div className="mission-detail">
        <div className="strong">Successful Launch:</div>
        <div className="detail-value">{props.mission.launch_success ? "true" : "false"}</div>
      </div>
      <div className="mission-detail">
        <div className="strong">Successful Landing:</div>
        <div className="detail-value">{props.mission.land_success ? "true" : "false"}</div>
      </div>
    </div>
  );
}
