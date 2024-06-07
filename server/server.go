package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/shiibs/go-react-blog-post/database"
	"github.com/shiibs/go-react-blog-post/router"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error in loading .env file", err)
	}
	
	

	database.ConnectDB()
}

func main() {

	psqlDB, err := database.DBConn.DB()

	if err != nil {
		panic("error in database connection")
	}
	defer psqlDB.Close()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())

	router.SetupRoutes(app)

	app.Listen(":8000")
	
}