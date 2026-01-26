import React from "react";
import { Col, Input, Label } from "reactstrap";

interface PitchInfoProps {
	formData: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

const PitchInfo: React.FC<PitchInfoProps> = ({ formData, onChange, onFileChange }) => {
	return (
		<div className="row g-3">
			<Col md={12}>
				<Label className="form-label" htmlFor="description">
					Description
				</Label>
				<Input
					name="description"
					id="description"
					type="textarea"
					rows={5}
					value={formData.description || ""}
					onChange={onChange}
					placeholder="Describe your project or investment interests"
					className="form-control"
				/>
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="coverImage">
					Cover Image
				</Label>
				<Input
					id="coverImage"
					type="file"
					accept="image/*"
					onChange={(e) => onFileChange(e, "coverImage")}
					className="form-control"
				/>
				{formData.coverImagePreview && (
					<img
						src={formData.coverImagePreview}
						alt="Cover preview"
						className="mt-3 rounded"
						style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
					/>
				)}
			</Col>
			<Col md={6}>
				<Label className="form-label" htmlFor="photo">
					Profile Photo
				</Label>
				<Input
					id="photo"
					type="file"
					accept="image/*"
					onChange={(e) => onFileChange(e, "photo")}
					className="form-control"
				/>
				{formData.photoPreview && (
					<img
						src={formData.photoPreview}
						alt="Photo preview"
						className="mt-3 rounded"
						style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
					/>
				)}
			</Col>
			<Col md={12}>
				<Label className="form-label" htmlFor="pitchVideo">
					Pitch Video
				</Label>
				<Input
					id="pitchVideo"
					type="file"
					accept="video/*"
					onChange={(e) => onFileChange(e, "pitchVideo")}
					className="form-control"
				/>
				{formData.pitchVideo && (
					<small className="text-muted d-block mt-2">
						<i className="ri-file-video-line me-1"></i>
						Video selected: {typeof formData.pitchVideo === "string" ? formData.pitchVideo : "File selected"}
					</small>
				)}
			</Col>
		</div>
	);
};

export default PitchInfo;
