const temperatureConverter = (temperatureInKelvin) => {
	const kelvinOffset = 273.15;

	return (temperatureInKelvin - kelvinOffset).toFixed(1);
};

export default temperatureConverter;
