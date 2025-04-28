FROM php:8.2-apache

COPY ./final_project/ /var/www/html/

# Set working directory
WORKDIR /var/www/html

# Install MariaDB/MySQL client libraries and mysqli extension
RUN apt-get update -y && \
    apt-get install -y libmariadb-dev && \
    docker-php-ext-install mysqli

# Enable Apache mod_rewrite if you're using it
RUN a2enmod rewrite

# Fix permissions: set proper ownership and access
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html
