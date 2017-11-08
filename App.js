import React from "react";
import { StyleSheet, Text, View, StatusBar, AppState } from "react-native";
import Weather from "./Weather";

const API_KEY_OPEN_WEATHER_MAP = "your_api_key";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    err: null,
    temperature: null,
    name: null,
    appState: AppState.currentState

  };
  componentWillMount() {
    this.requestWeather();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  requestWeather() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        err: error;
      }
    );
  }

  handleAppStateChange = (nextAppState) => {
    if(this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground')
      this.requestWeather();
    }

    this.setState({appState: nextAppState});
  }

  getWeather = (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY_OPEN_WEATHER_MAP}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      })
      .catch(function(error) {console.log('There has been a problem with your fetch opration: ' + error.message);});
  };

  render() {
    const { isLoaded, err, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather weatherName={name} temperature={Math.floor(temperature - 273.15)}/>
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>
              {err}Getting the react weather
            </Text>
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
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingLeft: 30
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  }
});
