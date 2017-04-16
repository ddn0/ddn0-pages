
serve:
	polymer serve

build: data/publications.json
	polymer build --add-service-worker

docs: build
	rm -rf docs && mv build/default docs

data/publications.json: bin/bib.go conf/NguyenDonald.xml conf/merge.yaml
	go run bin/bib.go \
	  -dblp-xml conf/NguyenDonald.xml \
	  -merge-yaml conf/merge.yaml \
	  -output $@

test:
	npm test

.PHONY: build test docs
