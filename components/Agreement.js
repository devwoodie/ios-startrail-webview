import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import UserStore from '../stores/UserStore';

const Agreement = () => {

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);

    const setAgreement = () => {

        const allowInformation = {
            serviceYn : check1 ? "Y" : "N",
            privateInformationYn : check2 ? "Y" : "N",
            eventMarketingYn : check3 ? "Y" : "N"
        };

        UserStore.setAgreement(allowInformation);

        // navigation.navigate('RegisterNickname');
    };

    const checkAll = () => {
        if (check1 && check2 && check3) {
            setCheck1(false);
            setCheck2(false);
            setCheck3(false);
        } else {
            setCheck1(true);
            setCheck2(true);
            setCheck3(true);
        }
    };

    const goTerm = (index) => {
        navigation.navigate('Term', { index });
    };

    return (
        <View style={styles.container}>
            <View style={styles.termHeader}>
                <Text style={styles.title}>서비스 사용을 위한</Text>
                <Text style={styles.title}>약관에 동의해주세요.</Text>
            </View>
            <View style={styles.termBody}>
                <TouchableOpacity style={styles.termRow} onPress={checkAll}>
                    <Image
                        source={check1 && check2 && check3 ? require('../images/IcCheckOn.png') : require('../images/IcCheckOff.png')}
                        style={styles.checkImage}
                    />
                    <Text style={styles.termText}>전체 동의하기</Text>
                </TouchableOpacity>
                <View style={styles.hr} />
                <TouchableOpacity
                    style={styles.termRow}
                    onPress={() => setCheck1(!check1)}
                >
                    <Image
                        source={check1 ? require('../images/IcCheckOn.png') : require('../images/IcCheckOff.png')}
                        style={styles.checkImage}
                    />
                    <Text style={styles.mandatory}>(필수)</Text>
                    <Text style={styles.termText}>서비스 이용약관</Text>
                    <TouchableOpacity style={styles.rightBtn} onPress={() => goTerm(0)}>
                        <Image source={require('../images/IcArrRight.png')} style={styles.rightImage} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.termRow}
                    onPress={() => setCheck2(!check2)}
                >
                    <Image
                        source={check2 ? require('../images/IcCheckOn.png') : require('../images/IcCheckOff.png')}
                        style={styles.checkImage}
                    />
                    <Text style={styles.mandatory}>(필수)</Text>
                    <Text style={styles.termText}>개인정보 수집 및 이용안내</Text>
                    <TouchableOpacity style={styles.rightBtn} onPress={() => goTerm(1)}>
                        <Image source={require('../images/IcArrRight.png')} style={styles.rightImage} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.termRow}
                    onPress={() => setCheck3(!check3)}
                >
                    <Image
                        source={check3 ? require('../images/IcCheckOn.png') : require('../images/IcCheckOff.png')}
                        style={styles.checkImage}
                    />
                    <Text style={styles.choice}>(선택)</Text>
                    <Text style={styles.termText}>이벤트 및 마케팅 수신 동의</Text>
                    <TouchableOpacity style={styles.rightBtn} onPress={() => goTerm(2)}>
                        <Image source={require('../images/IcArrRight.png')} style={styles.rightImage} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonDiv}>
                <TouchableOpacity
                    style={(check1 && check2) ? styles.nextButton : styles.disabledButton}
                    disabled={!check1 || !check2}
                    onPress={setAgreement}
                >
                    <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection : 'column',
        justifyContent: 'center',
        backgroundColor : "#1E1E1E",
    },
    termHeader: {
        marginTop: "20%",
        marginBottom: "10%"
    },
    title: {
        color : 'white',
        marginLeft : 20,
        fontSize : 20,
        fontWeight : "bold",
    },
    termBody: {
        flex : 1,
    },
    termRow: {
        flexDirection : 'row',
        display: "flex",
        alignItems: "center",
        marginBottom : 15,
        marginTop : 15,
    },
    checkImage: {
        width: 24,
        height: 24,
        marginLeft : 20,
        marginRight : 20,
    },
    termText: {
        color : 'white',
        width : "63%",
    },
    mandatory: {
        color : '#FA7F64',
        marginRight : 10,
    },
    choice : {
        color : 'white',
        marginRight : 10,
    },
    rightImage: {
        width: 24,
        height: 24
    },
    buttonDiv: {
        alignItems : 'center',
    },
    nextButton: {
        width : 350,
        marginBottom : 30,
        backgroundColor : '#FA7F64',
        alignItems : 'center',
        height : 50,
        justifyContent : 'center',
        borderRadius : 10,
    },
    disabledButton: {
        width : 350,
        marginBottom : 30,
        backgroundColor : '#AFAFAF',
        color : '#818181',
        alignItems : 'center',
        height : 50,
        justifyContent : 'center',
        borderRadius : 10,
    },
    buttonText: {
        color : 'white',
        fontSize : 15,
    },
    hr : {
        borderBottomColor: "rgba(255,255,255,0.1)",
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 20
    },
});

export default Agreement;
