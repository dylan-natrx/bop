import { CoastlineTest } from '@/app/projects/bop/components/hero/CoastlineTest'

export default function TestMapPage() {
  return (
    <main className="min-h-screen bg-[#061321]">
      <div className="max-w-[1200px] mx-auto p-8">
        <h1 className="text-white text-2xl mb-4 font-mono">Coastline Test</h1>
        <p className="text-gray-400 mb-8">
          Rendering NYC boroughs from nyc-boroughs.geojson + NJ from nj-shoreline.geojson
        </p>
        <div className="w-full aspect-[1100/900] border border-gray-700">
          <CoastlineTest />
        </div>
      </div>
    </main>
  )
}
