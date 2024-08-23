// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string;
    photo: string;
  };

  export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };