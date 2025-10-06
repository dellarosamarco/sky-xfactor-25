import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';

let configured = false;

export const configureAmplify = () => {
  if (configured) {
    return;
  }

  Amplify.configure(awsConfig);
  configured = true;
};

configureAmplify();
