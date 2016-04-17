#!/bin/sh

# Put this in the directory in which you extracted the STANFORD NER package.

scriptdir=`dirname $0`

# Configure classifiers and port to your need

java -mx1000m -cp "$scriptdir/stanford-ner.jar:$scriptdir/lib/*" edu.stanford.nlp.ie.NERServer  -loadClassifier $scriptdir/classifiers/english.muc.7class.distsim.crf.ser.gz -port 8080 -outputFormat inlineXML

