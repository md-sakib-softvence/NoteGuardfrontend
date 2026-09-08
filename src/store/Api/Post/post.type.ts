export interface PostItem {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  userId: string;
}

export interface UserPostsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PostItem[];
}

export interface SinglePostResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PostItem;
}
