


import React, { PureComponent } from 'react'
import { View, Text, StyleSheet,  } from 'react-native'
import stripe from 'tipsi-stripe'
import Button from './app/components/Button'
import testID from './app/utils/testID'

stripe.setOptions({
  publishableKey: 'pk_test_51IZNXDEpsLVtl1KCVOgndasAyIamcHE8t9d5g7cibMw15VYrqvgFbRvDXVwi0dyu2u9itrZ2iFQ1Go0f61D0a2mR00batv77VH',
  androidPayMode: 'test',
})
export default class CardFormScreen extends PureComponent {
  static title = 'Card Form'
  
  state = {
    loading: false,
    token: null,
    success: null
  }

  doPayment = async () => {
    
    // Use firebase serve for local testing if you don't have a paid firebase account
    fetch('http://10.0.2.2:5000/humberproject-1e27c/us-central1/payWithStripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 5500
        //currency: "usd",
        //token: this.state.token
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          success: responseJson.status == 'succeeded' ? true : false,
          response: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  handleCardPayPress = async () => {
    try {
      console.log('calling handlecard');
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm()
        /*{
         Only iOS support this options
        //smsAutofillDisabled: true,
        //requiredBillingAddressFields: 'full',
        //prefilledInformation: {
         // billingAddress: {
          //  name: 'Enappd Store',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: '',
            country: 'Estonia',
            postalCode: '31217',
            email: 'admin@enappd.com',
          },
        },
      }*/
      //)
      console.log("token in paymentRequestWithCardForm : "+token.id);

      this.setState({ loading: false, token:token.id })
    } catch (error) {
      console.log('error in payment :'+error);
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, token, success, response } = this.state

    return (
      <View style={styles.container}>
       
        <View style={styles.containerTitle}>
          <Text style={styles.title}>
            Stripe Payment in React Native
        </Text>
          
        </View>
        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
        {/* <View
          style={styles.token}
          {...testID('cardFormToken')}> */}

         {/* // {
         // token &&
            <>
              <Text style={styles.instruction}>
                Token: {token.id}
              </Text>
              <Button
                text="Make Payment"
                loading={loading}
                onPress={this.doPayment}
                {...testID('cardFormButton')}
              />

            </>
          //} */}
          <Text style={styles.instruction}>
                {/* Token: {this.state.token.id} */}
              </Text>
              <Button
                text="Make Payment"
                loading={loading}
                onPress={this.doPayment}
                {...testID('cardFormButton')}
              />
          {success &&
            <>
              <Text style={styles.instruction}>
                Status: {response.status}
              </Text>
              <Text style={styles.instruction}>
                ID: {response.id}
              </Text>
              <Text style={styles.instruction}>
                Amount: {response.amount}
              </Text>
            </>
          }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTitle:{
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 16
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})