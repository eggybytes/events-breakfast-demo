# 🥞 eggybytes/events-breakfast-demo 🥞

An example of two microservice architectures: a synchronous, coupled request/response approach and an asynchronous, less-coupled event-driven approach.

**For more:**
- 📃 Read [the corresponding blog post/talk](https://eggybits.com/posts/events-first) for more detail on why/how this exists
- 📺 Watch the [video walkthrough of this demo](https://youtu.be/ho9ECfQQA18?t=1585) to see how it works

### Contents
- [Tools needed](#tools-needed) to run this whole thing
  - [Bazelisk](#bazelisk) for the Go backend
  - [Minikube setup](#minikube-setup) for the events broker
  - [Frontend tools](#frontend-tools) for the webapp
- [How to build and run](#how-to-build-and-run)
  - [Deploy Kafka to minikube](#deploy-kafka-to-minikube)
  - [Run the synchronous version of the microservices](#run-the-synchronous-version-of-the-microservices)
  - [Run the asynchronous version of the microservices](#run-the-asynchronous-version-of-the-microservices)
  - [Build the webapp](#build-the-webapp)
  - [Serve the webapp](#serve-the-webapp)
- [Clean up and destroy everything](#clean-up-and-destroy-everything)

## Tools needed

### [Bazelisk](https://github.com/bazelbuild/bazelisk)

Set up `bazelisk`:
```shell
brew tap bazelbuild/tap
brew install bazelisk
```

Verify that `bazel` points to `bazelisk`:
```shell
$ which bazel
/usr/local/bin/bazel
melinda at mmbp in ~/events on ml-add-bazel*
$ ls -l /usr/local/bin/bazel
lrwxr-xr-x  1 melinda  admin  34 May  11 11:33 /usr/local/bin/bazel -> ../Cellar/bazelisk/1.6.1/bin/bazel
```

### Minikube setup

Install minikube, make Hyperkit the default driver, and give it more than the default amount of RAM:

```shell
brew install minikube
minikube config set driver hyperkit
minikube config set memory 2048 # 2 GB
```

To start minikube:

```shell
minikube start
```

To stop minikube:

```shell
minikube stop
```

### Frontend tools

Install [Yarn](https://yarnpkg.com/en/) and [Node](https://nodejs.org/en/) if you don't have them.

Then install the dependencies for the frontend app:
```shell
# from the js/ directory
yarn install
```

## How to build and run

### Deploy Kafka to minikube

This deploys a clean version (nothing specific to this demo) of Kafka and Zookeeper to Kubernetes.

```shell
kubectl apply -f deployments/kafka.yaml
```

### Create our Kafka topic

```shell
kubectl exec -it kafka-0 -- bash
# from kafka/local/topics.sh
/opt/kafka/bin/kafka-topics.sh --create --partitions 2 --replication-factor 1 --zookeeper zookeeper:2181 --topic order.order
```

### Run the synchronous version of the microservices

```shell
bazel run //go/services/order-sync:api
```

```shell
bazel run //go/services/payment:api
```

```shell
bazel run //go/services/delivery:api
```

### Run the asynchronous version of the microservices

```shell
bazel run //go/services/order-async:api
```

```shell
bazel run //go/workers/payment:worker
```

```shell
bazel run //go/workers/delivery:worker
```

### Build the webapp

To build the `breakfast-webapp` app:
```shell
# from the js/ directory
yarn build
```

### Serve the webapp

To actually serve the `breakfast-webapp` app (won't work unless you build first):
```shell
# from the js/ directory
yarn start
```

## Clean up and destroy everything

```shell
minikube delete
```
