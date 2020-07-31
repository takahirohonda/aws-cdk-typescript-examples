import * as kinesis from '@aws-cdk/aws-kinesis';
import * as firehose from '@aws-cdk/aws-kinesisfirehose';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import { LogGroup, RetentionDays } from '@aws-cdk/aws-logs';
import { Construct, CfnResource } from '@aws-cdk/core';
import {
  getFirehoseS3PolicyStmt,
  getFirehoseDataStreamPolicyStmt,
  getFirehoseCreateLogStreamPolicyStmt,
  getFirehosePutLogPolicyStmt
} from '../policies/policies';
import {
  KINESIS_STREAM_CTR_NAME,
  KINESIS_STREAM_AGT_NAME,
  CTR_TARGET_S3_ARN_NONPROD,
  FIREHOSE_DATA_CTR_ROLE_ID,
  FIREHOSE_DATA_CTR_ROLE_NAME,
  FIREHOSE_DATA_CTR_POLICY_NAME,
  FIREHOSE_DATA_AGT_ROLE_ID,
  FIREHOSE_DATA_AGT_ROLE_NAME,
  FIREHOSE_DATA_AGT_POLICY_NAME,
  FIREHOSE_CTR_LOG_GROUP_ID,
  FIREHOSE_CTR_LOG_GROUP_NAME,
  FIREHOSE_CTR_LOG_STREAM_NAME,
  FIREHOSE_AGT_LOG_GROUP_ID,
  FIREHOSE_AGT_LOG_GROUP_NAME,
  FIREHOSE_AGT_LOG_STREAM_NAME,
  FIREHOSE_CTR_STREAM_ID,
  FIREHOSE_CTR_STREAM_NAME,
  FIREHOSE_CTR_POLICY_ID,
  FIREHOSE_AGT_STREAM_ID,
  FIREHOSE_AGT_STREAM_NAME,
  FIREHOSE_AGT_POLICY_ID
} from '../constants';

export class MdhDataKinesisStream extends Construct {
  constructor(parent: Construct, id: string) {
    super(parent, id);
    // Target bucket
    // Bucket can be created here instead of an separate construct
    // const targetBucket = new s3.Bucket(this, 'firehose-target', {
    //   bucketName: 'firehose-target-test',
    //   encryption: s3.BucketEncryption.S3_MANAGED
    // });

    // (1) Create Kinesis data stream

    const connectCtrStream = new kinesis.Stream(this, KINESIS_STREAM_CTR_NAME,
      {
        shardCount: 2,
        streamName: KINESIS_STREAM_CTR_NAME
      });

    const connectAgtStream = new kinesis.Stream(this, KINESIS_STREAM_AGT_NAME,
      {
        shardCount: 2,
        streamName: KINESIS_STREAM_AGT_NAME
      });

    // (2) Create Roles & Permissions for Firehose delivery stream
    const connectDataCtrFirehoseRole = new iam.Role(this,
      FIREHOSE_DATA_CTR_ROLE_ID,
      {
        assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
        roleName: FIREHOSE_DATA_CTR_ROLE_NAME
      });

    const connectDataAgtFirehoseRole = new iam.Role(this,
      FIREHOSE_DATA_AGT_ROLE_ID,
      {
        assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
        roleName: FIREHOSE_DATA_AGT_ROLE_NAME
      });

    // Adding permission
    // connectDataDeliveryFirehoseRole
    //   .addToPolicy(new iam.PolicyStatement(getFirehoseS3PolicyStmt(CTR_TARGET_S3_ARN_NONPROD)));

    // (3) Create Log group and log stream
    const firehoseCtrLoggroup = new LogGroup(this,
      FIREHOSE_CTR_LOG_GROUP_ID,
      {
        logGroupName: FIREHOSE_CTR_LOG_GROUP_NAME,
        retention: RetentionDays.INFINITE
      });

    firehoseCtrLoggroup.addStream(id, {
      logStreamName: FIREHOSE_CTR_LOG_STREAM_NAME
    });

    const firehoseAgtLoggroup = new LogGroup(this,
      FIREHOSE_AGT_LOG_GROUP_ID,
      {
        logGroupName: FIREHOSE_AGT_LOG_GROUP_NAME,
        retention: RetentionDays.INFINITE
      });

    firehoseAgtLoggroup.addStream(id, {
      logStreamName: FIREHOSE_AGT_LOG_STREAM_NAME
    });

    /*
    * Cannot addToPolicy for kinesis policies use addDependencies later
    */
    const firehoseKinesisCtrPolicy = new iam.Policy(this, FIREHOSE_CTR_POLICY_ID, {
      roles: [connectDataCtrFirehoseRole],
      statements: [
        new iam.PolicyStatement(getFirehoseS3PolicyStmt(CTR_TARGET_S3_ARN_NONPROD)),
        new iam.PolicyStatement(getFirehoseDataStreamPolicyStmt(connectCtrStream)),
        new iam.PolicyStatement(getFirehoseCreateLogStreamPolicyStmt(firehoseCtrLoggroup)),
        new iam.PolicyStatement(getFirehosePutLogPolicyStmt(firehoseCtrLoggroup))
      ],
      policyName: FIREHOSE_DATA_CTR_POLICY_NAME
    });

    const firehoseKinesisAgtPolicy = new iam.Policy(this, FIREHOSE_AGT_POLICY_ID, {
      roles: [connectDataAgtFirehoseRole],
      statements: [
        new iam.PolicyStatement(getFirehoseS3PolicyStmt(CTR_TARGET_S3_ARN_NONPROD)),
        new iam.PolicyStatement(getFirehoseDataStreamPolicyStmt(connectAgtStream)),
        new iam.PolicyStatement(getFirehoseCreateLogStreamPolicyStmt(firehoseAgtLoggroup)),
        new iam.PolicyStatement(getFirehosePutLogPolicyStmt(firehoseAgtLoggroup))
      ],
      policyName: FIREHOSE_DATA_AGT_POLICY_NAME
    });

    // (4) Create firehose delivery stream
    const firehoseCtrSteram = new firehose.CfnDeliveryStream(this, FIREHOSE_CTR_STREAM_ID, {
      deliveryStreamName: FIREHOSE_CTR_STREAM_NAME,
      deliveryStreamType: 'KinesisStreamAsSource',
      kinesisStreamSourceConfiguration: {
        kinesisStreamArn: connectCtrStream.streamArn,
        roleArn: connectDataCtrFirehoseRole.roleArn,
      },
      s3DestinationConfiguration: {
        bucketArn: CTR_TARGET_S3_ARN_NONPROD,
        cloudWatchLoggingOptions: {
          enabled: true,
          logGroupName: firehoseCtrLoggroup.logGroupName,
          logStreamName: FIREHOSE_CTR_LOG_STREAM_NAME
        },
        bufferingHints: {
          intervalInSeconds: 60,
          sizeInMBs: 120,
        },
        prefix: 'ctr/',
        compressionFormat: 'UNCOMPRESSED',
        roleArn: connectDataCtrFirehoseRole.roleArn,
      },
    });
    firehoseCtrSteram.addDependsOn(firehoseKinesisCtrPolicy.node.defaultChild as CfnResource);

    const firehoseAgtSteram = new firehose.CfnDeliveryStream(this, FIREHOSE_AGT_STREAM_ID, {
      deliveryStreamName: FIREHOSE_AGT_STREAM_NAME,
      deliveryStreamType: 'KinesisStreamAsSource',
      kinesisStreamSourceConfiguration: {
        kinesisStreamArn: connectAgtStream.streamArn,
        roleArn: connectDataAgtFirehoseRole.roleArn,
      },
      s3DestinationConfiguration: {
        bucketArn: CTR_TARGET_S3_ARN_NONPROD,
        cloudWatchLoggingOptions: {
          enabled: true,
          logGroupName: firehoseAgtLoggroup.logGroupName,
          logStreamName: FIREHOSE_AGT_LOG_STREAM_NAME
        },
        bufferingHints: {
          intervalInSeconds: 60,
          sizeInMBs: 120,
        },
        prefix: 'agent/',
        compressionFormat: 'UNCOMPRESSED',
        roleArn: connectDataAgtFirehoseRole.roleArn,
      },
    });
    firehoseAgtSteram.addDependsOn(firehoseKinesisAgtPolicy.node.defaultChild as CfnResource);
  }

}