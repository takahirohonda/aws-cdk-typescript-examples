#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KinesisToS3Stack } from '../lib/kinesis-to-s3-stack';

const app = new cdk.App();
new KinesisToS3Stack(app, 'KinesisToS3Stack');
