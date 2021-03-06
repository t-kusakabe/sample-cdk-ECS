#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { NetworkSubnetStack } from '../lib/network/subnet';

const app = new cdk.App();
new NetworkSubnetStack(app, 'not:a:stack:name', {
  stackName: 'NetworkSubnetStack',
  vpc: app.node.tryGetContext('vpcId')
});
