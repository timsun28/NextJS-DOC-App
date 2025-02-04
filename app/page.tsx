"use client";

import { useMemo, useState } from "react";

import trailsData from "../data/doc_tracks.json";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

interface DOCTrail {
    assetId: string;
    name: string;
    introduction: string;
    introductionThumbnail: string;
    permittedActivities: string[];
    distance: number | null;
    walkDuration: string;
    walkDurationCategory: string[];
    walkTrackCategory: string[];
    wheelchairsAndBuggies: boolean | null;
    mtbDuration: string | null;
    mtbDurationCategory: string[];
    mtbTrackCategory: string[];
    kayakingDuration: string | null;
    dogsAllowed: string;
    locationString: string;
    locationArray: string[];
    region: string[];
    staticLink: string;
    lon: number;
    lat: number;
}

const Home = () => {
    const [selectedTrail, setSelectedTrail] = useState<DOCTrail>();
    const [columnDefs] = useState([
        {
            field: "name",
            filter: true,
        },
        {
            field: "region",
            filter: true,
        },
        { field: "locationString", filter: true },
        { field: "walkDuration", filter: true },
    ]);

    const [rowData] = useState<DOCTrail[]>(trailsData as DOCTrail[]);
    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: true,
        };
    }, []);

    return (
        <main className="relative flex flex-col gap-4 p-4 md:h-screen md:flex-row">
            <div className="w-full h-screen ag-theme-quartz md:h-full">
                <AgGridReact
                    rowData={rowData}
                    //@ts-ignore
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={15}
                    defaultColDef={defaultColDef}
                    onRowClicked={(event) => {
                        setSelectedTrail(event.data);
                    }}
                />
            </div>
            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md md:w-1/2 md:my-0 md:max-w-lg">
                {!selectedTrail ? (
                    <h5>Select a trail for more details</h5>
                ) : (
                    <>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{selectedTrail.name}</h5>
                        <ul>
                            <li>
                                <span className="font-bold">Region:</span> {selectedTrail.region}
                            </li>
                            <li>
                                <span className="font-bold">Location:</span> {selectedTrail.locationString}
                            </li>
                            <li>
                                <span className="font-bold">Walk Duration:</span> {selectedTrail.walkDuration}
                            </li>
                            <li>
                                <span className="font-bold">Difficulty:</span>{" "}
                                {selectedTrail.walkTrackCategory.join(", ")}
                            </li>
                            <li>
                                <span className="font-bold">Distance:</span> {selectedTrail.distance ?? "Unknown"}
                            </li>
                            <li>
                                <a
                                    className="font-bold text-blue-600"
                                    href={
                                        "https://www.google.com/maps/search/?api=1&query=" +
                                        selectedTrail.lat +
                                        "," +
                                        selectedTrail.lon
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Find on Google Maps
                                </a>
                            </li>
                            <li>
                                <a
                                    className="font-bold text-blue-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={selectedTrail.staticLink}
                                >
                                    DOC Site
                                </a>
                            </li>
                        </ul>
                        <p className="font-normal text-gray-700">{selectedTrail.introduction}</p>
                    </>
                )}
            </div>
        </main>
    );
};

export default Home;
