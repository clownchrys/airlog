.PHONY: dev-up dev-down dev-ps dev-rebuild

dev-up:
	docker compose -f docker-compose.yaml up -d --build
	docker compose -f airflow-cluster/docker-compose.yaml up -d --build

dev-down:
	docker compose -f airflow-cluster/docker-compose.yaml down --volumes
	docker compose -f docker-compose.yaml down --volumes

dev-ps:
	docker compose -f docker-compose.yaml ps -a
	docker compose -f airflow-cluster/docker-compose.yaml ps -a

dev-rebuild:
	make dev-down && make dev-up