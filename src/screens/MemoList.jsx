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

  // 状態管理

  //  メモの作成
  const createUser = async () => {
    navigation.navigate('MemoEdit');
  };

  // メモ削除
  const onDelete = async (docId) => {
    try {
    } catch (error) {}
  };

  // FlatListの中身
  const renderItem = ({ item, index }) => {
    return <View></View>;
  };

  // ヘッダーの設定
  useEffect(() => {}, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
      <View style={styles.addButton}>
        <TouchableOpacity style={{ marginBottom: 4 }} onPress={createUser}>
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
