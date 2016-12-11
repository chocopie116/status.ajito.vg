# status.ajito.vg

## Abstract
Status page for ajito.vg

![](/docs/architecture.png)

People can ask there are ajiting people to #ajito.
People can respond there are ajiting people.

## Env
```
$ cat envrc.template
```

## Architecture

### Client
- S3 web site hosting(react.js)
- Slack(slash command)

#### API Server
- API Gateway
- AWS Lambda
- Slack Incoming Webhook
