export type UserList = [
  {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  }
];

export type SingleUser = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type UserPosts = [
  {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }
];

export type UserGetPostComments = [
  {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
  }
];
