import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Index from './index'
import Home from './home'
import AddEvent from './addevent'
import Detail from './detail'

const Stack = createStackNavigator(
    {

        Index: Index,
        AddEvent: AddEvent,
        Detail: Detail,
        Home: Home,  

    },
    {
        headerMode: 'none'
    }
)

export default createAppContainer(Stack)
