FROM nginx:latest

# Copy React build files into nginx
COPY build/ /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
