import { env } from "$env/dynamic/private";

const s3Config = {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    region: env.S3_REGION,
    bucket: env.S3_BUCKET_NAME,
};