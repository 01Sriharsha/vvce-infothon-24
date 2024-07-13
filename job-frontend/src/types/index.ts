export type Response<T> = {
  message: string;
  data: T;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: "STUDENT" | "RECRUITER" | "COORDINATOR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};
