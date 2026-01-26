import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import type { GalleryItem } from "../../../types/gallery";

const truncate = (s = "", n = 60) => (s.length > n ? s.slice(0, n) + "…" : s);

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  const short = truncate(item.description || "", 60);
  const idStr = String(item.id);
  return (
    <article className="card h-100">
      <Link to={`/gallery/${idStr}`} className="d-block">
        <img
          src={item.imageUrl ?? "/assets/default-cover.png"}
          alt={item.title}
          className="card-img-top img-fluid"
          style={{ objectFit: "cover", height: 180 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1">{item.title}</h6>
        <p className="text-muted small mb-3">{short}</p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="btn-group" role="group" aria-label="card actions">
            <Button color="light" outline size="sm" aria-label="Like" className="me-1">
              <i className="ri-heart-line"></i>
            </Button>
            <Button color="light" outline size="sm" aria-label="Share">
              <i className="ri-share-line"></i>
            </Button>
          </div>
          <Button
            tag={Link}
            to={`/gallery/${idStr}`}
            color="primary"
            size="sm"
            className="rounded-pill px-3"
            aria-label="Info"
          >
            Info
          </Button>
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;
