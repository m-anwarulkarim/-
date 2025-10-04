import { useEffect, useState } from "react";
import "./A10Aircraft.css";

const A10Aircraft = ({
  // backgroundImage = "./images/blue-sky.jpg",
  // showDefaultBackground = false,
  backgroundImage = false,
  showDefaultBackground = true,
  instituteName = "দারুল ইহসান",
  instituteSubtitle = "ইসলামিক শিক্ষা প্রতিষ্ঠান",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 2000);
    }, 15000); // প্রতি 15 সেকেন্ডে রিপিট

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="aircraft-container">
      {/* কাস্টম ব্যাকগ্রাউন্ড ইমেজ */}
      {backgroundImage && (
        <div
          className="custom-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}

      {/* ডিফল্ট ব্যাকগ্রাউন্ড */}
      {showDefaultBackground && !backgroundImage && (
        <div className="sky-background">
          <div className="gradient-overlay"></div>
          <div className="sun"></div>
          <div className="mountains"></div>

          {/* নড়াচড়াকারী মেঘ */}
          <div className="moving-clouds">
            <div className="cloud cloud1">
              <div className="cloud-part part1"></div>
              <div className="cloud-part part2"></div>
              <div className="cloud-part part3"></div>
            </div>
            <div className="cloud cloud2">
              <div className="cloud-part part1"></div>
              <div className="cloud-part part2"></div>
              <div className="cloud-part part3"></div>
            </div>
            <div className="cloud cloud3">
              <div className="cloud-part part1"></div>
              <div className="cloud-part part2"></div>
              <div className="cloud-part part3"></div>
            </div>
            <div className="cloud cloud4">
              <div className="cloud-part part1"></div>
              <div className="cloud-part part2"></div>
              <div className="cloud-part part3"></div>
            </div>
            <div className="cloud cloud5">
              <div className="cloud-part part1"></div>
              <div className="cloud-part part2"></div>
            </div>
          </div>
        </div>
      )}

      {/* ইনস্টিটিউট নাম */}
      <div className="institute-name">
        <h1>{instituteName}</h1>
        <p>{instituteSubtitle}</p>
      </div>

      {/* A-10 Thunderbolt II */}
      {isVisible && (
        <div className="a10-aircraft">
          {/* প্রধান ফিউজেলেজ */}
          <div className="fuselage">
            <div className="nose-cone"></div>
            <div className="cockpit">
              <div className="cockpit-glass"></div>
            </div>
            <div className="main-body"></div>
          </div>

          {/* প্রধান ডানা */}
          <div className="main-wings">
            <div className="wing-left"></div>
            <div className="wing-right"></div>
          </div>

          {/* ইঞ্জিন */}
          <div className="engines">
            <div className="engine-left">
              <div className="engine-intake"></div>
              <div className="engine-body"></div>
              <div className="engine-exhaust"></div>
            </div>
            <div className="engine-right">
              <div className="engine-intake"></div>
              <div className="engine-body"></div>
              <div className="engine-exhaust"></div>
            </div>
          </div>

          {/* লেজ */}
          <div className="tail-section">
            <div className="vertical-stabilizer-left"></div>
            <div className="vertical-stabilizer-right"></div>
            <div className="horizontal-stabilizer"></div>
          </div>

          {/* GAU-8 কামান */}
          <div className="gau8-cannon"></div>

          {/* ল্যান্ডিং গিয়ার */}
          <div className="landing-gear">
            <div className="gear-main-left"></div>
            <div className="gear-main-right"></div>
            <div className="gear-nose"></div>
          </div>

          {/* মিসাইল ও ওয়েপন */}
          <div className="weapons">
            <div className="missile missile1"></div>
            <div className="missile missile2"></div>
            <div className="fuel-tank fuel-tank1"></div>
            <div className="fuel-tank fuel-tank2"></div>
          </div>

          {/* ইঞ্জিন ইফেক্ট */}
          <div className="engine-effects">
            <div className="exhaust-flame exhaust-left"></div>
            <div className="exhaust-flame exhaust-right"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default A10Aircraft;
