import { PgDate } from "drizzle-orm/pg-core";

// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
  };

  export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
  };

  // ====== ORDER PARAMS
  // export type CheckoutOrderParams = {
  //   eventTitle: string;
  //   eventId: string;
  //   price: string;
  //   isFree: boolean;
  //   buyerId: string;
  // };
  
  export type CreateOrderParams = {
    stripeId: string;
    buyerId: string;
    amount: string;
    applicationSubmitted: boolean
  };
  
  // export type GetOrdersByEventParams = {
  //   eventId: string;
  //   searchString: string;
  // };
  
  export type GetOrdersByUserParams = {
    userId: string | null;
    limit?: number;
    page: string | number | null;
  };