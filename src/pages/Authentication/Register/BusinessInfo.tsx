import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

interface BusinessInfoProps {
	userType: string;
	formData: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ userType, formData, onChange }) => {
	return (
		<div className="row g-3">
			{userType === "Inventor" && (
				<>
					<Col md={6}>
						<Label className="form-label">Project Name <span className="text-danger">*</span></Label>
						<Input
							name="projectName"
							value={formData.projectName || ""}
							onChange={onChange}
							placeholder="Enter project name"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Project Category <span className="text-danger">*</span></Label>
						<Input
							name="projectCategory"
							value={formData.projectCategory || ""}
							onChange={onChange}
							placeholder="e.g., Medical Technology, Automotive"
							className="form-control"
						/>
					</Col>
				</>
			)}

			{/* StartUp: full layout matching PITCHINVEST */}
			{userType === "StartUp" && (
				<>
					<Col xs={12}>
						<Label className="form-label">Smart Money</Label>
						<Input
							name="smartMoney"
							value={formData.smartMoney || ""}
							onChange={onChange}
							placeholder="Enter Smart Money details"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Company Name <span className="text-danger">*</span></Label>
						<Input
							name="companyName"
							value={formData.companyName || ""}
							onChange={onChange}
							placeholder="Your Company"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Project Name <span className="text-danger">*</span></Label>
						<Input
							name="projectName"
							value={formData.projectName || ""}
							onChange={onChange}
							placeholder="Your Project"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Project Category <span className="text-danger">*</span></Label>
						<Input
							name="projectCategory"
							value={formData.projectCategory || ""}
							onChange={onChange}
							placeholder="e.g., SaaS, E-commerce, FinTech"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Company NIF</Label>
						<Input
							name="companyNIF"
							value={formData.companyNIF || ""}
							onChange={onChange}
							placeholder="NIF"
							className="form-control"
						/>
					</Col>
					<Col xs={12}>
						<Label className="form-label">Company Telephone</Label>
						<Input
							name="companyTelephone"
							type="tel"
							value={formData.companyTelephone || ""}
							onChange={onChange}
							placeholder="(555) 000-0000"
							className="form-control"
						/>
					</Col>

					{/* Investment Offer (%) (Primary) */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Investment Offer (%) <span className="text-primary">(Primary)</span></h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Equity</Label>
									<Input
										name="capitalPercentage"
										value={formData.capitalPercentage || ""}
										onChange={onChange}
										placeholder="e.g., 20%"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Investment Amount</Label>
									<Input
										name="capitalTotalValue"
										value={formData.capitalTotalValue || ""}
										onChange={onChange}
										placeholder="e.g., $250,000"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					{/* Brand Exploitation Rights */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Brand Exploitation Rights</h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Initial Licensing Fee</Label>
									<Input
										name="licenseFee"
										value={formData.licenseFee || ""}
										onChange={onChange}
										placeholder="e.g., $15,000"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Royalties (%)</Label>
									<Input
										name="licensingRoyaltiesPercentage"
										value={formData.licensingRoyaltiesPercentage || ""}
										onChange={onChange}
										placeholder="e.g., 6%"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					{/* Franchise */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Franchise</h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Franchise Fee</Label>
									<Input
										name="franchiseeInvestment"
										value={formData.franchiseeInvestment || ""}
										onChange={onChange}
										placeholder="e.g., $15,000"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Royalties (%)</Label>
									<Input
										name="monthlyRoyalties"
										value={formData.monthlyRoyalties || ""}
										onChange={onChange}
										placeholder="e.g., 6%"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					<Col xs={12}>
						<Label className="form-label">Total Sale of Project</Label>
						<Input
							name="totalSaleOfProject"
							value={formData.totalSaleOfProject || ""}
							onChange={onChange}
							placeholder="e.g., $2,000,000 (for selling entire startup)"
							className="form-control"
						/>
					</Col>
				</>
			)}

			{/* Company: same as StartUp but no Smart Money, Franchise (Primary) */}
			{userType === "Company" && (
				<>
					<Col md={6}>
						<Label className="form-label">Company Name <span className="text-danger">*</span></Label>
						<Input
							name="companyName"
							value={formData.companyName || ""}
							onChange={onChange}
							placeholder="Your Company"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Project Name <span className="text-danger">*</span></Label>
						<Input
							name="projectName"
							value={formData.projectName || ""}
							onChange={onChange}
							placeholder="Your Project"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Project Category <span className="text-danger">*</span></Label>
						<Input
							name="projectCategory"
							value={formData.projectCategory || ""}
							onChange={onChange}
							placeholder="e.g., Restaurant, Retail, Manufacturing"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Company NIF</Label>
						<Input
							name="companyNIF"
							value={formData.companyNIF || ""}
							onChange={onChange}
							placeholder="NIF"
							className="form-control"
						/>
					</Col>
					<Col xs={12}>
						<Label className="form-label">Company Telephone</Label>
						<Input
							name="companyTelephone"
							type="tel"
							value={formData.companyTelephone || ""}
							onChange={onChange}
							placeholder="(555) 000-0000"
							className="form-control"
						/>
					</Col>

					{/* Investment Offer (%) */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Investment Offer (%)</h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Equity</Label>
									<Input
										name="capitalPercentage"
										value={formData.capitalPercentage || ""}
										onChange={onChange}
										placeholder="e.g., 20%"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Investment Amount</Label>
									<Input
										name="capitalTotalValue"
										value={formData.capitalTotalValue || ""}
										onChange={onChange}
										placeholder="e.g., $250,000"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					{/* Brand Exploitation Rights */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Brand Exploitation Rights</h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Initial Licensing Fee</Label>
									<Input
										name="licenseFee"
										value={formData.licenseFee || ""}
										onChange={onChange}
										placeholder="e.g., $15,000"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Royalties (%)</Label>
									<Input
										name="licensingRoyaltiesPercentage"
										value={formData.licensingRoyaltiesPercentage || ""}
										onChange={onChange}
										placeholder="e.g., 6%"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					{/* Franchise (Primary) for Company */}
					<Col xs={12}>
						<div className="border rounded p-3 bg-light">
							<h6 className="mb-3">Franchise <span className="text-primary">(Primary)</span></h6>
							<Row className="g-3">
								<Col md={6}>
									<Label className="form-label">Franchise Fee</Label>
									<Input
										name="franchiseeInvestment"
										value={formData.franchiseeInvestment || ""}
										onChange={onChange}
										placeholder="e.g., $15,000"
										className="form-control"
									/>
								</Col>
								<Col md={6}>
									<Label className="form-label">Royalties (%)</Label>
									<Input
										name="monthlyRoyalties"
										value={formData.monthlyRoyalties || ""}
										onChange={onChange}
										placeholder="e.g., 6%"
										className="form-control"
									/>
								</Col>
							</Row>
						</div>
					</Col>

					<Col xs={12}>
						<Label className="form-label">Total Sale of Project</Label>
						<Input
							name="totalSaleOfProject"
							value={formData.totalSaleOfProject || ""}
							onChange={onChange}
							placeholder="e.g., $5,000,000 (for selling entire company)"
							className="form-control"
						/>
					</Col>
				</>
			)}

			{userType === "Inventor" && (
				<>
					<Col md={6}>
						<Label className="form-label">Inventor Name</Label>
						<Input
							name="inventorName"
							value={formData.inventorName || ""}
							onChange={onChange}
							placeholder="Enter inventor name"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">License Number</Label>
						<Input
							name="licenseNumber"
							value={formData.licenseNumber || ""}
							onChange={onChange}
							placeholder="Enter license number"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Patent Exploitation Fee</Label>
						<Input
							name="initialLicenseValue"
							value={formData.initialLicenseValue || ""}
							onChange={onChange}
							placeholder="e.g., $10,000"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Patent Exploitation Royalties</Label>
						<Input
							name="exploitationLicenseRoyalty"
							type="text"
							value={formData.exploitationLicenseRoyalty || ""}
							onChange={onChange}
							placeholder="Ex: 6%"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">Full Patent Assignment (100%)</Label>
						<Input
							name="patentSale"
							value={formData.patentSale || ""}
							onChange={onChange}
							placeholder="e.g., $350,000"
							className="form-control"
						/>
					</Col>
					<Col md={6}>
						<Label className="form-label">1-200 Investors</Label>
						<Input
							name="investorsCount"
							type="text"
							value={formData.investorsCount || ""}
							onChange={onChange}
							placeholder="Example: 3 Investors"
							className="form-control"
						/>
					</Col>
				</>
			)}

			{userType === "Investor" && (
				<>
					<Col md={12}>
						<Label className="form-label">Full Name <span className="text-danger">*</span></Label>
						<Input
							name="fullName"
							value={formData.fullName || ""}
							onChange={onChange}
							placeholder="Enter your full name"
							className="form-control"
						/>
					</Col>
					<Col md={12}>
						<Label className="form-label">Project Category Interest</Label>
						<Input
							name="projectCategory"
							type="text"
							value={formData.projectCategory || ""}
							onChange={onChange}
							placeholder="e.g., Medical, Automotive, FinTech"
							className="form-control"
						/>
					</Col>
					<Col md={12}>
						<Label className="form-label">Investment Preferences</Label>
						<Input
							name="investmentPreferences"
							type="textarea"
							rows={5}
							value={formData.investmentPreferences || ""}
							onChange={onChange}
							placeholder="Describe your investment interests"
							className="form-control"
						/>
					</Col>
				</>
			)}

		</div>
	);
};

export default BusinessInfo;
