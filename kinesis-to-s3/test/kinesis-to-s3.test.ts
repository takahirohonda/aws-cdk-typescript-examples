import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as KinesisToS3 from '../lib/stack/kinesis-to-s3-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new KinesisToS3.KinesisToS3Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      'Resources': {}
    }, MatchStyle.EXACT));
});
