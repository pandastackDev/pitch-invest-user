import React from "react";
import { Row, Col } from "reactstrap";
import type { GalleryItem } from "../../../types/gallery";
import GalleryCard from "./GalleryCard";

const GalleryGrid: React.FC<{ items: GalleryItem[] }> = ({ items }) => {
  return (
    <Row className="g-3 g-md-4">
      {items.map((item) => (
        <Col key={String(item.id)} xs={12} sm={6} lg={4} xl={3}>
          <GalleryCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default GalleryGrid;
