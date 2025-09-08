import fs from "fs";
import path from "path";
import pool from "../src/config/db.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    const schemaPath = path.join(
      __dirname,
      "../src/models/createTableSchema.sql"
    );

    const schema = fs.readFileSync(schemaPath, "utf-8");

    await pool.query(schema);
    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    pool.end();
  }
}

// Run the migration
runMigrations();
