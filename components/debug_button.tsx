import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";

export default function DebugButton() {
    const [menuVisible, setMenuVisible] = useState(false);

    const initialX = 20;
    const initialY = 120;
    const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;

    const tapTimeout = useRef<number | null>(null);
    const moved = useRef(false);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                moved.current = false;
                pan.setOffset({
                    x: (pan.x as any)._value ?? 0,
                    y: (pan.y as any)._value ?? 0,
                });
                pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: (evt, gestureState) => {
                if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
                    moved.current = true;
                }
                Animated.event([null, { dx: pan.x, dy: pan.y }], {
                    useNativeDriver: false,
                })(evt, gestureState);
            },

            onPanResponderRelease: () => {
                pan.flattenOffset();

                // Если жест не двигался — это клик
                if (!moved.current) {
                    setMenuVisible((v) => !v);
                }
            },
        }),
    ).current;

    return (
        <View pointerEvents="box-none" style={styles.overlay}>
            {menuVisible && (
                <View pointerEvents="auto" style={styles.menu}>
                    <Text onPress={() => console.log("Reload app")}>🔄 Reload</Text>
                    <Text onPress={() => console.log("Show logs")}>📜 Logs</Text>
                    <Text onPress={() => console.log("Clear cache")}>
                        🧹 Clear cache
                    </Text>
                </View>
            )}

            <Animated.View
                pointerEvents="auto"
                style={[
                    styles.fab,
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.fabButton}>
                    <Text style={styles.fabText}>🐞</Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    menu: {
        position: "absolute",
        right: 20,
        bottom: 100,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    fab: {
        position: "absolute",
        zIndex: 9999,
        elevation: 12,
    },
    fabButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
    },
    fabText: {
        fontSize: 24,
        color: "#fff",
    },
});
