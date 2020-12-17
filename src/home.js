import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, DrawerLayoutAndroid } from 'react-native'
import { FloatingAction } from "react-native-floating-action"
import { List } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from "react-native-responsive-dimensions";
import { event } from 'react-native-reanimated'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GridColumnsValue: true,
            data: [], dataaa: [], dataaaa: [],
            dataa: [], username: '', id_user: '', 
            ButtonDefaultText: 'CHANGE TO GRIDVIEW',
            isLoading: false,
            nama: this.props.navigation.state.params.nama
        }
        this.actions = [
            {
                text: "Add Event",
                icon: <FontAwesome name='calendar-plus-o' color='white' size={responsiveHeight(3)} />,
                name: "AddEvent",
                position: 1,
                color: '#008080',
                textBackground: '#4c516d',
                textColor: 'white'
            },
        ];
    }


    componentDidMount() {
        this._fetchItemEvent()
        this._fetchItemUser()
        
    }


    _fetchItemEvent = () => {
        return fetch('http://192.168.43.170/event/eventlist.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson
                });
            })
            .catch((error) => {
                console.error(error)
            })
    }

    _fetchItemUser = () => {
        return fetch('http://192.168.43.170/event/hisorylist.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama: this.state.nama
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataaaa: responseJson,
                    event_nama: responseJson[0].event_nama,

                })

            }).catch((error) => {
                console.error(error);
            });
    }

    _history = (id, nama_event) => {
        fetch('http://192.168.43.170/event/history.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        register_nama: this.state.nama,
                        event_id: id,
                        event_nama: nama_event
                    })

            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false, disabled: false });
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
            });

        this.props.navigation.navigate('Detail',
            {
                id: id
            })
    }

    onRefresh() {
        this.setState({ isFetching: true, }, () => { this.componentDidMount(); });
    }

    ChangeGridValueFunction = () => {
        if (this.state.GridColumnsValue === true) {
            this.setState({
                GridColumnsValue: false,
                ButtonDefaultText: "CHANGE TO LISTVIEW"
            })
        }
        else {
            this.setState({
                GridColumnsValue: true,
                ButtonDefaultText: "CHANGE TO GRIDVIEW"
            })

        }

    }

    goto = (id) => {
        this.props.navigation.navigate('Detail',
            {
                id: id
            })
    }

    GetGridViewItem(item) {
        Alert.alert(item);
    }

    _itemCoponent = ({ item }) => {
        return (
            <TouchableOpacity onPress={this._history.bind(this, item.id, item.nama_event)}
                style={{
                    flex: 1, backgroundColor: 'grey', height: responsiveHeight(15), borderRadius: 10,
                    margin: 3, borderColor: 'blue'
                }}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, padding: 5 }} >
                    <View style={{ flex: 3, }}>
                        <Text style={styles.textStyle}>Event: {item.nama_event}</Text>
                        <Text style={styles.textStyle}>Kota: {item.kota}</Text>
                        <Text style={styles.textStyle}>Tiket: {item.tiket}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _historyCoponent = ({ item }) => {
        return (
            <TouchableOpacity onPress={this.goto.bind(this, item.event_id)}
                style={{
                    flex: 1, backgroundColor: 'grey', height: responsiveHeight(4), borderRadius: 10,
                    margin: 3, borderColor: 'blue'
                }}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, }} >
                    <View style={{ flex: 3, }}>
                        <Text style={styles.textStyle}>Event: {item.event_nama}</Text>

                    </View>
                </View>
            </TouchableOpacity>
            )
        
        
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        var navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: responsiveFontSize(2), textAlign: 'center' }}>HAI {this.state.nama}</Text>
                <FlatList
                    data={this.state.dataaaa}
                    renderItem={this._historyCoponent}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.onRefresh()}
                />
            </View>
        );
        return (
            <View style={{ flex: 1 }}>
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={"right"}
                    renderNavigationView={() => navigationView}>
                    <View style={{ flex: 0.3, backgroundColor: "#008080", flexDirection: 'row' }}>
                        <View style={{ flex: 5, justifyContent: 'center', position: 'relative', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: 'white' }}>Event Tracker</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this._itemCoponent}
                            numColumns={this.state.GridColumnsValue ? 1 : 2}
                            key={(this.state.GridColumnsValue) ? 'ONE COLUMN' : 'TWO COLUMN'}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.onRefresh()}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.ButtonStyle}
                        activeOpacity={.5}
                        onPress={this.ChangeGridValueFunction} >
                        <Text style={styles.ButtonInsideTextStyle}> {this.state.ButtonDefaultText} </Text>

                    </TouchableOpacity>
                    <FloatingAction
                        buttonSize={responsiveHeight(9)}
                        style={styles.floatingDock}
                        color={'#008080'}
                        actions={this.actions}
                        onPressItem={name => {
                            this.props.navigation.navigate(name)
                        }}
                        distanceToEdge={responsiveWidth(8)}
                    />
                </DrawerLayoutAndroid>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    floatingDock: {
        backgroundColor: '#008080',
        position: 'absolute',
        borderRadius: responsiveHeight(10),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: responsiveFontSize(2)
    },

    ButtonStyle: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#FF9800',
        width: '100%',
        height: 50
    },

    ButtonInsideTextStyle: {
        color: '#fff',
        textAlign: 'center',
    }

})