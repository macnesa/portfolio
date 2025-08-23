export interface DB {
  migrations: {
    id?: number
    name: string
    run_on?: Date
  }
  users: {
    id?: number
    username: string
    spotify_id: string
    avatar: string | null
    created_at?: Date
  }
}
