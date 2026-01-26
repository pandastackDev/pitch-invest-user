import React from "react";
import { Row, Col } from "reactstrap";
import { ProfileCard } from "../ProfileCard";
import type { Project } from "../../types/profile";

type Props = {
    title: string;
    items: Project[];
};

export const HighlightBlock: React.FC<Props> = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">{title}</h5>
            </div>

            <div className="d-none d-md-block">
                <Row>
                    {items.map((it) => (
                        <Col md={6} lg={4} xl={4} key={it.id} className="mb-3">
                            <ProfileCard {...it} />
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="d-block d-md-none">
                <div className="horizontal-scroll d-flex gap-3 py-2" style={{ overflowX: "auto" }}>
                    {items.map((it) => (
                        <div key={it.id} style={{ minWidth: 280 }}>
                            <ProfileCard {...it} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightBlock;
