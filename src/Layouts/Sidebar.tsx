import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import SimpleBar from "simplebar-react";
//import logo
import mainLogo from "../assets/images/main-logo/logo.png";
import smallLogo from "../assets/images/main-logo/small-logo.png";
import LanguageDropdown from "../Components/Common/LanguageDropdown";

//Import Components
// VerticalLayout contains the full admin menu. For user-side view we replace
// it with a compact user menu (Gallery, Investors, Highlights, Offers, Blog,
// Contact, About Us) to hide admin-focused entries.

interface SidebarProps {
	layoutType?: string;
}

const Sidebar = ({ layoutType: _layoutType }: SidebarProps) => {
	const { t } = useTranslation();
	const [isSidebarCompact, setIsSidebarCompact] = useState(false);
	useEffect(() => {
		const verticalOverlay = document.getElementsByClassName("vertical-overlay");
		if (verticalOverlay) {
			verticalOverlay[0].addEventListener("click", () => {
				document.body.classList.remove("vertical-sidebar-enable");
			});
		}
	});

	useEffect(() => {
		const updateSidebarCompactState = () => {
			const size =
				document.documentElement.getAttribute("data-sidebar-size") || "";
			setIsSidebarCompact(
				size === "sm" || size === "sm-hover" || size === "sm-hover-active",
			);
		};

		updateSidebarCompactState();
		const observer = new MutationObserver(updateSidebarCompactState);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-sidebar-size"],
		});
		return () => observer.disconnect();
	}, []);

	const addEventListenerOnSmHoverMenu = () => {
		// add listener Sidebar Hover icon on change layout from setting
		if (
			document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
		) {
			document.documentElement.setAttribute(
				"data-sidebar-size",
				"sm-hover-active",
			);
		} else if (
			document.documentElement.getAttribute("data-sidebar-size") ===
			"sm-hover-active"
		) {
			document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
		} else {
			document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
		}
	};

	return (
		<React.Fragment>
			<div
				className="app-menu navbar-menu d-flex flex-column justify-content-between"
				style={{ minHeight: "100vh" }}
			>
				<div className="navbar-brand-box">
					<Link to="/" className="logo logo-dark">
						<span className="logo-sm">
							<img
								src={smallLogo}
								alt=""
								height="22"
								style={{
									transform: "scale(1.8)",
									transformOrigin: "center center",
								}}
							/>
						</span>
						<span className="logo-lg">
							<img
								src={mainLogo}
								alt=""
								height="17"
								style={{
									transform: "scale(2.5)",
									transformOrigin: "center center",
								}}
							/>
						</span>
					</Link>

					<Link to="/" className="logo logo-light">
						<span className="logo-sm">
							<img
								src={smallLogo}
								alt=""
								height="22"
								style={{
									transform: "scale(1.8)",
									transformOrigin: "center center",
								}}
							/>
						</span>
						<span className="logo-lg">
							<img
								src={mainLogo}
								alt=""
								height="17"
								style={{
									transform: "scale(2.5)",
									transformOrigin: "center center",
								}}
							/>
						</span>
					</Link>
					<button
						onClick={addEventListenerOnSmHoverMenu}
						type="button"
						className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
						id="vertical-hover"
					>
						<i className="ri-record-circle-line"></i>
					</button>
				</div>
				{/* Vertical Layout Only */}
				<SimpleBar id="scrollbar" style={{ flex: "1 1 auto", minHeight: 0 }}>
					<Container fluid>
						<div id="two-column-menu"></div>
						<div className="d-flex flex-column" style={{ minHeight: "100%" }}>
							{/* small-screen menu header: visible only on small viewport widths */}
							<div className="d-block d-lg-none px-3 py-2">
								<div className="text-muted small">{t("Menu")}</div>
							</div>

							<ul className="navbar-nav flex-grow-1 pt-2" id="navbar-nav">
								{(
									[
										{
											to: "/dashboard",
											label: "Dashboard",
											icon: "ri-dashboard-line",
										},
										{ to: "/gallery", label: "Gallery", icon: "ri-image-line" },
										{
											to: "/investors",
											label: "Investors",
											icon: "ri-group-line",
										},
										{
											to: "/advance-ui-highlight",
											label: "Highlights",
											icon: "ri-star-line",
										},
										{
											to: "/apps-ecommerce-products",
											label: "Offers",
											icon: "ri-price-tag-3-line",
										},
										{ to: "/blog", label: "Blog", icon: "ri-file-text-line" },
										{ to: "/contact", label: "Contact", icon: "ri-mail-line" },
										{
											to: "/about-us",
											label: "About Us",
											icon: "ri-information-line",
										},
									] as { to: string; label: string; icon: string }[]
								).map((item) => (
									<li className="nav-item" key={item.to}>
										<Link
											className={`nav-link d-flex align-items-center`}
											to={item.to}
										>
											<i className={`${item.icon} fs-18`}></i>
											<span className="ms-2">{t(item.label)}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</Container>
				</SimpleBar>

				{/* sidebar bottom: language selector (kept outside the scroll area so it's always visible)
					Make it sticky to ensure it sits flush to the bottom of the visible sidebar. */}
				<div
					className={`border-top ${isSidebarCompact ? "p-2 d-flex justify-content-center" : "p-3"}`}
					style={{
						position: "sticky",
						bottom: 0,
						zIndex: 60,
						background: "var(--bs-body-bg, #fff)",
						width: "100%",
					}}
				>
					{!isSidebarCompact && (
						<div className="mb-2 small text-muted">{t("Language")}</div>
					)}
					<LanguageDropdown compact={isSidebarCompact} />
				</div>

				<div className="sidebar-background"></div>
			</div>
			<div className="vertical-overlay"></div>
		</React.Fragment>
	);
};

export default Sidebar;
