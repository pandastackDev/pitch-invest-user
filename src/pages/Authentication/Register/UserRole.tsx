import React from "react";
import { Card, CardBody, Col } from "reactstrap";

interface UserRoleProps {
	userType: string;
	onUserTypeChange: (type: string) => void;
	onErrorChange: (error: string) => void;
}

const UserRole: React.FC<UserRoleProps> = ({ userType, onUserTypeChange, onErrorChange }) => {
	const userTypes = ["Inventor", "StartUp", "Company", "Investor"];

	return (
		<div className="row g-3">
			{userTypes.map((type) => (
				<Col sm={6} className="col-6" key={type}>
					<Card
						className={`cursor-pointer h-100 transition-all ${
							userType === type ? "bg-primary text-white shadow-sm" : "border-light"
						}`}
						onClick={() => {
							onUserTypeChange(type);
							onErrorChange("");
						}}
						style={{ cursor: "pointer", transition: "all 0.3s ease" }}
					>
						<CardBody className="d-flex align-items-center justify-content-center p-4">
							<h6 className={`mb-0 fw-semibold ${userType === type ? "text-white" : ""}`}>{type}</h6>
						</CardBody>
					</Card>
				</Col>
			))}
		</div>
	);
};

export default UserRole;
