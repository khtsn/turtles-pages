package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	//get all files from current directory
	files, err := os.ReadDir(".")
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if !strings.Contains(file.Name(), ".json") {
			continue
		}
		dat, _ := os.ReadFile(file.Name())

		var meta struct {
			Name        string `json:"name"`
			Description string `json:"description"`
			Image       string `json:"image"`
			Dna         string `json:"dna"`
			Edition     int    `json:"edition"`
			Date        int64  `json:"date"`
			Attributes  []struct {
				TraitType string `json:"trait_type"`
				Value     string `json:"value"`
			} `json:"attributes"`
		}

		json.Unmarshal(dat, &meta)
		meta.Name = fmt.Sprintf("Turtle NFT #%d", meta.Edition-1)
		meta.Description = "Non-profit 10,625 piece collection with 216 traits living on the Cronos Blockchain using an ERC721 contract. Hand drawn art. Original branding, not a derivative."

		out, _ := json.Marshal(meta)
		err = os.WriteFile(fmt.Sprintf("new/%s", file.Name()), out, 0644)
		if err != nil {
			log.Fatal(err)
		}
	}
}
