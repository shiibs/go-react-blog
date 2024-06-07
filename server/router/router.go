package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-react-blog-post/controller"
)

// Setup routing info
func SetupRoutes(app *fiber.App) {
	app.Get("/", controller.BlogList)
	app.Get("/:id", controller.GetBlogByID)
	app.Post("/", controller.BlogCreate)
	app.Put("/:id", controller.BlogUpdate)
	app.Delete("/:id", controller.BlogDelete)
	
}