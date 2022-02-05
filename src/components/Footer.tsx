import {
  faEnvelope,
  faLink,
  faCodeBranch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

// https://css-tricks.com/couple-takes-sticky-footer/
export default function Footer() {
  return (
    <footer
      className="text-center text-lg-start text-dark footer"
    >
      <section className="">
        <div className="container text-center text-md-start mt-3">
          <div className="row mt-3">
            <div className="col-md-6 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Stockviewer</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto heading-underline"
              />
              <p>A simple app to review data about individual stock, mututal fund and ETF.</p>
              <p>Created by Huy Vuong.</p>
            </div>

            <div className="col-md-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Using</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
              />
              <p>
                <span className="text-dark">React</span>
              </p>
              <p>
                <span className="text-dark">React Router 6</span>
              </p>
              <p>
                <span className="text-dark">Bootstrap 5</span>
              </p>
              <p>
                <span className="text-dark">Redux</span>
              </p>
              <p>
                <span className="text-dark">yfinance API</span>
              </p>
            </div>

            <div className="col-md-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"

              />
              <p>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={"mailto: huyvuong0096@gmail.com"}
                >
                  Email me
                </a>
              </p>
              <p>
                <FontAwesomeIcon icon={faLink} />{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={"https://huycans.github.io/"}
                >
                  Personal site
                </a>
              </p>
              <p>
                <FontAwesomeIcon icon={faCodeBranch} />{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={"https://github.com/huycans"}
                >
                  Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
