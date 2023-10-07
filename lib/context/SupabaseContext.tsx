import { createContext } from "react";
import { EmailOtpType, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "../types/database";

type SupabaseContextProps = {
  supabase: SupabaseClient<Database> | null;
  isLoggedIn: boolean;
  verifyOtp: (
    email: string,
    token: string,
    type: EmailOtpType
  ) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

/* eslint-disable @typescript-eslint/no-empty-function */
export const SupabaseContext = createContext<SupabaseContextProps>({
  supabase: null,
  isLoggedIn: false,
  verifyOtp: async () => {},
  signInWithPassword: async () => {},
  resetPasswordForEmail: async () => {},
  signOut: async () => {}
});
