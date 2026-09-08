export interface INote {
  _id: string;
  title: string;
  content: string;
  userId: string | { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
}

export interface UpdateNotePayload {
  title?: string;
  content?: string;
}

export interface NotesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: INote[];
}

export interface SingleNoteResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: INote;
}
