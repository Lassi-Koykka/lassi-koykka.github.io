import React from "react";
import Emoji from "./Emoji";
import Tech from "./Tech";

import "./styles/Tools.css"
import "./styles/Projects.css"

export default function () {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef<HTMLHeadingElement>(null);
  
    React.useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          
          // In your case there's only one element to observe:     
          if (entry.isIntersecting) {
            
            // Not possible to set it back to false like this:
            setVisible(true);
            
            // No need to keep observing:
            if(domRef.current !== null){
              observer.unobserve(domRef.current);
            }
          }
        });
      });
        if(domRef.current !== null){
          observer.observe(domRef.current);
        }
    }, []);

  return (
    <div className={`toolsContainer fade-in-projects ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
      <h3 className="toolsHeader">
        <Emoji symbol="🧰" label="Toolbox" /> My toolbox
      </h3>
      <div className="toolLists">
        <div className="toolSection">
          <h2 className="toolListHeader">Front-end</h2>
          <ul className="toolList">
            <Tech name="HTML5" img="/img/html5.png" alt="HTML5" />
            <Tech name="CSS3" img="/img/css.png" alt="CSS3" />
            <Tech name="JavaScript" img="/img/js-logo2.png" alt="JS" />
            <Tech name="React.js" img="/img/react.png" alt="React.js" />

          </ul>
        </div>
        <div className="toolSection">
          <h2 className="toolListHeader">Back-end</h2>
          <ul className="toolList">
            <Tech name="Flask" img="/img/flask.png" alt="Flask" />
            <Tech name="Node.js" img="/img/node.png" alt="Node.js" />
            <Tech name="MySQL" img="/img/mysql-logo.png" alt="MySql" />
            <Tech name="SQLite" img="/img/sqlite.png" alt="SQLite" />
          </ul>
        </div>
        <div className="toolSection">
          <h2 className="toolListHeader">Other</h2>
          <ul className="toolList">
            <Tech name="C#" img="/img/CSharp.png" alt="C#" />
            <Tech name="C" img="/img/clang.png" alt="C" />
            <Tech name="Java" img="/img/java.png" alt="Java" />
            <Tech name="Python" img="/img/python.png" alt="python" />
            <Tech name="Linux" img="/img/tux.png" alt="Linux" />
          </ul>
        </div>
      </div>
    </div>
  );
}
