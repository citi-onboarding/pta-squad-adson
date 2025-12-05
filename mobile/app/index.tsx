import { View, Text } from "react-native";
import BaseMobile from "../src/components/mobileBase";


const App: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <BaseMobile logo={require("../src/assets/slogan.png")}/>
  </View>
);


export default App;