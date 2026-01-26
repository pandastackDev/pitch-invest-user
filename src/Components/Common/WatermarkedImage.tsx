import React from "react";
import smallLogo from "../../assets/images/main-logo/small-logo.png";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  watermarkSize?: number;
  /** Optional external watermark image (png/svg). If provided, used instead of the default inline SVG */
  watermarkSrc?: string;
  /** watermark opacity 0-1 */
  watermarkOpacity?: number;
}

// Icon-only % symbol inline SVG (icon-only, no text)
const iconSvg = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
  <g fill='none' stroke='none'>
    <rect width='120' height='120' fill='none' />
    <g transform='translate(10,10) scale(0.8)'>
      <path d='M8 100 L100 8' stroke='%23d4af37' stroke-width='10' stroke-linecap='round' />
      <circle cx='18' cy='18' r='14' fill='%23d4af37' />
      <text x='18' y='22' font-size='16' font-family='Arial' text-anchor='middle' fill='%230a1628' font-weight='700'>P</text>
      <circle cx='86' cy='86' r='14' fill='%23d4af37' />
      <text x='86' y='90' font-size='16' font-family='Arial' text-anchor='middle' fill='%230a1628' font-weight='700'>I</text>
    </g>
  </g>
</svg>
`);

const defaultWatermarkUrl = smallLogo || `data:image/svg+xml;utf8,${iconSvg}`;

const WatermarkedImage: React.FC<Props> = ({
  watermarkSize = 36,
  watermarkSrc,
  watermarkOpacity = 0.12,
  className,
  style,
  src,
  alt,
  ...rest
}) => {
  const wmUrl = watermarkSrc || defaultWatermarkUrl;

  return (
    <span
      className={`watermarked-container ${className || ""}`}
      style={{ display: "inline-block", position: "relative", ...style as any }}
    >
      <img src={src} alt={alt} {...(rest as any)} style={{ display: "block", width: "100%", height: "auto" }} />
      <span
        className="pi-watermark"
        style={{
          position: "absolute",
          right: 8,
          bottom: 8,
          width: watermarkSize,
          height: watermarkSize,
          backgroundImage: `url("${wmUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: watermarkOpacity,
          pointerEvents: "none",
        }}
      />
    </span>
  );
};

export default WatermarkedImage;
