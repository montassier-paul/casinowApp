# Use below nginx version
FROM nginx:alpine
# Copy the build folder of the react app
COPY ./build /var/www
# Copy the ngnix configrations
COPY deployments/nginx.conf /etc/nginx/nginx.conf
# Expose it on port 8080
EXPOSE 8080
ENTRYPOINT ["nginx","-g","daemon off;"]