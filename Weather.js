import React, { Compoent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';


export default class Weather extends Component {
    render() {
        return (
            <LinearGradient colors={["#00C6FB", "#005BEA"]} style={styles.container}>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})