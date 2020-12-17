import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DatePicker from 'react-native-datepicker'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      ImageSource: null,
      data: null, formEmptyDialog: false,
      nama_event: '', desk_event: '', desk_lokasi: '', kota: '',
      tanggal: '2020-12-1', tiket: '', cp: ''
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      let source = { uri: response.uri };
      this.setState({
        ImageSource: source,
        data: response.data
      });
    });
  }

  check = () => {
    if (this.state.ImageSource != '' && this.state.nama_event != '' && this.state.desk_event != '' && this.state.desk_lokasi != ''
      && this.state.kota != '' && this.state.tanggal != '' && this.state.tiket != '' && this.state.cp != '')
      return false
    this.setState({ formEmptyDialog: true })
    return true
  }

  send = () => {
    if (!this.check()) {
      RNFetchBlob.fetch('POST', 'http://192.168.43.170/event/event.php', {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'nama_event', data: this.state.nama_event },
        { name: 'desk_event', data: this.state.desk_event },
        { name: 'desk_lokasi', data: this.state.desk_lokasi },
        { name: 'tanggal', data: this.state.tanggal },
        { name: 'kota', data: this.state.kota },
        { name: 'tiket', data: this.state.tiket },
        { name: 'cp', data: this.state.cp }

      ]).then((resp) => {
      }).catch((err) => {
      })
    } else {
      Alert.alert("Data Kosong")
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1, backgroundColor: "#008080", flexDirection: 'row' }}>
          <View style={{ flex: 5, justifyContent: 'center', position: 'relative', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: 'white' }}>Add Event</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={styles.ImageContainer}>
                {this.state.ImageSource === null ? <Text>Brosur Event</Text> :
                  <Image style={styles.ImageContainer} source={this.state.ImageSource} />

                }
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginHorizontal: 20 }}>
            <TextInput
              placeholder="Nama Event"
              onChangeText={data => this.setState({ nama_event: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
            />
            <TextInput
              placeholder="Deskripsi Event"
              multiline={true}
              numberOfLines={10}
              onChangeText={data => this.setState({ desk_event: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleDesk}
            />
            <TextInput
              placeholder="Kota"
              onChangeText={data => this.setState({ kota: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
            />
            <TextInput
              placeholder="Deskripsi Lokasi"
              onChangeText={data => this.setState({ desk_lokasi: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleDesk}
            />
            <DatePicker
              style={styles.TextInputStyle}
              date={this.state.tanggal}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 5,
                  width: 0,
                  height: 0,
                  marginLeft: 0
                },
                dateInput: {
                  borderWidth: 0,
                  marginTop: 10
                }
              }}
              onDateChange={(data) => { this.setState({ tanggal: data }) }}
            />
            <TextInput
              placeholder="Harga Tiket"
              keyboardType="number-pad"
              onChangeText={data => this.setState({ tiket: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
            />
            <TextInput
              placeholder="No Hp Panitia"
              keyboardType="number-pad"

              onChangeText={data => this.setState({ cp: data })}
              underlineColorAndroid='transparent'
              style={styles.TextInputStyle}
            />

          </ScrollView>
          <TouchableOpacity onPress={this.send} activeOpacity={0.6} style={styles.button} >
            <Text style={styles.TextStyle}> UPLOAD EVENT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },

  ImageContainer: {
    borderRadius: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(30),
    borderColor: '#008080',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
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

  TextInputStyleDesk: {
    textAlign: 'center',
    height: responsiveHeight(15),
    width: responsiveWidth(88),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#008080',
    marginTop: 20
  },
  button: {
    width: responsiveWidth(90),
    backgroundColor: '#008080',
    borderRadius: 7,
    marginTop: 20,
    marginBottom: 20
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  }
});