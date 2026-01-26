import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { mockStartups } from "./data";
import type { Startup } from "./types";

interface HighlightBlockProps {
	title: string;
	profiles: Startup[];
}

const HighlightBlock: React.FC<HighlightBlockProps> = ({ title, profiles }) => {
	return (
		<div className="mb-5">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h4 className="mb-0 fw-semibold">{title}</h4>
				<Link to="/highlights" className="text-primary text-decoration-none">
					View All <i className="ri-arrow-right-line"></i>
				</Link>
			</div>
			<Row className="g-3">
				{profiles.map((profile) => (
					<Col key={profile.id} xs={12} sm={6} lg={4}>
						<Card className="h-100 border-0 rounded shadow-sm card-hover">
							<Link
								to={`/gallery/${profile.id}`}
								className="text-body text-decoration-none"
							>
								<div className="position-relative">
									<img
										src={profile.photo}
										alt={profile.name}
										className="card-img-top"
										style={{
											height: "200px",
											objectFit: "cover",
											borderRadius: "0.375rem 0.375rem 0 0",
										}}
										onError={(e) => {
											(e.target as HTMLImageElement).src = "/placeholder.svg";
										}}
									/>
									<div className="position-absolute top-0 end-0 m-2">
										<span className="badge bg-primary rounded">
											{profile.countryFlag} {profile.country}
										</span>
									</div>
								</div>
								<CardBody>
									<h6 className="mb-2 fw-semibold">{profile.name}</h6>
									<p className="text-muted mb-2 small">
										{profile.shortDescription}
									</p>
									<div className="d-flex justify-content-between align-items-center">
										<span className="badge bg-success-subtle text-success">
											{profile.sector}
										</span>
										<span className="text-muted small">
											${profile.investmentGoal.toLocaleString()}
										</span>
									</div>
								</CardBody>
							</Link>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

const HighlightBlocks: React.FC = () => {
	// For now, using mock data. Later this will fetch from Supabase:
	// - 6 most expensive: ORDER BY valuation DESC LIMIT 6
	// - 6 most visited: ORDER BY views DESC LIMIT 6
	// - 6 sold: WHERE status = 'sold' ORDER BY sold_at DESC LIMIT 6

	// Simulate data - in real implementation, fetch from Supabase
	const mostExpensive = [...mockStartups]
		.sort((a, b) => b.investmentGoal - a.investmentGoal)
		.slice(0, 6);

	const mostVisited = [...mockStartups]
		.sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
		.slice(0, 6);

	// For sold profiles, we'll use mock data with a "sold" status
	// In real implementation: WHERE status = 'sold' ORDER BY sold_at DESC LIMIT 6
	const soldProfiles = mockStartups.slice(0, 6).map((p) => ({
		...p,
		status: "sold",
	}));

	return (
		<Container fluid className="py-4">
			<HighlightBlock
				title="6 Most Expensive Profiles"
				profiles={mostExpensive}
			/>
			<HighlightBlock
				title="6 Most Visited Profiles"
				profiles={mostVisited}
			/>
			<HighlightBlock title="6 Sold Profiles" profiles={soldProfiles} />
		</Container>
	);
};

export default HighlightBlocks;
