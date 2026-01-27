const createPhotoSet = (startId: number) =>
	Array.from({ length: 8 }, (_, idx) => {
		const id = startId + idx;
		return `https://picsum.photos/id/${id}/1600/900?auto=format&fit=crop&w=1200&q=80`;
	});

type VideoLibraryItem = {
	id: string;
	title: string;
	src: string;
	thumb: string;
};

const videoLibrary: VideoLibraryItem[] = [
	{
		id: "BigBuckBunny",
		title: "Big Buck Bunny",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
	},
	{
		id: "ElephantsDream",
		title: "Elephant's Dream",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
	},
	{
		id: "ForBiggerBlazes",
		title: "For Bigger Blazes",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
	},
	{
		id: "ForBiggerEscapes",
		title: "For Bigger Escapes",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
	},
	{
		id: "ForBiggerFun",
		title: "For Bigger Fun",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
	},
	{
		id: "ForBiggerJoyrides",
		title: "For Bigger Joyrides",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
	},
	{
		id: "ForBiggerMeltdowns",
		title: "For Bigger Meltdowns",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
	},
	{
		id: "Sintel",
		title: "Sintel",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
	},
	{
		id: "SubaruOutbackOnStreetAndDirt",
		title: "Subaru Outback",
		src:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
	},
	{
		id: "TearsOfSteel",
		title: "Tears of Steel",
		src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
	},
	{
		id: "VolkswagenGTIReview",
		title: "Volkswagen GTI Review",
		src:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
	},
	{
		id: "WeAreGoingOnBullrun",
		title: "We Are Going On Bullrun",
		src:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
	},
	{
		id: "WhatCarCanYouGetForAGrand",
		title: "What Car Can You Get for a Grand",
		src:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
		thumb:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
	},
];

const videoCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10, 11],
	[12, 0, 3],
	[4, 7, 10],
	[11, 2, 5],
	[6, 9, 12],
	[1, 4, 8],
	[0, 5, 9],
	[2, 7, 11],
	[3, 6, 10],
];

const photoStartOffsets = [11, 23, 35, 47, 59, 71, 83, 95, 107, 119, 131, 143];

const galleryMediaSets = photoStartOffsets.map((start, galleryIndex) => ({
	photos: createPhotoSet(start),
	videos: videoCombos[galleryIndex].map((videoIndex) => {
		const base = videoLibrary[videoIndex];
		return {
			...base,
			id: `${base.id}-${galleryIndex + 1}`,
			caption: `${base.title} • Gallery ${galleryIndex + 1}`,
		};
	}),
}));

const cloneMedia = (index: number) => {
	const source = galleryMediaSets[index];
	return {
		photos: [...source.photos],
		videos: source.videos.map((video) => ({ ...video })),
	};
};

const baseGalleryInfo = [
	{
		id: 1,
		title: "Aero-Cityscape",
		artist: "A. Turing",
		category: "Steampunk",
		views: 15420,
		availableStatus: true,
		availableLabel: "Available",
		badges: ["FEATURED", "TRENDING", "VALIDATED"],
		likes: 678,
		author: {
			name: "Dr. Sarah Chen",
			avatarUrl: "/assets/1.avif",
			country: "United States",
			verified: true,
		},
		actions: ["ROYALTIES", "TOTAL BUYOUT"],
		date: "Oct 24",
		location: "United States",
		description: "Biodegradable algae-based plastic alternative",
		profileType: "inventor",
		verifiedIdentity: true,
		verifiedCompany: true,
	},
	{
		id: 2,
		title: "Robo-Creator",
		artist: "E. Lovelace",
		category: "Steampunk",
		views: 15420,
		availableStatus: true,
		availableLabel: "Unavailable",
		badges: ["TRENDING"],
		likes: 120,
		author: {
			name: "Ada Lovelace",
			avatarUrl: "/assets/2.avif",
			country: "United Kingdom",
			verified: true,
		},
		actions: ["ROYALTIES"],
		date: "Sep 12",
		location: "United Kingdom",
		description: "AI-driven generative robotics artwork",
		profileType: "inventor",
		verifiedIdentity: true,
	},
	{
		id: 3,
		title: "Chromno-Suit",
		artist: "E. Lovelace",
		subtitle: "Speaking at a Distance",
		category: "Steampunk",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 42,
		author: {
			name: "E. Lovelace",
			avatarUrl: "/assets/3.avif",
			country: "United Kingdom",
			verified: false,
		},
		actions: ["TOTAL BUYOUT"],
		date: "Aug 30",
		location: "United Kingdom",
		description: "Wearable tech concept suit with chromatic panels",
		profileType: "inventor",
	},
	{
		id: 4,
		title: "Chono-Suit",
		artist: "J. Verne",
		subtitle: "The Electronic Brain",
		category: "Technology",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: ["VALIDATED"],
		likes: 240,
		author: {
			name: "J. Verne",
			avatarUrl: "/assets/4.avif",
			country: "France",
			verified: true,
		},
		actions: ["ROYALTIES", "TOTAL BUYOUT"],
		date: "Jul 14",
		location: "France",
		description: "Speculative computing device inspired by classic sci-fi",
		profileType: "inventor",
		verifiedCompany: true,
	},
	{
		id: 5,
		title: "Infinite Connection",
		artist: "A. Turing",
		category: "Technology",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 88,
		author: {
			name: "A. Turing",
			avatarUrl: "/assets/5.avif",
			country: "United States",
			verified: false,
		},
		actions: ["ROYALTIES"],
		date: "Jun 21",
		location: "United States",
		description: "Networked art exploring connectivity",
		profileType: "inventor",
	},
	{
		id: 6,
		title: "The Steam Machine",
		artist: "Force of the Revolution",
		category: "Steampunk",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 5,
		author: {
			name: "Force of the Revolution",
			avatarUrl: "/assets/6.avif",
			country: "Brazil",
			verified: false,
		},
		actions: ["TOTAL BUYOUT"],
		date: "May 10",
		location: "Brazil",
		description: "Industrial era inspired mechanical sculpture",
		profileType: "inventor",
	},
	{
		id: 7,
		title: "Human Flight",
		artist: "Santos Dumont",
		category: "Aviation",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 1024,
		author: {
			name: "Santos Dumont",
			avatarUrl: "/assets/1.avif",
			country: "Brazil",
			verified: true,
		},
		actions: ["ROYALTIES"],
		date: "Mar 3",
		location: "Brazil",
		description: "Homage to early aviation pioneers",
		profileType: "inventor",
	},
	{
		id: 8,
		title: "Human Flight",
		artist: "Conquest of the Skies",
		subtitle: "Wheels that Change the World",
		category: "Steampunk",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 77,
		author: {
			name: "Conquest of the Skies",
			avatarUrl: "/assets/2.avif",
			country: "Brazil",
			verified: false,
		},
		actions: ["TOTAL BUYOUT"],
		date: "Feb 18",
		location: "Brazil",
		description: "Vehicles that reimagine transportation",
		profileType: "inventor",
	},
	{
		id: 9,
		title: "Capture of Reality",
		artist: "Camera Obscura",
		category: "Technology",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 33,
		author: {
			name: "Camera Obscura",
			avatarUrl: "/assets/3.avif",
			country: "Portugal",
			verified: false,
		},
		actions: ["ROYALTIES"],
		date: "Jan 5",
		location: "Portugal",
		description: "Photography inspired modern piece",
		profileType: "inventor",
	},
	{
		id: 10,
		title: "The Counted Time",
		artist: "The Clock Returns",
		category: "Time Pieces",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 7,
		author: {
			name: "The Clock Returns",
			avatarUrl: "/assets/4.avif",
			country: "Portugal",
			verified: false,
		},
		actions: ["TOTAL BUYOUT"],
		date: "Dec 1",
		location: "Portugal",
		description: "Contemporary clockwork sculpture",
		profileType: "inventor",
	},
	{
		id: 11,
		title: "The Counted Time",
		artist: "The Mechanical Clock",
		category: "Time Pieces",
		views: 15420,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 11,
		author: {
			name: "The Mechanical Clock",
			avatarUrl: "/assets/5.avif",
			country: "Portugal",
			verified: false,
		},
		actions: ["ROYALTIES"],
		date: "Nov 8",
		location: "Portugal",
		description: "Mechanical timepiece with layered gears",
		profileType: "inventor",
	},
	{
		id: 12,
		title: "Eyes on the Universe",
		artist: "The Telescope",
		category: "Technology",
		views: 18340,
		availableStatus: false,
		availableLabel: "Unavailable",
		badges: [],
		likes: 512,
		author: {
			name: "The Telescope",
			avatarUrl: "/assets/6.avif",
			country: "Portugal",
			verified: true,
		},
		actions: ["ROYALTIES", "TOTAL BUYOUT"],
		date: "Oct 2",
		location: "Portugal",
		description: "Large scale observational artwork",
		profileType: "inventor",
	},
];

export const galleryItems = baseGalleryInfo.map((item, idx) => {
	const media = cloneMedia(idx);
	return {
		...item,
		imageUrl: media.photos[0],
		images: media.photos.slice(0, 3),
		media,
	};
});

export default galleryItems;
