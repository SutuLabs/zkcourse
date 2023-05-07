package main

import (
	"fmt"
	"log"
	"math/big"
	"net/http"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	u := r.URL.Path[1:]
	s := strings.Split(u, "/")
	si, err := sliceAtoi(s)
	if err != nil {
		fmt.Fprintf(w, "error %s!", u)
	}
	h, err := Hash(si)
	if err != nil {
		fmt.Fprintf(w, "error %s!", u)
	}

	fmt.Fprintf(w, "%s", h)
}

func sliceAtoi(sa []string) ([]*big.Int, error) {
	si := make([]*big.Int, 0, len(sa))
	for _, a := range sa {
		n := new(big.Int)
		n, ok := n.SetString(a, 10)
		if !ok {
			fmt.Println("SetString: error")
			return si, nil
		}
		si = append(si, n)
	}
	return si, nil
}

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
