import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    );

    const nextCard = () => {
      if (byDateDesc) {
        setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
      }
    };

    const timer = setInterval(nextCard, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [data]);

  return (
    <div className="SlideCardList">
      {data?.focus?.map((event, idx) => (
        <React.Fragment key={`fragment-${event.date}`}>
          <div
            key={`card-${event.date}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {data?.focus?.map((singlevent, radioIdx) => (
                <input
                  key={`input-${singlevent.date}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
