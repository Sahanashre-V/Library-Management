const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBook = async (req, res) => {
  try {
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

    const categoryExists = await prisma.category.findUnique({
      where: { cat_id: book_cat_id },
    });

    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const collectionExists = await prisma.collection.findUnique({
      where: { collection_id: book_collection_id },
    });

    if (!collectionExists) {
      return res.status(400).json({ error: "Invalid collection ID" });
    }

    const book = await prisma.book.create({
      data: { 
        book_name, 
        book_cat_id, 
        book_collection_id, 
        book_launch_date: new Date(book_launch_date), 
        book_publisher 
      },
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error creating book", details: error });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        category: { select: { cat_name: true } },
        collection: { select: { collection_name: true } },
      },
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
};
