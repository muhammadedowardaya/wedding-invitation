// app/api/audio/[filename]/route.ts

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: { filename: string } }) {
    const { filename } = params;
    const audioDirectory = path.join(process.cwd(), 'public/audios'); // Ganti dengan path ke direktori file audio Anda
    const filePath = path.join(audioDirectory, filename);

    try {
        if (fs.existsSync(filePath)) {
            const fileStream = fs.createReadStream(filePath);
            const res = new NextResponse(fileStream as any, {
                headers: {
                    'Content-Disposition': 'inline',
                    'Content-Type': 'audio/mp3', // Sesuaikan dengan tipe file Anda
                },
            });
            return res;
        } else {
            return NextResponse.json({ message: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
