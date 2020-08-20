import React, {useState, useEffect, useCallback} from 'react';

import {View, Image, Text, StyleSheet} from 'react-native';

import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

import {Button} from '../../Components';

const ProcessModal = (props) => {
  return (
    <SwipeUpDownModal
      modalVisible={props.ShowTransaction}
      PressToanimate={props.ClosedAnimation}
      //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
      ContentModal={
        <View style={Styles.containerContent}>
          <Image source={props.ImageStatus} style={Styles.IndicatorImage} />
          <Text style={Styles.TranscStatus}>{props.TransactionStatus}</Text>
          <Text style={Styles.TranscMessage}>{props.TransactionMessage}</Text>
          <Button
            title={props.BtnTitle}
            BtnTitleStyle={{fontSize: 15}}
            Customstyle={Styles.LoginBtn}
            onPress={() => {
              props.TakeAction();
            }}
          />
        </View>
      }
      HeaderStyle={Styles.headerContent}
      ContentModalStyle={Styles.Modal}
      HeaderContent={
        <View style={Styles.containerHeader}>
          <View style={Styles.ModalHeadr} />
        </View>
      }
      onClose={() => {
        props.OnDismiss();
      }}
    />
  );
};

const Styles = StyleSheet.create({
  ModalHeadr: {
    width: '40%',
    height: 8,
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
    borderRadius: 20,
  },
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
  },
  headerContent: {
    marginTop: '60%',
  },
  Modal: {
    backgroundColor: '#FAFAFA',
    marginTop: '60%',
    borderRadius: 20,
  },
  LoginBtn: {borderRadius: 28.5, marginTop: 30, width: 250, height: 50},
  IndicatorImage: {
    width: 78,
    height: 78,
    alignSelf: 'center',
    marginTop: '5%',
  },
  TranscStatus: {
    color: '#313131',
    fontSize: 24,
    marginStart: '5%',
    marginTop: 42,
  },
  TranscMessage: {
    color: '#313131',
    fontSize: 16,
    marginStart: '5%',
    marginEnd: '5%',

    marginTop: 20,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
});

export default ProcessModal;
