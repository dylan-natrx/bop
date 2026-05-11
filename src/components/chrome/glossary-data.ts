export interface GlossaryEntry {
  /** Stable identifier used by <GlossaryTerm termId="..."/> to scroll the drawer to this entry. Lowercase, kebab-case. */
  id: string
  term: string
  definition: string
}

/**
 * Plain-language definitions for the terms that travel through the piece.
 *
 * Drawn from the BOP Master Document and the Natrx project overview. Phrasing
 * intentionally lay; these are not the scientific definitions.
 *
 * Sort order is alphabetical by term so readers browsing the drawer can scan
 * top-to-bottom. Inline <GlossaryTerm> usage from body copy opens the drawer
 * scrolled to the specific term via the `id` below.
 */
export const GLOSSARY: GlossaryEntry[] = [
  {
    id: 'algal-bloom',
    term: 'Algal bloom',
    definition:
      'A rapid, dense growth of algae in a water body, usually triggered by an oversupply of nutrients (see Eutrophication). Blooms cloud the water while they grow, then crash dissolved oxygen as they decompose. Some species also release toxins. A leading cause of hypoxia in coastal estuaries.',
  },
  {
    id: 'allee-effect',
    term: 'Allee effect',
    definition:
      "An ecological threshold below which a population cannot reproduce fast enough to sustain itself. Below a critical density, sparse spawning oysters cannot fertilize one another's gametes successfully and the population collapses. The Allee effect is why BOP's goal is set at one billion oysters: density matters as much as count.",
  },
  {
    id: 'bathymetry',
    term: 'Bathymetry',
    definition:
      'The underwater topography of a water body: depths, slopes, channels. Bathymetric data tells you whether a site has the right depth profile for oyster reef construction.',
  },
  {
    id: 'chlorophyll-a',
    term: 'Chlorophyll-a',
    definition:
      'A pigment found in microscopic algae (phytoplankton), used as a proxy for how much food is in the water. Oysters filter and eat phytoplankton, so adequate chlorophyll-a indicates an adequate food supply. Too much is a sign of eutrophication.',
  },
  {
    id: 'composite-score',
    term: 'Composite score and DO-modifier',
    definition:
      "A site's overall suitability number. Built from salinity and chlorophyll-a averaged together, then multiplied by the dissolved oxygen score. The DO score acts as a multiplier because hypoxia is a hard ecological constraint, not just one factor among many.",
  },
  {
    id: 'confidence-interval',
    term: 'Confidence interval',
    definition:
      'A range that captures the likely true value of a measurement, given a limited sample. Wider intervals mean less confidence in the estimate. The framework reports confidence intervals for each water quality variable to make uncertainty legible.',
  },
  {
    id: 'cso',
    term: 'CSO (Combined Sewer Overflow)',
    definition:
      'An outfall pipe where stormwater and sewage share a single drainage system and discharge together to a waterway during heavy rain. Proximity to a CSO can spike bacterial contamination at a restoration site after storms.',
  },
  {
    id: 'dissolved-oxygen',
    term: 'Dissolved oxygen',
    definition:
      'The amount of oxygen dissolved in water, the supply oysters and other marine animals draw on to breathe. Measured in milligrams per liter. Below roughly 3 mg/L, conditions tip into hypoxia and most marine life struggles.',
  },
  {
    id: 'eastern-oyster',
    term: 'Eastern oyster (Crassostrea virginica)',
    definition:
      'The native oyster species of the East Coast of North America. Filters water as it feeds, builds reef structure with its shells, and supports a wide range of estuary species. The keystone species at the center of the Billion Oyster Project restoration work.',
  },
  {
    id: 'estuary',
    term: 'Estuary',
    definition:
      'A coastal water body where freshwater rivers meet saltwater ocean. The mixing produces brackish water and exceptionally productive habitat. New York Harbor is one of the largest estuaries on the East Coast of the United States.',
  },
  {
    id: 'eutrophication',
    term: 'Eutrophication',
    definition:
      'An overload of nutrients, usually from runoff or wastewater, that triggers excessive algae growth in a water body. As the resulting algal blooms die off and decompose, they pull oxygen out of the water and can suffocate the same animals (oysters included) the blooms initially fed. The danger zone at the high end of the chlorophyll-a curve.',
  },
  {
    id: 'fetch-limited-wave-modeling',
    term: 'Fetch-limited wave modeling',
    definition:
      'A method for predicting wave energy at a location based on wind speed, wind direction, and the unobstructed water distance (fetch) over which the wind blows. Source for the wave-exposure flag on each candidate site.',
  },
  {
    id: 'filter-feeder',
    term: 'Filter feeder',
    definition:
      'An animal that eats by straining suspended particles out of the surrounding water, rather than by hunting or grazing. Eastern oysters draw water across their gills as they breathe, retaining phytoplankton and other small food particles. A single adult filters around fifty gallons a day, which is why oyster reefs improve water clarity at the scale of an entire estuary.',
  },
  {
    id: 'habitat-suitability-index',
    term: 'Habitat Suitability Index',
    definition:
      'A traditional method for mapping habitat suitability that requires spatially continuous data for every input variable. Often impractical in urban estuaries, where public data has structural gaps. The Natrx framework uses a relative ranking approach instead.',
  },
  {
    id: 'hypoxia',
    term: 'Hypoxia',
    definition:
      'Oxygen depletion in water, conventionally defined as dissolved oxygen below 3 milligrams per liter. Below this threshold most marine animals struggle to survive. In New York Harbor, hypoxia is a recurring summer condition driven by warm water, runoff, and the decay of algal blooms. Persistent hypoxia rules a site out for oyster restoration.',
  },
  {
    id: 'keystone-species',
    term: 'Keystone species',
    definition:
      'A species whose presence disproportionately shapes its ecosystem. Oysters are keystone in estuaries because they filter water, build reef habitat that supports other species, and stabilize shorelines against wave energy.',
  },
  {
    id: 'ms4',
    term: 'MS4 (Municipal Separate Storm Sewer System)',
    definition:
      'A stormwater drainage outfall that does not mix with sewage. Less acute than a CSO but still a contamination vector during storm events.',
  },
  {
    id: 'naip-imagery',
    term: 'NAIP imagery',
    definition:
      'National Agriculture Imagery Program. A federal program that captures one-meter-resolution aerial photography of the continental United States roughly every two to three years. The base imagery for the MEIP shoreline analysis.',
  },
  {
    id: 'natural-breakwater',
    term: 'Natural breakwater',
    definition:
      'A living structure that absorbs and dissipates incoming wave energy before it reaches shore, the ecological counterpart to a concrete or stone breakwater. Mature oyster reefs slow erosion of marsh edges and protect adjacent shorelines. The co-benefit pattern the methodology surfaces in step 5: sites with both strong water quality and active erosion are sites where a single intervention delivers two outcomes.',
  },
  {
    id: 'salinity',
    term: 'Salinity (PSU)',
    definition:
      'The concentration of dissolved salts in water. Measured in practical salinity units (PSU); the open ocean averages around 35 PSU, fresh water is near 0. Eastern oysters thrive in brackish conditions, roughly 10 to 25 PSU.',
  },
  {
    id: 'meip',
    term: 'Shoreline change analysis (MEIP)',
    definition:
      'Marsh Edge from Image Processing. A technique that traces the moving edge of marsh vegetation across multiple years of satellite imagery to measure erosion rates at roughly one-meter resolution.',
  },
  {
    id: 'spat',
    term: 'Spat',
    definition:
      'A young, newly-settled oyster. After a free-swimming larval phase, oysters settle onto hard substrate and become spat. Spat grow into the adult oysters that anchor a reef.',
  },
  {
    id: 'subtidal-intertidal',
    term: 'Subtidal vs. intertidal',
    definition:
      'Subtidal: always submerged. Intertidal: exposed at low tide and covered at high tide. Oyster restoration in New York Harbor focuses on subtidal sites where reefs stay continuously underwater.',
  },
]
