# AWS CDK TypeScript Examples

Collections of AWS CDK TypeScript Examples. Each folder contains it's own app.

## CDK Reference

To get started with CDK, we can install aws-cdk and initialise with the language of choice. cdk init will create the project scaffold and install all the dependencies.

### (1) Install AWS CDK

```bash
npm i -g aws-cdk
```

### (2) Get started

Useful commands

```bash
# (1) create template
cdk init --language typescript

# (2) compile the app
npm run build

# (3) Liste the stacks in the app
cdk ls

# (4) Synthesizing CloudFormation template
cdk synth

# (5) Deploying
cdk deploy

# (6) Checking diff
cdk diff

# (7) Deleting the stack
cdk destroy
```

### (3) Tips

Make sure that the version of the modules are the same. Otherwise, we get type error.

For example, all the modules has to have the same version as @aws-cdk/core. If they are different, you may get error.

```
"@aws-cdk/assert": "1.55.0",
"@aws-cdk/aws-iam": "1.55.0",
"@aws-cdk/aws-kinesis": "1.55.0",
"@aws-cdk/aws-kinesisfirehose": "1.55.0",
"@aws-cdk/aws-logs": "1.55.0",
"@aws-cdk/aws-s3": "1.55.0",
"@aws-cdk/core": "1.55.0",
```