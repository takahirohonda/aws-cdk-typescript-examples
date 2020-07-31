import { Construct } from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class S3Bucket extends Construct {

  constructor(parent: Construct, id: string) {
    super(parent, id);
    new s3.Bucket(this, 'firehose-target-test');
  }
}
