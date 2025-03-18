import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  try {
    let { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
    book_cat_id = Number(book_cat_id);
    book_collection_id = Number(book_collection_id);

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


export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({});

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
    const existingBook = await prisma.book.findUnique({
      where: { book_id: parseInt(id) },
    });

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedBook = await prisma.book.update({
      where: { book_id: parseInt(id) },
      data: {
        book_name,
        book_cat_id: parseInt(book_cat_id),
        book_collection_id,
        book_launch_date: new Date(book_launch_date),
        book_publisher,
      },
    });

    res.json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Error updating book", details: error.message });
  }
};