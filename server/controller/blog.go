package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-react-blog-post/database"
	"github.com/shiibs/go-react-blog-post/model"
)

// List all blogs
func BlogList(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"message": "Blog List",
	}

	
	db := database.DBConn

	var records []model.Blog

	db.Find(&records)

	context["blog_records"] = records

	c.Status(200)
	return c.JSON(context)
}

// Add ablog to db
func BlogCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"message": "Add a Blog ",
	}

	record := new(model.Blog)

	if err := c.BodyParser(record); err != nil {
		log.Println("Error in parsing request")
		context["statusText"] = ""
		context["message"] = "Error in parsing request"
		return c.JSON(context)
	}

	// file upload
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("Error in file upload", err)
		
	}

	if file.Size > 0 {
		filename := "./static/uploads/"+file.Filename

		if err = c.SaveFile(file, filename); err != nil {
			log.Println("Error in file upload", err)
		}

		record.Image = filename
	}

	result := database.DBConn.Create(record)

	if result.Error != nil {
		log.Println("Error in saving data")
		context["statusText"] = ""
		context["message"] = "Error in saving data"
		return c.JSON(context)
	}

	context["data"] = record
	context["message"] = "Record is saved successfully"
	c.Status(201)
	return c.JSON(context)

}

// Upadte a blog to db
func BlogUpdate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "OK",
		"message": "Update blog",
	}

	id := c.Params("id")

	record := new(model.Blog)

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["statusText"] = ""
		context["message"] = "Record Not Found"
		c.Status(400)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request")
		context["statusText"] = ""
		context["message"] = "Error in parsing request"
		return c.JSON(context)
	}

	result := database.DBConn.Save(record)

	if result.Error != nil {
		log.Println("Error in saving data")
		context["statusText"] = ""
		context["message"] = "Error in saving data"
		return c.JSON(context)
	}
	
	context["data"] = record
	context["message"] = "Record updated successfully"
	c.Status(200)
	return c.JSON(context)

}

// delete a blog
func BlogDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "",
		"message": "",
	}

	id := c.Params("id")

	record := new(model.Blog)

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["message"] = "Record Not Found"
		c.Status(400)
		return c.JSON(context)
	}

	result := database.DBConn.Delete(record)

	if result.Error != nil {
		log.Println("Something went wrong")
		context["message"] = "something went wrong"
		return c.JSON(context)
	}

	context["statusText"] = "OK"
	context["message"] = "Blog deleted successfully"
	c.Status(200)
	return c.JSON(context)

}

// GetBlogByID get a blog by id
func GetBlogByID(c *fiber.Ctx) error{
	context := fiber.Map{
		"statusText": "",
		"message": "",
	}

	id := c.Params("id")
	record := new(model.Blog)

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["message"] = "Record Not Found"
		c.Status(404)
		return c.JSON(context)
	}

	context["blog_detail"] = record
	context["statusText"] = "OK"
	context["message"] = "Blog Detail"
	c.Status(200)
	return c.JSON(context)
}