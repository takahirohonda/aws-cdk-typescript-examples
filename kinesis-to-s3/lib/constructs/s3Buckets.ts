import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class S3Bucket extends cdk.Construct {

  constructor(parent: cdk.Construct, id: string) {
    super(parent, id);
    new s3.Bucket(this, 'firehose-target-test');
  }
}
