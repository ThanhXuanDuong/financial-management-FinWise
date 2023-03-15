import React from "react";

export default function NoAuth({
    children
}: {
    children: React.ReactNode
}){
    return (
        <div>
            {children}
        </div>
    )
}