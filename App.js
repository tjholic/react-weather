import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./Weather";

const API_KEY_OPEN_WEATHER_MAP = "your_key";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    err: null,
    temperature: null,
    name: null
  };
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        err: error;
      }
    );
  }

  getWeather = (lat, lon) => {
    fetch(
      `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY_OPEN_WEATHER_MAP}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };
  render() {
    const { isLoaded, err } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
            {err ? <Text style={styles.errorText}>{err}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  errorText: {
    fontSize: 20,
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    paddingLeft: 30
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  }
});
