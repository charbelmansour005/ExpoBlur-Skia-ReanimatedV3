import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs"
import { Gradient } from "./Gradient"
import LayoutScroll from "./LayoutScroll"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { Text } from "react-native"

const Tab = createBottomTabNavigator()

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{ fontSize: 10, fontWeight: "bold", color: "black" }}
              >
                Skia
              </Text>
            ) : (
              ""
            ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="brush"
              color={focused ? "purple" : "black"}
              size={26}
            />
          ),
          tabBarBackground: () => (
            <BlurView tint="light" intensity={80} style={{ flex: 1 }} />
          ),
          tabBarStyle: { position: "absolute" },
        }}
        name="Gradient"
        component={Gradient}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{ fontSize: 10, fontWeight: "bold", color: "black" }}
              >
                Layout
              </Text>
            ) : (
              ""
            ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="list-status"
              color={focused ? "#1798DE" : "black"}
              size={26}
            />
          ),
          tabBarBackground: () => (
            <BlurView tint="light" intensity={80} style={{ flex: 1 }} />
          ),
          tabBarStyle: { position: "absolute" },
        }}
        name="Layout"
        component={LayoutScroll}
      />
    </Tab.Navigator>
  )
}

export { MyTabs }
