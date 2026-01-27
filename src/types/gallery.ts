export type GalleryItem = {
    id: string | number;
    title: string;
    artist: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    profileType?: "inventor" | "investor";
    verifiedIdentity?: boolean;
    verifiedCompany?: boolean;
    category?: string;
    views?: number;
    availableStatus?: boolean;
    availableLabel?: string;
    badges?: string[];
    actions?: string[];
    likes?: number;
    author?: { name: string; avatarUrl?: string; country?: string; verified?: boolean };
    location?: string;
    date?: string;
    media?: {
        photos: string[];
        videos: { src: string; thumb: string; caption?: string }[];
    };
};

export default GalleryItem;
