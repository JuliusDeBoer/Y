package main

import (
	"fmt"
	"time"

	"github.com/labstack/echo/v4"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Product struct {
  gorm.Model
  Code  string
  Price uint
}

func setupDb() *gorm.DB {
	dsn := "host=y.db user=postgres password=password dbname=y port=5432 sslmode=disable"

	i := 10
	for i > 1 {
		tmpDb, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

		if err != nil {
			i--

			msg := fmt.Sprintf("ERROR: Could not connect to database. Retrying... %d (tries left)", i)
			fmt.Println(msg)

			time.Sleep(3 * time.Second)
			continue
		}

		return tmpDb
	}

	panic("FATAL: Could not connect to database. Giving up")
}

func main() {
	e := echo.New()

	db := setupDb()

	prefix := "v1"

	setupPosts(e, db, prefix + "/posts")

	e.Logger.Fatal(e.Start(":1323"))
}
