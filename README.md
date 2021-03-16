# Deprecated
Go to [**na_visualization_frontend**](github.com/lsdluis1/na_visualizaiton_frontend) and 
[**na_visualization_backend**](github.com/lsdluis1/na_visualizaiton_backend) instead of this repo.

This Repo will not be updated sustainably since 2021/03/16
# Interactive interpolation plotter

## Install poetry, a python dependency manager

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

## Install python dependencies

```
cd backend
poetry install
```

## Install js dependencies

```
cd frontend
yarn install
```

## Start frontend server

```
cd frontend
yarn start
```

## Start backend server

```
cd backend
poetry run python main.py
```

## Build docker image

```
docker build -t na-visualization:latest
```

## Run docker containers

### Run frontend

```
docker run -d -p 3000:3000 na-visualization:latest bash cd /app/frontend && yarn start
```

### Run backend

```
docker run -d -p 5000:5000 na-visualization:latest bash cd /app/backend && poetry run python main.py
```
