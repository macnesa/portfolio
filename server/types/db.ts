export interface DB {
  migrations: {
    id?: number
    name: string
    run_on?: Date
  }
  users: {
    id?: number;
    username: string;
    email?: string;
    password_hash?: string;
    created_at?: string;
  }
  spotify_accounts: {
    user_id: number; // UUID
    spotify_id: string;
    refresh_token?: string;
    access_token?: string;
    expires_in?: Date;
    display_name?: string;
    avatar_url?: string;
    created_at?: Date;
    updated_at?: Date;
  }
}