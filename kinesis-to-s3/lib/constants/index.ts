import { stackEnv } from '../../config';

// ConnectDataStream Constructs
export const KINESIS_STREAM_CTR_NAME = `mdh-ctr-stream-${stackEnv}`;
export const KINESIS_STREAM_AGT_NAME = `mdh-agt-stream-${stackEnv}`;

export const FIREHOSE_DATA_CTR_ROLE_ID = `mdh-data-ctr-firehose-${stackEnv}`;
export const FIREHOSE_DATA_CTR_ROLE_NAME = `mdh-data-ctr-firehose-${stackEnv}`;
export const FIREHOSE_DATA_CTR_POLICY_NAME = `mdh-data-ctr-firehose-${stackEnv}`;

export const FIREHOSE_DATA_AGT_ROLE_ID = `mdh-data-agt-firehose-${stackEnv}`;
export const FIREHOSE_DATA_AGT_ROLE_NAME = `mdh-data-agt-firehose-${stackEnv}`;
export const FIREHOSE_DATA_AGT_POLICY_NAME = `mdh-data-agt-firehose-${stackEnv}`;

// This is for testing cross account capability
export const CTR_TARGET_S3_ARN_NONPROD = 'arn:aws:s3:::s3-cross-account-sync-test-destination';
// This is for real
export const FIREHOSE_TARGET_BUCKET_ARN = stackEnv === 'nonprod'
  ? 'arn:aws:s3:::cbus-data-non-production-aws-mdh-data'
  : 'arn:aws:s3:::cbus-data-production-aws-mdh-data';

export const FIREHOSE_CTR_LOG_GROUP_ID = `mdh-ctr-firehose-loggroup-${stackEnv}`;
export const FIREHOSE_CTR_LOG_GROUP_NAME = `/aws/connect/firehose/mdh-ctr-firehose-loggroup-${stackEnv}`;
export const FIREHOSE_CTR_LOG_STREAM_NAME = 'mdh-ctr-firehose-stream';

export const FIREHOSE_AGT_LOG_GROUP_ID = `mdh-agt-firehose-loggroup-${stackEnv}`;
export const FIREHOSE_AGT_LOG_GROUP_NAME = `/aws/connect/firehose/mdh-agt-firehose-loggroup-${stackEnv}`;
export const FIREHOSE_AGT_LOG_STREAM_NAME = 'mdh-agt-firehose-stream';

export const FIREHOSE_CTR_STREAM_ID = `connectCtrFireHoseStream${stackEnv}`;
export const FIREHOSE_CTR_STREAM_NAME = `mdh-ctr-firehose-stream-${stackEnv}`;
export const FIREHOSE_CTR_POLICY_ID = `mdh-ctr-firehose-policy-${stackEnv}`;

export const FIREHOSE_AGT_STREAM_ID = `connectAgtFireHoseStream${stackEnv}`;
export const FIREHOSE_AGT_STREAM_NAME = `mdh-agt-firehose-stream-${stackEnv}`;
export const FIREHOSE_AGT_POLICY_ID = `mdh-agt-firehose-policy-${stackEnv}`;