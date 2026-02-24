"use client";

import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import Link from "next/link";
import type { DOCTrail } from "../types/trails";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";

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
                    <Link
                        className="flex w-full text-blue-600 underline"
                        href={`/trails/${params.data.assetId}`}
                    >
                        {params.data.name}
                    </Link>
                ),
            },
            { field: "region" as keyof DOCTrail, filter: true },
            { field: "locationString" as keyof DOCTrail, filter: true },
            { field: "walkDuration" as keyof DOCTrail, filter: true },
        ],
        [],
    );

    const defaultColDef = useMemo(
        () => ({
            floatingFilter: true,
        }),
        [],
    );

    return (
        <div className="ag-theme-quartz h-screen w-full md:h-full">
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
