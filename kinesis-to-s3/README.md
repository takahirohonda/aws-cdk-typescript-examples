# Create Kinesis KinesisStream and S3 bucket

This is to create Kinesis KinesisStream and S3 bucket

## (1) Get Started

```bash
# Install Dependencies
npm i

# Build - nonprod
npm run synth:nonprod

# Build - prod
npm run synth:prod

# Deploy - we can pass any extra argument with -- (e.g. passing profile)
npm run build:nonprod -- --profile sysadmin

npm run build:prod -- --profile sysadmin
```
