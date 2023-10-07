export interface NoteType {
  _id: string;
  title: string;
  content: string;
  userId: string;
  label: {
    _id: string;
    name: string;
    userId: string;
  };
  pinned: boolean;
  archived: boolean;
  deleted: boolean;
}

export interface Label {
  _id: string;
  name: string;
  userId: string;
}
