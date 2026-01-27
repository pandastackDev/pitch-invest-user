export type GalleryItem = {
    id: string | number;
    title: string;
    artist: string;
    description?: string;
    imageUrl?: string;
    profileType?: "inventor" | "investor";
    category?: string;
    views?: number;
    availableStatus?: boolean;
    availableLabel?: string;
    badges?: string[];
    likes?: number;
    author?: { name: string; avatarUrl?: string; country?: string; verified?: boolean };
    location?: string;
    media?: {
        photos: string[];
        videos: { src: string; thumb: string; caption?: string }[];
    };
};

export default GalleryItem;
