import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';


interface NetworkSubnetStackProps extends cdk.StackProps {
  vpc: string;
}

export class NetworkSubnetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: NetworkSubnetStackProps) {
    super(scope, id, props);

    // VPC
    // const vpc = new ec2.Vpc(this, 'MyVpc', {
    //   maxAzs: 2
    // });

    interface IAz {
      availabilityZone: string;
      cidrBlock: string[];
      vpcId: string;
    }

    const azProps: IAz[] = [
      {
        'availabilityZone': 'ap-northeast-1a',
        'cidrBlock': [
          '10.0.10.0/24',
          '10.0.11.0/24',
          '10.0.12.0/24',
          '10.0.13.0/24'
        ],
        'vpcId': ''
      }
    ];

    const Subnets = azProps.forEach((props, index) => {
      new ec2.Subnet(
        this,
        `scout-private-${props.availabilityZone.slice(-1)}-subnet-${index}`,
        {
          availabilityZone: props.availabilityZone,
          cidrBlock: props.cidrBlock[index],
          vpcId: props.vpcId
        });
    });

    // const publicSubnets = azProps.forEach(props => {
    //   new ec2.PrivateSubnet(
    //     this,
    //     `scout-public-${props.availabilityZone.slice(-1)}-subnet`,
    //     props
    //   );
    // });

    // const privateSubnets = azProps.forEach(props => {
    //   new ec2.PrivateSubnet(
    //     this,
    //     `scout-private-${props.availabilityZone.slice(-1)}-subnet`,
    //     props);
    // });



    // TODO: 後で分離 ここからcluster
    // const cluster = new ecs.Cluster(this, 'FargateCluster', {
    //   vpc: vpc,
    // });

    // cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
    //   instanceType: new ec2.InstanceType('t3.small'),
    //   desiredCapacity: 3,
    // });

    // const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');

    // taskDefinition.addContainer('DefaultContainer', {
    //   image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    //   memoryLimitMiB: 512,
    // });

    // const ecsService = new ecs.Ec2Service(this, 'Service', {
    //   cluster,
    //   taskDefinition,
    // });





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
