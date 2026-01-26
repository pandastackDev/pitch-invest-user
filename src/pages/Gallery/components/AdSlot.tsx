import React from "react";

const AdSlot: React.FC<{ position?: string }> = ({ position = "top" }) => {
  return (
    <div className="adslot mb-4">
      <div className="card">
        <div className="card-body p-0">
          <img src="/assets/ad-placeholder.png" alt={`Ad ${position}`} style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default AdSlot;
