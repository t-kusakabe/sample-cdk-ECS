import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

interface IClusterEcsStackProps extends cdk.StackProps {
  context: any;
  env: any;
}

export class ClusterEcsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: IClusterEcsStackProps) {
    super(scope, id, props);


    // VPC
    const vpc = ec2.Vpc.fromLookup(
      this,
      'VPC',
      {
        vpcId: props.context.vpcId
      }
    );

    // Cluster
    const cluster = new ecs.Cluster(this, 'ECSCluster', {
      vpc: vpc
    });

    // Fargate Service
    // new ecs.LoadBalancedFargateService(this, 'FargateService', {

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'FargateService', {
      cluster: cluster,
      cpu: 256,
      desiredCount: 6,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true
    });
  }
}
