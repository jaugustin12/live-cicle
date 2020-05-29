export class User {
  relationships: {
    followers: any[],
    following: any[]
  };
  fullName: string;
  email: string;
  password: string;
  posts: {
    userPosts: string[];
  };
}
