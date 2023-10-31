import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Animated, {
  BounceOut,
  BounceOutDown,
  BounceOutLeft,
  BounceOutRight,
  BounceOutUp,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  FlipOutEasyX,
  FlipOutEasyY,
  FlipOutXDown,
  FlipOutXUp,
  FlipOutYLeft,
  FlipOutYRight,
  Layout,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  PinwheelOut,
  RollOutLeft,
  RollOutRight,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  StretchOutX,
  StretchOutY,
  ZoomInDown,
  ZoomOutDown,
  ZoomOutEasyDown,
  ZoomOutEasyUp,
  ZoomOutLeft,
  ZoomOutRight,
  ZoomOutRotate,
} from "react-native-reanimated"
import { StatusBar } from "expo-status-bar"

const LIST_ITEM_COLOR = "#1798DE"

const EntryAnimations = [
  // Fade anim
  FadeInLeft,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  // Zoom
  ZoomInDown,
]

const ExitAnimations = [
  // Fade Animations
  FadeOutLeft,
  FadeOutRight,
  FadeOutDown,
  FadeOutUp,
  // Zoom Animations
  ZoomOutEasyDown,
  ZoomOutDown,
  ZoomOutEasyDown,
  ZoomOutEasyUp,
  ZoomOutLeft,
  ZoomOutRight,
  ZoomOutRotate,
  // Bounce Animations
  BounceOut,
  BounceOutDown,
  BounceOutLeft,
  BounceOutRight,
  BounceOutUp,
  // Flip Animations
  FlipOutEasyX,
  FlipOutEasyY,
  FlipOutXDown,
  FlipOutXUp,
  FlipOutYLeft,
  FlipOutYRight,
  // Slide Animations
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  // Roll Animations
  RollOutLeft,
  RollOutRight,
  // PinWheel Animations
  PinwheelOut,
  // Stretch Animations
  StretchOutX,
  StretchOutY,
  // LightSpeed Animations
  LightSpeedOutLeft,
  LightSpeedOutRight,
]

interface Item {
  id: number
}

export default function LayoutScroll() {
  const initialMode = useRef<boolean>(true)

  useEffect(() => {
    initialMode.current = false
  }, [])

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  )

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemID = (currentItems[currentItems.length - 1]?.id ?? 0) + 1
      return [...currentItems, { id: nextItemID }]
    })
  }, [])

  const onRemove = (id: any) => {
    const filteredArray = items.filter((item) => {
      return item.id !== id
    })
    setItems(filteredArray)
  }

  const RandomExitAnimation =
    ExitAnimations[Math.floor(Math.random() * ExitAnimations.length)]

  const RandomEntryAnimation =
    EntryAnimations[Math.floor(Math.random() * EntryAnimations.length)]

  return (
    <>
      <StatusBar />

      <View style={styles.container}>
        <TouchableOpacity onPress={onAdd} style={styles.floatingbutton}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 50 }}
        >
          {items.map((item, index) => {
            return (
              <Animated.View
                key={item.id}
                onTouchEnd={() => onRemove(item.id)}
                exiting={RandomExitAnimation}
                layout={Layout.delay(50)}
                entering={
                  initialMode.current
                    ? FadeIn.delay(100 * index)
                    : RandomEntryAnimation
                }
                style={[styles.listItem, styles.shadow]}
              ></Animated.View>
            )
          })}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    // Shadow on iOS
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    // Shadow on android
    elevation: 5,
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
  },
  floatingbutton: {
    position: "absolute",
    bottom: "13%",
    right: 32,
    height: 64,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: "#111",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
})
