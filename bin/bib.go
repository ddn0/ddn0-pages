package main

import (
	"encoding/json"
	"encoding/xml"
	"flag"
	"io"
	"io/ioutil"
	"log"
	"os"
	"sort"
	"time"

	"github.com/ghodss/yaml"
	"golang.org/x/net/html/charset"
)

type dblpPerson struct {
	Records []*dblpEnvelope `xml:"r"`
}

type dblpEnvelope struct {
	R *dblpRecord `xml:",any"`
}

type dblpTime time.Time

var (
	_ xml.Unmarshaler     = (*dblpTime)(nil)
	_ xml.UnmarshalerAttr = (*dblpTime)(nil)
)

func (t *dblpTime) Time() time.Time {
	if t == nil {
		return time.Time{}
	}
	return time.Time(*t)
}

func (t *dblpTime) parse(raw string) error {
	p, err := time.Parse("2006-01-02", raw)
	if err != nil {
		return err
	}
	*t = dblpTime(p)
	return nil
}

func (t *dblpTime) UnmarshalXML(dec *xml.Decoder, start xml.StartElement) error {
	var raw string
	if err := dec.DecodeElement(dec, &start); err != nil {
		return err
	}
	return t.parse(raw)
}

func (t *dblpTime) UnmarshalXMLAttr(attr xml.Attr) error {
	return t.parse(attr.Value)
}

func (t dblpTime) MarshalJSON() ([]byte, error) {
	return json.Marshal(time.Time(t))
}

func (t *dblpTime) UnmarshalJSON(bs []byte) error {
	var raw string
	if err := json.Unmarshal(bs, &raw); err != nil {
		return err
	}
	return t.parse(raw)
}

type dblpRecord struct {
	Key          string   `xml:"key,attr" json:"key"`
	MDate        dblpTime `xml:"mdate,attr" json:"mdate"`
	Authors      []string `xml:"author" json:"authors"`
	Title        string   `xml:"title" json:"title"`
	Year         string   `xml:"year" json:"year"`
	URL          string   `xml:"url" json:"url"`
	EE           string   `xml:"ee" json:"ee"`
	BookTitle    string   `xml:"booktitle" json:"booktitle"`
	CrossRef     string   `xml:"crossref" json:"crossref"`
	Preprint     string   `xml:"preprint" json:"preprint"`
	Presentation string   `xml:"presentation" json:"presentation"`
}

func readRecords(in io.Reader) ([]*dblpRecord, error) {
	dec := xml.NewDecoder(in)
	dec.CharsetReader = charset.NewReaderLabel
	var person dblpPerson

	if err := dec.Decode(&person); err != nil {
		return nil, err
	}

	var records []*dblpRecord
	for _, r := range person.Records {
		records = append(records, r.R)
	}
	return records, nil
}

func mergeData(in io.Reader, records []*dblpRecord) ([]*dblpRecord, error) {
	var merges []*dblpRecord
	bs, err := ioutil.ReadAll(in)
	if err != nil {
		return nil, err
	}

	if err := yaml.Unmarshal(bs, &merges); err != nil {
		return nil, err
	}

	mergeMap := make(map[string]*dblpRecord)
	for _, v := range merges {
		mergeMap[v.Key] = v
	}

	for _, r := range records {
		m, ok := mergeMap[r.Key]
		if !ok {
			continue
		}
		r.Preprint = m.Preprint
		r.Presentation = m.Presentation
		delete(mergeMap, r.Key)
	}

	for _, r := range mergeMap {
		records = append(records, r)
	}

	return records, nil
}

func main() {
	var dblpFilename string
	var mergeFilename string
	var outputFilename string

	flag.StringVar(&dblpFilename, "dblp-xml", "", "Bibliography data XML URL")
	flag.StringVar(&mergeFilename, "merge-yaml", "", "Extra fields to be merged into bibliography")
	flag.StringVar(&outputFilename, "output", "output.json", "Output JSON filename")

	flag.Parse()

	dblpFile, err := os.Open(dblpFilename)
	if err != nil {
		log.Fatal(err)
	}
	defer dblpFile.Close()

	records, err := readRecords(dblpFile)
	if err != nil {
		log.Fatal(err)
	}

	if len(mergeFilename) != 0 {
		mergeFile, err := os.Open(mergeFilename)
		if err != nil {
			log.Fatal(err)
		}
		defer mergeFile.Close()
		records, err = mergeData(mergeFile, records)
		if err != nil {
			log.Fatal(err)
		}
	}

	sort.Slice(records, func(i, j int) bool {
		return records[i].MDate.Time().After(records[j].MDate.Time())
	})

	bs, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	if err := ioutil.WriteFile(outputFilename, bs, 0666); err != nil {
		log.Fatal(err)
	}

}
