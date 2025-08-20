// AUTO GENERATED DO NOT OVERRIDE 

export type TopTracks = {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: {
            album: {
                album_type: string;
                artists: {
                    external_urls: {
                        spotify: string;
                    };
                    href: string;
                    id: string;
                    name: string;
                    type: string;
                    uri: string;
                }[];
                available_markets: string[];
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                images: {
                    height: number;
                    url: string;
                    width: number;
                }[];
                is_playable: boolean;
                name: string;
                release_date: string;
                release_date_precision: string;
                total_tracks: number;
                type: string;
                uri: string;
            };
            artists: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }[];
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit: boolean;
            external_ids: {
                isrc: string;
            };
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            is_local: boolean;
            is_playable: boolean;
            name: string;
            popularity: number;
            preview_url?: any | null;
            track_number: number;
            type: string;
            uri: string;
        }[];
        total: number;
        limit: number;
        offset: number;
        href: string;
        next: string | null;
        previous: string | null;
    };
};
