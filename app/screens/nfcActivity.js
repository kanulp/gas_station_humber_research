import React from 'react'
import {
  View, Text, TouchableOpacity
} from 'react-native'
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

class NFCActivity extends React.Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      alert('Tag found : ',tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <View style={{padding: 20}}>
        <Text>NFC Demo</Text>
        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._test}
        >
          <Text>Test</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black'}}
          onPress={this._cancel}
        >
          <Text>Cancel Test</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
    alert('Cancelled Reading.')
  }

  _test = async () => {
    try {
      console.log('test click')
      await NfcManager.registerTagEvent();
      alert('Reading NFC ...');
    } catch (ex) {
      console.log('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }
}

export default NFCActivity