import env from '@/env'
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"
import { S3Client } from "@aws-sdk/client-s3"

const REGION = env.s3.S3_REGION as string
const IDENTITY_POOL_ID = env.s3.S3_IDENTITY_POOL_ID as string

if (!REGION || !IDENTITY_POOL_ID) {
  console.log("REGION:", REGION)
  console.log("IDENTITY_POOL_ID:", IDENTITY_POOL_ID)
  throw new Error("Missing required environment variables for AWS configuration");
}

const s3Client = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: REGION },
  }),
})

export { s3Client, env }