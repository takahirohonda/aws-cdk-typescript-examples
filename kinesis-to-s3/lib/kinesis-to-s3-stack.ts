import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { S3Bucket } from './constructs/s3Buckets';
import { MdhDataKinesisStream } from './constructs/MdhDataKinesisStream';

export class KinesisToS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new S3Bucket(this, id);
    new MdhDataKinesisStream(this, id);
  }
}
