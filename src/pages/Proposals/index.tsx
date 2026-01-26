import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { mockStartups } from "../DashboardPitchInvest/data";
import AdSlot from "../../components/Common/AdSlot";

// Mock active auctions - in real implementation, fetch from Supabase
// WHERE status = 'active' AND auction_started = true
const Proposals: React.FC = () => {
	document.title = "Proposals | Pitch Invest";

	// Filter active auctions (mock data for now)
	const activeAuctions = mockStartups.filter((startup) => startup.featured);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Top Banner Ad */}
				<AdSlot placement="top" />

				<Row className="mb-4">
					<Col>
						<h4 className="mb-1">Active Proposals / Auctions</h4>
						<p className="text-muted mb-0">
							Browse all active investment proposals and auctions
						</p>
					</Col>
				</Row>

				{/* Active Auctions Grid */}
				<Row className="g-4">
					{activeAuctions.map((auction) => (
						<Col key={auction.id} xs={12} sm={6} lg={4}>
							<Card className="h-100 border-0 rounded shadow-sm card-hover">
								<Link
									to={`/gallery/${auction.id}`}
									className="text-body text-decoration-none"
									title="Click to view profile details"
								>
									<div className="position-relative">
										<img
											src={auction.photo}
											alt={auction.name}
											className="card-img-top"
											style={{
												height: "250px",
												objectFit: "cover",
												borderRadius: "0.5rem 0.5rem 0 0",
											}}
											onError={(e) => {
												(e.target as HTMLImageElement).src = "/placeholder.svg";
											}}
										/>
										<div className="position-absolute top-0 end-0 m-2">
											<span className="badge bg-primary rounded-pill">
												{auction.countryFlag} {auction.country}
											</span>
										</div>
										<div className="position-absolute top-0 start-0 m-2">
											<span className="badge bg-success rounded-pill">
												Active Auction
											</span>
										</div>
									</div>
									<CardBody>
										<h5 className="mb-2 fw-semibold">{auction.name}</h5>
										<p className="text-muted mb-3 small">
											{auction.shortDescription}
										</p>

										{/* Auction Stats */}
										<div className="mb-3">
											<Row className="g-2">
												<Col xs={6}>
													<div className="text-center p-2 bg-light rounded">
														<div className="text-muted small mb-1">Goal</div>
														<div className="fw-bold">
															${auction.investmentGoal.toLocaleString()}
														</div>
													</div>
												</Col>
												<Col xs={6}>
													<div className="text-center p-2 bg-light rounded">
														<div className="text-muted small mb-1">Raised</div>
														<div className="fw-bold text-success">
															${auction.currentInvestment.toLocaleString()}
														</div>
													</div>
												</Col>
											</Row>
										</div>

										{/* Approval Rate */}
										<div className="d-flex justify-content-between align-items-center mb-3">
											<span className="text-muted small">Public Approval</span>
											<span className="badge bg-primary-subtle text-primary rounded-pill">
												{auction.publicApproval}%
											</span>
										</div>

										{/* Sector Badge */}
										<div className="mb-3">
											<span className="badge bg-success-subtle text-success rounded-pill">
												{auction.sector}
											</span>
										</div>

										{/* View Profile Button */}
										<div className="text-center">
											<span className="text-primary small fw-semibold">
												View Profile <i className="ri-arrow-right-line"></i>
											</span>
										</div>
									</CardBody>
								</Link>
							</Card>
						</Col>
					))}
				</Row>

				{activeAuctions.length === 0 && (
					<Card className="border-0 rounded shadow-sm">
						<CardBody className="text-center py-5">
							<i className="ri-auction-line display-4 text-muted mb-3 d-block"></i>
							<h5 className="text-muted">No Active Proposals</h5>
							<p className="text-muted">
								There are currently no active auctions or proposals.
							</p>
						</CardBody>
					</Card>
				)}

				{/* Gallery Footer Ad */}
				<AdSlot placement="gallery-footer" />

				{/* Bottom Banner Ad */}
				<AdSlot placement="bottom" />
			</Container>
		</div>
	);
};

export default Proposals;
