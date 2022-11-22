import styles from "./App.module.css";
import Home from "./Pages/Home";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function App() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "https://graphql-weather-api.herokuapp.com/",
	});

	return (
		<ApolloProvider client={client} className={styles.app}>
			<Home className={styles.app} />
		</ApolloProvider>
	);
}

export default App;
