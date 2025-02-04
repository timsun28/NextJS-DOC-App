import trailsData from "../../../data/doc_tracks.json";
import type { DOCTrail } from "../../../types/trails";
import TrailDetails from "../../../components/TrailDetails";

interface Props {
    params: Promise<{ trailId: string }>;
}

export default async function TrailPage({ params }: Props) {
    // Await the params object before accessing trailId
    const { trailId } = await params;

    const trail = (trailsData as DOCTrail[]).find((t) => t.assetId === trailId);

    if (!trail) {
        return <div>Trail not found</div>;
    }

    return <TrailDetails trail={trail} />;
}

// Generate static params for all trails
export async function generateStaticParams() {
    const trails = trailsData as DOCTrail[];
    return trails.map((trail) => ({
        trailId: trail.assetId,
    }));
}
