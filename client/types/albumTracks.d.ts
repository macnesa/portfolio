// AUTO GENERATED DO NOT OVERRIDE 

export type AlbumTracks = {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: {
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
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            linked_from?: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                type: string;
                uri: string;
            } | undefined;
            name: string;
            preview_url?: any;
            track_number: number;
            type: string;
            uri: string;
            is_local: boolean;
            restrictions?: {
                reason: string;
            } | undefined;
        }[];
        total: number;
        limit: number;
        offset: number;
        href: string;
        next: string | null;
        previous: string | null;
    };
};
