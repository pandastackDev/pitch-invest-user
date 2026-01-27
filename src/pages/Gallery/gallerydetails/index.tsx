import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loader from "../../../Components/Common/Loader";
import GalleryViewerModal, { ViewerTab } from "../components/GalleryViewerModal";
import { galleryItems } from "../galleryData";
import type GalleryItem from "../../../types/gallery";
import mediaLogo from "../../../assets/images/logo-light.png";
import { useAuth } from "../../../hooks/useAuth";

const titleCase = (value: string) =>
	value
		.replace(/_/g, " ")
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase());

const formatCurrency = (amount: number) => {
	if (amount >= 1000000) {
		return `$${(amount / 1000000).toFixed(1)}M`;
	}
	if (amount >= 1000) {
		return `$${(amount / 1000).toFixed(0)}K`;
	}
	return `$${amount.toFixed(0)}`;
};

const GalleryDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { user, loading: authLoading } = useAuth();
	const [item, setItem] = useState<GalleryItem | null>(null);
	const [loading, setLoading] = useState(true);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxTab, setLightboxTab] = useState<ViewerTab>("photos");
	const [photoIndex, setPhotoIndex] = useState(0);
	const [videoIndex, setVideoIndex] = useState(0);

	const returnParam = searchParams.get("return");

	useEffect(() => {
		if (!id) {
			navigate("/gallery");
			return;
		}

		setLoading(true);
		const galleryItem = galleryItems.find((entry) => String(entry.id) === id);
		if (!galleryItem) {
			setLoading(false);
			toast("Gallery item not found", {
				position: "top-right",
				hideProgressBar: false,
				className: "bg-danger text-white",
			});
			navigate("/gallery");
			return;
		}

		setItem(galleryItem);
		setLoading(false);
	}, [id, navigate]);

	useEffect(() => {
		document.title = item ? `${item.title} | Gallery` : "Gallery Detail";
	}, [item]);

	const handleBack = () => {
		const fallback = "/gallery";
		if (!returnParam) {
			navigate(fallback, { replace: true });
			return;
		}

		try {
			const decoded = decodeURIComponent(returnParam);
			navigate(decoded, { replace: true });
		} catch {
			navigate(fallback, { replace: true });
		}
	};

	const handleShare = async () => {
		const url = window.location.href;
		try {
			await navigator.clipboard.writeText(url);
			toast("Link copied to clipboard", {
				position: "top-right",
				hideProgressBar: false,
				className: "bg-success text-white",
			});
		} catch {
			window.prompt("Copy this link", url);
		}
	};

	const photos = item?.media?.photos ?? [];
	const videos = item?.media?.videos ?? [];

	const openLightbox = (tab: ViewerTab, index: number) => {
		setLightboxTab(tab);
		if (tab === "photos") {
			setPhotoIndex(index);
		} else {
			setVideoIndex(index);
		}
		setLightboxOpen(true);
	};

	if (loading) {
		return (
			<div className="page-content">
				<Container fluid>
					<div className="py-5">
						<Loader />
					</div>
				</Container>
			</div>
		);
	}

	if (!item) {
		return (
			<div className="page-content">
				<Container fluid>
					<Card>
						<CardBody className="text-center py-5">
							<p className="fs-18 mb-0">Gallery item not available</p>
							<Button color="primary" className="mt-3" onClick={() => navigate("/gallery")}>
								<i className="ri-arrow-left-line me-1" />
								Back to gallery
							</Button>
						</CardBody>
					</Card>
				</Container>
			</div>
		);
	}

	const numericId = Number(item.id);
	const safeId = Number.isFinite(numericId) ? numericId : 0;
	const likes = item.likes ?? 0;

	// Placeholder values until API-backed project/auction data is wired.
	const currentBid = 10000000 + safeId * 2000000;
	const totalBids = 15 + safeId * 4;
	const investmentAmount = 25000000 + safeId * 500000;
	const minimumInvestment = 10000000;
	const showRegisterCta = !authLoading && !user;

	return (
		<div className="page-content pi-gallery-detail-page">
			<ToastContainer closeButton={false} limit={1} />
			<Container fluid className="pi-gallery-detail-wrapper">
				<header className="pi-gallery-detail-header">
					<Button color="light" size="sm" className="pi-gallery-detail-back" onClick={handleBack}>
						<i className="ri-arrow-left-line me-1" /> Back to gallery
					</Button>
					<div className="pi-gallery-detail-title-group">
						<h1 className="pi-gallery-detail-title text-truncate">{item.title}</h1>
						<p className="text-muted mb-0 fs-13">
							{item.subtitle || item.description || "Curated gallery story."}
						</p>
					</div>
					<Button
						color="light"
						size="sm"
						className="pi-gallery-detail-share"
						onClick={handleShare}
					>
						<i className="ri-share-line me-1" /> Share
					</Button>
				</header>

				<div className="pi-gallery-detail-meta">
					{item.category && (
						<span className="pi-gallery-detail-meta-chip">
							<i className="ri-price-tag-3-line" /> {item.category}
						</span>
					)}
					{item.location && (
						<span className="pi-gallery-detail-meta-chip">
							<i className="ri-map-pin-line" /> {item.location}
						</span>
					)}
					<span className="pi-gallery-detail-meta-chip">
						<i className="ri-eye-line" /> {item.views?.toLocaleString() ?? 0} views
					</span>
				</div>

				<section className="pi-gallery-detail-sections">
					<Card className="pi-gallery-detail-section">
						<CardBody>
							<div className="d-flex align-items-center justify-content-between mb-3 gap-3">
								<div className="d-flex align-items-center gap-2">
									<h5 className="mb-0">Photos</h5>
									<Badge color="primary" className="pi-gallery-detail-badge">
										{photos.length}
									</Badge>
								</div>
								<span className="text-muted fs-12">Pick a story to open fullscreen</span>
							</div>

							<Swiper
								modules={[Navigation]}
								spaceBetween={14}
								slidesPerView="auto"
								navigation
								breakpoints={{
									576: { slidesPerView: 3.1 },
									768: { slidesPerView: 4.2 },
									1200: { slidesPerView: 5 },
								}}
								className="pi-gallery-detail-carousel"
							>
								{photos.map((photo, index) => (
									<SwiperSlide key={photo + index}>
										<button
											type="button"
											className="pi-gallery-detail-thumb"
											onClick={() => openLightbox("photos", index)}
										>
											<img
												src={photo}
												alt={`${item.title} photo ${index + 1}`}
												loading="lazy"
												decoding="async"
											/>
											<img
												src={mediaLogo}
												alt=""
												aria-hidden="true"
												className="pi-media-brand-seal pi-media-brand-seal--detail-thumb"
											/>
										</button>
									</SwiperSlide>
								))}
							</Swiper>
						</CardBody>
					</Card>

					<Card className="pi-gallery-detail-section">
						<CardBody>
							<div className="d-flex align-items-center justify-content-between mb-3 gap-3">
								<div className="d-flex align-items-center gap-2">
									<h5 className="mb-0">Videos</h5>
									<Badge color="warning" className="pi-gallery-detail-badge">
										{videos.length}
									</Badge>
								</div>
								<span className="text-muted fs-12">Play the motion studies</span>
							</div>

							<Swiper
								modules={[Navigation]}
								spaceBetween={16}
								slidesPerView="auto"
								navigation
								breakpoints={{
									576: { slidesPerView: 2.3 },
									768: { slidesPerView: 3.2 },
									1200: { slidesPerView: 4 },
								}}
								className="pi-gallery-detail-carousel pi-gallery-detail-carousel--video"
							>
								{videos.map((video, index) => (
									<SwiperSlide key={video.id}>
										<button
											type="button"
											className="pi-gallery-detail-thumb pi-gallery-detail-thumb--video"
											onClick={() => openLightbox("videos", index)}
										>
											<img
												src={video.thumb}
												alt={`${item.title} video ${index + 1}`}
												loading="lazy"
												decoding="async"
											/>
											<span className="pi-gallery-detail-play">
												<i className="ri-play-fill" />
											</span>
											<img
												src={mediaLogo}
												alt=""
												aria-hidden="true"
												className="pi-media-brand-seal pi-media-brand-seal--detail-thumb"
											/>
										</button>
									</SwiperSlide>
								))}
							</Swiper>
						</CardBody>
					</Card>
				</section>

				<section className="mt-4">
					<Row className="g-4 align-items-start">
						<Col lg={8}>
							<div className="d-flex flex-column gap-4">
							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Project Description</h5>
									<p className="text-muted mb-0">
										{item.description ||
											"Detailed project overview and value proposition are provided here to give potential investors context and rationale for interest."}
									</p>
								</CardBody>
							</Card>

							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Technical Specifications</h5>
									<Row className="g-3">
										<Col md={6}>
											<div>
												<p className="text-muted mb-1 fs-12 text-uppercase">
													Patent Status
												</p>
												<h6 className="mb-0">Patent Pending</h6>
											</div>
										</Col>
										<Col md={6}>
											<div>
												<p className="text-muted mb-1 fs-12 text-uppercase">
													Development Stage
												</p>
												<h6 className="mb-0">Prototype Ready</h6>
											</div>
										</Col>
									</Row>
									<p className="text-muted mt-3 mb-0">
										Detailed technical documentation including engineering
										specifications, materials analysis, performance metrics, and
										testing results are available to registered investors.
									</p>
								</CardBody>
							</Card>

							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Available Documents</h5>
									<div className="pi-gallery-detail-panel p-3">
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<h6 className="mb-1">Clinical Data</h6>
												<p className="text-muted mb-0 fs-12">Technical brief</p>
											</div>
											<Badge color="warning" className="badge-soft-warning">
												Login required
											</Badge>
										</div>
									</div>
								</CardBody>
							</Card>
							</div>
						</Col>

						<Col lg={4}>
							<div className="d-flex flex-column gap-4">
							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<div className="d-flex justify-content-between align-items-start gap-3 mb-3">
										<div className="flex-grow-1">
											<div className="d-flex gap-2 flex-wrap mb-2">
												{item.badges?.map((badge) => (
													<span key={badge} className="pi-gallery-pill text-uppercase">
														{badge}
													</span>
												))}
											</div>
											<h5 className="mb-1">Project Details</h5>
											<p className="text-muted mb-0 fs-13">
												{item.subtitle || item.description || "-"}
											</p>
										</div>

										<Button
											type="button"
											color="light"
											size="sm"
											className="rounded-pill px-3"
											onClick={() => toast("Likes are coming soon.", { position: "top-right" })}
										>
											<i className="ri-heart-line me-1" />
											{likes}
										</Button>
									</div>

									{item.author ? (
										<div className="d-flex align-items-center p-3 pi-gallery-detail-panel mb-3">
											{item.author.avatarUrl ? (
												<img
													src={item.author.avatarUrl}
													alt={item.author.name}
													className="avatar-sm rounded-circle me-3"
												/>
											) : (
												<div className="avatar-sm me-3">
													<div className="avatar-title rounded-circle bg-primary text-white">
														<i className="ri-user-3-fill" />
													</div>
												</div>
											)}
											<div className="flex-grow-1">
												<p className="text-muted mb-1 fs-12 text-uppercase">
													Inventor
												</p>
												<h6 className="mb-1">
													{item.author.name}
													{item.author.verified ? (
														<i className="ri-verified-badge-fill text-primary ms-1" />
													) : null}
												</h6>
												<p className="text-muted mb-0 fs-12">
													{item.author.country || item.location || "-"}
												</p>
											</div>
										</div>
									) : null}

									<Row className="g-3 mb-3">
										{item.location ? (
											<Col xs={6}>
												<div className="p-3 pi-gallery-detail-panel h-100">
													<p className="text-muted mb-1 fs-12 text-uppercase">
														Location
													</p>
													<h6 className="mb-0">{item.location}</h6>
												</div>
											</Col>
										) : null}
										{item.category ? (
											<Col xs={6}>
												<div className="p-3 pi-gallery-detail-panel h-100">
													<p className="text-muted mb-1 fs-12 text-uppercase">
														Category
													</p>
													<h6 className="mb-0">{item.category}</h6>
												</div>
											</Col>
										) : null}
									</Row>

									<div className="p-3 pi-gallery-detail-panel">
										<Row className="g-3">
											<Col xs={6}>
												<p className="text-muted mb-1 fs-12 text-uppercase">
													Current Bid
												</p>
												<h5 className="mb-0 text-primary">
													{formatCurrency(currentBid)}
												</h5>
											</Col>
											<Col xs={6}>
												<p className="text-muted mb-1 fs-12 text-uppercase">
													Total Bids
												</p>
												<h5 className="mb-0 text-primary">{totalBids}</h5>
											</Col>
										</Row>
										<Button
											color="primary"
											className="w-100 mt-3 pi-gallery-detail-cta rounded-pill cursor-pointer"
											onClick={() =>
												toast("Bidding is coming soon.", {
													position: "top-right",
													hideProgressBar: false,
													className: "bg-info text-white",
												})
											}
										>
											Place a bid
										</Button>
									</div>
								</CardBody>
							</Card>

							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Investment Options</h5>
									<div className="p-3 pi-gallery-detail-panel mb-3">
										<div className="d-flex justify-content-between align-items-start mb-2">
											<div>
												<h6 className="mb-1">Acquisition Offer</h6>
												<p className="text-muted mb-2 fs-12">
													Complete technology acquisition
												</p>
												<ul className="text-muted mb-0 fs-12 ps-3">
													{(item.actions?.length ? item.actions : ["ROYALTIES"]).map(
														(action) => (
															<li key={action}>{titleCase(action)}</li>
														),
													)}
												</ul>
											</div>
											<h5 className="text-primary mb-0">
												{formatCurrency(investmentAmount)}
											</h5>
										</div>
									</div>
									<p className="text-muted mb-0 fs-12">
										Minimum Investment: USD {minimumInvestment.toLocaleString()}
									</p>
								</CardBody>
							</Card>

							{showRegisterCta ? (
								<Card className="pi-gallery-detail-section mb-0">
									<CardBody>
										<Button
											color="primary"
											className="w-100 pi-gallery-detail-cta rounded-pill cursor-pointer"
											onClick={() => navigate("/register")}
										>
											<i className="ri-user-add-line me-1" />
											REGISTER TO INVEST
										</Button>
									</CardBody>
								</Card>
							) : null}

							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Key Facts</h5>
									<div className="table-responsive">
										<table className="table table-borderless mb-0">
											<tbody>
												<tr>
													<td className="text-muted">Project ID</td>
													<td className="fw-medium text-end">PROJ-{item.id}</td>
												</tr>
												<tr>
													<td className="text-muted">Status</td>
													<td className="text-end">
														<Badge
															color={item.availableStatus ? "success" : "danger"}
															className={
																item.availableStatus
																	? "badge-soft-success"
																	: "badge-soft-danger"
															}
														>
															{item.availableLabel ||
																(item.availableStatus ? "Available" : "Unavailable")}
														</Badge>
													</td>
												</tr>
												{item.category ? (
													<tr>
														<td className="text-muted">Category</td>
														<td className="fw-medium text-end">{item.category}</td>
													</tr>
												) : null}
												{item.date ? (
													<tr>
														<td className="text-muted">Listed</td>
														<td className="fw-medium text-end">{item.date}</td>
													</tr>
												) : null}
												<tr>
													<td className="text-muted">Views</td>
													<td className="fw-medium text-end">
														{item.views?.toLocaleString() ?? 0}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</CardBody>
							</Card>

							<Card className="pi-gallery-detail-section mb-0">
								<CardBody>
									<h5 className="card-title mb-3">Share Project</h5>
									<div className="d-flex gap-2">
										<Button
											color="light"
											size="sm"
											className="btn-icon"
											onClick={handleShare}
										>
											<i className="ri-share-line" />
										</Button>
										<Button color="light" size="sm" className="btn-icon" disabled>
											<i className="ri-twitter-fill text-info" />
										</Button>
										<Button color="light" size="sm" className="btn-icon" disabled>
											<i className="ri-facebook-fill text-primary" />
										</Button>
										<Button color="light" size="sm" className="btn-icon" disabled>
											<i className="ri-linkedin-fill text-primary" />
										</Button>
									</div>
								</CardBody>
							</Card>
							</div>
						</Col>
					</Row>
				</section>
			</Container>

			<GalleryViewerModal
				item={item}
				isOpen={lightboxOpen}
				activeTab={lightboxTab}
				initialPhotoIndex={photoIndex}
				initialVideoIndex={videoIndex}
				onClose={() => setLightboxOpen(false)}
			/>
		</div>
	);
};

export default GalleryDetail;
