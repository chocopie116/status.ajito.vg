BUCKET_NAME := status.ajito.vg
deploy:
	aws s3 sync --acl public-read public s3://$(BUCKET_NAME)

server:
	php -S localhost:3000 -t public
	open http://localhost:3000
