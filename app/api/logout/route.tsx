import { createErrorResponse } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const biscuits = await cookies();

        biscuits.delete("diab3dprinting-user");

        return new NextResponse(
            JSON.stringify({
                status: "success",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
