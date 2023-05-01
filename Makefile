build-server: 
	cd ./server/; docker build ./server -t node-server:1.0.0
build-client: 
	cd ./client/; docker build ./client -t node-client:1.0.0 
run: 
	docker-compose up