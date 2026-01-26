import React from "react";
import { Input, Button } from "reactstrap";

const GalleryToolbar: React.FC<{ search?: string; onSearch?: (v: string) => void }> = ({ search = "", onSearch }) => {
  return (
    <div className="mb-4 d-flex flex-wrap gap-2 align-items-center">
      <div className="position-relative flex-grow-1" style={{ maxWidth: 600 }}>
        <i className="ri-search-line position-absolute" style={{ left: 12, top: 12 }}></i>
        <Input
          value={search}
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder="Search projects..."
          className="ps-4"
        />
      </div>
      <Button color="outline-secondary" onClick={() => onSearch?.("")}>Reset</Button>
    </div>
  );
};

export default GalleryToolbar;
