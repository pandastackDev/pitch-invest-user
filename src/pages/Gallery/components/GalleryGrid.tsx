import React from "react";
import { Col, Row } from "reactstrap";
import type { GalleryItem } from "../../../types/gallery";
import GalleryCard from "./GalleryCard";

type GalleryGridProps = {
	items: GalleryItem[];
	likedById?: Record<string, boolean>;
	onToggleLike?: (id: string) => void;
	onShare?: (id: string) => void;
	onMessage?: (id: string) => void;
	onOpenViewer?: (item: GalleryItem) => void;
};

const GalleryGrid: React.FC<GalleryGridProps> = ({
	items,
	likedById,
	onToggleLike,
	onShare,
	onMessage,
	onOpenViewer,
}) => {
	return (
		<Row className="g-3 g-md-4 pi-gallery-grid">
			{items.map((item) => {
				const idStr = String(item.id);
				return (
					<Col key={idStr} xs={12} sm={6} lg={4} xl={3}>
						<GalleryCard
							item={item}
							liked={!!likedById?.[idStr]}
							onToggleLike={onToggleLike}
							onShare={onShare}
							onMessage={onMessage}
							onOpenViewer={onOpenViewer}
						/>
					</Col>
				);
			})}
		</Row>
	);
};

export default GalleryGrid;
