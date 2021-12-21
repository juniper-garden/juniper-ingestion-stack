# Open Source Ingestion Server


## Development
- Install dependencies with `yarn install`
- Use Stack Setup below to start services needed for running server
- run the script at `./scripts/setup_db.sh` to setup the database
- run `yarn build` to make sure the current application builds appropriately
- run `yarn watch` for development, this starts and watches the server

## Kubernetes Local Deployment
### Technologies
- (Docker) <https://docs.docker.com/get-docker/>
- kubectl `brew install kubectl`
- minikube `brew install minikube`
### Stack Setup
- `docker volume create timeseries_db_volume`
- `docker build -t juniper-ingestion-stack .`
- `docker run -d --name juniper-ingestion-stack -p 3000:3000 juniper-ingestion-stack`
- `minikube start`
- `kubectl create -f kubernetes.yml`  
- `kubectl get deploy,po`                             
- `kubectl expose deployment juniper-ingestion-stack --type="LoadBalancer"`
- In another terminal run `minikube tunnel`
- `kubectl get svc`, examine the external ip (should be 127.0.0.x with a port)

### Stack updates
- `docker tag juniper-ingestion-stack dashcraft/juniper-ingestion-stack`
- `docker push dashcraft/juniper-ingestion-stack`