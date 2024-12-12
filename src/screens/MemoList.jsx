import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';

import Colors from '../constants/Colors';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store'; // SecureStoreのインポート

const width = Dimensions.get('window').width;

export default function MemoList({ navigation, route }) {
  // パラメータ
  const userId = route.params.userId;

  // 状態管理
  const [memoList, setMemoList] = useState([]);

  // メモ削除
  const onDelete = async (docId) => {
    try {
      const docRef = doc(db, 'users', userId, 'memos', docId);
      await deleteDoc(docRef);
      console.log('ドキュメントの削除に成功しました!');
    } catch (error) {
      console.error('ドキュメントの削除に失敗しました: ', error);
    }
  };

  const memoDelete = (docId) => {
    Alert.alert('削除しますか？', '', [
      {
        text: 'はい',
        onPress: () => onDelete(docId),
      },
      { text: 'いいえ' },
    ]);
  };

  // FlatListの中身
  const renderItem = ({ item, index }) => {
    // 最初のデータか
    const isStart = index == 0;
    // 最後のデータか
    const isEnd = index + 1 == memoList.length;

    return (
      <View>
        <View
          style={[
            styles.itemListView,
            {
              borderTopLeftRadius: isStart ? 10 : 0, // 最初のデータは左上側の角を丸くする
              borderTopRightRadius: isStart ? 10 : 0, // 最初のデータは右上側の角を丸くする
              borderBottomLeftRadius: isEnd ? 10 : 0, // 最後のデータは左上側の角を丸くする
              borderBottomRightRadius: isEnd ? 10 : 0, // 最後のデータは右上側の角を丸くする
              marginTop: isStart ? 25 : 0,
            },
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate('MemoEdit', {
                isNew: false,
                userId,
                docId: item.docId,
                text: item.text,
              });
            }}
          >
            <Text style={styles.itemListTitle} numberOfLines={1}>
              {item.text}
            </Text>
            <Text style={{ fontSize: 14, color: '#777' }}>
              {moment(item.date).format('YYYY年MM月DD日')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => memoDelete(item.docId)}
          >
            <MaterialCommunityIcons name='trash-can-outline' size={20} color='#bbb' />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('ログアウトしますか？', '', [
                {
                  text: 'はい',
                  onPress: async () => {
                    // SecureStoreから保存された認証情報を削除
                    await SecureStore.deleteItemAsync('mail');
                    await SecureStore.deleteItemAsync('password');

                    navigation.goBack();
                  },
                },
                {
                  text: 'キャンセル',
                },
              ]);
            }}
          >
            <MaterialCommunityIcons name='logout' size={24} color={Colors.dark} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  // メモリストの取得
  useEffect(() => {
    // Firestoreのメモコレクションを参照
    const memosCollectionRef = collection(db, 'users', userId, 'memos');
    // データを日付で並び替えてクエリを作成
    const memosQuery = query(memosCollectionRef, orderBy('date', 'desc'));

    // Firestoreのリアルタイム更新を利用してデータを取得
    const unsubscribe = onSnapshot(memosQuery, (querySnapshot) => {
      // 取得したドキュメントを配列に変換
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      // 状態管理でメモリストを更新
      setMemoList(docs);
    });

    // クリーンアップで購読を解除
    return unsubscribe;
  }, [userId]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <FlatList
        data={memoList}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
      <View style={styles.addButton}>
        <TouchableOpacity
          style={{ marginBottom: 4 }}
          onPress={() => {
            navigation.navigate('MemoEdit', { isNew: true, userId, docId: '', text: '' });
          }}
        >
          <Text style={{ fontSize: 38, color: Colors.primary }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemListView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: width - 20,
    padding: 14,
    marginBottom: 1,
  },
  itemListTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  addButton: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark,
    bottom: 40,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
