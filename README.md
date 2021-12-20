# Open Source Ingestion Server


## Development
- Install dependencies with `yarn install`
- 


## Kubernetes Local Deployment
### Technologies
- (Docker) <https://docs.docker.com/get-docker/>
- kubectl `brew install kubectl`
- minikube `brew install minikube`
### Stack
- `docker build -t juniper-ingestion-stack .`
- `docker run -d --name juniper-ingestion-stack -p 3000:3000 juniper-ingestion-stack`
- `docker tag juniper-ingestion-stack dashcraft/juniper-ingestion-stack`
- `docker push dashcraft/juniper-ingestion-stack`
- `minikube start`
- `kubectl create -f kubernetes.yml`  
- `kubectl get deploy,po`                             
- `kubectl expose deployment juniper-ingestion-stack --type="LoadBalancer"`
- In another terminal run `minikube tunnel`
- `kubectl get svc`, examine the external ip (should be 127.0.0.x with a port)
