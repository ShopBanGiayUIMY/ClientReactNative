
import { Animated, Image, SafeAreaView, Text, View,Pressable,TouchableOpacity } from 'react-native';
import React, { useState,useLayoutEffect } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import  useAuth  from "../../../Services/auth.services";
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';

const { Value, Text: AnimatedText, View: AnimatedView } = Animated;

const CELL_COUNT = 6;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const FormSecurity = ({navigation,route}) => {

  const [value, setValue] = useState('');
  const { data } = route.params;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { CreatePasswordUser } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Xác minh bảo mật",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPassword")}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="blue"
            style={styles.iconitem}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 500);
    
    return (
      <AnimatedView
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        <Text style={styles.cellText}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      </AnimatedView>
    );
  };
  const fetchData = async () => {
    try {
      const data = await CreatePasswordUser({auth_code:value});
      if (data.message) {
        console.log("data", data);
        navigation.navigate("PasswordNew",{auth_code:value});
      }
    } catch (error) {
      console.error("Error fetching data6:", error);
    }
  };
  const SendOtp = () => {
    console.log(value);
    
    fetchData();
  }
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Xác Thực mã xác minh</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
       Chúng tôi đã gửi cho bạn mã xác minh về {data.name}:
      </Text>
      <Text style={styles.subTitleitem}>
       {data.data}:{'\n'}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={styles.nextButton}>
        <TouchableOpacity style={styles.ButtonText} onPress={()=>SendOtp()} ><Text style={styles.nextButtonText}  >Xác Nhận</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FormSecurity;
