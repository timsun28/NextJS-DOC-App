import { Suspense } from "react";
import TrailsGrid from "../../components/TrailsGrid";
import trailsData from "../../data/doc_tracks.json";
import type { DOCTrail } from "../../types/trails";

async function getTrails(): Promise<DOCTrail[]> {
    return trailsData as DOCTrail[];
}

export default async function TrailsLayout({ children }: { children: React.ReactNode }) {
    const trails = await getTrails();

    return (
        <main className="relative flex flex-col-reverse min-h-screen gap-4 p-4 md:h-screen md:flex-row">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grow w-full md:w-2/3">
                    <TrailsGrid trails={trails} />
                </div>
            </Suspense>
            {children}
        </main>
    );
}
