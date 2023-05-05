build-server: 
	docker build ./server -t node-server:1.0.0
build-client: 
	docker build ./client -t node-client:1.0.0 
build-tgBot: 
	docker build ./tgBot -t node-tgbot:1.0.0 
npm:
	cd server/; npm install; cd ..; cd client/; npm install; cd ..; cd tgBot/; npm install; cd ..;
run: 
	docker-compose up -d
down: 
	docker-compose down
stop: 
	docker-compose down; docker container prune; docker image prune; docker image rm webster_server; docker image rm webster_client; docker image rm webster_bot; docker image rm postgres; docker volume prune; docker volume rm webster_pgdata
server-logs: 
	docker logs --follow node-server
bot-logs: 
	docker logs --follow tgBot
reload: 
	docker-compose down; docker-compose up -d
rebuild: 
	make stop; make run