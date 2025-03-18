const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.issuance.createMany({
    data: [
      { issuance_member_id: 2, book_id: 2, issued_by: "Librarian_110", issuance_date: new Date("2024-03-01"), target_return_date: new Date("2024-04-01"), issuance_status: "Pending" }
    ]
  });

}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
