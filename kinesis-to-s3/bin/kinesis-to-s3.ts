#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KinesisToS3Stack } from '../lib/stack/kinesis-to-s3-stack';
import { stackEnv } from '../config';

const app = new cdk.App();
new KinesisToS3Stack(app, `kinesis-to-s3-stack-${stackEnv}`);
