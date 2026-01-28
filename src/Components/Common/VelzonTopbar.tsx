import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import logoSm from "../../assets/images/logo-sm.png";
import LanguageDropdown from "./LanguageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import SearchOption from "./SearchOption";
import { changeSidebarVisibility } from "../../slices/thunks";
import { useAuth } from "../../hooks/useAuth";
import { UnknownAction } from "redux";

interface TopbarProps {
  headerClass?: string;
}

const VelzonTopbar = ({ headerClass }: TopbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const selectDashboardData = createSelector(
    (state: any) => state.Layout,
    (layout: any) => layout.sidebarVisibilitytype,
  );

  const sidebarVisibilitytype = useSelector(selectDashboardData);
  const reduxLoginUser = useSelector((state: any) => state?.Login?.user);

  const [search, setSearch] = useState(false);
  const toogleSearch = () => setSearch(!search);

  const toogleMenuBtn = () => {
    const windowSize = document.documentElement.clientWidth;
    const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
    dispatch(changeSidebarVisibility("show") as unknown as UnknownAction);

    if (windowSize > 767) humberIcon?.classList.toggle("open");

    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }
  };

  const isAuthenticated = useMemo(() => {
    if (user) return true;

    const hasReduxToken =
      reduxLoginUser &&
      typeof reduxLoginUser === "object" &&
      !!(reduxLoginUser.token || reduxLoginUser.accessToken);
    if (hasReduxToken) return true;

    if (typeof window === "undefined") return false;

    const rawAuthUser = sessionStorage.getItem("authUser");
    if (!rawAuthUser || rawAuthUser === "null" || rawAuthUser === "{}") return false;

    try {
      const parsed = JSON.parse(rawAuthUser) as { token?: string; accessToken?: string };
      return !!(parsed?.token || parsed?.accessToken);
    } catch {
      return false;
    }
  }, [reduxLoginUser, user]);

  return (
    <header id="page-topbar" className={headerClass}>
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box horizontal-logo">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="17" />
                </span>
              </Link>
            </div>

            <button
              onClick={toogleMenuBtn}
              type="button"
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              id="topnav-hamburger-icon"
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            <SearchOption />
          </div>

          <div className="d-flex align-items-center">
            <Dropdown
              isOpen={search}
              toggle={toogleSearch}
              className="d-md-none topbar-head-dropdown header-item"
            >
              <DropdownToggle
                type="button"
                tag="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              >
                <i className="bx bx-search fs-22"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                <Form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Search"
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify"></i>
                      </button>
                    </div>
                  </div>
                </Form>
              </DropdownMenu>
            </Dropdown>

            <LanguageDropdown />

            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                <ProfileDropdown />
              </>
            ) : authLoading ? null : (
              <div className="d-flex align-items-center gap-2 ms-2">
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-ghost-primary rounded-pill px-3"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-primary rounded-pill px-3"
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VelzonTopbar;
