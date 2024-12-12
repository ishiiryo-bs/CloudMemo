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
  const { isNew, userId, docId, text: paramText } = route.params;

  // 状態管理
  const [text, setText] = useState(paramText);

  // 保存ボタン押下
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const save = () => {
    if (isNew) {
      if (text) {
        // 新規作成
        memoCreate();
      } else {
        navigation.goBack();
      }
    } else {
      if (text) {
        // 更新
        memoUpdate();
      } else {
        // 削除
        memoDelete();
      }
    }
  };

  // 新規作成
  const memoCreate = async () => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss'); // 現在の日付を取得

    try {
      const memosCollectionRef = collection(db, 'users', userId, 'memos'); // 保存先のコレクションを指定
      await addDoc(memosCollectionRef, { text, date }); // データを Firestore に保存
      console.log('新規メモ作成完了');
      navigation.goBack(); // 前の画面に戻る
    } catch (err) {
      console.error('新規メモ作成に失敗しました:', err); // エラーが発生した場合に表示
    }
  };

  // 更新処理
  const memoUpdate = async () => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss'); // 現在の日付を取得

    try {
      // ドキュメント参照を取得
      const docRef = doc(db, 'users', userId, 'memos', docId);

      // Firestoreにデータを更新
      await updateDoc(docRef, { text, date });
      console.log('メモの更新が完了しました！');
      navigation.goBack(); // 前の画面に戻る
    } catch (error) {
      console.error('メモの更新に失敗しました: ', error);
    }
  };

  // メモ削除
  const memoDelete = async (docId) => {
    try {
      const docRef = doc(db, 'users', userId, 'memos', docId);
      await deleteDoc(docRef);
      console.log('ドキュメントの削除に成功しました!');
    } catch (error) {
      console.error('ドキュメントの削除に失敗しました: ', error);
    }
  };

  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View>
            <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
              <Text style={styles.headerLeftText}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View>
            <TouchableOpacity style={styles.headerRight} onPress={save}>
              <Text style={styles.headerRightText}>{'保存'}</Text>
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, save]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style='auto' />
      <View style={styles.memoEditView}>
        <TextInput
          value={text}
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
