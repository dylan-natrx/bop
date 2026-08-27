/**
 * Fixed grain layer (#tex) and the shared SVG filter defs (#tb — the
 * thermal-bloom edge filter every display heading references). Server
 * component: pure markup, no interactivity, present with JS disabled.
 */
export default function Texture() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter
            id="tb"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology operator="dilate" radius="0.27" in="SourceGraphic" result="d" />
            <feGaussianBlur in="d" stdDeviation="0.54" result="b" />
            <feComponentTransfer in="b" result="w">
              <feFuncA type="linear" slope="1.9" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="w" operator="over" />
          </filter>
        </defs>
      </svg>
      <div id="tex" aria-hidden="true" />
    </>
  )
}
