package main


import (
	"net/http"

	"github.com/labstack/echo/v4"

	"gorm.io/gorm"
)

func setupPosts(e *echo.Echo, db *gorm.DB, prefix string) {
	e.GET(prefix, func(c echo.Context) error {
		return c.String(http.StatusOK, "Much posts. Such API")
	})
}
