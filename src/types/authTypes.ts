type User = {
  id: string;
  displayName: string;
  email: string;
  isVerified: boolean;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  displayName: string;
  password: string;
};
