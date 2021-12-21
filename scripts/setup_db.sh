#!/bin/bash


yarn db:create --url postgres://postgres:postgres@localhost:5400/juniper-gd-dev;
yarn db:migrate --url postgres://postgres:postgres@localhost:5400/juniper-gd-dev;