import { StatusBar } from "expo-status-bar"
import { MyTabs } from "./src/TabNavigation"
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MyTabs />
    </NavigationContainer>
  )
}
