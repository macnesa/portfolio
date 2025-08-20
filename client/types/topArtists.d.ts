// AUTO GENERATED DO NOT OVERRIDE 

export type TopArtists = {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: {
            external_urls: {
                spotify: string;
            };
            followers: {
                href?: any;
                total: number;
            };
            genres: string[];
            href: string;
            id: string;
            images: {
                height: number;
                url: string;
                width: number;
            }[];
            name: string;
            popularity: number;
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
