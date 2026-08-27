import GlossaryTrigger from './GlossaryTrigger'

/**
 * Fixed masthead: brand mark plus the glossary trigger. Server component;
 * only the trigger itself is a client island.
 */
export default function Masthead() {
  return (
    <div className="mast">
      <div className="brand">nccf.natrx.report</div>
      <GlossaryTrigger />
    </div>
  )
}
