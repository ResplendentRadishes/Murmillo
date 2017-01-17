--How to set up the docker container--
make sure you are running these commands from inside the codeCheck folder

first, build the image:
npm run build-image
*or*
docker build -t code-check:dev .

then, create a container from the image:
npm run container
*or*
docker run -d --name code-check -p 8510:8510 code-check:dev

--Other useful commands--

to see all docker containers currently running:
docker ps

to stop this docker container:
docker stop code-check

to remove this docker container after it is stopped:
docker rm code-check
