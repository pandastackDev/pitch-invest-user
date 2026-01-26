import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import usersData from "../../lib/usersData";
import smallLogo from "../../assets/images/main-logo/small-logo.png";
interface FeaturedCarouselProps {
	startups: unknown[];
	onOpenVideo: (startup: unknown) => void;
}

const carouselImages = [
	"https://d64gsuwffb70l.cloudfront.net/691bae6041555f05a5561a30_1763424373352_9e70bd44.webp",
	"https://d64gsuwffb70l.cloudfront.net/691bae6041555f05a5561a30_1763424375333_ada89fa6.webp",
	"https://d64gsuwffb70l.cloudfront.net/691bae6041555f05a5561a30_1763424377234_349ea0c2.webp",
	"https://d64gsuwffb70l.cloudfront.net/691bae6041555f05a5561a30_1763424379240_e4343003.webp",
	"https://d64gsuwffb70l.cloudfront.net/691bae6041555f05a5561a30_1763424381216_4ccb077e.webp",
];

const investorData = [
	{
		left: usersData[0],
		right: {
			avatar: "assets/2.avif",
			company: "NEURO CAPITAL",
			name: "Dr. Yuki Nakamura",
			location: "Tokyo, Japan",
			title: "Co Fondateur",
			likes: usersData[0]?.likes ?? 0,
			views: usersData[0]?.views ?? 0,
			portfolio: [
				{ name: "NeuroLink", image: "assets/portfolio1.png" },
				{ name: "BrainWave", image: "assets/portfolio2.png" },
				{ name: "MediTech", image: "assets/portfolio3.png" },
				{ name: "HealthAI", image: "assets/portfolio4.png" },
				{ name: "BioSync", image: "assets/portfolio5.png" },
				{ name: "CogniCare", image: "assets/portfolio6.png" },
			],
			description:
				"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
		},
	},
	{
		left: usersData[1],
		right: {
			avatar: "assets/4.avif",
			company: "ASIA VENTURES",
			name: "Mr. James Wong",
			location: "Singapore",
			title: "Co Fondateur",
			likes: usersData[1]?.likes ?? 0,
			views: usersData[1]?.views ?? 0,
			portfolio: [
				{ name: "NeuroLink", image: "assets/portfolio1.png" },
				{ name: "BrainWave", image: "assets/portfolio2.png" },
				{ name: "MediTech", image: "assets/portfolio3.png" },
				{ name: "HealthAI", image: "assets/portfolio4.png" },
				{ name: "BioSync", image: "assets/portfolio5.png" },
				{ name: "CogniCare", image: "assets/portfolio6.png" },
			],
			description:
				"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
		},
	},
	{
		left: usersData[2],
		right: {
			avatar: "assets/6.avif",
			company: "EU CAPITAL",
			name: "Ms. Marie Dubois",
			location: "Paris, France",
			title: "Investment Director",
			likes: usersData[2]?.likes ?? 0,
			views: usersData[2]?.views ?? 0,
			portfolio: [
				{ name: "NeuroLink", image: "assets/portfolio1.png" },
				{ name: "BrainWave", image: "assets/portfolio2.png" },
				{ name: "MediTech", image: "assets/portfolio3.png" },
				{ name: "HealthAI", image: "assets/portfolio4.png" },
				{ name: "BioSync", image: "assets/portfolio5.png" },
				{ name: "CogniCare", image: "assets/portfolio6.png" },
			],
			description:
				"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
		},
	},
	{
		left: usersData[3],
		right: {
			avatar: "assets/2.avif",
			company: "SILICON VALLEY FUND",
			name: "Lisa Anderson",
			location: "Palo Alto, USA",
			title: "General Manager",
			likes: usersData[3]?.likes ?? 0,
			views: usersData[3]?.views ?? 0,
			portfolio: [
				{ name: "NeuroLink", image: "assets/portfolio1.png" },
				{ name: "BrainWave", image: "assets/portfolio2.png" },
				{ name: "MediTech", image: "assets/portfolio3.png" },
				{ name: "HealthAI", image: "assets/portfolio4.png" },
				{ name: "BioSync", image: "assets/portfolio5.png" },
				{ name: "CogniCare", image: "assets/portfolio6.png" },
			],
			description:
				"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
		},
	},
	{
		left: usersData[4],
		right: {
			avatar: "assets/4.avif",
			company: "ASIA TECH VENTURES",
			name: "Priya Sharma",
			location: "Bangalore, India",
			title: "Executive Director",
			likes: usersData[4]?.likes ?? 0,
			views: usersData[4]?.views ?? 0,
			portfolio: [
				{ name: "NeuroLink", image: "assets/portfolio1.png" },
				{ name: "BrainWave", image: "assets/portfolio2.png" },
				{ name: "MediTech", image: "assets/portfolio3.png" },
				{ name: "HealthAI", image: "assets/portfolio4.png" },
				{ name: "BioSync", image: "assets/portfolio5.png" },
				{ name: "CogniCare", image: "assets/portfolio6.png" },
			],
			description:
				"Neuno Capital focuses on the overdose, overdose management, and elicentics of eanations, based on bromide and neurotechnology.",
		},
	},
];

const resolveAssetPath = (path: string) => {
	if (!path) return path;
	if (path.startsWith("http://") || path.startsWith("https://")) return path;
	if (path.startsWith("/")) return path;
	return `/${path}`;
};

const featuredPartnerAd = {
	label: "Sponsored",
	imageSrc: "/assets/ad.png",
	href: "https://example.com",
};

const FeaturedCarousel = (_props: FeaturedCarouselProps): JSX.Element => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const currentUser = investorData[currentIndex]?.left || usersData[0];
	const rightData = investorData[currentIndex]?.right || investorData[0].right;

	useEffect(() => {
		void currentIndex;
		setIsAnimating(true);
		const timer = setTimeout(() => setIsAnimating(false), 600);
		return () => clearTimeout(timer);
	}, [currentIndex]);

	const getVisibleImages = () => {
		const prev =
			(currentIndex - 1 + carouselImages.length) % carouselImages.length;
		const next = (currentIndex + 1) % carouselImages.length;
		const prevprev = (prev - 1 + carouselImages.length) % carouselImages.length;
		const nextnext = (next + 1) % carouselImages.length;
		return { prevprev, prev, current: currentIndex, next, nextnext };
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
		);
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
	};

	const changeIndex = (newIndex: number) => {
		setCurrentIndex(newIndex);
	};

	const handleCarouselImageKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		newIndex: number,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			changeIndex(newIndex);
		}
	};

	const visible = getVisibleImages();
	const progress =
		carouselImages.length > 1
			? (currentIndex / (carouselImages.length - 1)) * 100
			: 100;

	return (
		<div className="py-4 pi-featured-carousel">
			<div className="pi-featured-carousel-inner">
				<div className="text-center mb-4 pi-carousel-tagline">
					<h1 className="fs-3 fw-normal text-dark mb-0">
						<span className="fw-bold pi-brand-color">PITCH INVEST:</span> Where
						Your Capital Meets Next Big Idea.
					</h1>
				</div>
				<div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-lg-between gap-4">
					{/* Left Card */}
					<div className="order-2 order-lg-1 w-100 pi-carousel-side-card pi-carousel-side-card-left">
						<Card
							className="border-0 shadow-lg h-100 overflow-hidden carousel-card-body-shadow"
							style={{ borderRadius: "1rem", cursor: "pointer" }}
							onClick={() => navigate(`/project/${currentUser.id}`)}
						>
							<div
								className="position-relative pi-card-header"
								style={{
									backgroundImage: `url(${currentUser.headerBg})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div
									className="position-absolute border-4 "
									style={{ bottom: -76, left: 16 }}
								>
									<img
										src={currentUser.avatar}
										alt={currentUser.name}
										className="rounded-circle border border-4 carousel-card-border"
										style={{
											width: 140,
											height: 140,
											objectFit: "cover",
										}}
									/>
								</div>
								<div className="position-absolute top-0 end-0 m-3">
									<div className="bg-white rounded-circle p-1">
										<img
											src={currentUser.companyLogo}
											alt={currentUser.companyName}
											className="rounded-circle"
											style={{ width: 40, height: 40 }}
										/>
									</div>
								</div>
							</div>
							<CardBody className="px-4 pb-3 pt-60 pi-left-card-body">
							    <div className="pi-small-logo ">
                                    <img src={smallLogo} alt="small-logo" />
                                </div>
								
								<div className="mb-3 mt-5" style={{ fontSize: "0.875rem" }}>
									<div className="mb-1">
										<span className="fw-semibold">Nome:</span>{" "}
										{currentUser.name}
									</div>
									<div className="mb-1">
										<span className="fw-semibold">Startup:</span>{" "}
										{currentUser.startup}
									</div>
									<div className="mb-1">
										<span className="fw-semibold">Cidade:</span>{" "}
										{currentUser.city}
									</div>
									<div className="d-flex align-items-center gap-2 mb-1">
										<span className="fw-semibold">País:</span>
										<span>
											{currentUser.country} {currentUser.countryFlag}
										</span>
									</div>
								</div>
								<div className="d-flex gap-2 mb-3">
									<button
										type="button"
										className="flex-fill  rounded-pill fw-semibold pi-left-btn-message"
										onClick={(e) => e.stopPropagation()}
									>
										Message
									</button>
									<button
										type="button"
										className="flex-fill  rounded-pill fw-semibold pi-left-btn-auction"
										onClick={(e) => {
											e.stopPropagation();
											navigate(`/auction/${currentUser.id}`);
										}}
									>
										Auction
									</button>
								</div>
								<div className="text-center mb-3">
									<div className="fw-bold" style={{ fontSize: "1.25rem" }}>
										{currentUser.investmentPercent}% por{" "}
										{currentUser.investmentAmount}
									</div>
									<div
										className="text-success fw-bold"
										style={{ fontSize: "0.875rem" }}
									>
										{currentUser.commission}% Comissão
									</div>
								</div>
								<div className="row g-2 mb-3">
									{currentUser.productImage1 && (
										<div className="col-6">
											<img
												src={currentUser.productImage1}
												alt="Product 1"
												className="w-100 pi-left-product-img"
											/>
										</div>
									)}
									<div className="col-6">
										<img
											src={currentUser.productImage2}
											alt="Product 2"
											className="w-100 pi-left-product-img"
										/>
									</div>
								</div>
								<div className="bg-gray-50 rounded p-3 text-center">
									<div className="fw-bold mb-1">
										Office Computer for utility purposes
									</div>
									<div className="text-muted" style={{ fontSize: "0.75rem" }}>
										PUBLIC APPROVAL
									</div>
									<div
										className="fw-bold text-success mb-2"
										style={{ fontSize: "1.5rem" }}
									>
										{currentUser.approvalRate}%
									</div>
									<div className="d-flex justify-content-center gap-2">
										<button
											type="button"
											className="btn  d-flex align-items-center gap-1 "
											style={{
												backgroundColor: "#f3f4f6",
												border: "none",
												fontSize: "1.2rem",
											}}
										>
											<i className="ri-thumb-up-fill text-warning"></i>
											<span>{currentUser.likes}</span>
										</button>
										<button
											type="button"
											className="btn  d-flex align-items-center gap-1"
											style={{
												backgroundColor: "#f3f4f6",
												border: "none",
												fontSize: "1.2rem",
											}}
										>
											<i className="ri-eye-line"></i>
											<span>{currentUser.views}</span>
										</button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>

					{/* Center Carousel */}
					<div className="order-1 order-lg-2 position-relative pi-carousel-center">
						<button
							type="button"
							onClick={handlePrevious}
							className="d-none d-lg-flex position-absolute align-items-center justify-content-center start-0 navigation-top translate-middle-y rounded-circle pi-carousel-nav-btn pi-carousel-nav-btn-prev"
							style={{ width: 48, height: 48, zIndex: 30 }}
							aria-label="Previous image"
						>
							<i
								className="ri-arrow-left-s-line"
								style={{ fontSize: "1.5rem" }}
							></i>
						</button>
						<div
							className="position-relative d-flex align-items-center justify-content-center"
							style={{ perspective: "1200px", minHeight: 500 }}
						>
							<button
								type="button"
								onClick={() => changeIndex(visible.prevprev)}
								className="d-none d-lg-block position-absolute pi-carousel-img-frame pi-carousel-bg-far"
								onKeyDown={(event) =>
									handleCarouselImageKeyDown(event, visible.prevprev)
								}
								style={{
									transform:
										"translateX(calc(-1 * var(--pi-bg-far-x))) rotateY(45deg) scale(0.6)",
									zIndex: 0,
								}}
							>
								<img
									src={carouselImages[visible.prevprev]}
									alt="Previous Previous"
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
								/>
							</button>
							<button
								type="button"
								onClick={() => changeIndex(visible.prev)}
								className="d-none d-lg-block position-absolute pi-carousel-img-frame pi-carousel-bg-near "
								onKeyDown={(event) =>
									handleCarouselImageKeyDown(event, visible.prev)
								}
								style={{
									transform:
										"translateX(calc(-1 * var(--pi-bg-near-x))) rotateY(25deg) scale(0.8)",
									zIndex: 1,
								}}
							>
								<img
									src={carouselImages[visible.prev]}
									alt="Previous"
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
								/>
							</button>
							<img
								src={carouselImages[visible.current]}
								alt="Current"
								className={`position-relative pi-carousel-img-current ${isAnimating ? "pi-carousel-scale-animate" : ""}`}
								style={{
									boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
									zIndex: 10,
								}}
							/>
							<button
								type="button"
								onClick={() => changeIndex(visible.next)}
								className="d-none d-lg-block position-absolute pi-carousel-img-frame pi-carousel-bg-near"
								onKeyDown={(event) =>
									handleCarouselImageKeyDown(event, visible.next)
								}
								style={{
									transform:
										"translateX(var(--pi-bg-near-x)) rotateY(-25deg) scale(0.8)",
									zIndex: 1,
								}}
							>
								<img
									src={carouselImages[visible.next]}
									alt="Next"
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
								/>
							</button>
							<button
								type="button"
								onClick={() => changeIndex(visible.nextnext)}
								className="d-none d-lg-block position-absolute pi-carousel-img-frame pi-carousel-bg-far"
								onKeyDown={(event) =>
									handleCarouselImageKeyDown(event, visible.nextnext)
								}
								style={{
									transform:
										"translateX(var(--pi-bg-far-x)) rotateY(-45deg) scale(0.6)",
									zIndex: 0,
								}}
							>
								<img
									src={carouselImages[visible.nextnext]}
									alt="Next Next"
									style={{ width: "100%", height: "100%", objectFit: "cover" }}
								/>
							</button>
						</div>
						<button
							type="button"
							onClick={handleNext}
							className="d-none d-lg-flex position-absolute align-items-center justify-content-center end-0 navigation-top translate-middle-y rounded-circle pi-carousel-nav-btn pi-carousel-nav-btn-next"
							style={{
								width: 48,
								height: 48,
								zIndex: 30,
							}}
							aria-label="Next image"
						>
							<i
								className="ri-arrow-right-s-line"
								style={{ fontSize: "1.5rem" }}
							></i>
						</button>
						<div className="mt-3">
							<div className="d-flex justify-content-center gap-2 mb-4">
								{carouselImages.map((image, index) => (
									<button
										type="button"
										key={image}
										onClick={() => changeIndex(index)}
										className={`border-0 p-0 pi-carousel-dot ${index === currentIndex ? "active" : ""}`}
									/>
								))}
							</div>
							<div className="d-flex d-lg-none  justify-content-center mb-4">
								<button
									type="button"
									onClick={handlePrevious}
									className="d-flex align-items-center justify-content-center rounded-circle pi-carousel-nav-btn"
									style={{ width: 40, height: 40 }}
									aria-label="Previous image"
								>
									<i className="ri-arrow-left-s-line"></i>
								</button>
								<button
									type="button"
									onClick={handleNext}
									className="d-flex align-items-center justify-content-center rounded-circle pi-carousel-nav-btn"
									style={{ width: 40, height: 40 }}
									aria-label="Next image"
								>
									<i className="ri-arrow-right-s-line"></i>
								</button>
							</div>
							<div className="position-relative mx-auto shadow rounded-pill pi-carousel-progress-track">
								<div
									className="position-absolute top-0 start-0 h-100 bg-white rounded-pill pi-carousel-progress-fill"
									style={{ width: `${progress}%` }}
								/>
								<div
									className="position-absolute top-50 translate-middle-y shadow-lg pi-carousel-progress-thumb"
									style={{ left: `calc(${progress}% - 8px)` }}
								/>
							</div>
						</div>
						<div className="d-flex justify-content-center gap-4 mt-3">
							<button
								type="button"
								className=" px-5 py-2 rounded-pill rounded-pill fw-semibold pi-left-btn-message
								"
								onClick={() => navigate("/gallery")}
							>
								Innovation
							</button>
							<button
								type="button"
								className=" px-5 py-2 rounded-pill fw-semibold pi-carousel-btn-secondary"
								onClick={() => navigate("/investors")}
							>
								Investor
							</button>
						</div>
						<div className="pi-carousel-ad-slot mt-1">
							<a
								href={featuredPartnerAd.href}
								target="_blank"
								rel="noopener noreferrer"
								className="pi-carousel-ad-link"
								aria-label="Sponsored link"
							>
								{/* <span className="pi-carousel-ad-label">
									{featuredPartnerAd.label}
								</span> */}
								<img
									src={featuredPartnerAd.imageSrc}
									alt={featuredPartnerAd.label}
									className="pi-carousel-ad-image"
								/>
							</a>
						</div>
					</div>

					{/* Right Card */}
					<div className="order-3 w-100 pi-carousel-side-card pi-carousel-side-card-right">
						<Card
							className="border-0 shadow-lg overflow-hidden carousel-card-body-shadow"
							style={{ borderRadius: "1rem", cursor: "pointer" }}
							onClick={() => navigate("/investors")}
						>
							<div
								className="position-relative d-flex align-items-center justify-content-center pi-card-header"
								style={{
									backgroundImage: `url(${carouselImages[currentIndex]})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div
									className="w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold text-center"
									style={{
										backgroundColor: "rgba(0,0,0,0.5)",
										fontSize: "1.5rem",
										letterSpacing: "0.05em",
									}}
								>
									{rightData.company}
								</div>
							</div>
								<CardBody
									className="position-relative px-4 pb-3"
									style={{ paddingTop: 20 }}
								>
										<div className="pi-small-logo">
											<img src={smallLogo} alt="small-logo" />
										</div>
										<div
											className="position-absolute"
											style={{ top: -56, left: 16, right: 16 }}
										>
											<div
												className="rounded-circle overflow-hidden border border-4 bg-white shadow carousel-card-border"
												style={{ width: 140, height: 140 }}
											>
											<img
												key={`${currentIndex}-${rightData.avatar}`}
												src={resolveAssetPath(rightData.avatar)}
												alt={rightData.name}
												className="w-100 h-100"
													style={{ objectFit: "cover" }}
												/>
											</div>
											<div className="d-flex align-items-end justify-content-between mt-2">
												<div className="d-flex flex-column items-center text-center">
													<div
														className="text-dark fw-semibold"
														style={{ fontSize: "1.05rem", lineHeight: 1.15 }}
													>
														{rightData.name}
													</div>
													<div
														className="text-muted"
														style={{ fontSize: "0.85rem", lineHeight: 1.1 }}
													>
														{rightData.title}
													</div>
												</div>
												<div className="d-flex align-items-center gap-2">
													<div
														className="text-muted text-nowrap"
														style={{ fontSize: "0.85rem" }}
													>
														{rightData.location}
													</div>
													<span
														className="d-inline-block rounded-circle"
														style={{
															width: 10,
															height: 10,
															backgroundColor: "#be123c",
														}}
														aria-hidden="true"
													/>
												</div>
											</div>
										</div>
									<div style={{ paddingTop: 138 }}>
										<div className="d-flex justify-content-center mb-2 gap-3">
											<button
												type="button"
												className="flex-fill  rounded-pill fw-semibold pi-left-btn-message"
											onClick={(e) => e.stopPropagation()}
										>
											Message
										</button>
										<button
											type="button"
											className="flex-fill  rounded-pill fw-semibold pi-right-btn"
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/project/${rightData.name}`);
											}}
										>
											View Profile
										</button>
									</div>
									<div
										className="text-center fw-semibold text-uppercase mb-2"
										style={{ fontSize: "0.875rem" }}
									>
										Portfolio Companies
									</div>
									<div className="row g-3 mb-3">
										{(rightData.portfolio || []).slice(0, 6).map((p) => (
											<div
												key={p.name}
												className="col-4 d-flex justify-content-center"
											>
												<div className="pi-portfolio-icon">
													<img
														src={resolveAssetPath(p.image)}
														alt={p.name}
														className="w-100 h-100"
														style={{ objectFit: "cover" }}
													/>
												</div>
											</div>
										))}
									</div>
									<div className="text-center fw-bold mb-1 fs-5">
										Company Description
									</div>
									<div className="text-center pi-right-description">
										{rightData.description}
									</div>
									<div className="d-flex justify-content-center gap-2 mt-3">
										<button
											type="button"
											className="btn  d-flex align-items-center gap-1"
											style={{
												backgroundColor: "#f3f4f6",
												border: "none",
												fontSize: "1.2rem",
											}}
										>
											<i className="ri-thumb-up-fill text-warning rounded-pill"></i>
											<span>{rightData.likes ?? 0}</span>
										</button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedCarousel;
