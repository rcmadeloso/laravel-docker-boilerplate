# About
This laravel-docker-boilerplate repository is made to serve as my personal guide as well as a guide for my Junior Developers on how to easily build a Laravel Application using docker compose.

## Setup
First, ensure that [Docker Desktop](https://www.docker.com/) is installed on your system, and then proceed to clone this repository.

After cloning this repository, navigate to the directory in your terminal and use the command `docker-compose up -d --build app` to spin up the containers for the web server.

`--build app` makes it so that only our site's/app containers are brought up when starting.

- **nginx** - `:80`
- **mysql** - `:3306`
- **php** - `:9000`
- **redis** - `:6379`
- **mailhog** - `:8025` 

This boilerplate includes containers that can handle  Composer, NPM, and Artisan commands -- so you can run certain commands without having these installed on your host machine. You can use these commands by prepending `docker-compose run --rm` + `original command` . Example commands would be as follows:

- `docker-compose run --rm composer update`
- `docker-compose run --rm npm run dev`
- `docker-compose run --rm artisan migrate`


## Where should your Laravel app files go:

- Go into the `src` folder created with this repo.
- Read the instructions on the `README.MD` file.


## Config files and .env:

If you are having any problems running mysql & redis for your laravel application, you can simply get some reference on the files inside the `laravel-app-files` folder. The folder contains the following:

- `.env` with all working environment variables
- config `app` folder that contains working variables you can use to setup your appliaction


## Vite/Mix Assets

Before you run and compile your assests, you first need to add ` --host` (idea is the same for both laravel mix and vite) after the end of your relevant dev command in `package.json`. So for example, with a Laravel project using Vite, it should be:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build"
},
```

If you want to make your code changes be compiled in real time you may also need to modify the `vite.config.js` file  and add the following lines of code:

```json
    server: {
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true
        }
    },
```

Run the following commands to install your dependencies and start the dev/local server:

- `docker-compose run --rm npm install`
- `docker-compose run --rm --service-ports npm run dev`

Assets should now compile like usual and you should be able to use `@vite` directives to enable hot-module reloading on your local Laravel application.

To build assests for production you can instead run `docker-compose run --rm npm run build`.


## MySQL

If you do not take any additional steps, your MySQL data will be deleted when you bring down the Docker container. However, if you prefer to keep the data persistent even after containers are down and restarted, you can create a `mysql` folder in the same directory as your docker-compose.yml file. This has already been taken care of in this repository. If you don't want to retain data as soon as the container is down, you can follow these steps:

- Delete the `mysql` folder.
- Remove this line in your `docker-compose.yml` mysql service:

    `volumes:
      - ./mysql:/var/lib/mysql`


## Redis

If you encounter any issues while running redis. Try to copy the variables inside the `laravel-app-files` folder inside the `.env` and the config files.


## MailHog

This boilerplate also has mailhog included. You can use mailhog to test emails and for general SMTP work on a local environment.

You can access mailhog at [localhost:8025](http://localhost:8025) after running `docker-compose up -d site`.


## Something to note (Building with Laravel 9 + Vite)

Might be an isolated one, however I noticed that for my Laravel Applications running Laravel 9 onwards with vite as the assets compiler, loading or reloading pages take so much time. For these applications I chose to run it on Vagrant Homestead instead. However, creating a Docker Container for these applications are still helpful espicially when it comes to setting up a production/live version.


## Credits

I do not take full credit. Most of the files in this repository were not made by me, most of the common issues fixes code were taken from various sources online: github issues, stackoverflow, these sources below have been a great help 👍.

Sources:
- https://dev.to/aschmelyun/the-beauty-of-docker-for-local-laravel-development-13c0
- https://engineering.carsguide.com.au/how-to-dockerize-a-laravel-application-77a24ba669c5
- https://www.cloudsigma.com/deploying-laravel-nginx-and-mysql-with-docker-compose/
- https://stackoverflow.com/questions/40561433/docker-mysql-2002-connection-refused
- https://github.com/vitejs/vite/discussions/9155
- https://aregsar.com/blog/2020/laravel-app-with-redis-in-docker/