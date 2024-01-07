import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(60 * 25); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS == "android" && 50,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold", color: colors.text }}>
          Pomodoro
        </Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
});
