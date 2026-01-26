import logo1 from "../../assets/images/company-logos/1.png";
import logo2 from "../../assets/images/company-logos/2.png";
import logo3 from "../../assets/images/company-logos/3.png";
import logo4 from "../../assets/images/company-logos/4.png";
import logo5 from "../../assets/images/company-logos/5.png";
import logo6 from "../../assets/images/company-logos/6.png";
import type { Announcement, FeaturedInvestor, Startup } from "./types";

// ============================================
// MOCK DATA - STARTUPS
// ============================================
export const mockStartups: Startup[] = [
	{
		id: 1,
		name: "TechVenture AI",
		logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/M7lc1UVf-VE",
		country: "United States",
		countryFlag: "🇺🇸",
		sector: "Technology",
		investmentGoal: 500000,
		currentInvestment: 325000,
		minInvestment: 1000,
		publicApproval: 87,
		totalVotes: 1234,
		shortDescription: "AI-powered business intelligence platform",
		featured: true,
	},
	{
		id: 2,
		name: "GreenEnergy Solutions",
		logo: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/ysz5S6PUM-U",
		country: "Germany",
		countryFlag: "🇩🇪",
		sector: "Clean Energy",
		investmentGoal: 750000,
		currentInvestment: 412000,
		minInvestment: 2500,
		publicApproval: 92,
		totalVotes: 2156,
		shortDescription: "Sustainable energy solutions for smart cities",
		featured: true,
	},
	{
		id: 3,
		name: "HealthTech Pro",
		logo: "https://images.unsplash.com/photo-1586773860414-6a2f3e0b6fcd?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/Zy_oxdDS8XQ",
		thumbnail:
			"https://images.unsplash.com/photo-1580281657521-5b9f1f7f7a3d?w=1200&h=800&fit=crop",
		country: "United Kingdom",
		countryFlag: "🇬🇧",
		sector: "Healthcare",
		investmentGoal: 300000,
		currentInvestment: 189000,
		minInvestment: 500,
		publicApproval: 78,
		totalVotes: 890,
		shortDescription: "Telemedicine platform connecting doctors worldwide",
		featured: true,
	},
	{
		id: 4,
		name: "FinanceFlow",
		logo: "https://images.unsplash.com/photo-1542226659-5e4d6d1f4b2a?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/ScMzIvxBSi4",
		country: "Singapore",
		countryFlag: "🇸🇬",
		sector: "FinTech",
		investmentGoal: 1000000,
		currentInvestment: 670000,
		minInvestment: 5000,
		publicApproval: 95,
		totalVotes: 3421,
		shortDescription: "Next-gen payment processing infrastructure",
		featured: true,
	},
	{
		id: 5,
		name: "EduLearn Platform",
		logo: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/l482T0yNkeo",
		country: "Brazil",
		countryFlag: "🇧🇷",
		sector: "Education",
		investmentGoal: 200000,
		currentInvestment: 145000,
		minInvestment: 250,
		publicApproval: 84,
		totalVotes: 1567,
		shortDescription: "Interactive learning for the digital generation",
	},
	{
		id: 6,
		name: "AgriTech Innovations",
		logo: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=100&h=100&fit=crop",
		photo:
			"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=800&fit=crop",
		video: "https://www.youtube.com/embed/aqz-KE-bpKQ",
		country: "Netherlands",
		countryFlag: "🇳🇱",
		sector: "Agriculture",
		investmentGoal: 450000,
		currentInvestment: 267000,
		minInvestment: 1500,
		publicApproval: 89,
		totalVotes: 1890,
		shortDescription: "Smart farming solutions using IoT and AI",
	},
];

// ============================================
// MOCK DATA - ANNOUNCEMENTS
// ============================================
export const announcements: Announcement[] = [
	{
		id: 1,
		type: "left",
		title: "🎉 New Investment Round Open",
		description: "Join 500+ investors in our latest opportunity",
	},
	{
		id: 2,
		type: "right",
		title: "📈 Record Returns This Quarter",
		description: "Our top startups achieved 340% growth",
	},
];

// (featuredStartupProfile removed - using src/lib/usersData.ts instead)

// ============================================
// MOCK DATA - FEATURED INVESTOR
// ============================================
export const featuredInvestor: FeaturedInvestor = {
	name: "Dr. Yuki Nakamura",
	role: "Angel Investor",
	photo: "/assets/2.avif",
	location: "Tokyo, Japan",
	country: "🇯🇵",
	company: "NEURO CAPITAL",
	coverImage: "/assets/5.avif",
	description:
		"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
	likes: 1250,
	views: 3100,
	portfolio: [
		{
			name: "Portfolio 1",
			image: logo1,
		},
		{
			name: "Portfolio 2",
			image: logo2,
		},
		{
			name: "Portfolio 3",
			image: logo3,
		},
		{
			name: "Portfolio 4",
			image: logo4,
		},
		{
			name: "Portfolio 5",
			image: logo5,
		},
		{
			name: "Portfolio 6",
			image: logo6,
		},
	],
};

// ============================================
// FILTER OPTIONS
// ============================================
export const sectors = [
	"All Sectors",
	"Technology",
	"Clean Energy",
	"Healthcare",
	"FinTech",
	"Education",
	"Agriculture",
];
export const countries = [
	"All Countries",
	"United States",
	"Germany",
	"United Kingdom",
	"Singapore",
	"Brazil",
	"Netherlands",
];
export const statuses = [
	"All Status",
	"Active",
	"Funding",
	"Completed",
	"Pending",
	"Closed",
];
export const categories = [
	"All Categories",
	"Technology",
	"Healthcare",
	"Clean Energy",
	"FinTech",
	"Education",
	"Agriculture",
	"Real Estate",
	"Manufacturing",
];
export const cities = [
	"All Cities",
	"New York",
	"San Francisco",
	"London",
	"Berlin",
	"Singapore",
	"Dubai",
	"São Paulo",
	"Amsterdam",
];
export const investmentRanges = [
	"All Ranges",
	"$0 - $50K",
	"$50K - $100K",
	"$100K - $250K",
	"$250K - $500K",
	"$500K+",
];
export const equityRanges = [
	"All %",
	"1% - 5%",
	"5% - 10%",
	"10% - 20%",
	"20% - 30%",
	"30%+",
];
