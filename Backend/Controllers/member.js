const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllMembers = async function (req, res) {
    const members = await prisma.member.findMany();
    res.json(members);
};

exports.createMember = async function (req, res) {
    const { mem_name, mem_phone, mem_email } = req.body;
    const member = await prisma.member.create({ data: { mem_name, mem_phone, mem_email } });
    res.json(member);
};

exports.updateMember = async function (req, res) {
    const { id } = req.params;
    const updatedMember = await prisma.member.update({ where: { mem_id: Number(id) }, data: req.body });
    res.json(updatedMember);
};

exports.deleteMember = async function (req, res) {
    const { id } = req.params;
    await prisma.member.delete({ where: { mem_id: Number(id) } });
    res.json({ message: "Member deleted successfully" });
};
