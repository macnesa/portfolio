// AUTO GENERATED DO NOT OVERRIDE 

export type SpotifyAccount = {
    success: boolean;
    status: number;
    message: string;
    data: {
        user_id: number;
        spotify_id: string;
        refresh_token?: string | undefined;
        access_token?: string | undefined;
        expires_in?: Date | undefined;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        created_at?: Date | undefined;
        updated_at?: Date | undefined;
    };
};
