// import {
//   MigrationInterface,
//   QueryRunner,
//   Table,
//   TableForeignKey,
// } from "typeorm";
//
// export class MigrationFile1636973925565 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: "user",
//         columns: [
//           {
//             name: "id",
//             type: "int",
//             isPrimary: true,
//           },
//           {
//             name: "name",
//             type: "varchar",
//           },
//           {
//             name: "login",
//             type: "varchar",
//           },
//           {
//             name: "password",
//             type: "varchar",
//           },
//         ],
//       }),
//       true
//     );
//
//     await queryRunner.createTable(
//       new Table({
//         name: "fund",
//         columns: [
//           {
//             name: "id",
//             type: "int",
//             isPrimary: true,
//           },
//           {
//             name: "name",
//             type: "varchar",
//           },
//           {
//             name: "totalFunds",
//             type: "decimal",
//           },
//           {
//             name: "createdAt",
//             type: "date",
//           },
//           {
//             name: "updatedAt",
//             type: "date",
//           },
//         ],
//       }),
//       true
//     );
//
//     await queryRunner.createTable(
//       new Table({
//         name: "donations",
//         columns: [
//           {
//             name: "id",
//             type: "int",
//             isPrimary: true,
//           },
//           {
//             name: "toFund",
//             type: "varchar",
//           },
//           {
//             name: "amount",
//             type: "decimal",
//           },
//           {
//             name: "date",
//             type: "date",
//           },
//         ],
//       }),
//       true
//     );
//   }
//
//   public async down(queryRunner: QueryRunner): Promise<void> {
//     const fund = await queryRunner.getTable("fund");
//     // @ts-ignore
//     const foreignKey = fund.foreignKeys.find(
//       fk => fk.columnNames.indexOf("userId") !== -1
//     );
//     await queryRunner.dropForeignKey("userId", foreignKey as TableForeignKey);
//
//     await queryRunner.dropColumn("fund", "userId");
//     await queryRunner.dropTable("fund");
//
//     await queryRunner.dropTable("donations");
//     await queryRunner.dropTable("user");
//   }
// }
