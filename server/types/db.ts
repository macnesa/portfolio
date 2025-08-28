import { z } from "zod"
import { wakatimeAccountSchema } from "../schemas/database/wakatimeAccount.schema"
import { spotifyAccountSchema } from "../schemas/database/spotifyAccount.schema"
import { userSchema } from "../schemas/database/user.schema"
export interface DB {
  migrations: {
    id?: number
    name: string
    run_on?: Date
  }
  users:  z.infer<typeof userSchema>
  spotify_accounts: z.infer<typeof spotifyAccountSchema>
  wakatime_accounts: z.infer<typeof wakatimeAccountSchema>
}