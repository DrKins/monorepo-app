export type SuccessMessageType = {
  message: string;
};

export type SuccessResponseCardType = {
  id: number;
  content: string;
  likedByUserIds: number[];
  dislikedByUserIds: number[];
  owner: {
    id: number;
    email: string;
  };
};
