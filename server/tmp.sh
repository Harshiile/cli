#!/bin/zsh
set -e

ARCH=$(uname -m)
OS=$(uname | tr '[:upper:]' '[:lower:]')

echo $ARCH
echo $OS