import React from "react";
import { Link, NavLink } from "react-router-dom";
import stockviewerLogo from "../assets/img/stockviewer.png";
import RoundedButton from "./RoundedButton";

type HeaderRoundedButtonLinkType = {
  to: string;
  textColor?: string;
  children: any;
};

const HeaderRoundedButtonLink = ({
  to,
  textColor,
  children
}: HeaderRoundedButtonLinkType) => {
  return (
    <RoundedButton>
      <NavLink
        className={"header-link"}
        style={{ color: textColor ? textColor : "white" }}
        to={to}
      >
        {children}
      </NavLink>
    </RoundedButton>
  );
};

export default function Header() {
  return (
    <header className="container-fluid">
      <div className="row header">
        <div className="col-1"></div>
        <div className="col-5 header-title">
          <Link to={"/"}>
            <img
              id="stockviewerLogo"
              src={stockviewerLogo}
              alt="Stockviewer logo"
            />
          </Link>
        </div>
        <div className="col-3">
          <HeaderRoundedButtonLink to={"/research"}>
            <h5>Research a security</h5>
          </HeaderRoundedButtonLink>
        </div>
        <div className="col-3">
          <HeaderRoundedButtonLink to={"/compare"}>
            <h5>Compare funds</h5>
          </HeaderRoundedButtonLink>
        </div>
      </div>
    </header>
  );
}
