# 각 컨테이너 용도
<div><img src="https://i.imgur.com/hO6yUGA.jpg"></div>

- airflow-cluster: airflow2를 위한 scheduler, redis, worker 등의 서비스가 모두 구성된 컨테이너 (기본 설정: Celery Worker)
- nginx: nginx 컨테이너
- ~~scrap: (추후) crawler 워커들이 실행되는 Python FastAPI 컨테이너~~
- web: Typescript 기반의 next app이 실행되는 컨테이너
- ~~apollo: (추후) GQL 도입 이후, express 서버를 좀더 세분화하여 관리하기 위한 컨테이너~~
- express: Typescript + Express.JS로 구성된 기본 backend 컨테이너
- mariadb: DB 컨테이너 (express 컨테이너의 TypeORM을 통해 스키마 지정됨)

# 설정 파일
1. `docker-compose.yaml`
    - dev 및 prod 환경에 대한 컨테이너 명세
2. `./web/app/.env`
    - 의존하는 각 서비스의 URL
    - OAuth2 리소스의 Client 정보 (ID or Key, Secret)
3. `./nginx/nginx.conf`
    - Nginx route 및 Load-balancing 설정

- DEV
    - docker-compose.yaml: `./docker-compose.yaml`
    - .env: `./web/app/.env.development`
- PROD
    - docker-compose.yaml: `./docker-compose.prod.yaml`
    - .env: `./web/app/.env.production`

# 컨테이너 빌드
- 위 설정 .env 파일을 반드시 확인할 것
- production 빌드의 경우 컨테이너 이미지와 함께 **TS 트랜스파일링 및 Next App 빌드**를 함께 수행함

- DEV

``` bash
docker compose up -d --build
```

- PROD

``` bash
docker compose up -f docker-compose.prod.yaml -d --build
```

# TODO
- Git Management
    - TypeORM 스키마를 git 서브모듈화하여 Client, Backend에서 공통 사용
    <br><br>
- Design
    - 모바일 레이아웃에서 리스트 캘린더 적용 (현재는 모바일 레이아웃에서 사용 불가)
    <br><br>
- Container Management
    - 추후 dag(airflow), crawler(scrap) 구현 후, 통계 페이지 작성
    - 추후 TypeORM 관련 불필요한 엔드포인트가 너무 많아지는 경우, GQL(apollo) 적용
