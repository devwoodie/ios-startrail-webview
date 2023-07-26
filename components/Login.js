import React, {useEffect, useRef, useState} from "react";
import {Animated, Image, StyleSheet, TouchableOpacity, View, Text, Platform, ImageBackground} from 'react-native';
import { login, getProfile } from '@react-native-seoul/kakao-login';
import jwtDecode from 'jwt-decode';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStore from "../stores/UserStore";
import {useNavigation} from "@react-navigation/native";

const Login = () => {

    const navigation = useNavigation();
    // apple 로그인 전용 데이터
    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
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

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const saveData = await AsyncStorage.getItem('jwtKey');
                if (saveData) {
                    UserStore.setJwtKey(saveData);
                    navigation.navigate('WebView');
                }
            } catch (error) {
                console.error('Error retrieving saveData:', error);
            }
        };

        checkLoginStatus();

        if (Platform.OS === 'ios') {
            if (!appleAuth.isSupported) return;

            fetchAndUpdateCredentialState().catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            )
        }
    }, []);

    // 카카오 로그인
    const signInWithKakao = async() => {
        try {
            const kakaoResponse = await login();
            if (kakaoResponse.accessToken) {
                let id = '';
                console.log("access Token : " + kakaoResponse.accessToken);

                const profile = await getProfile().then((res) => {
                    id = res.id;

                    return res;
                }).catch((error) => {
                    throw error;
                });

                if (id && id !== "") {
                    await doLogin(id, 'KAKAO', profile);
                }
            }
        } catch(e) {
            console.error(e);
        }
    }

    const sighWithAppleInIOS = async() => {

        try {
            const response = await appleAuth.performRequest({
                requestedOperation : appleAuth.Operation.LOGIN,
                requestedScopes : [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
            });

            const {
                newUser,
                email,
                nonce,
                identityToken,
                realUserStatus
            } = response;

            fetchAndUpdateCredentialState(newUser)
                .catch(error => updateCredentialStateForUser(`Error : ${error.code}`));

            if (response) {
                const code = response.code;
                const id_token = response.id_token;
                const user = response.user;
                const state = response.state;

                // console.log("Got auth code", code);
                // console.log("Got id_token", id_token);
                // console.log("Got user", user);
                // console.log("Got state", state);

                const { email, email_verified, is_private_email, sub } = jwtDecode(response.id_token);

                await doLogin(email, 'APPLE', {});
            }

        } catch(error) {
            console.error(error);
        }
    }

    const fetchAndUpdateCredentialState = async(user) => {
        if (user === null) {
            updateCredentialStateForUser('N/A');
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                updateCredentialStateForUser('AUTHORIZED');
            } else {
                updateCredentialStateForUser(credentialState);
            }
        }
    }

    // 로그인
    const doLogin = async(id, type, data) => {
        const backendResponse = await UserStore.existsUser(id, type);

        console.log("backendResponse : " + JSON.stringify(backendResponse));

        UserStore.setServiceUserId(id);
        UserStore.setOauthServiceType(type);
        UserStore.setProfile(data);

        // 유저 정보가 있을 경우.
        if (backendResponse) {

            const jwtKey = await UserStore.signUser(id, type);

            console.log("jwtKey : " + jwtKey);

            await AsyncStorage.setItem('jwtKey', jwtKey);

            navigation.navigate('WebView', jwtKey);
        } else {

            navigation.navigate('Agreement');
        }

    }

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../images/IndexBg.png")} resizeMode="cover"  style={styles.bg}>
                <View style={styles.logoWrap}>
                    <Animated.Image source={require("../images/Logo.png")} alt="logo" style={[styles.logo, { opacity: fadeAnim }]} />
                </View>
                <View style={styles.textWrap}>
                    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>내가 사랑하는 사람들과{"\n"}주고받은 마음을 기록해보세요</Animated.Text>
                </View>
                <TouchableOpacity style={styles.buttonWrap} onPress={signInWithKakao}>
                    <Animated.Image source={require("../images/KaKaoLoginBtn.png")} alt="kakao-btn" style={[styles.button, { opacity: fadeAnimBtn }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap} onPress={sighWithAppleInIOS}>
                    <Animated.Image source={require("../images/AppleLoginBtn.png")} alt="apple-btn" style={[styles.button, { opacity: fadeAnimBtn }]} />
                </TouchableOpacity>
                <View style={styles.empty} />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // paddingTop: 200
    },
    bg: {
        width: "100%"
    },
    logoWrap: {
        display: "flex",
        alignItems: "center",
        marginTop: "65%",
        marginBottom: "35%",
    },
    logo: {
        width: 70,
        height: 88,
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
    },
    empty: {
        backgroundColor: "#1E1E1E",
        height: 200
    }
})
export default Login;
