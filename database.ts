import { Reading } from "./types"
import { v4 as uuidv4 } from "uuid"

// This is a fake database which stores data in-memory while the process is running
// Feel free to change the data structure to anything else you would like
export let database: Record<string, Reading> = {};

/**
 * Store a reading in the database using the given key
 */
export const addReading = (reading: Reading): Reading => {
  const key = uuidv4()
  database[key] = reading;
  return reading;
};

/**
 * Retrieve a reading from the database using the given key
 */
export const getReading = (key: string): Reading | undefined => {
  return database[key];
};
