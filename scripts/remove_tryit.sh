#!/bin/sh

if [ "$#" -ne 1 ]; then
    echo "Usage: ${0} TESTDIR"
    exit 1
fi

find ${1} -name '*.js' -execdir sed -i '/Try It/d' {} \;
