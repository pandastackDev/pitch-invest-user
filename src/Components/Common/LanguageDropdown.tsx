import { get } from "lodash";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";
import languages from "../../common/languages";
//i18n
import i18n from "../../i18n";

type Props = {
	compact?: boolean;
};

const LanguageDropdown = ({ compact = true }: Props) => {
	// Declare a new state variable, which we'll call "menu"
	const [selectedLang, setSelectedLang] = useState("");
	const selectedEnglish = (get(languages, `${selectedLang}.label`) as string) || "English";
	const selectedNative = (get(languages, `${selectedLang}.nativeName`) as string) || selectedEnglish;

	// Map detected region/language to our language keys
	const mapRegionToKey = (region?: string, lang?: string) => {
		if (!region && !lang) return "en";
		const r = (region || "").toUpperCase();
		const l = (lang || "").toLowerCase();
		if (r === "BR") return "br";
		if (r === "JP") return "jp";
		if (r === "IL") return "il";
		if (r === "KR") return "kr";
		if (r === "DE") return "gr";
		if (r === "FR") return "fr";
		if (["AE", "SA", "EG", "DZ", "MA", "KW", "QA", "BH", "OM"].includes(r)) return "ar";
		if (r === "CN") return "cn";
		if (r === "ES") return "sp";
		if (r === "IT") return "it";
		if (r === "RU") return "rs";
		if (l.startsWith("pt")) return "br";
		if (l.startsWith("ja")) return "jp";
		if (l.startsWith("he")) return "il";
		if (l.startsWith("ko")) return "kr";
		if (l.startsWith("zh")) return "cn";
		if (l.startsWith("es")) return "sp";
		if (l.startsWith("de")) return "gr";
		if (l.startsWith("fr")) return "fr";
		return "en";
	};

	useEffect(() => {
		const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
		if (currentLanguage) {
			setSelectedLang(currentLanguage);
			return;
		}
		// detect locale for first-visit default (preselect only)
		let resolved = "en";
		if (typeof navigator !== "undefined") {
			resolved = navigator.language || (navigator as any).userLanguage || "en";
		} else if (typeof Intl !== "undefined") {
			resolved = Intl?.DateTimeFormat?.().resolvedOptions()?.locale || "en";
		}
		const parts = resolved.split("-");
		const detected = mapRegionToKey(parts[1], parts[0]);
		setSelectedLang(detected);
	}, []);

	// Keep local selectedLang in sync when i18n language changes elsewhere
	useEffect(() => {
		const handleChange = (lng: string) => setSelectedLang(lng);
		i18n.on && i18n.on("languageChanged", handleChange);
		return () => {
			if (i18n.off) i18n.off("languageChanged", handleChange);
		};
	}, []);

	const changeLanguageAction = (lang: string) => {
		//set language as i18n
		i18n.changeLanguage(lang);
		localStorage.setItem("I18N_LANGUAGE", lang);
		setSelectedLang(lang);
	};

	const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
	const toggleLanguageDropdown = () => {
		setIsLanguageDropdown(!isLanguageDropdown);
	};
	return (
		<Dropdown
			isOpen={isLanguageDropdown}
			toggle={toggleLanguageDropdown}
			className={compact ? "ms-1 topbar-head-dropdown header-item" : "w-100"}
		>
			{compact ? (
				<DropdownToggle
					className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
					tag="button"
				>
					{get(languages, `${selectedLang}.icon`) ? (
						<img
							src={(get(languages, `${selectedLang}.icon`) as string)}
							alt={selectedNative}
							height={20}
							className="rounded"
						/>
					) : (
						<ReactCountryFlag
							countryCode={(get(languages, `${selectedLang}.countryCode`) as string) || "US"}
							svg
							style={{ width: "20px", height: "14px", borderRadius: 2 }}
							title={selectedEnglish}
						/>
					)}
				</DropdownToggle>
			) : (
				<DropdownToggle
					className="btn btn-light d-flex align-items-center justify-content-between w-100"
					tag="button"
				>
					<div className="d-flex align-items-center gap-2">
						<span className="me-2 d-flex align-items-center">
							{get(languages, `${selectedLang}.icon`) ? (
								<img
									src={(get(languages, `${selectedLang}.icon`) as string)}
									alt={selectedNative}
									height={20}
									className="rounded"
								/>
							) : (
								<ReactCountryFlag
									countryCode={(get(languages, `${selectedLang}.countryCode`) as string) || "US"}
									svg
									style={{ width: "20px", height: "14px", borderRadius: 2 }}
									title={selectedEnglish}
								/>
							)}
						</span>
						<div className="d-flex flex-column">
							<span className="text-start">{selectedEnglish}</span>
							<small className="text-muted">{selectedNative}</small>
						</div>
					</div>
					<i className="ri-arrow-down-s-line"></i>
				</DropdownToggle>
			)}

			<DropdownMenu
				className={`notify-item language py-2 ${compact ? "" : "w-100"}`}
				style={compact ? undefined : { minWidth: "unset", width: "100%" }}
			>
				{Object.keys(languages).map((key) => {
					const country = get(languages, `${key}.countryCode`) as string;
					const eng = (get(languages, `${key}.label`) as string) || key;
					const native = (get(languages, `${key}.nativeName`) as string) || eng;
					const icon = get(languages, `${key}.icon`) as string | undefined;
					return (
						<DropdownItem
							key={key}
							onClick={() => changeLanguageAction(key)}
							className={`notify-item ${selectedLang === key ? "active" : ""}`}
						>
							<div className="d-flex align-items-center">
								<span className="me-2 d-flex align-items-center">
									{icon ? (
										<img
											src={icon}
											alt={native}
											className="rounded"
											height={18}
										/>
									) : (
										<ReactCountryFlag
											countryCode={country || "US"}
											svg
											style={{ width: "18px", height: "13px", borderRadius: 2 }}
											title={eng}
										/>
									)}
								</span>
								<div className="d-flex flex-column">
									<span className="align-middle">{eng}</span>
									<small className="text-muted">{native}</small>
								</div>
							</div>
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

export default LanguageDropdown;
