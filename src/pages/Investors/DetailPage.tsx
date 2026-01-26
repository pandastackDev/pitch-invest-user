import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import AdSlot from "../../components/Common/AdSlot";
import { featuredInvestor } from "../DashboardPitchInvest/data";

const InvestorDetailPage: React.FC = () => {
	const navigate = useNavigate();

	// In real implementation, fetch investor data from Supabase by ID
	// For now, using featuredInvestor as mock data
	const investor = featuredInvestor;

	return (
		<div className="page-content">
			<Container fluid>
				{/* Top Banner Ad */}
				<AdSlot placement="top" />

				<Row className="mb-4">
					<Col>
						<Button
							outline
							color="secondary"
							className="rounded-pill"
							onClick={() => navigate(-1)}
						>
							<i className="ri-arrow-left-line me-1"></i>Back
						</Button>
					</Col>
				</Row>

				<Row className="g-4">
					{/* Left Column - Investor Info */}
					<Col lg={8}>
						{/* Cover Image */}
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody className="p-0">
								<div
									className="position-relative"
									style={{
										height: "300px",
										background: investor.coverImage
											? `url(${investor.coverImage})`
											: "linear-gradient(135deg, #0a3d62 0%, #062a3d 100%)",
										backgroundSize: "cover",
										backgroundPosition: "center",
										borderRadius: "0.375rem 0.375rem 0 0",
									}}
								>
									<div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold">
										{investor.company}
									</div>
									{/* Avatar overlapping */}
									<div className="position-absolute bottom-0 start-50 translate-middle-x">
										<img
											src={investor.photo}
											alt={investor.name}
											className="rounded-circle border border-4 border-white"
											style={{
												width: "150px",
												height: "150px",
												objectFit: "cover",
											}}
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/circle cx='12' cy='7' r='4'%3E%3C/svg%3E";
											}}
										/>
									</div>
								</div>
								<CardBody className="pt-5">
									<div className="text-center mb-4">
										<h3 className="mb-1">{investor.name}</h3>
										<p className="text-muted mb-2">{investor.role}</p>
										<div className="d-flex align-items-center justify-content-center gap-1">
											<span>{investor.country}</span>
											<span className="text-muted">{investor.location}</span>
										</div>
									</div>

									{/* Description */}
									<div className="mb-4">
										<h5 className="mb-3">About</h5>
										<p className="text-muted">{investor.description}</p>
									</div>

									{/* Likes / Views */}
									<div className="d-flex justify-content-center gap-2 pb-2">
										<Button
											color="light"
											className="btn-sm d-flex align-items-center gap-1"
											style={{ backgroundColor: "#f3f4f6", border: "none" }}
										>
											<i className="ri-thumb-up-fill text-warning"></i>
											<span>{investor.likes}</span>
										</Button>
										<Button
											color="light"
											className="btn-sm d-flex align-items-center gap-1"
											style={{ backgroundColor: "#f3f4f6", border: "none" }}
										>
											<i className="ri-eye-line"></i>
											<span>{investor.views}</span>
										</Button>
									</div>
								</CardBody>
							</CardBody>
						</Card>
					</Col>

					{/* Right Column - Portfolio & Actions */}
					<Col lg={4}>
						{/* Portfolio - 6 Logos */}
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody>
								<h5 className="mb-3">Portfolio Companies</h5>
								<Row className="g-3">
									{investor.portfolio.slice(0, 6).map((item) => (
										<Col key={item.name} xs={6}>
											<div
												className="bg-light rounded d-flex align-items-center justify-content-center overflow-hidden cursor-pointer"
												style={{
													height: "100px",
													border: "1px solid #e0e0e0",
												}}
											>
												<img
													src={item.image}
													alt={item.name}
													className="w-100 h-100"
													style={{ objectFit: "cover" }}
													onError={(e) => {
														(e.target as HTMLImageElement).src =
															"/placeholder.svg";
													}}
												/>
											</div>
											<small className="text-muted d-block text-center mt-2">
												{item.name}
											</small>
										</Col>
									))}
								</Row>
							</CardBody>
						</Card>

						{/* Action Buttons */}
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody>
								<Button
									color="primary"
									className="w-100 rounded-pill mb-2"
									size="lg"
								>
									<i className="ri-message-3-line me-1"></i>
									Send Message
								</Button>
								<Button
									outline
									color="primary"
									className="w-100 rounded-pill"
									size="lg"
								>
									<i className="ri-user-follow-line me-1"></i>
									Follow Investor
								</Button>
							</CardBody>
						</Card>

						{/* Profile Sidebar Ad */}
						<AdSlot placement="profile" />
					</Col>
				</Row>

				{/* Bottom Banner Ad */}
				<AdSlot placement="bottom" />
			</Container>
		</div>
	);
};

export default InvestorDetailPage;
