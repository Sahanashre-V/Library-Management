import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllMemberships = async (req, res) => {
    try {
        const memberships = await prisma.membership.findMany();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMembership = async (req, res) => {
    try {
        const { member_id, status } = req.body;
        const existingMember = await prisma.member.findUnique({
            where: { mem_id: member_id },  
        });

        if (!existingMember) {
            return res.status(400).json({ error: "Invalid member_id. Member does not exist." });
        }

        const newMembership = await prisma.membership.create({
            data: { member_id: member_id, status },
        });

        res.status(201).json(newMembership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMembership = await prisma.membership.update({
            where: { membership_id: parseInt(id) },
            data: req.body
        });

        res.json({ message: "Membership updated successfully", updatedMembership });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteMembership = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.membership.delete({
            where: { membership_id: parseInt(id) }
        });

        res.json({ message: "Membership deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
