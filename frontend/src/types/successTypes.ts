export type SuccessMessageType = {
  message: string;
};

export type SuccessResponseCardType = {
  id: number;
  content: string;
  isLikedByCurrentUser: boolean;
  isDislikedByCurrentUser: boolean;
  totalLikes: number;
  totalDislikes: number;
  owner: {
    id: number;
    email: string;
  };
};
