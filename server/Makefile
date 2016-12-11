deploy-s3:zip
	aws s3 cp deploy.zip s3://status.ajito.vg.lambda
	rm deploy.zip
	@echo lambaの管理画面で、upload from S3を選択 https://s3-ap-northeast-1.amazonaws.com/status.ajito.vg.lambda/deploy.zip

zip:
	zip -r deploy.zip message.js getMessage.js postMessage.js postSlack.js node_modules lib


