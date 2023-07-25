import React, {useEffect, useRef} from "react";
import {Animated, Image, StyleSheet, TouchableOpacity, View, Text, Platform, ImageBackground} from 'react-native';

const Login = () => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimBtn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            delay: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnimBtn, {
            toValue: 1,
            duration: 500,
            delay: 1300,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    return(
        <View style={styles.container}>
            <ImageBackground source={require("../images/IndexBg.png")} resizeMode="cover" style={styles.bg}>
                <View style={styles.logoWrap}>
                    <Animated.Image source={require("../images/Logo.png")} alt="logo" style={[styles.logo, { opacity: fadeAnim }]} />
                </View>
                <View style={styles.textWrap}>
                    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>내가 사랑하는 사람들과{"\n"}주고받은 마음을 기록해보세요</Animated.Text>
                </View>
                <TouchableOpacity style={styles.buttonWrap}>
                    <Animated.Image source={require("../images/KaKaoLoginBtn.png")} alt="kakao-btn" style={[styles.button, { opacity: fadeAnimBtn }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap}>
                    <Animated.Image source={require("../images/AppleLoginBtn.png")} alt="apple-btn" style={[styles.button, { opacity: fadeAnimBtn }]} />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "red"
    },
    bg: {
        paddingTop: "10%",
    },
    logoWrap: {
        display: "flex",
        alignItems: "center",
        marginTop: "45%",
        marginBottom: "35%"
    },
    logo: {
        width: 70,
        height: 88
    },
    textWrap: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15%"
    },
    text: {
        textAlign: "center",
        color: "#818181",
        fontSize: 12,
        fontWeight: 500,
    },
    buttonWrap: {
        display: "flex",
        alignItems: "center",
        marginVertical: 8,
    },
    button: {
        width: 350,
        height: 50,
        borderRadius: 8,
        overflow: "hidden"
    }
})
export default Login;
