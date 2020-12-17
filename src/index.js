import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default class Index extends Component {
  constructor() {
    super();

    this.state = { name: '', loading: false, disabled: false }
  }

  check = () => {
    if (this.state.name != '')
      return false
    this.setState({ formEmptyDialog: true })
    return true
  }

  saveData = () => {
    if (!this.check()) {
      fetch('http://192.168.43.170/event/user.php',
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              username: this.state.name,
            })

        }).then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson);
          this.setState({ loading: false, disabled: false });
        }).catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
      
      this.props.navigation.navigate('Home',{
        nama: this.state.name
      })
    } else {
      Alert.alert("Masukan Nama Anda")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Your Name" style={styles.TextInputStyle}
          onChangeText={username => this.setState({ name: username })} />


        <TouchableOpacity disabled={this.state.disabled}
          activeOpacity={0.8} style={styles.button} onPress={this.saveData}>
          <Text style={styles.TextStyle}>INSERT</Text>
        </TouchableOpacity>

    
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingHorizontal: 25,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
    TextInputStyle: {
      textAlign: 'center',
      height: responsiveHeight(8),
      width: responsiveWidth(88),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#008080',
      marginTop: 20
    },
    button: {
      width: responsiveWidth(90),
      height: responsiveHeight(5),
      backgroundColor: '#008080',
      borderRadius: 7,
      marginTop: 20,
      marginBottom: 20
    },
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      padding: 5
    }
  });