# gazelle:repo bazel_gazelle
workspace(name = "com_github_eggybytes_events")

load("@bazel_tools//tools/build_defs/repo:git.bzl", "new_git_repository")
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

BAZEL_SKYLIB_VERSION = "1.0.3"  # 2020-08-27

http_archive(
    name = "bazel_skylib",
    sha256 = "7ac0fa88c0c4ad6f5b9ffb5e09ef81e235492c873659e6bb99efb89d11246bcb",
    strip_prefix = "bazel-skylib-%s" % BAZEL_SKYLIB_VERSION,
    urls = ["https://github.com/bazelbuild/bazel-skylib/archive/%s.tar.gz" % BAZEL_SKYLIB_VERSION],
)

load("@bazel_skylib//lib:versions.bzl", "versions")

versions.check(
    minimum_bazel_version = "4.0.0",  # 2021-01-21
    maximum_bazel_version = "4.0.0",
)

RULES_GO_VERSION = "v0.27.0"  # 2021-03-18

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "69de5c704a05ff37862f7e0f5534d4f479418afc21806c887db544a316f3cb6b",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/%s/rules_go-%s.tar.gz" % (RULES_GO_VERSION, RULES_GO_VERSION),
        "https://github.com/bazelbuild/rules_go/releases/download/%s/rules_go-%s.tar.gz" % (RULES_GO_VERSION, RULES_GO_VERSION),
    ],
)

# Get Gazelle
GAZELLE_VERSION = "v0.23.0"  # 2021-03-08

http_archive(
    name = "bazel_gazelle",
    sha256 = "62ca106be173579c0a167deb23358fdfe71ffa1e4cfdddf5582af26520f1c66f",
    urls = [
        "https://storage.googleapis.com/bazel-mirror/github.com/bazelbuild/bazel-gazelle/releases/download/%s/bazel-gazelle-%s.tar.gz" % (GAZELLE_VERSION, GAZELLE_VERSION),
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/%s/bazel-gazelle-%s.tar.gz" % (GAZELLE_VERSION, GAZELLE_VERSION),
    ],
)

# Get protobuf and proto rules
PROTOBUF_VERSION = "3.15.8"  # 2021-04-09

http_archive(
    name = "com_google_protobuf",
    sha256 = "dd513a79c7d7e45cbaeaf7655289f78fd6b806e52dbbd7018ef4e3cf5cff697a",
    strip_prefix = "protobuf-%s" % PROTOBUF_VERSION,
    url = "https://github.com/protocolbuffers/protobuf/archive/v%s.zip" % PROTOBUF_VERSION,
)

RULES_PROTO_VERSION = "f7a30f6f80006b591fa7c437fe5a951eb10bcbcf"  # 2021-02-09

http_archive(
    name = "rules_proto",
    sha256 = "9fc210a34f0f9e7cc31598d109b5d069ef44911a82f507d5a88716db171615a8",
    strip_prefix = "rules_proto-%s" % RULES_PROTO_VERSION,
    url = "https://github.com/bazelbuild/rules_proto/archive/%s.tar.gz" % RULES_PROTO_VERSION,
)

# Load Go rules
load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains(
    go_version = "1.16",
    nogo = "@//:go_nogo",
)

# Load Gazelle
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()

# Load Protobuf rules
load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")

rules_proto_dependencies()

rules_proto_toolchains()

# Go package dependencies

go_repository(
    name = "com_github_segmentio_kafka_go",
    importpath = "github.com/segmentio/kafka-go",
    strip_prefix = "kafka-go-9a279b79b300382910de1187ffd4c6d49d90fa8a",
    # v0.4.15, 2021-04-23
    urls = ["https://github.com/segmentio/kafka-go/archive/9a279b79b300382910de1187ffd4c6d49d90fa8a.tar.gz"],
    sha256 = "e414fb961f225e244a44cc48102fd8fc0feedc3ef8456dcc0203378be7139b4b",
)

# required by @com_github_segmentio_kafka_go
go_repository(
    name = "com_github_klauspost_compress",
    importpath = "github.com/klauspost/compress",
    strip_prefix = "compress-8e10930e6437b52d89fd0e97d03411ea3a7df2fe",
    # v1.12.2, 2021-04-27
    urls = ["https://github.com/klauspost/compress/archive/8e10930e6437b52d89fd0e97d03411ea3a7df2fe.tar.gz"],
    sha256 = "d5f35f8631fbb1528a7f1ed82dcb5812aca54cf89b75341410bd7e35c6cfd702",
)

# required by @com_github_segmentio_kafka_go
go_repository(
    name = "com_github_golang_snappy",
    importpath = "github.com/golang/snappy",
    strip_prefix = "snappy-674baa8c7fc30da5df3074a459494a7e6b427dff",
    # v0.0.3, 2020-11-03
    urls = ["https://github.com/golang/snappy/archive/674baa8c7fc30da5df3074a459494a7e6b427dff.tar.gz"],
    sha256 = "e484dddfe4543ad160c9a2a5452e1034e5e5340bb565afefcccf4d97895297a9",
)

# required by @com_github_segmentio_kafka_go
go_repository(
    name = "com_github_pierrec_lz4",
    importpath = "github.com/pierrec/lz4",
    strip_prefix = "lz4-0e583d326e0ec6b9c1ad223188dc709af385408e",
    # v2.6.0, 2020-10-31
    urls = ["https://github.com/pierrec/lz4/archive/0e583d326e0ec6b9c1ad223188dc709af385408e.tar.gz"],
    sha256 = "cfc0747aa902b1ad5bc4470b8efa4037065a56f44fa97134fb8cce57a9925472",
)

go_repository(
    name = "org_golang_google_grpc",
    build_file_proto_mode = "disable",
    importpath = "google.golang.org/grpc",
    # v1.37.0, 2021-04-08
    strip_prefix = "grpc-go-daba80583807e692013f3fd884092e77413705f1",
    urls = ["https://github.com/grpc/grpc-go/archive/daba80583807e692013f3fd884092e77413705f1.tar.gz"],
    sha256 = "58ef43d2574c9b4df188a5d3133e9dc0123350c515021c44d660fa2f6dbff2b6",
)

go_repository(
    name = "org_golang_google_grpc_cmd_protoc_gen_go_grpc",
    importpath = "google.golang.org/grpc/cmd/protoc-gen-go-grpc",
    sum = "h1:lQ+dE99pFsb8osbJB3oRfE5eW4Hx6a/lZQr8Jh+eoT4=",
    version = "v1.0.0",
)

go_repository(
    name = "com_github_improbable_eng_grpc_web",
    importpath = "github.com/improbable-eng/grpc-web",
    strip_prefix = "grpc-web-3df58f4ba90dec32f33a7650db20ceaa6e02b23f",
    # v0.12.0
    urls = ["https://github.com/improbable-eng/grpc-web/3df58f4ba90dec32f33a7650db20ceaa6e02b23f.tar.gz"],
    sha256 = "43121f3d4e309fcbfa60ca453882048b0bcd6642ede1ef9a8523ade471559790",
)

# required by @com_github_improbable_eng_grpc_web
go_repository(
    name = "com_github_gorilla_websocket",
    importpath = "github.com/gorilla/websocket",
    strip_prefix = "websocket-b65e62901fc1c0d968042419e74789f6af455eb9",
    # v1.4.2
    urls = ["https://github.com/gorilla/websocket/archive/b65e62901fc1c0d968042419e74789f6af455eb9.tar.gz"],
    sha256 = "1ddad678f109427e81506637c42f1e24d5cc5ea4dd58533bb5ef45e0e5068133",
)

# required by @com_github_improbable_eng_grpc_web
go_repository(
    name = "com_github_rs_cors",
    importpath = "github.com/rs/cors",
    strip_prefix = "cors-db0fe48135e83b5812a5a31be0eea66984b1b521",
    # v1.7.0, 2019-08-08
    urls = ["https://github.com/rs/cors/archive/db0fe48135e83b5812a5a31be0eea66984b1b521.tar.gz"],
    sha256 = "a885b9e91ba5f6caced66ce3bd37b28389e03ef90414155a505c5d4362461655",
)

# required by @com_github_improbable_eng_grpc_web
go_repository(
    name = "com_github_desertbit_timer",
    importpath = "github.com/desertbit/timer",
    strip_prefix = "timer-c41aec40b27f0eeb2b94300fffcd624c69b02990",
    # 2018-01-07
    urls = ["https://github.com/desertbit/timer/archive/c41aec40b27f0eeb2b94300fffcd624c69b02990.tar.gz"],
    sha256 = "170d1beb84bc856da2e894228accbcb2a0fd013e116c537d54f3d921a1d9d8ba",
)
