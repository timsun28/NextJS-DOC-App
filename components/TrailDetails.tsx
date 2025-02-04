import Link from "next/link";
import { DOCTrail } from "../types/trails";

interface TrailDetailsProps {
    trail: DOCTrail | null;
}

export default function TrailDetails({ trail }: TrailDetailsProps) {
    if (!trail) {
        return (
            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md md:w-1/2 md:my-0 md:max-w-lg">
                <h5>Select a trail for more details</h5>
            </div>
        );
    }

    return (
        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md md:w-1/2 md:my-0 md:max-w-lg">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{trail.name}</h5>
            <ul>
                <li>
                    <span className="font-bold">Region:</span> {trail.region}
                </li>
                <li>
                    <span className="font-bold">Location:</span> {trail.locationString}
                </li>
                <li>
                    <span className="font-bold">Walk Duration:</span> {trail.walkDuration}
                </li>
                <li>
                    <span className="font-bold">Difficulty:</span> {trail.walkTrackCategory.join(", ")}
                </li>
                <li>
                    <span className="font-bold">Distance:</span> {trail.distance ?? "Unknown"}
                </li>
                <li>
                    <Link
                        className="font-bold text-blue-600 underline"
                        href={`https://www.google.com/maps/search/?api=1&query=${trail.lat},${trail.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Find on Google Maps
                    </Link>
                </li>
                <li>
                    <Link
                        className="font-bold text-blue-600 underline"
                        href={trail.staticLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        DOC Site
                    </Link>
                </li>
            </ul>
            <p className="font-normal text-gray-700">{trail.introduction}</p>
        </div>
    );
}
