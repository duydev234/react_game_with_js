import React, { useMemo, useRef, useState } from "react";

import styles from "./app.module.css";
import classNames from "classnames";

const App = () => {
  const [duration, setDuration] = useState(0);
  const [numPoint, setNumPoint] = useState("");
  const [status, setStatus] = useState("LET_PLAY");

  const timerRef = useRef();
  const areaRef = useRef();
  const pointIdxClicked = useRef();
  const pointsRef = useRef();

  const durationFormat = useMemo(() => {
    const msToSecond = duration / 10;
    if (Number.isInteger(msToSecond)) {
      return `${msToSecond}.0s`;
    }

    return `${msToSecond}s`;
  }, [duration]);

  const onStart = () => {
    if (!numPoint) return;

    setStatus("LET_PLAY");
    pointIdxClicked.current = undefined;

    // clear prev interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setDuration(0);
    }

    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 100);

    // generate point
    handleGeneratePoint();
  };

  const handleGeneratePoint = () => {
    const pointWidth = 36;
    const pointHeight = 36;

    const maxTop = areaRef.current.clientHeight - pointHeight;
    const maxLeft = areaRef.current.clientWidth - pointWidth;

    const pointsElm = Array.from({ length: numPoint }).map((_, index) => {
      const randTop = Math.floor(Math.random() * maxTop);
      const randLeft = Math.floor(Math.random() * maxLeft);

      return (
        <div
          key={index}
          className={styles.point}
          style={{
            top: randTop,
            left: randLeft,
            zIndex: numPoint - index,
          }}
          onClick={() => onPointClick(index)}
        >
          {index + 1}
        </div>
      );
    });

    pointsRef.current = pointsElm;
  };

  const onPointClick = (index) => {
    let expectId = 0;
    if (typeof pointIdxClicked.current !== "undefined") {
      expectId = pointIdxClicked.current + 1;
    }

    if (expectId !== index) {
      clearInterval(timerRef.current);
      pointIdxClicked.current = undefined;
      setStatus("GAME_OVER");
      return;
    }

    pointIdxClicked.current = index;

    const newPoints = pointsRef.current.map((it, idx) => {
      if (idx === index) {
        return React.cloneElement(it, {
          className: classNames(styles.point, styles.active),
        });
      }

      return it;
    });
    pointsRef.current = newPoints;

    if (index === pointsRef.current.length - 1) {
      setTimeout(() => {
        clearInterval(timerRef.current);
        pointIdxClicked.current = undefined;
        setStatus("ALL_CLEARED");
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h1
        className={classNames(styles.title, {
          [styles.allCleared]: status === "ALL_CLEARED",
          [styles.gameOver]: status === "GAME_OVER",
        })}
      >
        {status === "LET_PLAY" && "Let's play"}
        {status === "ALL_CLEARED" && "All cleared"}
        {status === "GAME_OVER" && "Game over"}
      </h1>

      <table>
        <tbody>
          <tr>
            <td>Points</td>
            <td>
              <input
                value={numPoint}
                type="number"
                onChange={(e) => setNumPoint(+e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>Time:</td>
            <td>{durationFormat}</td>
          </tr>
        </tbody>
      </table>

      <button className={styles.playBtn} onClick={onStart}>
        {pointsRef.current ? "Restart" : "Play"}
      </button>

      <div className={styles.area} ref={areaRef}>
        {pointsRef.current}
      </div>
    </div>
  );
};

export default App;
