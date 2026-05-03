export type DemoUser = {
  id: string;
  fullName: string;
  email: string;
  role: "customer-demo";
  avatarInitials: string;
};

export type DemoAuthSession = {
  user: DemoUser;
  accessToken: string;
  createdAt: string;
};

export type DemoLoginInput = {
  email: string;
  password: string;
};

export type AuthState = {
  session: DemoAuthSession | null;
};

export type AuthActions = {
  login: (input: DemoLoginInput) => DemoAuthSession;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;