import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import SampleCdkEcs = require('../lib/sample-cdk-ecs-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SampleCdkEcs.SampleCdkEcsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
