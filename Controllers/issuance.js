import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await prisma.issuance.findMany();
        res.json(issuedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const issueBook = async (req, res) => {
    try {
        let { book_id, issuance_date, issuance_member_id, issued_by, target_return_date, issuance_status } = req.body;
        
        // Convert to numbers
        book_id = parseInt(book_id, 10);
        issuance_member_id = parseInt(issuance_member_id, 10);

        const existingBook = await prisma.book.findUnique({
            where: { book_id },
        });

        if (!existingBook) {
            return res.status(400).json({ error: "Invalid book_id. Book does not exist." });
        }

        const existingMember = await prisma.member.findUnique({
            where: { mem_id: issuance_member_id },
        });

        if (!existingMember) {
            return res.status(400).json({ error: "Invalid issuance_member. Member does not exist." });
        }

        const newIssuance = await prisma.issuance.create({
            data: {
                issuance_date: new Date(issuance_date),
                issued_by,
                target_return_date: new Date(target_return_date),
                issuance_status,
                book: { connect: { book_id } },
                issuance_member: { connect: { mem_id: issuance_member_id } },
            }
        });

        res.status(201).json(newIssuance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const updateIssuance = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIssuance = await prisma.issuance.update({
            where: { issuance_id: parseInt(id) },
            data: req.body
        });

        res.json({ message: "Issuance updated successfully", updatedIssuance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteIssuance = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.issuance.delete({
            where: { issuance_id: parseInt(id) }
        });

        res.json({ message: "Issuance deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
