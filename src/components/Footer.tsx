import React from "react";

// https://css-tricks.com/couple-takes-sticky-footer/
export default function Footer() {
  return (
    <footer className="footer">
      <div className="col-6 text-center">
        <h3>Stockviewer App</h3>
        <h6>Made by Huy Vuong</h6>
        </div>
      <div className="col-6 text-center">
        <h3>Using</h3>
        <ul className="tech-used">
          <li>React</li>
          <li>Redux</li>
          <li>Bootstrap</li>
        </ul>
      </div>
    </footer>
  );
}
