# status.ajito.vg

## Abstract
Status page for ajito.vg

![](/docs/architecture.png)

People can ask there are ajiting people to #ajito.
People can respond there are ajiting people.

## Architecture

#### Client
- S3 web site hosting

#### Server
- API Gateway
- AWS Lambda
- Slack Incoming Webhook
- Slack slash command
