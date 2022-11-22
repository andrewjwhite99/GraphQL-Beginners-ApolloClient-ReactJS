import React, { Fragment, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";
import Card from "./UI/Card";
import styles from "./Home.module.css";
import temperatureConverter from "../Utils/temperatureConverter";
import capitalizeFirstLetter from "../Utils/capitalizeFirstLetter";

function Home() {
	const [cityName, setCityName] = useState("");
	const [getWeather, { loading, data, error }] = useLazyQuery(
		GET_WEATHER_QUERY,
		{
			variables: { name: cityName },
		}
	);

	if (error) return <h1>Error found...</h1>;
	if (data) {
		console.log(data);
	}

	return (
		<Fragment className={styles.home}>
			<Card className="input">
				<h1>Search for weather</h1>
				<input
					type="text"
					placeholder="City name..."
					onInput={(e) => setCityName(e.target.value)}
				/>
				<button onClick={(cityName) => getWeather(cityName)}>
					Search
				</button>
			</Card>
			{data && (
				<Card className="data">
					<Card className="overview">
						<h1>Overview</h1>
						<div>
							{data.getCityByName.name +
								", " +
								data.getCityByName.country}
						</div>
						<div>
							Current Temperature:{" "}
							{temperatureConverter(
								data.getCityByName.weather.temperature.actual
							) + "°C"}
						</div>
						<div>
							{capitalizeFirstLetter(
								data.getCityByName.weather.summary.description
							)}
						</div>
					</Card>
					<Card className="temperatureDetail">
						<div>
							<h1>Temperature Details</h1>
							Feels Like:{" "}
							{temperatureConverter(
								data.getCityByName.weather.temperature.feelsLike
							) + "°C"}
						</div>
						<div>
							Min:{" "}
							{temperatureConverter(
								data.getCityByName.weather.temperature.min
							) + "°C"}
						</div>
						<div>
							Max:{" "}
							{temperatureConverter(
								data.getCityByName.weather.temperature.max
							) + "°C"}
						</div>
					</Card>
				</Card>
			)}
		</Fragment>
	);
}

export default Home;
