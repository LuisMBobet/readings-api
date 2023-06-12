import { Request, Response, } from "express"
import { Reading, Metric } from "../types"
import { addReading, database } from "../database"

export const postReadings = async (req: Request, res: Response) => {
  let parsedReadings: Reading[]
  try {
    parsedReadings = parseReadingsInput(req.body)
  } catch (e) {
    console.debug(e)
    return res.json({ success: false });
  }

  parsedReadings.forEach(addReading);

  return res.json({ success: true });
}


export const getReadings = async (req: Request, res: Response) => {
  // TODO: check what dates have been requested, and retrieve all data within the given range

  // getReading(...)

  return res.json({ success: false });
}

function parseReadingsInput(body: string): Reading[] {
  let parsedRecords: Reading[] = [];
  if (!body) {
    throw new Error(`Malformed body: ${body}`)
  }
  const rawRecords = body.split(/\r?\n/);

  rawRecords.forEach((rawRecord: string) => {
    const readingValues = rawRecord.split(" ")
    if (readingValues.length !== 3) {
      throw new Error(`Malformed record - Unexpected number of values: ${rawRecord}`)
    } else if (!isValidTimestamp(readingValues[0])) {
      throw new Error(`Malformed record - Invalid timestamp: ${rawRecord}`)
    } else if (!isValidMetricName(readingValues[1])) {
      throw new Error(`Malformed record - Unexpected metric name: ${rawRecord}`)
    } else if (!isValidMetricValue(readingValues[2])) {
      throw new Error(`Malformed record - Invalid metric value: ${rawRecord}`)
    } else {
      let parsedRecord: Reading = {
        timestamp: parseInt(readingValues[0]),
        metricName: readingValues[1],
        metricValue: parseFloat(readingValues[2])
      }
      parsedRecords.push(parsedRecord)
    }
  })
  return parsedRecords
}

function isValidTimestamp(timestamp: string): boolean {
  const parsedTimestamp = Number(timestamp)
  return (new Date(parsedTimestamp)).getTime() > 0;
};

function isValidMetricName(metricName: string): boolean {
  return Object.values<string>(Metric).includes(metricName)
};

function isValidMetricValue(metricValue: string): boolean {
  const parsedMetricValue = Number(metricValue)
  return !Number.isNaN(parsedMetricValue)
}
