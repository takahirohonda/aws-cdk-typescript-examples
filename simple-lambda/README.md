# Simple Lambda

This creates a lambda function. That's it. Nothing really fancy.

## Tip

For creating, lambda function, we need to the bootstrap command. This will create an another cloudformation starck to manage the s3 bucket for resource management.

#### Error message

```bash
❌  SimpleLambdaStack failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run "cdk bootstrap aws://unknown-account/unknown-region")
```

#### Fix

```
cdk bootstrap aws://<accountid>/<aws-region>
```