const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.issuance.createMany({
    data: [
      { issuance_member_id: 1, book_id: 3, issued_by: "Librarian_101", issuance_date: new Date("2024-01-10"), target_return_date: new Date("2024-02-10"), issuance_status: "Returned" },
      { issuance_member_id: 2, book_id: 5, issued_by: "Librarian_102", issuance_date: new Date("2024-01-15"), target_return_date: new Date("2024-02-15"), issuance_status: "Pending" },
      { issuance_member_id: 3, book_id: 2, issued_by: "Librarian_103", issuance_date: new Date("2024-01-20"), target_return_date: new Date("2024-02-20"), issuance_status: "Returned" },
      { issuance_member_id: 4, book_id: 7, issued_by: "Librarian_104", issuance_date: new Date("2024-02-01"), target_return_date: new Date("2024-03-01"), issuance_status: "Pending" },
      { issuance_member_id: 5, book_id: 1, issued_by: "Librarian_105", issuance_date: new Date("2024-02-05"), target_return_date: new Date("2024-03-05"), issuance_status: "Overdue" },
      { issuance_member_id: 6, book_id: 4, issued_by: "Librarian_106", issuance_date: new Date("2024-02-10"), target_return_date: new Date("2024-03-10"), issuance_status: "Pending" },
      { issuance_member_id: 7, book_id: 6, issued_by: "Librarian_107", issuance_date: new Date("2024-02-15"), target_return_date: new Date("2024-03-15"), issuance_status: "Returned" },
      { issuance_member_id: 8, book_id: 3, issued_by: "Librarian_108", issuance_date: new Date("2024-02-20"), target_return_date: new Date("2024-03-20"), issuance_status: "Pending" },
      { issuance_member_id: 7, book_id: 5, issued_by: "Librarian_109", issuance_date: new Date("2024-02-25"), target_return_date: new Date("2024-03-25"), issuance_status: "Overdue" },
      { issuance_member_id: 2, book_id: 2, issued_by: "Librarian_110", issuance_date: new Date("2024-03-01"), target_return_date: new Date("2024-04-01"), issuance_status: "Pending" }
    ]
  });

  console.log("Issuance data has been seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
