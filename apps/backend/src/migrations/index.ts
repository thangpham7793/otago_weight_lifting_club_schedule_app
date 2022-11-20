import { updatePasswordHashes } from "./updatePasswordHashes.ts";
import { execute } from "../database/index.ts";

const migrationFnsInAscendingOrder = [updatePasswordHashes];

export async function migrate() {
  await ensureMigrationTableCreated();
  const allMigrations = prepareMigrationMap();
  const completedMigrations = await getAllCompletedMigrationsFromDb();

  console.log(`Completed migrations: `, completedMigrations);

  await executeAndSavePendingMigrations(allMigrations, completedMigrations);
}

async function executeAndSavePendingMigrations(
  allMigrations: MigrationsChronology,
  completed: string[],
) {
  const migrationsToExecute = Array.from(allMigrations.entries()).filter(
    ([name, _fn]) => !completed.includes(name),
  );

  if (migrationsToExecute.length === 0) {
    console.log("No new migrations to execute");
  } else {
    for (const migration of migrationsToExecute) {
      console.log(
        `Migrations to execute: `,
        migrationsToExecute.map(([name, _]) => name),
      );

      await executeAndSaveMigration(migration);
    }
  }
}

// deno-lint-ignore ban-types
async function executeAndSaveMigration([name, task]: [string, Function]) {
  await task();
  await execute(`INSERT INTO public.migrations (name) VALUES ($1)`, [name]);

  console.log(`"${name}" migration executed & saved`);
}

const getAllMigrationsStm =
  `SELECT name FROM public.migrations ORDER BY date ASC`;
async function getAllCompletedMigrationsFromDb(): Promise<string[]> {
  const { rows } = await execute<{ name: string }>(getAllMigrationsStm);

  return rows.map((r: { name: string }) => r.name);
}

const createMigrationTableStm = `CREATE TABLE IF NOT EXISTS public.migrations (
  name character varying(50) PRIMARY KEY, 
  date timestamp DEFAULT NOW() NOT NULL
)`;
function ensureMigrationTableCreated() {
  return execute(createMigrationTableStm);
}

type MigrationsChronology = Map<string, Function>;
function prepareMigrationMap(): MigrationsChronology {
  const map = new Map();

  migrationFnsInAscendingOrder.forEach((fn) => map.set(fn.name, fn));

  return map;
}
