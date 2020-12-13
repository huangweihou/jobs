import React from 'react';
import PageNavbar from '../PageNavbar';
import PopularRow from './PopularRow';
import './Popular.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Popular extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			  selectedSkill: "",
			  selectedState: "",
			  skills: [],
			  locations: []
		};
    
		this.submitSkill = this.submitSkill.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/popular", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(skillList => {
        if (!skillList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let skillDivs = skillList.map((skillObj, i) =>
			    <option value={skillObj.skill}>{skillObj.skill}</option>
        );
        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
			skills: skillDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
	}

	handleChange(e) {
		this.setState({
			selectedSkill: e.target.value,
		});
	}

	handleStateChange(e) {
		this.setState({
			selectedState: e.target.value,
		});
	}

	/* ---- Popular Location ---- */
	submitSkill() {
		fetch("http://localhost:8081/popular/" + this.state.selectedSkill + "/" + this.state.selectedState, {
			method: "GET", // The type of HTTP request.
		  })
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(locationList => {
			  if (!locationList) return;
			  let locationDivs = locationList.map((locationObj, i) => 
			  	<PopularRow key={i} location = {locationObj.location} count = {locationObj.count} />
			  );
			  this.setState({
				locations: locationDivs,
			  })
			})
		  .catch(err => console.log(err))	// Print the error if there is one.
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">TOP 100 SKILLS THAT EMPLOYERS ARE LOOKING FOR</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedSkill} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> --- select your skill --- </option>
			            	{this.state.skills}
			            </select>
			            {/* <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitSkill}>submit</button> */}
						<p></p>
						<div className="input-container">
							Do You Have A Prefered State? 
			    			<input type='text' placeholder="Enter State Abbreviation" value={this.state.selectedState} onChange={this.handleStateChange} id="movieName" className="movie-input"/>
			    			<button id="decadesSubmitBtn" className="submit-btn" onClick={this.submitSkill}>submit</button>
			    		</div>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Top 10 Locations</strong></div>
			            <div className="header"><strong>Number of Jobs That Match Skill: {this.state.selectedSkill}</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.locations}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}