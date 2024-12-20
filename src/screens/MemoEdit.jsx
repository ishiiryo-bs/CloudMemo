import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { db } from '../../firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';

import Colors from '../constants/Colors';

export default function MemoEdit({ navigation, route }) {
  // パラメータ

  // 状態管理

  // 保存ボタン押下
  const save = () => {};

  // 更新処理
  const memoUpdate = async () => {};

  // ヘッダーの設定
  useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style='auto' />
      <View style={styles.memoEditView}>
        <TextInput
          multiline
          style={styles.memoEditInput}
          onChangeText={(text) => {
            setText(text);
          }}
          autoFocus={true}
          autoCapitalize={'none'}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoEditView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  memoEditInput: {
    fontSize: 16,
  },
  headerRight: {
    height: 30,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightText: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLeft: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeftText: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
