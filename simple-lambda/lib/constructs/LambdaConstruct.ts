import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import { Bucket } from '@aws-cdk/aws-s3';

export class LambdaConstruct extends cdk.Construct {

  constructor(parent: cdk.Construct, id: string) {
    super(parent, id);

    const lambdaDeployBucket = new Bucket(this, 'cdk-lambda-deploy-bucket');

    const lambdaFunc = new lambda.Function(this, 'CdkTestFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambdaCode/')),
      environment: {
        BUCKET: lambdaDeployBucket.bucketName
      }
    })
  }
}