import { wrap } from 'module'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlipInEasyX } from 'react-native-reanimated'

const styles = StyleSheet.create({


header:{
    backgroundColor: "#A599B5",
},

tabBar:{
    backgroundColor: "#A599B5",
    
},

list:{
    backgroundColor: "#051014",
},

cards:{
    backgroundColor: "#ACBDBA",
},

detail:{
    backgroundColor: "#051014",
    justifyContent: "center",
    alignContent: "center",
    alignItems: 'center',
    flexWrap: "wrap",
    flex: 1,
},

lineItem:{
    justifyContent: "center",
    alignContent: "center",
    alignItems: 'center',
    flexWrap: "wrap",
    flex: 1,
},

p:{
    display: 'flex',
    backgroundColor: "#051014",
    fontSize: 18,
    color: "#ACBDBA",
    
},

p2:{
    display: 'flex',
    backgroundColor: "#051014",
    fontSize: 18,
    color: "#ACBDBA",
    marginBottom: 5,
},

loginDiv:{
    display: 'flex',
    backgroundColor: "#051014",
    justifyContent: "center",
    alignContent: "center",
    alignItems: 'center',
    flex: 1,
    
},

h1:{
    display: 'flex',
    fontSize: 50,
    color: "#CDDDDD",
    textShadowColor: "#A599B5",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    textAlign: 'center',
    justifyContent: "center",
    alignContent: "center",

},

label:{
    display: 'flex',
    fontSize: 30,
    color: "#CDDDDD",
    textAlign: 'center',
    justifyContent: "center",
    alignContent: "center",
},

input:{
    display: 'flex',
    backgroundColor: "#ACBDBA",
    width: 350,
    height: 35,
    alignContent: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    flexWrap: "wrap",
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 10,
    
},

button:{
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: 'center',
    fontSize: 30,
    color: "#2E2F2F",
    borderRadius: 5,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#ACBDBA",
    padding: 10,
    backgroundColor: "#CDDDDD",
    margin: 10,
},

buttonA:{
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: 'center',
    fontSize: 30,
    color: "#2E2F2F",
    borderRadius: 5,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#ACBDBA",
    padding: 10,
    backgroundColor: "#7DDF64",
    margin: 10,
},

buttonB:{
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: 'center',
    fontSize: 30,
    color: "#2E2F2F",
    borderRadius: 5,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#ACBDBA",
    padding: 10,
    backgroundColor: "#FF3E41",
    margin: 10,
},

buttonL:{
    display: 'flex',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: 'center',
    fontSize: 30,
    color: "#2E2F2F",
    borderRadius: 5,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#ACBDBA",
    padding: 10,
    backgroundColor: "#007CBE",
    margin: 10,
},

    
})

export default styles