export interface Reading {
  timestamp: number;
  metricName: string;
  metricValue: number
}

export enum Metric {
  Voltage = "Voltage",
  Current = "Current"
}
