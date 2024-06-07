package database

import (
	"log"
	"os"

	"github.com/shiibs/go-react-blog-post/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	
	dsn := os.Getenv("dsn")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic("Database connection faild")
	}

	log.Println("Connection successful")

	db.AutoMigrate(new(model.Blog))

	DBConn = db
}