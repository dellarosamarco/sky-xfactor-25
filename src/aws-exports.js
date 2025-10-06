const awsConfig = {
  aws_project_region: process.env.REACT_APP_AWS_REGION || "eu-west-1",
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION || process.env.REACT_APP_AWS_REGION || "eu-west-1",
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOL_ID || "YOUR_USER_POOL_ID",
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID || "YOUR_USER_POOL_WEB_CLIENT_ID",
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || "YOUR_IDENTITY_POOL_ID",
  aws_user_files_s3_bucket: process.env.REACT_APP_AWS_S3_BUCKET || "your-s3-bucket-name",
  aws_user_files_s3_bucket_region: process.env.REACT_APP_AWS_S3_BUCKET_REGION || process.env.REACT_APP_AWS_REGION || "eu-west-1",
  aws_cloud_logic_custom: [
    {
      name: process.env.REACT_APP_AWS_API_NAME || "XFactorApi",
      endpoint: process.env.REACT_APP_API_BASE_URL || "https://your-api-id.execute-api.eu-west-1.amazonaws.com/prod",
      region: process.env.REACT_APP_API_REGION || process.env.REACT_APP_AWS_REGION || "eu-west-1",
    },
  ],
};

export default awsConfig;
