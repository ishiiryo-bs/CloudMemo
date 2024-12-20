import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native'; // アラートを表示するコンポーネント
import * as SecureStore from 'expo-secure-store'; // SecureStoreのインポート

export default function Login({ navigation }) {
  // 状態管理

  // ユーザの新規登録を行う関数
  const createUser = async () => {
    try {
      // 登録処理の実行
      navigation.navigate('MemoList');
    } catch (err) {
      // エラー時の処理
    }
  };

  // login関数
  const login = async () => {
    try {
      // ログイン処理の実行
      navigation.navigate('MemoList');
    } catch (err) {
      // エラー時の処理
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder='メールアドレス'
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.textInput}
          placeholder='パスワード'
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
      </View>
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={login}>
        <Text style={styles.loginText}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.createUserText}>新規登録</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    margin: 20, // 要素の外側の余白
  },
  textInput: {
    margin: 7,
    paddingHorizontal: 10, // 要素の内側の余白（左右）
    height: 43, // 高さ
    width: 320, // 幅
    borderRadius: 6, // 要素の境界の外側の角を丸める
    backgroundColor: '#eee',
    fontSize: 18, // 文字の大きさ
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    width: 300,
    backgroundColor: '#F5F5F6',
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#5dacbd',
    marginBottom: 10,
  },
  loginText: {
    color: 'white', // 文字の色
    fontWeight: 'bold', // 文字の太さ
    fontSize: 16,
  },
  createUserText: {
    color: '#555',
  },
});
