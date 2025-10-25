import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DefaultSkeleton({ count = 6, ...props }) {
    return (
        <div
            className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
            {...props}
        >
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-2 shadow-sm"
                >
                    <Skeleton height={140} /> {/* image placeholder */}
                    <Skeleton height={20} className="mt-2" />
                    <Skeleton height={20} width="80%" />
                </div>
            ))}
        </div>
    );
}
