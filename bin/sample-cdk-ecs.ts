#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { NetworkSubnetStack } from '../lib/network/subnet';

const app = new cdk.App();
new NetworkSubnetStack(app, 'NetworkSubnetStack', {
  vpc: 'vpc-id',
});
