import React, { useState } from "react";
import { Container } from "reactstrap";
import { mockStartups } from "./data";
import FeaturedCarousel from "./FeaturedCarousel";

// Import components
// Intentionally rendering only the Featured Carousel for logged-in dashboard
// to ensure users land directly on the main carousel (no public hero/map).
// Import types and data
import type { Startup } from "./types";
import VideoLightbox from "./VideoLightbox";

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
const DashboardPitchInvest: React.FC = () => {
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

	document.title =
		"Dashboard | Pitch Invest - Global Startup Investment Platform";

	const handleOpenVideo = (startup: Startup) => {
		setSelectedStartup(startup);
		setVideoModalOpen(true);
	};

	return (
		<React.Fragment>
			<div className="page-content pitch-invest-dashboard">
				<Container fluid>
					{/* Featured Carousel only - main dashboard focus for logged-in users */}
					<FeaturedCarousel
						startups={mockStartups}
						onOpenVideo={handleOpenVideo}
					/>
				</Container>
			</div>

			{/* Video Lightbox Modal */}
			<VideoLightbox
				isOpen={videoModalOpen}
				toggle={() => setVideoModalOpen(false)}
				startup={selectedStartup}
			/>
		</React.Fragment>
	);
};

export default DashboardPitchInvest;
