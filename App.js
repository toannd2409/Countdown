import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from "./src/components/Home";
import EditTime from "./src/components/EditTime";

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  EditTime: {screen: EditTime},
});

const App = createAppContainer(MainNavigator);

export default App;