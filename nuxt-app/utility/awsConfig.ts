import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"
import { S3Client } from "@aws-sdk/client-s3"
import { useRuntimeConfig } from "nuxt/app";

let s3Client: S3Client | null = null;

export function createS3Client() {
    const config = useRuntimeConfig().public;

    const REGION: string = config.AWS_S3_REGION as string;
    const IDENTITY_POOL_ID: string = config.AWS_S3_IDENTITY_POOL_ID as string;

    if (!REGION || !IDENTITY_POOL_ID) {
        console.log("AWS 환경 변수를 확인하세요.")
        console.log("REGION:", REGION);
        console.log("IDENTITY_POOL_ID:", IDENTITY_POOL_ID);
    }

    if (!s3Client) {
        s3Client = new S3Client({
            region: REGION,
            credentials: fromCognitoIdentityPool({
                identityPoolId: IDENTITY_POOL_ID,
                clientConfig: { region: REGION },
            }),
        });
    }

    return s3Client;
}