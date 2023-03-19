import { Dayjs } from "dayjs";
export type Post = {
  id: string;
  text: string;
  author: User | null;
  authorId: string;
  createdAt: Dayjs;
  isRaw: boolean;
};

export type User = {
  id: string;
  displayName: string;
  photoURL: string;
};
