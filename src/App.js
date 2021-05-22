import "./index.css";
import Logo from "./components/Logo";
import BackgroundElements from "./components/BackgroundElements/BackgroundElements";
import Links from "./components/Links";
import Modal from "./components/Modal/Modal";
import { useAppContext } from "./components/context";
import { useRef } from "react";

function App() {
  const { isModalShown } = useAppContext();
  const ref = useRef(false);

  const triggerAnimation = (e) => {
    e.preventDefault();
    if (!ref.current) {
      ref.current = true;
      var list = document.getElementsByClassName("rocket-images");
      list[0].classList.add("trigger-animation");
      setTimeout(() => {
        list[0].classList.remove("trigger-animation");
        ref.current = false;
      }, 6000);
    }
  };

  return (
    <>
      <BackgroundElements />
      <Logo />
      <div className="main-container">
        {isModalShown && <Modal />}
        <Links />
        <div className="rocket-container">
          <div className="illustration-container">
            <div className="rocket-images">
              <div className="illustration-img" id="smoke1"></div>
              <div className="illustration-img" id="rocket"></div>
              <div className="illustration-img" id="smoke2"></div>
            </div>
            <div className="planet-images">
              <div className="illustration-img" id="landing-gear"></div>
              <div className="planet-img"></div>
            </div>
          </div>
          <button className="btn" onClick={triggerAnimation}>
            Launch Rocket!
          </button>
        </div>
      </div>
      <footer>
        <div className="body-small">Copyright © Usertive & SpaceX API</div>
        <div className="body-small">Recruitment Task / Summer 2021</div>
      </footer>
    </>
  );
}

export default App;
