import { useEffect, useMemo, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import type { GalleryItem } from "../../../types/gallery";

type ViewerTab = "photos" | "videos";

type Props = {
	isOpen: boolean;
	item: GalleryItem | null;
	onClose: () => void;
	onClosed?: () => void;
};

const clampIndex = (idx: number, len: number) => {
	if (len <= 0) return 0;
	return ((idx % len) + len) % len;
};

const getMedia = (item: GalleryItem | null) => {
	const photos =
		item?.media?.photos?.length && item.media.photos.length > 0
			? item.media.photos
			: item?.imageUrl
				? [item.imageUrl]
				: [];

	const videosRaw = item?.media?.videos ?? [];
	const videos = videosRaw.filter((v) => !!v?.src);

	return { photos, videos };
};

const GalleryViewerModal: React.FC<Props> = ({ isOpen, item, onClose, onClosed }) => {
	const { photos, videos } = useMemo(() => getMedia(item), [item]);
	const [tab, setTab] = useState<ViewerTab>("photos");
	const [photoIndex, setPhotoIndex] = useState(0);
	const [videoIndex, setVideoIndex] = useState(0);

	useEffect(() => {
		if (!isOpen) return;
		setTab("photos");
		setPhotoIndex(0);
		setVideoIndex(0);
	}, [isOpen, item?.id]);

	const safePhotoIndex = clampIndex(photoIndex, photos.length);
	const safeVideoIndex = clampIndex(videoIndex, videos.length);

	const photoSrc = photos[safePhotoIndex] ?? item?.imageUrl ?? "/assets/default-cover.png";
	const video = videos[safeVideoIndex];

	const canShowVideos = videos.length > 0;

	return (
		<Modal
			isOpen={isOpen}
			toggle={onClose}
			size="lg"
			centered
			backdrop="static"
			keyboard
			className="pi-gallery-viewer-modal"
			onClosed={onClosed}
		>
			<ModalBody className="p-0 pi-gallery-viewer">
				<button
					type="button"
					className="pi-gallery-viewer-close"
					aria-label="Close"
					onClick={onClose}
				>
					<i className="ri-close-line"></i>
				</button>

				<div className="pi-gallery-viewer-topbar">
					<div className="pi-gallery-viewer-title">{item?.title ?? "Gallery"}</div>
					<div className="pi-gallery-viewer-tabs">
						<Button
							type="button"
							color="light"
							size="sm"
							className={`pi-gallery-viewer-tab${tab === "photos" ? " is-active" : ""}`}
							onClick={() => setTab("photos")}
						>
							Photos <span className="ms-1 opacity-75">({photos.length})</span>
						</Button>
						<Button
							type="button"
							color="light"
							size="sm"
							disabled={!canShowVideos}
							className={`pi-gallery-viewer-tab${tab === "videos" ? " is-active" : ""}`}
							onClick={() => setTab("videos")}
						>
							Videos <span className="ms-1 opacity-75">({videos.length})</span>
						</Button>
					</div>
				</div>

				{tab === "photos" ? (
					<div className="pi-gallery-viewer-stage">
						<img
							src={photoSrc}
							alt={item?.title ?? "Photo"}
							className="pi-gallery-viewer-media"
							onError={(e) => {
								(e.target as HTMLImageElement).src = "/placeholder.svg";
							}}
						/>

						{photos.length > 1 ? (
							<>
								<button
									type="button"
									className="pi-gallery-viewer-nav pi-gallery-viewer-nav-prev"
									aria-label="Previous photo"
									onClick={() => setPhotoIndex((i) => i - 1)}
								>
									<i className="ri-arrow-left-s-line"></i>
								</button>
								<button
									type="button"
									className="pi-gallery-viewer-nav pi-gallery-viewer-nav-next"
									aria-label="Next photo"
									onClick={() => setPhotoIndex((i) => i + 1)}
								>
									<i className="ri-arrow-right-s-line"></i>
								</button>
							</>
						) : null}

						<div className="pi-gallery-viewer-counter">
							{photos.length > 0 ? `${safePhotoIndex + 1} / ${photos.length}` : "0 / 0"}
						</div>
					</div>
				) : (
					<div className="pi-gallery-viewer-stage">
						{video ? (
							<video
								className="pi-gallery-viewer-media"
								controls
								playsInline
								src={video.src}
							/>
						) : (
							<div className="pi-gallery-viewer-empty">
								<div className="pi-gallery-viewer-empty-title">No videos</div>
								<div className="text-muted">This project has no video media.</div>
							</div>
						)}

						{videos.length > 1 ? (
							<>
								<button
									type="button"
									className="pi-gallery-viewer-nav pi-gallery-viewer-nav-prev"
									aria-label="Previous video"
									onClick={() => setVideoIndex((i) => i - 1)}
								>
									<i className="ri-arrow-left-s-line"></i>
								</button>
								<button
									type="button"
									className="pi-gallery-viewer-nav pi-gallery-viewer-nav-next"
									aria-label="Next video"
									onClick={() => setVideoIndex((i) => i + 1)}
								>
									<i className="ri-arrow-right-s-line"></i>
								</button>
							</>
						) : null}

						<div className="pi-gallery-viewer-counter">
							{videos.length > 0 ? `${safeVideoIndex + 1} / ${videos.length}` : "0 / 0"}
						</div>

						{videos.length > 1 ? (
							<div className="pi-gallery-viewer-thumbs">
								{videos.map((v, idx) => (
									<button
										key={`${item?.id ?? "item"}-vid-${idx}`}
										type="button"
										className={`pi-gallery-viewer-thumb${idx === safeVideoIndex ? " is-active" : ""}`}
										onClick={() => setVideoIndex(idx)}
										aria-label={`Play video ${idx + 1}`}
									>
										<img
											src={v.thumb || item?.imageUrl || "/assets/default-cover.png"}
											alt=""
											aria-hidden="true"
										/>
										<span className="pi-gallery-viewer-thumb-play">
											<i className="ri-play-fill"></i>
										</span>
									</button>
								))}
							</div>
						) : null}
					</div>
				)}
			</ModalBody>
		</Modal>
	);
};

export default GalleryViewerModal;

