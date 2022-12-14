# Connect to cluster
gcloud container clusters get-credentials scraper--microservice --zone europe-west1 --project casinow-auth-dev
# Start Selenium Hub
kubectl create --filename=selenium-hub-deployment.yaml
# Start Service
kubectl create --filename=selenium-hub-svc.yaml
# Start Selenium Nodes
sleep 40s
kubectl create --filename=selenium-node-chrome-deployment.yaml
# kubectl create --filename=selenium-node-firefox-deployment.yaml
kubectl describe service selenium-hub