import { sendMail } from "@/components/email";
import { createErrorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const info = sendMail({
            sendTo: body.sendTo,
            bcc: body.bcc,
            body: body.body,
            html: body.html,
            subject: body.subject,
        });

        const res = {
            status: "success",
            data: info,
        };
        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
