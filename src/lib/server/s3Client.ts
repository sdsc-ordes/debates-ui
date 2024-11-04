import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from '$env/dynamic/private';

export const s3 = new S3Client({
  endpoint: env.S3_SERVER, // MinIO URL
  region: "us-east-1",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY || "minioadmin",
    secretAccessKey: env.S3_SECRET_KEY || "minioadmin",
  },
  forcePathStyle: true, // Required for MinIO
});


export async function getMediaSources(videoId: string) {
  const videoParams = {
    Bucket: env.S3_BUCKET_NAME,
    Key: "HRC_20220328/HRC_20220328.mp4",
  };

  const subtitleParams = {
    Bucket: env.S3_BUCKET_NAME,
    Key: "HRC_20220328/HRC_20220328.srt",
  };

  const videoSrc = await getSignedUrl(s3, new GetObjectCommand(videoParams), { expiresIn: 3600 });
  const trackSrc = await getSignedUrl(s3, new GetObjectCommand(subtitleParams), { expiresIn: 3600 });

  return { videoSrc, trackSrc };
}

export async function checkVideoAccess(videoUrl) {
  try {
      const response = await fetch(videoUrl, {
          method: 'HEAD' // Use HEAD to fetch only the headers
      });

      if (response.ok) {
          console.log('Video is accessible:', response);
          // Optionally, check the content type
          const contentType = response.headers.get('Content-Type');
          console.log('Content-Type:', contentType);
          // You can add more checks here as needed
      } else {
          console.error('Error accessing video:', response.status, response.statusText);
      }
  } catch (error) {
      console.error('Fetch error:', error);
  }
}


