import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import type { GalleryItem } from "../../types/gallery";
import { galleryItems } from "./galleryData";
import GalleryGrid from "./components/GalleryGrid";
import GalleryViewerModal from "./components/GalleryViewerModal";

const Gallery: React.FC = () => {
	const navigate = useNavigate();
	const lastViewerReturn = useRef<{ scrollY: number; cardId: string } | null>(
		null,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("All Status");
	const [selectedCountry, setSelectedCountry] = useState("All Countries");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedCity, setSelectedCity] = useState("All Cities");
	const [selectedTag, setSelectedTag] = useState("All Tags");
	const [likedById, setLikedById] = useState<Record<string, boolean>>({});
	const [likesById, setLikesById] = useState<Record<string, number>>(() => {
		return Object.fromEntries(
			galleryItems.map((item) => [String(item.id), item.likes ?? 0]),
		);
	});
	const [viewerOpen, setViewerOpen] = useState(false);
	const [viewerItem, setViewerItem] = useState<GalleryItem | null>(null);

	// Extract unique values for filters
	const statuses = useMemo(() => {
		const statusSet = new Set<string>([
			"All Status",
			"Available",
			"Unavailable",
		]);
		galleryItems.forEach((item) => {
			if (item.availableLabel) {
				statusSet.add(item.availableLabel);
			}
		});
		return Array.from(statusSet).sort();
	}, []);

	const countries = useMemo(() => {
		const countrySet = new Set<string>(["All Countries"]);
		galleryItems.forEach((item) => {
			if (item.location) {
				countrySet.add(item.location);
			}
			if (item.author?.country) {
				countrySet.add(item.author.country);
			}
		});
		return Array.from(countrySet).sort();
	}, []);

	const categories = useMemo(() => {
		const categorySet = new Set<string>(["All Categories"]);
		galleryItems.forEach((item) => {
			if (item.category) {
				categorySet.add(item.category);
			}
		});
		return Array.from(categorySet).sort();
	}, []);

	const cities = useMemo(() => {
		const citySet = new Set<string>(["All Cities"]);
		galleryItems.forEach((item) => {
			if (item.location) {
				citySet.add(item.location);
			}
		});
		return Array.from(citySet).sort();
	}, []);

	const tags = useMemo(() => {
		const tagSet = new Set<string>(["All Tags"]);
		galleryItems.forEach((item) => {
			if (item.badges && item.badges.length > 0) {
				for (const badge of item.badges) {
					tagSet.add(badge);
				}
			}
		});
		return Array.from(tagSet).sort();
	}, []);

	// Filter gallery items
	const filteredItems = useMemo(() => {
		return galleryItems.filter((item) => {
			if ((item.profileType ?? "inventor") !== "inventor") {
				return false;
			}

			const matchesSearch =
				searchTerm === "" ||
				item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.category?.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus =
				selectedStatus === "All Status" ||
				item.availableLabel === selectedStatus ||
				(selectedStatus === "Available" && item.availableStatus) ||
				(selectedStatus === "Unavailable" && !item.availableStatus);

			const matchesCategory =
				selectedCategory === "All Categories" ||
				item.category === selectedCategory;

			const matchesCountry =
				selectedCountry === "All Countries" ||
				item.location === selectedCountry ||
				item.author?.country === selectedCountry;

			const matchesCity =
				selectedCity === "All Cities" || item.location === selectedCity;

			const matchesTag =
				selectedTag === "All Tags" || item.badges?.includes(selectedTag);

			return (
				matchesSearch &&
				matchesStatus &&
				matchesCategory &&
				matchesCountry &&
				matchesCity &&
				matchesTag
			);
		});
	}, [
		searchTerm,
		selectedStatus,
		selectedCategory,
		selectedCountry,
		selectedCity,
		selectedTag,
	]);

	const displayItems = useMemo(() => {
		return filteredItems.map((item) => {
			const idStr = String(item.id);
			return {
				...item,
				likes: likesById[idStr] ?? item.likes ?? 0,
			};
		});
	}, [filteredItems, likesById]);

	const resetFilters = () => {
		setSearchTerm("");
		setSelectedStatus("All Status");
		setSelectedCountry("All Countries");
		setSelectedCategory("All Categories");
		setSelectedCity("All Cities");
		setSelectedTag("All Tags");
	};

	const handleToggleLike = (id: string) => {
		setLikedById((prev) => {
			const nextLiked = !prev[id];
			setLikesById((prevLikes) => {
				const current = prevLikes[id] ?? 0;
				const next = Math.max(0, current + (nextLiked ? 1 : -1));
				return { ...prevLikes, [id]: next };
			});
			toast(nextLiked ? "Liked project" : "Unliked project", {
				position: "top-right",
				hideProgressBar: false,
				className: "bg-success text-white",
			});
			return { ...prev, [id]: nextLiked };
		});
	};

	const handleMessage = (id: string) => {
		navigate(`/apps-chat?projectId=${encodeURIComponent(id)}`);
	};

	const handleShare = async (id: string) => {
		const url = `${window.location.origin}/gallery/${encodeURIComponent(id)}`;
		try {
			const navAny = navigator as unknown as { share?: (d: unknown) => Promise<void> };
			if (typeof navAny.share === "function") {
				await navAny.share({ url });
				return;
			}
		} catch {
			// fallthrough to clipboard
		}

		try {
			await navigator.clipboard.writeText(url);
			toast("Link copied to clipboard", {
				position: "top-right",
				hideProgressBar: false,
				className: "bg-info text-white",
			});
		} catch {
			window.prompt("Copy this link:", url);
		}
	};

	const handleOpenViewer = (item: GalleryItem) => {
		lastViewerReturn.current = {
			scrollY: window.scrollY,
			cardId: `pi-gallery-card-${String(item.id)}`,
		};
		setViewerItem(item);
		setViewerOpen(true);
	};

	const handleCloseViewer = () => {
		setViewerOpen(false);
	};

	const handleViewerClosed = () => {
		const state = lastViewerReturn.current;
		lastViewerReturn.current = null;
		setViewerItem(null);
		if (!state) return;

		window.scrollTo(0, state.scrollY);
		const el = document.getElementById(state.cardId);
		el?.focus({ preventScroll: true });
	};

	// Show sign-in success toast after redirect
	useEffect(() => {
		const showSignInSuccess = sessionStorage.getItem("showSignInSuccess");
		if (showSignInSuccess === "true") {
			sessionStorage.removeItem("showSignInSuccess");
			toast("Signed in successfully! Welcome back!", {
				position: "top-right",
				hideProgressBar: false,
				className: "bg-success text-white",
			});
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const savedScroll = sessionStorage.getItem("galleryScrollY");
		const savedCard = sessionStorage.getItem("galleryActiveCardId");
		const yPosition = savedScroll ? Number(savedScroll) : null;
		if (yPosition !== null && !Number.isNaN(yPosition)) {
			window.scrollTo(0, yPosition);
			sessionStorage.removeItem("galleryScrollY");
		}
		if (savedCard) {
			const element = document.getElementById(savedCard);
			element?.focus({ preventScroll: true });
			sessionStorage.removeItem("galleryActiveCardId");
		}
	}, []);

	const stats = [
		{ value: "500+", label: "ACTIVE PROJECTS" },
		{ value: "$2.5B+", label: "INVESTED" },
		{ value: "1,200+", label: "INVENTORS" },
		{ value: "95%", label: "SUCCESS RATE" },
	] as const;

	document.title = "Gallery | Velzon - React Admin & Dashboard Template";

	return (
		<div className="page-content pitch-invest-dashboard">
			<ToastContainer closeButton={false} limit={1} />
			<Container fluid className="pi-gallery-page">
				{/* Hero */}
				<section className="pi-gallery-hero">
					<div className="pi-gallery-hero-inner">
						<h2 className="pi-gallery-hero-title">
							<span className="pi-gallery-hero-title-primary">
								Discover{" "}
							</span>
							<span className="pi-gallery-hero-title-accent">
								Revolutionary Innovations
							</span>
						</h2>
						<p className="pi-gallery-hero-subtitle">
							Connect with brilliant inventors and invest in groundbreaking
							technologies that are shaping the future. From medical
							breakthroughs to sustainable energy solutions.
						</p>
					</div>

					<Row className="g-3 g-md-4 justify-content-center pi-gallery-stats">
						{stats.map((stat) => (
							<Col key={stat.label} xs={6} md={3} xl={3}>
								<div className="pi-gallery-stat-card">
									<div className="pi-gallery-stat-value">{stat.value}</div>
									<div className="pi-gallery-stat-label">{stat.label}</div>
								</div>
							</Col>
						))}
					</Row>
				</section>

				<div className="pi-gallery-content">
					{/* Filter Bar (kept as-is) */}
					<Card className="border-0 mb-3 mb-md-4 filter-card">
						<CardBody className="py-2 py-md-3 px-2 px-md-3">
							{/* Desktop Layout: Single row with flex */}
							<div className="filter-bar-desktop d-none d-xl-flex align-items-center gap-2 flex-nowrap">
								{/* Search - expands to fill remaining space */}
								<div className="position-relative filter-search-wrapper">
									<i className="ri-search-line position-absolute"></i>
									<Input
										type="text"
										placeholder="Search projects..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="filter-input"
									/>
								</div>
								{/* Status */}
								<Input
									type="select"
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="filter-select filter-select-status"
								>
									{statuses.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</Input>
								{/* Countries */}
								<Input
									type="select"
									value={selectedCountry}
									onChange={(e) => setSelectedCountry(e.target.value)}
									className="filter-select filter-select-country"
								>
									{countries.map((country) => (
										<option key={country} value={country}>
											{country}
										</option>
									))}
								</Input>
								{/* Categories */}
								<Input
									type="select"
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="filter-select filter-select-category"
								>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</Input>
								{/* Cities */}
								<Input
									type="select"
									value={selectedCity}
									onChange={(e) => setSelectedCity(e.target.value)}
									className="filter-select filter-select-city"
								>
									{cities.map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</Input>
								{/* Tags */}
								<Input
									type="select"
									value={selectedTag}
									onChange={(e) => setSelectedTag(e.target.value)}
									className="filter-select filter-select-tag"
								>
									{tags.map((tag) => (
										<option key={tag} value={tag}>
											{tag}
										</option>
									))}
								</Input>
								{/* Reset */}
								<Button
									outline
									color="secondary"
									className="btn-reset rounded-pill"
									onClick={resetFilters}
								>
									<i className="ri-refresh-line me-1"></i>Reset
								</Button>
							</div>

							{/* Mobile/Tablet Layout: Grid rows */}
							<div className="filter-bar-mobile d-xl-none">
								{/* First Row: Search */}
								<Row className="g-2 align-items-center mb-2">
									<Col xs={12}>
										<div className="position-relative filter-search-wrapper">
											<i className="ri-search-line position-absolute"></i>
											<Input
												type="text"
												placeholder="Search projects..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="filter-input"
											/>
										</div>
									</Col>
								</Row>
								{/* Second Row: Status, Countries, Categories */}
								<Row className="g-2 align-items-center mb-2">
									<Col xs={6} sm={4}>
										<Input
											type="select"
											value={selectedStatus}
											onChange={(e) => setSelectedStatus(e.target.value)}
											className="filter-select"
										>
											{statuses.map((status) => (
												<option key={status} value={status}>
													{status}
												</option>
											))}
										</Input>
									</Col>
									<Col xs={6} sm={4}>
										<Input
											type="select"
											value={selectedCountry}
											onChange={(e) => setSelectedCountry(e.target.value)}
											className="filter-select"
										>
											{countries.map((country) => (
												<option key={country} value={country}>
													{country}
												</option>
											))}
										</Input>
									</Col>
									<Col xs={12} sm={4}>
										<Input
											type="select"
											value={selectedCategory}
											onChange={(e) => setSelectedCategory(e.target.value)}
											className="filter-select"
										>
											{categories.map((category) => (
												<option key={category} value={category}>
													{category}
												</option>
											))}
										</Input>
									</Col>
								</Row>
								{/* Third Row: Cities, Tags, Reset */}
								<Row className="g-2 align-items-center">
									<Col xs={6} sm={4}>
										<Input
											type="select"
											value={selectedCity}
											onChange={(e) => setSelectedCity(e.target.value)}
											className="filter-select"
										>
											{cities.map((city) => (
												<option key={city} value={city}>
													{city}
												</option>
											))}
										</Input>
									</Col>
									<Col xs={6} sm={4}>
										<Input
											type="select"
											value={selectedTag}
											onChange={(e) => setSelectedTag(e.target.value)}
											className="filter-select"
										>
											{tags.map((tag) => (
												<option key={tag} value={tag}>
													{tag}
												</option>
											))}
										</Input>
									</Col>
									<Col xs={12} sm={4}>
										<Button
											outline
											color="secondary"
											className="w-100 btn-reset"
											onClick={resetFilters}
										>
											<i className="ri-refresh-line me-1"></i>Reset
										</Button>
									</Col>
								</Row>
							</div>
						</CardBody>
					</Card>

					{/* Gallery cards/grid */}
					{displayItems.length > 0 ? (
						<GalleryGrid
							items={displayItems}
							likedById={likedById}
							onToggleLike={handleToggleLike}
							onMessage={handleMessage}
							onShare={handleShare}
							onOpenViewer={handleOpenViewer}
						/>
					) : (
						<div className="pi-gallery-empty">
							<div className="pi-gallery-empty-title">No projects found</div>
							<div className="pi-gallery-empty-subtitle text-muted">
								Try adjusting filters or resetting your search.
							</div>
							<Button
								type="button"
								color="primary"
								className="rounded-pill px-4"
								onClick={resetFilters}
							>
								Reset filters
							</Button>
						</div>
					)}
				</div>
			</Container>

			<GalleryViewerModal
				isOpen={viewerOpen}
				item={viewerItem}
				onClose={handleCloseViewer}
				onClosed={handleViewerClosed}
			/>
		</div>
	);
};

export default Gallery;
