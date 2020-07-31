import * as cdk from '@aws-cdk/core';
import { LambdaConstruct } from '../constructs/LambdaConstruct';

export class SimpleLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new LambdaConstruct(this, id);
  }
}
