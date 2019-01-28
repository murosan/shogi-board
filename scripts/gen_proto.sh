#!/bin/bash -e
# フロント用 TypeScript gRPC 生成スクリプト

dir=$(cd $(dirname $0); pwd)
parent=$(cd $dir/..; pwd)

version=v1

outdir=$parent/src/proto
mkdir -p $outdir

protoc \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:$outdir \
  --proto_path=$parent/shogi-board-protobufs/protos \
  $version.proto
