const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  try {
    const { cat_name } = req.body;
    const category = await prisma.category.create({
      data: { cat_name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category", details: error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};
