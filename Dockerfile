FROM nikolaik/python-nodejs:latest

ARG CUSTOM_ENV

ENV CUSTOM_ENV=${YOUR_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.1.5

RUN pip3 install "poetry==${POETRY_VERSION}"

COPY ./backend/poetry.lock ./backend/pyproject.toml /app/backend/
WORKDIR /app/backend
RUN poetry install $(test "$YOUR_ENV" == production && echo "--no-dev") --no-interaction --no-ansi


COPY ./frontend/yarn.lock ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN yarn install

COPY . /app/
WORKDIR /app

EXPOSE 3000 5000
