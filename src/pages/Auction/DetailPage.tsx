import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Form,
	Input,
	Label,
	Row,
	Table,
} from "reactstrap";
import Countdown from "react-countdown";
import { mockStartups } from "../DashboardPitchInvest/data";
import AdSlot from "../../components/Common/AdSlot";

interface Bid {
	id: string;
	investorName: string;
	amount: number;
	timestamp: Date;
}

const AuctionDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [bidAmount, setBidAmount] = useState("");
	const [bids, setBids] = useState<Bid[]>([]);

	// Find the auction/project by ID
	const auction = mockStartups.find((s) => s.id.toString() === id);

	// Mock timer - in real implementation, this would come from the database
	const endTime = new Date();
	endTime.setDate(endTime.getDate() + 7); // 7 days from now

	useEffect(() => {
		// In real implementation, fetch auction data and bids from Supabase
		// Mock bids for now
		setBids([
			{
				id: "1",
				investorName: "John Investor",
				amount: 50000,
				timestamp: new Date(),
			},
			{
				id: "2",
				investorName: "Jane Capital",
				amount: 75000,
				timestamp: new Date(),
			},
		]);
	}, [id]);

	if (!auction) {
		return (
			<div className="page-content">
				<Container fluid>
					<Card>
						<CardBody className="text-center py-5">
							<h4>Auction not found</h4>
							<Button
								color="primary"
								className="rounded mt-3"
								onClick={() => navigate("/gallery")}
							>
								Back to Gallery
							</Button>
						</CardBody>
					</Card>
				</Container>
			</div>
		);
	}

	const handleBidSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In real implementation, submit bid to Supabase
		if (bidAmount) {
			const newBid: Bid = {
				id: Date.now().toString(),
				investorName: "Current User", // Get from auth
				amount: parseFloat(bidAmount),
				timestamp: new Date(),
			};
			setBids([newBid, ...bids]);
			setBidAmount("");
		}
	};

	// Countdown renderer
	const renderCountdown = ({
		days,
		hours,
		minutes,
		seconds,
		completed,
	}: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
		completed: boolean;
	}) => {
		if (completed) {
			return <span className="text-danger fw-bold">Auction Ended</span>;
		}
		return (
			<div className="d-flex gap-3 justify-content-center">
				<div className="text-center">
					<div className="fs-2 fw-bold">{days}</div>
					<div className="text-muted small">Days</div>
				</div>
				<div className="text-center">
					<div className="fs-2 fw-bold">{hours}</div>
					<div className="text-muted small">Hours</div>
				</div>
				<div className="text-center">
					<div className="fs-2 fw-bold">{minutes}</div>
					<div className="text-muted small">Minutes</div>
				</div>
				<div className="text-center">
					<div className="fs-2 fw-bold">{seconds}</div>
					<div className="text-muted small">Seconds</div>
				</div>
			</div>
		);
	};

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
					{/* Left Column - Project Info */}
					<Col lg={8}>
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody>
								<div className="position-relative mb-4">
									<img
										src={auction.photo}
										alt={auction.name}
										className="w-100 rounded"
										style={{ height: "400px", objectFit: "cover" }}
									/>
									<div className="position-absolute top-0 start-0 m-3">
										<span className="badge bg-primary rounded">
											{auction.countryFlag} {auction.country}
										</span>
									</div>
								</div>

								<h3 className="mb-3">{auction.name}</h3>
								<p className="text-muted mb-4">{auction.shortDescription}</p>

								<Row className="g-3 mb-4">
									<Col md={4}>
										<Card className="border rounded">
											<CardBody className="text-center">
												<div className="text-muted small mb-1">Investment Goal</div>
												<div className="fs-4 fw-bold">
													${auction.investmentGoal.toLocaleString()}
												</div>
											</CardBody>
										</Card>
									</Col>
									<Col md={4}>
										<Card className="border rounded">
											<CardBody className="text-center">
												<div className="text-muted small mb-1">Current Investment</div>
												<div className="fs-4 fw-bold text-success">
													${auction.currentInvestment.toLocaleString()}
												</div>
											</CardBody>
										</Card>
									</Col>
									<Col md={4}>
										<Card className="border rounded">
											<CardBody className="text-center">
												<div className="text-muted small mb-1">Public Approval</div>
												<div className="fs-4 fw-bold text-primary">
													{auction.publicApproval}%
												</div>
											</CardBody>
										</Card>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>

					{/* Right Column - Timer & Bid Form */}
					<Col lg={4}>
						{/* Timer Card */}
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody className="text-center">
								<h5 className="mb-3">Time Remaining</h5>
								<Countdown date={endTime} renderer={renderCountdown} />
							</CardBody>
						</Card>

						{/* Bid Form */}
						<Card className="border-0 rounded shadow-sm mb-4">
							<CardBody>
								<h5 className="mb-3">Place Your Bid</h5>
								<Form onSubmit={handleBidSubmit}>
									<div className="mb-3">
										<Label className="form-label">Bid Amount ($)</Label>
										<Input
											type="number"
											value={bidAmount}
											onChange={(e) => setBidAmount(e.target.value)}
											placeholder="Enter bid amount"
											min={auction.minInvestment}
											step="1000"
											className="form-control rounded"
											required
										/>
										<small className="text-muted">
											Minimum: ${auction.minInvestment.toLocaleString()}
										</small>
									</div>
									<Button
										type="submit"
										color="primary"
										className="w-100 rounded-pill"
										size="lg"
									>
										<i className="ri-money-dollar-circle-line me-1"></i>
										Invest Now
									</Button>
								</Form>
							</CardBody>
						</Card>

						{/* Bid History */}
						<Card className="border-0 rounded shadow-sm">
							<CardBody>
								<h5 className="mb-3">Recent Bids</h5>
								{bids.length > 0 ? (
									<Table borderless className="mb-0">
										<thead>
											<tr>
												<th>Investor</th>
												<th className="text-end">Amount</th>
											</tr>
										</thead>
										<tbody>
											{bids.map((bid) => (
												<tr key={bid.id}>
													<td>{bid.investorName}</td>
													<td className="text-end fw-semibold">
														${bid.amount.toLocaleString()}
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								) : (
									<p className="text-muted text-center mb-0">No bids yet</p>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>

				{/* Auction Bottom Ad */}
				<AdSlot placement="auction-bottom" />

				{/* Bottom Banner Ad */}
				<AdSlot placement="bottom" />
			</Container>
		</div>
	);
};

export default AuctionDetailPage;
