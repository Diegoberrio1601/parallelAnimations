import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const circle = useRef(new Animated.Value(1)).current;
  const square = useRef(new Animated.Value(0)).current;

  const handleAnimated = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(circle, {
          toValue: 1.5,
          friction: 4,
          useNativeDriver: false,
        }),
        Animated.timing(square, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) {
        Animated.parallel([
          Animated.spring(circle, {
            toValue: 1,
            friction: 4,
            useNativeDriver: false,
          }),
          Animated.timing(square, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
          
        ]).start();
      }
    });
  };

  useEffect(() => {
    handleAnimated();
  }, []);

  const circleStyles = {
    transform: [
      {
        scale: circle,
      },
    ],
  };

  const squareStyles = {
    transform: [
      {
        rotate: square.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F29F58" }} />
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <Animated.View style={[styles.cicle, circleStyles]} />
        </View>
        <View style={styles.dividingLine}>
          <TouchableOpacity
            style={styles.reloadAnimation}
            onPress={handleAnimated}
          >
            <Text style={styles.reloadAnimationText}>Reiniciar animación</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomHalf}>
          <Animated.View style={[styles.square, squareStyles]} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>@Diegoberrio1601</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1833",
    alignItems: "center",
    justifyContent: "center",
  },
  topHalf: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  cicle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#AB4459",
  },
  dividingLine: {
    height: 1.5,
    alignSelf: "stretch",
    backgroundColor: "#F29F58",
    justifyContent: "center",
    alignItems: "center",
  },
  reloadAnimation: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#F29F58",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  reloadAnimationText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomHalf: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 180,
    height: 180,
    backgroundColor: "#AB4459",
  },

  footer: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
