WEBPACK :=./node_modules/.bin/webpack --progress --colors
BUCKET_NAME := status.ajito.vg

deploy: build
	aws s3 sync --acl public-read public s3://$(BUCKET_NAME)

server:
	php -S localhost:3000 -t public
	open http://localhost:3000

build:
	env | grep MESSAGES_API_ENDPOINT
	$(WEBPACK)

watch: 
	$(WEBPACK) --watch

