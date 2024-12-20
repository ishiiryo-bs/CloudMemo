// 必要なSDKから必要な関数をインポートする。
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // 追加
import { getFirestore } from 'firebase/firestore'; // 追加

// ウェブアプリのFirebase設定
const firebaseConfig = {
  apiKey: 'AIzaSyA1Uh3FnCF5Mck7WNLmCj887riFmcuyDP8',
  authDomain: 'cloudmemo-b3d0c.firebaseapp.com',
  projectId: 'cloudmemo-b3d0c',
  storageBucket: 'cloudmemo-b3d0c.firebasestorage.app',
  messagingSenderId: '688466848566',
  appId: '1:688466848566:web:a539ef20c324b1deace197',
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 追加
export const db = getFirestore(app); // 追加
