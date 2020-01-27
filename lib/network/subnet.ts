import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';


interface NetworkSubnetStackProps extends cdk.StackProps {
  vpc: string;
}


export class NetworkSubnetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: NetworkSubnetStackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2
    });


    // 後で分離
    // const cluster = new ecs.Cluster(this, 'ECSCluster', {
    //   vpc: vpc
    // });



    const cluster = new ecs.Cluster(this, 'FargateCluster', {
      vpc: vpc,
    });

    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType('t3.small'),
      desiredCapacity: 3,
    });

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');

    taskDefinition.addContainer('DefaultContainer', {
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      memoryLimitMiB: 512,
    });

    const ecsService = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
    });





    // new ecs.LoadBalancedFargateService(this, 'FargateService', {
    //   cluster: cluster,
    //   cpu: '256',
    //   desiredCount: 1,
    //   image: ecs.ContainerImage.fromDockerHub('amazon/amazon-ecs-sample'),
    //   memoryMiB: '512',
    //   publicLoadBalancer: true
    // });
  }
}
