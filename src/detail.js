import React, { Component } from 'react'
import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import { FloatingAction } from "react-native-floating-action"
import { List } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from "react-native-responsive-dimensions";


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GridColumnsValue: true,
            lines: 2, lines2: 2,
            isLoading: true, nama_event: '', kota: '', desk_event: '', desk_lokasi: '',
            tanggal: '', tiket: '', cp: '', image: '',
            baca: 'Lebih Banyak', baca2: 'Lebih Banyak'
        }
    }


    componentDidMount() {
        fetch('http://192.168.43.170/event/selecteventID.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.navigation.state.params.id
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({

                    nama_event: responseJson[0].nama_event,
                    kota: responseJson[0].kota,
                    desk_event: responseJson[0].desk_event,
                    desk_lokasi: responseJson[0].desk_lokasi,
                    cp: responseJson[0].cp,
                    tiket: responseJson[0].tiket,
                    tanggal: responseJson[0].tanggal,
                })

            }).catch((error) => {
                console.error(error);
            });
    }

    bacaPress = () => {
        if (this.state.baca == 'Lebih Banyak')
            this.setState({ baca: 'Sedikit', lines: 2000000 })
        else
            this.setState({ baca: 'Lebih Banyak', lines: 2 })
    }

    bacaPress2 = () => {
        if (this.state.baca2 == 'Lebih Banyak')
            this.setState({ baca2: 'Sedikit', lines2: 2000000 })
        else
            this.setState({ baca2: 'Lebih Banyak', lines2: 2 })
    }

    render() {
        let BacaSet, BacaSet2;
        let url = "http://192.168.43.170/event/uploads/" + this.state.nama_event + ".jpeg";
        if (this.state.desk_event != '')
            BacaSet = <Text onPress={this.bacaPress} style={{
                color: '#008080',
                fontWeight: 'bold', marginTop: responsiveHeight(0.5)
            }}>{this.state.baca}</Text>
        else
            BacaSet = null
        
        if (this.state.desk_lokasi != '')
            BacaSet2 = <Text onPress={this.bacaPress2} style={{
                color: '#008080',
                fontWeight: 'bold', marginTop: responsiveHeight(0.5)
            }}>{this.state.baca2}</Text>
        else
            BacaSet2 = null
        
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4 }}>
                    <View style={{ flex: 0.3, backgroundColor: "#008080", flexDirection: 'row' }}>
                        <View style={{ flex: 5, justifyContent: 'center', position: 'relative', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: 'white' }}>Detail Event</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.ImageContainer}>
                            <TouchableOpacity>
                                <View style={styles.ImageContainer}>
                                    <Image style={styles.ImageContainer} source={{ uri: url }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.TextStyle}>Event :{this.state.nama_event}</Text>
                            <Text numberOfLines={this.state.lines}
                            >Deskripsi Event: {this.state.desk_event}</Text>
                            {BacaSet}
                            <Text style={styles.TextStyle}>Kota: {this.state.kota}</Text>
                            <Text numberOfLines={this.state.lines2}
                            >Deskripsi Lokasi: {this.state.desk_lokasi}</Text>
                            {BacaSet2}
                            <Text style={styles.TextStyle}>Tanggal: {this.state.tanggal}</Text>
                            <Text style={styles.TextStyle}>Tiket: {this.state.tiket}</Text>
                            <Text style={styles.TextStyle}>Cp: {this.state.cp}</Text>

                        </View>
                    </View>
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    ImageContainer: {
        borderRadius: 10,
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        borderColor: '#008080',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008080',
    },
    TextStyle: {
        textAlign: 'center',
        height: responsiveHeight(5),
        width: responsiveWidth(88),
        borderRadius: 10,
        borderWidth: 1,
        padding: 3,
        borderColor: '#008080',
        marginTop: 5
    },
})