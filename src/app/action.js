'use server'

import { fileManager, model } from "@/app/lib/gemini/config";
import fs from "fs";
import path from "path";

// Tentukan direktori sementara, misalnya di `/tmp`
const TEMP_DIR = path.join('/tmp', 'gemini_tmp');

// Pastikan direktori sementara ada
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

export async function geminiHandle(formData) {
    try {
        const file = formData.get("file");
        const prompt = formData.get("prompt");

        if (!file) {
            const result = await model.generateContent(prompt);

            if(result.response.text()) {
                return {
                    ok: true,
                    data: result.response.text(),
                    file: ''
                }
            }

        } else {
            // Menentukan nama dan lokasi file sementara
            const filePath = path.join(TEMP_DIR, file.name);

            // Membaca konten file sebagai buffer
            const fileBuffer = Buffer.from(await file.arrayBuffer());

            // Menyimpan file di folder sementara
            fs.writeFileSync(filePath, fileBuffer);

            // Upload the file and specify a display name.
            const uploadResponse = await fileManager.uploadFile(filePath, {
                mimeType: file.type,
                displayName: "Gemini 1.5 PDF",
            });

            // Generate content using text and the URI reference for the uploaded file.
            const result = await model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri,
                    },
                },
                {
                    text: prompt
                },
            ]);

            fs.unlinkSync(filePath);

            if(result.response.text()) {
                return {
                    ok: true,
                    data: result.response.text(),
                    file: file.name
                }
            }
        }

    } catch(error) {
        return {
            ok: false,
            data: error.message
        }
    }
}
