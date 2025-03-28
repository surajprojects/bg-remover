import { removeBackgroundFromImageBase64 } from "remove.bg";

export async function POST(req: Request) {
    const { base64img } = await req.json();
    const result = await removeBackgroundFromImageBase64({
        base64img,
        apiKey: process.env.API_KEY || "API_KEY",
        size: "regular"
    });
    return Response.json({ message: "Success!", result })
};