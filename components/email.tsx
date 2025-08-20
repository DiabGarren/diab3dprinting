/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
    },
});

export async function sendMail({
    email = process.env.GMAIL,
    sendTo,
    bcc = process.env.GMAIL2,
    subject,
    body,
    html,
}: {
    email?: string;
    sendTo?: string;
    bcc?: string;
    subject?: string;
    body?: string;
    html?: string;
}) {
    try {
        await transporter.verify();
    } catch (error: any) {
        console.error("Something went wrong", error);
        return;
    }

    const info = await transporter.sendMail({
        from: email,
        to: sendTo,
        bcc: bcc,
        subject: subject,
        text: body,
        html: html,
    });

    console.log("Mail sent", info.messageId);
    return info;
}
