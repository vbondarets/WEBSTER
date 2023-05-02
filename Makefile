build-server: 
	docker build ./server -t node-server:1.0.0
build-client: 
	docker build ./client -t node-client:1.0.0 
build-tgBot: 
	docker build ./tgBot -t node-tgbot:1.0.0 
run: 
	docker-compose up -d