import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { verify } from 'jsonwebtoken';
import { JWTSecret } from '../../../types/helpers/api/aws.type';

class SecretsManager {
  private secretsManager: SecretsManagerClient;
  constructor() {
    this.secretsManager = new SecretsManagerClient({
      region: process.env.REGION as string,
      credentials: {
        secretAccessKey: process.env.AWS_USER_KEY_SECRET as string,
        accessKeyId: process.env.AWS_USER_KEY_ID as string,
      },
    });
  }

  async getSecretValue(
    secretId: string,
    versionStage: 'AWSCURRENT' | 'AWSPREVIOUS'
  ): Promise<string | undefined> {
    const secretCommandOutput = await this.secretsManager.send(
      new GetSecretValueCommand({
        SecretId: secretId,
        VersionStage: versionStage,
      })
    );

    return secretCommandOutput.SecretString;
  }
}

// TODO: add token refreshing if expired, or if failed verification attempt complete token update if access token and refresh token use previous jwt secret.
export const isValidAccessToken = async (
  access_token: string
): Promise<boolean> => {
  const secretsManager = new SecretsManager();

  const jwtSecret = await secretsManager.getSecretValue(
    'prod/MessengerApi/JWT_Secret',
    'AWSCURRENT'
  );

  if (!jwtSecret) {
    throw new Error('no jwt secret found');
  }

  const secretObject = JSON.parse(jwtSecret) as JWTSecret;

  try {
    verify(access_token, secretObject.secret, { algorithms: ['HS256'] });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
