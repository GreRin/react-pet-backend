import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationFile1636982989614 implements MigrationInterface {
  public up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "login",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "fund",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "totalFunds",
            type: "decimal",
          },
          {
            name: "createdAt",
            type: "date",
          },
          {
            name: "updatedAt",
            type: "date",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "donations",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "toFund",
            type: "varchar",
          },
          {
            name: "amount",
            type: "decimal",
          },
          {
            name: "date",
            type: "date",
          },
        ],
      }),
      true
    );
  };

  public down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropColumn("fund", "userId");
    await queryRunner.dropTable("fund");

    await queryRunner.dropTable("donations");
    await queryRunner.dropTable("user");
  };
}
