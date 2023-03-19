import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
      photoURL: `/avatars/avatar${~~(Math.random() * 4) + 1}.png`,
    });
    return credential;
  };

  const signin = async (email: string, password: string) => {
    const auth = getAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user.uid;
  };

  return {
    createUser,
    signin,
  };
};
