# status.ajito.vg
voyagegroupの社内フリースペース[ajito](https://voyagegroup.com/culture/environment/ajito/)に人がいるか気軽に尋ねることができるウェブアプリケーション

## Demo
http://status.ajito.vg.s3-website-ap-northeast-1.amazonaws.com/

## Abstract
Serverless Architecture Application.

![](/docs/architecture.png)

- People can ask there are people in #ajiting by web site.
- People can respond there are people in #ajiting by slack.

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
