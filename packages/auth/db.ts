import { createKysely } from "@vercel/postgres-kysely";
import type { GeneratedAlways } from "kysely";

interface Database {
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    password: string;
    emailVerified: Date | null;
    image: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}

export const db = createKysely<Database>({
  connectionString: 'postgres://default:cAXsD1xdu3bm@ep-quiet-pine-a42yge6c-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

