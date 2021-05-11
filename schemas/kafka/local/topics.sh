#!/usr/bin/env bash
set -e

KAFKA_HOME=/opt/kafka

${KAFKA_HOME}/bin/kafka-topics.sh --create --partitions 2 --replication-factor 1 --zookeeper zookeeper:2181 --topic order.order
