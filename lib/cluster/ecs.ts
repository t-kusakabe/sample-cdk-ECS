import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';

export class ClusterEcsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, 'ECSCluster', {
      vpc: vpc
    })
  }
}
