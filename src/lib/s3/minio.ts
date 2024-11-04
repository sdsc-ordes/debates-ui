// File: /src/lib/server/minio.js
import * as Minio from "minio";
import { S3_SERVER, S3_ACCESS_KEY, S3_SECRET_KEY } from '$env/static/private';

//export const minioClient = new Minio.Client({
//    endPoint: S3_SERVER,
//    port: 80,
//    useSSL: false,
//    accessKey: S3_ACCESS_KEY,
//    secretKey: S3_SECRET_KEY,
//})
