FROM ubuntu:18.04

ENV K8S_CLIENT_VERSION=1.15.5

RUN set -ex; \
  runDeps='curl ca-certificates procps netcat'; \
  apt-get update && apt-get install -y $runDeps --no-install-recommends; \
  rm -rf /var/lib/apt/lists/*; \
  curl -sLS -o k8s.tar.gz -k https://dl.k8s.io/v${K8S_CLIENT_VERSION}/kubernetes-client-linux-amd64.tar.gz; \
  tar -xvzf k8s.tar.gz -C /usr/local/bin/ --strip-components=3 kubernetes/client/bin/kubectl; \
  rm k8s.tar.gz; \
  rm /var/log/dpkg.log /var/log/apt/*.log
