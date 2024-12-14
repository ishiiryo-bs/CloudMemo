import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native'; // アラートを表示するコンポーネント
import * as SecureStore from 'expo-secure-store'; // SecureStoreのインポート

export default function Login({ navigation }) {
  // 状態管理
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  // ユーザの新規登録を行う関数
  const createUser = async () => {
    try {
      // 登録処理の実行
      await createUserWithEmailAndPassword(auth, mail, password);
      console.log('ユーザー登録成功');

      // 認証情報をSecureStoreに保存
      await SecureStore.setItemAsync('mail', mail);
      await SecureStore.setItemAsync('password', password);

      navigation.navigate('MemoList', { userId: mail });
    } catch (err) {
      // エラー時の処理
      console.log('エラー:', err);
      let msg = '';
      switch (err.code) {
        case 'auth/invalid-email':
          msg = 'メールアドレスが無効です';
          break;
        case 'auth/email-already-in-use':
          msg = 'すでに使用されているメールアドレスです';
          break;
        case 'auth/weak-password':
          msg = '6文字以上のパスワードを設定してください';
          break;
        default:
          msg = '新規登録に失敗しました';
          break;
      }
      Alert.alert(msg);
    }
  };

  // login関数
  const login = async () => {
    try {
      // ログイン処理の実行
      await signInWithEmailAndPassword(auth, mail, password);
      console.log('ログイン成功');
      console.log('mail', mail);
      console.log('password', password);

      // 認証情報をSecureStoreに保存
      await SecureStore.setItemAsync('mail', mail);
      await SecureStore.setItemAsync('password', password);

      navigation.navigate('MemoList', { userId: mail });
    } catch (err) {
      // エラー時の処理
      console.log('エラー:', err);
      Alert.alert('メールアドレスまたはパスワードが無効です');
    }
  };

  // SecureStoreから保存済みの認証情報を読み込む
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedMail = await SecureStore.getItemAsync('mail');
        const savedPassword = await SecureStore.getItemAsync('password');

        if (savedMail && savedPassword) {
          setMail(savedMail);
          setPassword(savedPassword);
        }

        await signInWithEmailAndPassword(auth, savedMail, savedPassword);
        navigation.navigate('MemoList', { userId: savedMail });
      } catch (error) {
        console.log('認証情報の読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCredentials();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder='メールアドレス'
          value={mail}
          onChangeText={(text) => {
            // メールアドレスの状態を更新
            setMail(text);
          }}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.textInput}
          placeholder='パスワード'
          value={password}
          onChangeText={(text) => {
            // パスワードの状態を更新
            setPassword(text);
          }}
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
