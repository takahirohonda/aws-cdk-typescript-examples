import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SimpleLambda from '../lib/stacks/simple-lambda-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SimpleLambda.SimpleLambdaStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack as any).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
