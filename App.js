import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import OneSignal from "react-native-onesignal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [arrayPush, setArrayPush] = useState(null);

  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("сюда подключать ключ :)");

  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      let notification = notificationReceivedEvent.getNotification();
      updatePushStorage(notification);
      notificationReceivedEvent.complete(notification);
    }
  );

  const updatePushStorage = async (data) => {
    const pushArrString = await AsyncStorage.getItem("pushArray");
    let pushArr = "";
    if (pushArrString) {
      pushArr = JSON.parse(pushArrString);
    }
    const pushString = JSON.stringify([...pushArr, data]);
    await AsyncStorage.setItem("pushArray", pushString);
  };

  const getPushArray = async () => {
    const pushArrString = await AsyncStorage.getItem("pushArray");
    if (pushArrString) {
      setArrayPush(pushArrString);
    }
  };

  useEffect(() => {
    getPushArray();
  }, []);

  return (
    <View>
      <Pressable style={styles.btn} onPress={getPushArray}>
        <Text>Вывести все пуши</Text>
      </Pressable>

      <View>{arrayPush ? <Text>{arrayPush}</Text> : null}</View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "orange",
    margin: 30,
    padding: 10,
    alignItems: "center",
    borderRadius: 30,
  },
});
