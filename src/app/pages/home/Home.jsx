import { useEffect, useState } from "react";

import { URI } from "@constants/api";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";
import Footer from "../../components/footer/Footer";

export default function Home() {
  const [lastItems, setLastItems] = useState([]);
  const [largeCollections, setLargeCollections] = useState([]);

  useEffect(() => {
    axios.get(URI + "item").then((response) => {
      setLastItems(response.data);
    });
    axios.get(URI + "collection/byitemCount/largest").then((response) => {
      setLargeCollections(response.data);
    });
  }, []);

  return (
    <>
      <div className="row mt-4">
        <div className="col card p-3 m-1 home__card">
          <h5 className="pb-1">Last added items</h5>
          {lastItems.map((item, key) => (
            <ul key={key} className="home">
              <li>
                <Link to={`item/${item.id}`}>{item.name}</Link>
                <div className="text-muted small">
                  {item.createdAt.slice(0, 10)}
                </div>
              </li>
            </ul>
          ))}
        </div>

        <div className="col card p-3 m-1 home__card">
          <h5 className="pb-1">Largest collections</h5>
          {largeCollections.map((col, key) => (
            <ul key={key} className="home">
              <li>
                <Link to={`collection/${col.id}`}>{col.title}</Link>
                <div className="text-muted small">{col.itemCount} items</div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
