import classNames from "classnames";
import React, { Children, cloneElement, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { createContext } from "react";
import styled from "styled-components";

const Context = createContext({ activeAccordion: -1 });

const ContentWrap = styled.div`
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`;

export const Accordion = ({ date, title, children, index }) => {
  const { onActive, activeAccordion } = useContext(Context);

  const [contentHeight, setContentHeight] = useState(0);

  const active = activeAccordion === index;

  const _onClick = () => {
    onActive(index);
  };
  const contentRef = useRef();

  useEffect(() => {
    setContentHeight(contentRef?.current?.scrollHeight);
  }, [active]);
  return (
    <div className={classNames("accordion h-auto select-none", { active })}>
      <div className="accordion__title" onClick={_onClick}>
        {date && <div className="date">Ngày {date}</div>}

        <h3>{title}</h3>
      </div>

      <ContentWrap
        ref={contentRef}
        style={{ height: active ? contentHeight : 0 }}
      >
        <div
          className="content !block"
          dangerouslySetInnerHTML={{ __html: children }}
        ></div>
      </ContentWrap>
    </div>
  );
};

Accordion.Group = ({ children }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  const onActive = (index) => {
    setActiveAccordion(activeAccordion !== index ? index : -1);
  };
  const values = {
    onActive,
    activeAccordion,
  };
  return (
    <Context.Provider value={values}>
      {Children.map(children, (child, index) => cloneElement(child, { index }))}
    </Context.Provider>
  );
};

// const Accordion2 = ({ date, title, children, onClick, active }) => {
//   return (
//     <div className="accordion">
//       <div className="accordion__title" onClick={onClick}>
//         {date && <div className="date">Ngày {date}</div>}
//         <h3>{title}</h3>
//       </div>
//       {active && (
//         <div
//           className="content !block"
//           //nếu có js sẽ ko sử dụng được
//           dangerouslySetInnerHTML={{ __html: children }}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Accordion2;
