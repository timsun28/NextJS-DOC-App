"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import Link from "next/link";
import type { DOCTrail } from "../types/trails";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TrailsGridProps {
    trails: DOCTrail[];
}

export default function TrailsGrid({ trails }: TrailsGridProps) {
    const columnDefs = useMemo<ColDef<DOCTrail>[]>(
        () => [
            {
                field: "name" as keyof DOCTrail,
                filter: true,
                cellRenderer: (params: { data: DOCTrail }) => (
                    <Link className="text-blue-600 underline flex w-full" href={`/trails/${params.data.assetId}`}>
                        {params.data.name}
                    </Link>
                ),
            },
            { field: "region" as keyof DOCTrail, filter: true },
            { field: "locationString" as keyof DOCTrail, filter: true },
            { field: "walkDuration" as keyof DOCTrail, filter: true },
        ],
        []
    );

    const defaultColDef = useMemo(
        () => ({
            floatingFilter: true,
        }),
        []
    );

    return (
        <div className="w-full h-screen ag-theme-quartz md:h-full">
            <AgGridReact
                rowData={trails}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={50}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}
