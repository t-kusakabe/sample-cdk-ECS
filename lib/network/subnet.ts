import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

interface INetworkSubnetStackProps extends cdk.StackProps {
  context: any;
  env: any;
}

export class NetworkSubnetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: INetworkSubnetStackProps) {
    super(scope, id, props);


    // // VPC
    // const vpc = ec2.Vpc.fromLookup(
    //   this,
    //   'VPC',
    //   {
    //     vpcId: props.context.vpcId
    //   }
    // );

    // Subnet
    interface IAz {
      availabilityZone: string;
      cidrBlock: string;
      vpcId: string;
      mapPublicIpOnLaunch: boolean;
    }

    const azProps: IAz[] = [
      {
        'availabilityZone': 'ap-northeast-1a',
        'cidrBlock': '10.0.10.0/24',
        'vpcId': props.context.vpcId,
        'mapPublicIpOnLaunch': true
      },
      {
        'availabilityZone': 'ap-northeast-1c',
        'cidrBlock': '10.0.11.0/24',
        'vpcId': props.context.vpcId,
        'mapPublicIpOnLaunch': true
      },
      {
        'availabilityZone': 'ap-northeast-1a',
        'cidrBlock': '10.0.12.0/24',
        'vpcId': props.context.vpcId,
        'mapPublicIpOnLaunch': false
      },
      {
        'availabilityZone': 'ap-northeast-1c',
        'cidrBlock': '10.0.13.0/24',
        'vpcId': props.context.vpcId,
        'mapPublicIpOnLaunch': false
      }
    ];

    const _Subnets = azProps.forEach((parameter) => {
      new ec2.Subnet(
        this,
        `scout-${parameter.mapPublicIpOnLaunch ? 'public' : 'private'}-${parameter.availabilityZone.slice(-1)}-subnet`,
        {
          availabilityZone: parameter.availabilityZone,
          cidrBlock: parameter.cidrBlock,
          vpcId: parameter.vpcId,
          mapPublicIpOnLaunch: parameter.mapPublicIpOnLaunch
        });
    });
  }
}
