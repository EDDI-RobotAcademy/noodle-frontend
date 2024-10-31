interface Env {
    mode: string | undefined,
    api: {
        MAIN_API_URL: string | undefined
        AI_BASE_URL: string | undefined
    },
    s3: {
        S3_REGION: string | undefined
        S3_ACCESS_KEY_ID: string | undefined
        S3_SECRET_ACCESS_KEY: string | undefined
        S3_BUCKET_NAME: string | undefined
        S3_IDENTITY_POOL_ID: string | undefined
    }
}

const env: Env = {
    mode: process.env.NODE_ENV,
    api: {
        MAIN_API_URL: process.env.VUE_APP_BASE_URL,
        AI_BASE_URL: process.env.VUE_APP_AI_BASE_URL
    },
    s3: {
        S3_REGION: process.env.VUE_APP_AWS_S3_REGION,
        S3_ACCESS_KEY_ID: process.env.VUE_APP_AWS_S3_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY: process.env.VUE_APP_AWS_S3_SECRET_ACCESS_KEY,
        S3_BUCKET_NAME: process.env.VUE_APP_AWS_S3_BUCKET_NAME,
        S3_IDENTITY_POOL_ID: process.env.VUE_APP_AWS_S3_IDENTITY_POOL_ID,
    }
}

console.log('process.env.AWS_S3_REGION:', process.env.VUE_APP_AWS_S3_REGION)

export default env