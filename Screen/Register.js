import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordVisibility: false,
        };

    }
    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };
    render() {
        const { passwordVisible } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Create an account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter Your FullName" />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter Your Email" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter Your Phone Number" />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter Your Username" />
                </View>

                <View style={styles.inputContainer}>
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

                <View style={styles.inputContainerButton}>
                    <TouchableOpacity style={styles.register} >
                        <Text style={styles.TextRegister} >Register</Text>
                    </TouchableOpacity>
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
        marginVertical: 80,

    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
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
});
