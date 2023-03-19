import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  limit,
  onSnapshot,
  doc,
  DocumentReference,
  orderBy,
  CollectionReference,
  Query,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "~/plugins/firebase";

const router = useRouter();

const names = [
  "いちご",
  "みかん",
  "マスカット",
  "ぶどう",
  "もも",
  "パイナップル",
  "りんご",
  "メロン",
  "バナナ",
  "さくらんぼ",
];

export const useAuth = () => {
  const createUser = async (email: string, password: string) => {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = getFirestore(firebaseApp);
    setDoc(doc(db, "userProfiles", credential.user.uid), {
      displayName: [
        names[~~(Math.random() * names.length)],
        ~~(Math.random() * 10000),
      ].join("-"),
      photoURL: "//placehold.jp/100x100.png",
    });
    return credential;
  };

  return {
    createUser,
  };
};
