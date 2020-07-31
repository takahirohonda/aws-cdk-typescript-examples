import * as iam from '@aws-cdk/aws-iam';
import * as kinesis from '@aws-cdk/aws-kinesis';
import * as logs from '@aws-cdk/aws-logs';

export const getFirehoseS3PolicyStmt = (bucketArn: string): iam.PolicyStatementProps => {
  return {
    effect: iam.Effect.ALLOW,
    resources: [
      bucketArn,
      `${bucketArn}/*`
    ],
    actions: [
      's3:AbortMultipartUpload',
      's3:GetBucketLocation',
      's3:GetObject',
      's3:ListBucket',
      's3:ListBucketMultipartUploads',
      's3:PutObject',
      's3:PutObjectAcl'
    ],
  };
};

export const getFirehoseDataStreamPolicyStmt = (dataStream: kinesis.IStream): iam.PolicyStatementProps => {
  return {
    effect: iam.Effect.ALLOW,
    resources: [dataStream.streamArn],
    actions: [
      'kinesis:DescribeStream',
      'kinesis:GetShardIterator',
      'kinesis:GetRecords'
    ],
  };
};

export const getFirehoseCreateLogStreamPolicyStmt = (logGroup: logs.ILogGroup): iam.PolicyStatementProps => {
  return {
    effect: iam.Effect.ALLOW,
    resources: [`${logGroup.logGroupArn}:*`],
    actions: [
      'logs:CreateLogStream'
    ],
  };
};

export const getFirehosePutLogPolicyStmt = (logGroup: logs.ILogGroup): iam.PolicyStatementProps => {
  return {
    effect: iam.Effect.ALLOW,
    resources: [`${logGroup.logGroupArn}:*:*`],
    actions: [
      'logs:PutLogEvents'
    ],
  };
};
