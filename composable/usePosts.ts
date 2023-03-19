import { Post, User } from "~/types";
import dayjs from "dayjs";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  getDoc,
  where,
  limit,
  onSnapshot,
  DocumentReference,
  orderBy,
  CollectionReference,
  Query,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "~/plugins/firebase";

const adaptPost = (d: any, isRaw: boolean): Post => {
  return {
    id: d.id,
    createdAt: dayjs(d.createdAt.toDate()),
    text: d.text,
    isRaw,
    author: null,
    authorId: d.userId,
  };
};

const useRealtimeData = <T>(collectionRef: Query) => {
  const data = ref<T[]>([]);
  const unsub = onSnapshot(collectionRef, (querySnapshot) => {
    data.value = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.value.push({ id: doc.id, ...docData } as any);
    });
  });
  onUnmounted(unsub);
  return data;
};

const userMap: Record<string, User> = {};

export const usePosts = () => {
  const auth = getAuth();
  const db = getFirestore(firebaseApp);
  const posts = useRealtimeData<{
    id: string;
    createdAt: Timestamp;
    text: string;
  }>(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(10)));
  const myPosts = useRealtimeData<{
    id: string;
    createdAt: Timestamp;
    text: string;
    rawText: string;
    user: any;
    userId: string;
  }>(
    query(
      collection(db, "unsafePosts"),
      where("userId", "==", auth.currentUser?.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    )
  );

  const getUserData = async (userId: string): Promise<User | null> => {
    if (userMap[userId]) {
      return userMap[userId];
    }
    const userData = (await getDoc(doc(db, "userProfiles", userId))).data();
    console.log(userData);
    if (!userData) return null;
    const user: User = {
      id: userId,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
    };
    userMap[userId] = user;
    return user;
  };

  const displayPosts = ref<Post[]>([]);

  watch([posts, myPosts], async () => {
    const postsWithoutUser = [
      ...myPosts.value.map((d) => adaptPost(d, true)),
      ...posts.value.map((d) => adaptPost(d, false)),
    ].sort((a, b) => b.createdAt.unix() - a.createdAt.unix());
    for (let i = 0; i < postsWithoutUser.length; i++) {
      const { authorId } = postsWithoutUser[i];
      postsWithoutUser[i].author = await getUserData(authorId);
    }
    displayPosts.value = postsWithoutUser;
  });

  const submitPost = async (text: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("user id not found");
    await addDoc(collection(db, "unsafePosts"), {
      text,
      createdAt: Timestamp.now(),
      userId,
    });
  };

  return {
    submitPost,
    displayPosts,
  };
};
