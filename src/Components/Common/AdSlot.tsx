import { Card, CardBody } from "reactstrap";

interface AdSlotProps {
	/** preferred prop name */
	placement?: "top" | "bottom" | "carousel" | "gallery-footer" | "auction-bottom" | "profile";
	/** legacy alias accepted for compatibility */
	position?: "top" | "bottom" | "carousel" | "gallery-footer" | "auction-bottom" | "profile";
	className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ placement, position, className = "" }) => {
	// support legacy `position` prop used throughout the app
	const usedPlacement = placement ?? position ?? "top";
	// Minimal realistic mock ad: image + headline + CTA
	const width = "100%";
	const height = usedPlacement === "profile" ? 150 : usedPlacement === "auction-bottom" ? 100 : 120;
	const imageUrl = "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=60&auto=format&fit=crop&ixlib=rb-4.0.3&s=mock";

	return (
		<Card className={`border-0 rounded shadow-sm mb-3 ${className}`}> 
			<CardBody className="p-0" style={{ overflow: "hidden" }}>
				<div style={{ position: "relative", width, height }}>
					<img src={imageUrl} alt="Advertisement" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
					<div style={{ position: "absolute", left: 16, top: 16, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
						<h6 className="mb-1">Boost Your Project Visibility</h6>
						<small>Reach investors and decision makers — advertise with PitchInvest.</small>
					</div>
					<a href="#" onClick={(e) => e.preventDefault()} style={{ position: "absolute", right: 16, bottom: 16 }}>
						<button className="btn btn-sm btn-light">Learn More</button>
					</a>
				</div>
			</CardBody>
		</Card>
	);
};

export default AdSlot;
