// AUTO GENERATED DO NOT OVERRIDE 

export type ArtistAlbums = {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: {
            album_type: string;
            total_tracks: number;
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
            name: string;
            release_date: string;
            release_date_precision: string;
            type: string;
            uri: string;
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
            album_group: string;
        }[];
        total: number;
        limit: number;
        offset: number;
        href: string;
        next: string | null;
        previous: string | null;
    };
};
