const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCollection = async (req, res) => {
  try {
    const { collection_name } = req.body;

    const collection = await prisma.collection.create({
      data: { collection_name },
    });

    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Error creating collection", details: error });
  }
};

exports.getAllCollections = async (req, res) => {
  try {
    const collections = await prisma.collection.findMany();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: "Error fetching collections" });
  }
};
