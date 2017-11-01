import React, { Compoent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const weatherCases = {
  Rain: {
      colors:['#00C6FB', "#005BEA"],
      title: "비",
      subtitle: "우산 꼭 챙기세요!!",
      icon : "weather-pouring",
  },
  Clear: {
    colors:['#FEF253', "#FF7300"],
    title: "맑음",
    subtitle: "뭘 해도 기분 좋음",
    icon : "weather-sunny",
  },
  Thunderstorm: {
    colors:['#00ECBC', "#007ADF"],
    title: "천둥 번개",
    subtitle: "우르릉 쾅쾅!!!",
    icon : "weather-lightning",
  },
  Clouds: {
    colors:['#D7D2CC', "#304352"],
    title: "구름낀",
    subtitle: "영국인줄..",
    icon : "weather-cloudy",
  },
  Snow: {
    colors:['#7DE2FC', "#B9B6E5"],
    title: "눈",
    subtitle: "나랑 같이 눈사람 만들래?",
    icon : "weather-snowy",
  },
  Haze: {
    colors:['#B0F7FE', "#929eaf"],
    title: "안개",
    subtitle: "밤 안개가 가득히 쓸쓸한 밤거리",
    icon : "weather-rainy",
  }
}

function Weather({weatherName, temperature}) {
  console.log(weatherName);
  return (
          <LinearGradient colors={weatherCases[weatherName].colors} style={styles.container}>
            <View style={styles.upper}>
              <MaterialCommunityIcons color="white" size={144} name={weatherCases[weatherName].icon}/>
              <Text style={styles.temp}>{temperature}°C</Text>
            </View>
            <View style={styles.lower}>
              <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
              <Text style={styles.subTitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>
          </LinearGradient>
        );
}

export default Weather;

Weather.PropTypes = {
  weatherName: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  temp: {
    fontSize: 48,
    backgroundColor: "transparent",
    color: "white",
    marginTop: 10
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  lower: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  title: {
    fontSize: 38,
    backgroundColor: "transparent",
    color: "white",
    marginBottom: 10,
    fontWeight: "300"
  },
  subTitle: {
    fontSize: 24,
    backgroundColor: "transparent",
    color: "white",
    marginBottom: 24
  }
});
