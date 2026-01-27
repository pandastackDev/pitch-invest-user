import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, CardBody } from "reactstrap";
import type { GalleryItem } from "../../../types/gallery";
import mediaLogo from "../../../assets/images/logo-light.png";

type GalleryCardProps = {
	item: GalleryItem;
	liked?: boolean;
	onToggleLike?: (id: string) => void;
	onShare?: (id: string) => void;
	onMessage?: (id: string) => void;
	onOpenViewer?: (item: GalleryItem) => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
	item,
	liked = false,
	onToggleLike,
	onShare,
	onMessage,
	onOpenViewer,
}) => {
	const idStr = String(item.id);
	const likes = item.likes ?? 0;
	const infoHref = `/apps-projects-overview?projectId=${encodeURIComponent(idStr)}`;

	const photoA =
		item.media?.photos?.[0] ?? item.imageUrl ?? "/assets/default-cover.png";
	const photoB = item.media?.photos?.[1] ?? photoA;
	const videoThumb = item.media?.videos?.[0]?.thumb ?? photoA;

	const verifiedIdentity = !!item.verifiedIdentity;
	const verifiedCompany = !!item.verifiedCompany;
	const verificationLabels = [
		verifiedIdentity ? "Verified identity" : null,
		verifiedCompany ? "Verified company" : null,
	].filter(Boolean) as string[];

	const openViewer = () => onOpenViewer?.(item);

	return (
		<Card
			id={`pi-gallery-card-${idStr}`}
			className="pi-gallery-card h-100"
			role="button"
			tabIndex={0}
			onClick={openViewer}
			onKeyDown={(e) => {
				if (e.target !== e.currentTarget) return;
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					openViewer();
				}
			}}
		>
			<div className="pi-gallery-card-media">
				{/* {verificationLabels.length > 0 ? (
					<div className="pi-gallery-verify-flags" aria-label="Verification flags">
						{verificationLabels.map((label) => (
							<span key={`${idStr}-${label}`} className="pi-gallery-verify-flag">
								<i className="ri-verified-badge-fill"></i>
								<span className="ms-1">{label}</span>
							</span>
						))}
					</div>
				) : null} */}
				<div className="pi-gallery-media-grid">
					<div className="pi-gallery-media-tile pi-gallery-media-tile-main">
						<img
							src={mediaLogo}
							alt=""
							aria-hidden="true"
							className="pi-media-brand-seal"
						/>
						<img
							src={photoA}
							alt={item.title}
							onError={(e) => {
								(e.target as HTMLImageElement).src = "/placeholder.svg";
							}}
						/>
					</div>

					<div className="pi-gallery-media-col">
						<div className="pi-gallery-media-tile">
							<img
								src={mediaLogo}
								alt=""
								aria-hidden="true"
								className="pi-media-brand-seal"
							/>
							<img
								src={photoB}
								alt={item.title}
								onError={(e) => {
									(e.target as HTMLImageElement).src = "/placeholder.svg";
								}}
							/>
						</div>
						<div className="pi-gallery-media-tile pi-gallery-media-video">
							<img
								src={mediaLogo}
								alt=""
								aria-hidden="true"
								className="pi-media-brand-seal"
							/>
							<img
								src={videoThumb}
								alt={`${item.title} - video`}
								onError={(e) => {
									(e.target as HTMLImageElement).src = "/placeholder.svg";
								}}
							/>
							<div className="pi-gallery-media-play" aria-hidden="true">
								<i className="ri-play-fill"></i>
							</div>
						</div>
					</div>
				</div>

				<div className="pi-gallery-card-media-meta">
					<Badge className="pi-gallery-pill">8 Photos</Badge>
					<Badge className="pi-gallery-pill">3 Videos</Badge>
				</div>
			</div>

			<CardBody className="d-flex flex-column">
				<div className="d-flex align-items-start justify-content-between gap-2 mb-2">
					<div className="d-flex align-items-center gap-2">
						<h6 className="pi-gallery-card-title mb-0">{item.title}</h6>
						{verificationLabels.length > 0 ? (
							<span
								className="pi-gallery-verified-mark"
								title={verificationLabels.join(" · ")}
								aria-label={verificationLabels.join(" · ")}
							>
								<i className="ri-verified-badge-fill"></i>
							</span>
						) : null}
					</div>
					{item.category ? (
						<Badge className="pi-gallery-pill pi-gallery-pill-muted">
							{item.category}
						</Badge>
					) : null}
				</div>

				<p className="pi-gallery-card-desc text-muted mb-3">
					{item.description || "-"}
				</p>

				<div className="mt-auto d-flex align-items-center justify-content-between gap-2">
					<div
						className="d-inline-flex align-items-center gap-1"
						role="group"
						aria-label="project actions"
					>
						<Button
							type="button"
							color="light"
							size="sm"
							className={`pi-gallery-action-btn pi-gallery-action-like${liked ? " is-liked" : ""}`}
							aria-label={liked ? "Unlike" : "Like"}
							onClick={(e) => {
								e.stopPropagation();
								onToggleLike?.(idStr);
							}}
						>
							<i
								className={`pi-gallery-action-icon ${liked ? "ri-heart-fill" : "ri-heart-line"}`}
							></i>
							<span className="ms-1 pi-gallery-like-count">{likes}</span>
						</Button>

						<Button
							type="button"
							color="light"
							size="sm"
							className="pi-gallery-action-btn pi-gallery-action-message"
							aria-label="Message"
							onClick={(e) => {
								e.stopPropagation();
								onMessage?.(idStr);
							}}
						>
							<i className="pi-gallery-action-icon ri-message-2-line"></i>
						</Button>

						<Button
							type="button"
							color="light"
							size="sm"
							className="pi-gallery-action-btn pi-gallery-action-share"
							aria-label="Share"
							onClick={(e) => {
								e.stopPropagation();
								onShare?.(idStr);
							}}
						>
							<i className="pi-gallery-action-icon ri-share-line"></i>
						</Button>
					</div>

					<Button
						tag={Link}
						to={infoHref}
						color="primary"
						className="pi-gallery-info-btn"
						onClick={(e) => e.stopPropagation()}
					>
						Information
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default GalleryCard;
