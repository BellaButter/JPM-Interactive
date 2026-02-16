import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export async function GET(request: NextRequest) {
    const pathParam = request.nextUrl.searchParams.get("path");
    if (!pathParam) {
        return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    let decodedPath: string;
    try {
        decodedPath = decodeURIComponent(pathParam);
    } catch {
        return NextResponse.json({ error: "Invalid path encoding" }, { status: 400 });
    }

    // ต้องอยู่ภายใต้ public และไม่มี path traversal (..)
    const fullPath = path.resolve(PUBLIC_DIR, decodedPath);
    if (!fullPath.startsWith(PUBLIC_DIR) || decodedPath.includes("..")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const stream = fs.createReadStream(fullPath);
    return new NextResponse(stream as unknown as ReadableStream, {
        headers: {
            "Content-Type": "video/mp4",
            "Accept-Ranges": "bytes",
        },
    });
}
