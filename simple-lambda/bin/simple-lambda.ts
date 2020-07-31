#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SimpleLambdaStack } from '../lib/stacks/simple-lambda-stack';

const app = new cdk.App();
new SimpleLambdaStack(app, 'SimpleLambdaStack');
