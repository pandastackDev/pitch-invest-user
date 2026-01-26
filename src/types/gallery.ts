export type GalleryItem = {
    id: string | number;
    title: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    views?: number;
    availableStatus?: boolean;
    availableLabel?: string;
    badges?: string[];
    likes?: number;
    author?: { name: string; avatarUrl?: string; country?: string; verified?: boolean };
    location?: string;
};

export default GalleryItem;
