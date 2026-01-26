import React, { useState } from "react";
import { Col, Input, Label } from "reactstrap";

interface PersonalInfoProps {
	formData: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
	const [passwordShow, setPasswordShow] = useState<boolean>(false);

	return (
		<div className="row g-3">
			<Col md={12}>
				<Label className="form-label" htmlFor="fullName">
					Full Name <span className="text-danger">*</span>
				</Label>
				<Input
					name="fullName"
					id="fullName"
					value={formData.fullName || ""}
					onChange={onChange}
					placeholder="Enter your full name"
					className="form-control"
				/>
			</Col>
			<Col md={12}>
				<Label className="form-label" htmlFor="personalEmail">
					Email <span className="text-danger">*</span>
				</Label>
				<Input
					name="personalEmail"
					id="personalEmail"
					type="email"
					value={formData.personalEmail || ""}
					onChange={onChange}
					placeholder="Enter your email"
					className="form-control"
				/>
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="password">
					Password (Optional)
				</Label>
				<div className="position-relative auth-pass-inputgroup">
					<Input
						name="password"
						id="password"
						type={passwordShow ? "text" : "password"}
						value={formData.password || ""}
						onChange={onChange}
						placeholder="Enter password (optional)"
						className="form-control pe-5"
					/>
					<button
						className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
						type="button"
						onClick={() => setPasswordShow(!passwordShow)}
					>
						<i className={passwordShow ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"}></i>
					</button>
				</div>
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="telephone">
					Telephone
				</Label>
				<Input
					name="telephone"
					id="telephone"
					value={formData.telephone || ""}
					onChange={onChange}
					placeholder="Enter telephone"
					className="form-control"
				/>
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="country">
					Country
				</Label>
				<Input
					name="country"
					id="country"
					value={formData.country || ""}
					onChange={onChange}
					placeholder="Enter country"
					className="form-control"
				/>
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="city">
					City
				</Label>
				<Input
					name="city"
					id="city"
					value={formData.city || ""}
					onChange={onChange}
					placeholder="Enter city"
					className="form-control"
				/>
			</Col>
		</div>
	);
};

export default PersonalInfo;
