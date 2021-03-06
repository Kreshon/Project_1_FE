/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import ModalScreen from '../../screens/ModalScreen';
import NotFoundScreen from '../../screens/NotFoundScreen';
import TabOneScreen from '../../screens/TabOneScreen';
import TabTwoScreen from '../../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import DetailReimbursement from '../components/detail-reimbursement';
import LoginComponent from '../components/login-component';
import LogoutComponent from '../components/logout-component';
import ReimbursementList from '../components/reimbursement-list';
import { AppState } from '../store/store';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../service/user-service';
import { getAllUsers, getUser, updateLoggedUser } from '../store/actions';
import { State } from 'react-native-gesture-handler';
import { Routes } from 'react-router-dom';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import styles from '../../company-style';

const headerOptions = {headerStyle: styles.header, tabBarStyle: styles.tabBar}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state: AppState)=> state.loggedUser)
  React.useEffect(()=> {
    if(AsyncStorage.getItem("id"))
    {AsyncStorage.getItem("id").then(id => {if(id){userService.getUserById(id).then(user => {dispatch(updateLoggedUser(user))})}})}
  },[])
  const loggedUserContext = React.createContext(loggedUser)
  return (
  
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator loggedUser={loggedUser}/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator(loggedUser) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} initialParams={loggedUser}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const RSStack = createStackNavigator()

function ReimbursementStack(){
  return(<RSStack.Navigator>
    <RSStack.Screen name="List" component={ReimbursementList} options={{title:"Reimbursement List", headerStyle: styles.header,}}/>
    <RSStack.Screen name="Detail" component={DetailReimbursement} options={{title:"Reimbursement Details", headerStyle: styles.header,}}/>
  </RSStack.Navigator>)
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const loggedUser = useSelector((state: AppState)=> state.loggedUser)

  return (
    <BottomTab.Navigator 
      initialRouteName="Login"
      screenOptions={headerOptions}>
        {loggedUser.id ?
      <BottomTab.Screen
        name="Reimbursement"
        component={ReimbursementStack}
        options={{
          headerShown:false,
          title:"Reimbursement List",
          tabBarIcon: ({ color }) => <TabBarIcon name="fire" color={color} />,
          headerStyle: styles.header,
        }}
      /> : null}
    {!loggedUser.id ?
      <BottomTab.Screen 
        name="Login"
        component={LoginComponent}
        options={({ navigation }: RootTabScreenProps<'Login'>) => ({
          title: 'Login',
          tabBarIcon: ({ color }) => <TabBarIcon name="fire-extinguisher" color={color} />,
          headerStyle: styles.header,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      /> : <BottomTab.Screen 
            name="Logout"
            component={LogoutComponent}
            options={({ navigation }: RootTabScreenProps<'Logout'>) => ({
              title: 'Logout',
              tabBarIcon: ({ color }) => <TabBarIcon name="fire-extinguisher" color={color} />,
              headerStyle: styles.header,
            })}
          />}
    
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


