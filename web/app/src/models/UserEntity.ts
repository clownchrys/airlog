export interface UserEntity {
  id: number;
  name: string | null;
  email: string | null;
  // emailId: string | null;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
