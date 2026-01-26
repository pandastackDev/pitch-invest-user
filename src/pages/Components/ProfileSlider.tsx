import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Profile {
	id: string | number;
	name: string;
	photo: string;
	logo?: string;
	country: string;
	countryFlag: string;
	sector: string;
	shortDescription: string;
	investmentGoal?: number;
}

interface ProfileSliderProps {
	profiles: Profile[];
	title?: string;
}

const ProfileSlider: React.FC<ProfileSliderProps> = ({
	profiles,
	title = "Featured Profiles",
}) => {
	return (
		<div className="mb-4">
			{title && (
				<div className="d-flex justify-content-between align-items-center mb-3">
					<h5 className="mb-0 fw-semibold">{title}</h5>
					<Link to="/gallery" className="text-primary text-decoration-none">
						View All <i className="ri-arrow-right-line"></i>
					</Link>
				</div>
			)}
			<Swiper
				modules={[Navigation, Autoplay]}
				navigation={{
					nextEl: `.swiper-button-next-${title.replace(/\s+/g, "-")}`,
					prevEl: `.swiper-button-prev-${title.replace(/\s+/g, "-")}`,
				}}
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 20,
					},
				}}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				className="profile-slider-swiper rounded"
			>
				{profiles.map((profile) => (
					<SwiperSlide key={profile.id}>
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
									{profile.logo && (
										<div className="position-absolute top-0 start-0 m-2">
											<img
												src={profile.logo}
												alt=""
												className="rounded-circle"
												style={{
													width: "40px",
													height: "40px",
													objectFit: "cover",
													border: "2px solid white",
												}}
											/>
										</div>
									)}
									<div className="position-absolute top-0 end-0 m-2">
										<span className="badge bg-primary rounded">
											{profile.countryFlag}
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
										{profile.investmentGoal && (
											<span className="text-muted small">
												${profile.investmentGoal.toLocaleString()}
											</span>
										)}
									</div>
								</CardBody>
							</Link>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
			{/* Custom Navigation Buttons - Velzon Style */}
			<div className="d-flex justify-content-end gap-2 mt-3">
				<button
					className={`swiper-button-prev-${title.replace(/\s+/g, "-")} btn btn-light rounded`}
				>
					<i className="ri-arrow-left-s-line"></i>
				</button>
				<button
					className={`swiper-button-next-${title.replace(/\s+/g, "-")} btn btn-light rounded`}
				>
					<i className="ri-arrow-right-s-line"></i>
				</button>
			</div>
		</div>
	);
};

export default ProfileSlider;
