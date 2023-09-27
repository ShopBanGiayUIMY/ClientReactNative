import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image ,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            passwordVisibility: false,
            agreeToTerms: false,
        };

    }
    handleRegister() {
        const { fullname, email, phone, username, password,agreeToTerms } = this.state;
        const url = "https://64ffde2c18c34dee0cd40218.mockapi.io/registration/users";
        try{
            if(fullname.trim().length === 0,email.trim().length === 0,phone.trim().length === 0,username.trim().length === 0,password.trim().length === 0){
                ToastAndroid.show('Không để rỗng!', ToastAndroid.SHORT);
                return;
            }
            else if(!agreeToTerms){
                ToastAndroid.show('Bạn chưa đồng ý với điều khoản!', ToastAndroid.SHORT);
                return;
            }
           else{
            axios
            .post(url, {
                fullname: fullname,
                email: email,
                phone: phone,
                username: username,
                password: password,
            })
            .then((response) => {
                ToastAndroid.show('Chúc mừng bạn đã đăng kí thành công ✓'+username, ToastAndroid.SHORT);
                setTimeout(() => {
                    this.props.navigation.navigate('Login');
                  }, 1000);
            })
            .catch((error) => {
                console.log("Đã có lỗi xảy ra", error);
            });
           }
        }
        catch (error) {
            ToastAndroid.show('Lỗi Mạng ✓', ToastAndroid.SHORT);
          }
    }
                    
    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };
    toggleAgreeToTerms = () => {
        this.setState((prevState) => ({
            agreeToTerms: !prevState.agreeToTerms,
        }));
    };
    render() {
        const { passwordVisible, agreeToTerms } = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Create an account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    onChangeText={(text) => this.setState({ fullname: text })}
                    value={this.state.fullname}
                     style={styles.input} placeholder="Enter Your FullName" />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    style={styles.input} placeholder="Enter Your Email" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                    onChangeText={(text) => this.setState({ phone: text })}
                    value={this.state.phone}
                    style={styles.input} placeholder="Enter Your Phone Number" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                    style={styles.input} placeholder="Enter Your Username" />
                </View>

                <View style={styles.inputContainer_pass}>
                    <TextInput style={styles.input} placeholder="Enter Your Password"
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        style={styles.passwordVisible}
                        onPress={this.togglePasswordVisibility}
                    >
                        <Icon
                            name={this.state.password.length > 0 ? (passwordVisible ? 'eye-slash' : 'eye') : ''}
                            size={20}
                            color="gray"
                            style={styles.icon}

                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.checkBoxContainer}>
                    <TouchableOpacity style={styles.checkBoxContainer} onPress={this.toggleAgreeToTerms}>
                        {agreeToTerms ? (
                            <MaterialIcons name="check-box" size={24} color="#0E64D2" style={styles.icon_checkbox} />
                        ) : (
                            <Icon name="square-o" size={24} color="gray" style={styles.icon_checkbox} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.text_checkbox}>I agree to Terms and Conditions</Text>
                </View>
                <View style={styles.inputContainerButton}>
                    <TouchableOpacity style={styles.register} onPress={()=>this.handleRegister()} >
                        <Text style={styles.TextRegister} >Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container_line}>
                    <View style={styles.line_left} />
                    <Text style={styles.text_line}>Or With</Text>
                    <View style={styles.line_right} />
                </View>
                <View style={styles.inputContainerButton}>
                    <TouchableOpacity style={styles.registerbyfb} >
                        <View style={styles.fbIconContainer}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }} style={styles.fbIcon} />
                        </View>
                        <Text style={styles.TextRegister}>Signup with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainerButton}>
                    <TouchableOpacity style={styles.registerbygoogle} >
                        <View style={styles.ggIconContainer}>
                            <Image source={{ uri: 'https://www.nicepng.com/png/full/133-1334497_google-favicon-vector-google-g-logo-png.png' }} style={styles.ggIcon} />
                        </View>
                        <Text style={styles.TextRegisterGoogle}>Signup with Google</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 50,

    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    inputContainer_pass:
    {
        width: '80%',
        marginBottom: 10,
    },
    inputContainerButton: {
        width: '75%',
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        fontSize: 17,

    },
    passwordVisible: {
        position: 'absolute',
        right: 15,
        top: 12,
        justifyContent: 'center',
        textAlign: 'center'
    },
    register: {
        backgroundColor: '#0E64D2',
        borderRadius: 20,
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 29,

    },
    registerbyfb: {
        width: '100%',
        height: 45,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#1877F2',
        textAlign: 'center',
        justifyContent: 'center',

    },
    fbIconContainer: {
        alignItems: 'center',
        position: 'relative',
        right: 20,
        justifyContent: 'center',
        top: -2,
    },
    fbIcon: {
        width: 30,
        height: 30,
    },
    registerbygoogle: {

        width: '80%',
        height: 45,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        justifyContent: 'center',
    },
    ggIconContainer: {
        alignItems: 'center',
        position: 'relative',
        right: 30,
        justifyContent: 'center',
        top: 0,
    },
    ggIcon: {
        width: 35,
        height: 35,
    },
    TextRegister: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    TextRegisterGoogle: {
        color: '#787878',
        fontSize: 17,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    container_line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    line_left: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginLeft: 55,
    },
    line_right: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginRight: 55,
    },
    text_line: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: 'bold',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 0,

    },
    icon_checkbox: {
        marginRight: 10,
        width: 24,
        opacity: 0.8,

    },
    text_checkbox: {
        fontSize: 16,
        color: "#768487",
        marginTop: -3,
    }
});
