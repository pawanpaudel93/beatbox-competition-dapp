// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm } from "formidable"


type Data = {
    status: string
    message: boolean
}

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const data: { fields: formidable.Fields, files: formidable.Files } = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) { return reject(err) };
                resolve({ fields, files });
            });
        });
        const url = data?.fields?.url as string || ''
        const videoId = url.split('v=')[1].slice(0, 11).trim()
        const result = await fetch(
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        )
        res.status(200).json({
            status: 'success',
            message: result.status === 200
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: false
        })
    }
}
