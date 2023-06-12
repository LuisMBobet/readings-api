import { app } from "./app"
import request from "supertest"

describe("Test POST /data path", () => {
  const PATH = "/data";
  it("POST with valid data returns success", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'text/plain'
    }).send(`1649941817 Voltage 1.34\n1649941818 Voltage 1.35\n1649941817 Current 12.0\n1649941818 Current 14.0`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": true });
  });
  it("POST with unexpected metric name returns failure", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'text/plain'
    }).send(
      `1649941817 Pressure 1.34`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": false });
  });
  it("POST with invalid metric value returns failure", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'text/plain'
    }).send(
      `1649941817 Voltage 1Voltage`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": false });
  });
  it("POST with invalid timestamp returns failure", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'text/plain'
    }).send(
      `1Jan2023 Voltage 1.3`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": false });
  });
  it("POST with empty body returns failure", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'text/plain'
    })

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": false });
  });
  it("POST with invalid body returns failure", async () => {
    const response = await request(app).post(PATH).set({
      'Content-Type': 'application/json'
    }).send(
      { "voltage": 2.14 });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": false });
  });
});


describe("Test GET /data path", () => {
  const PATH = "/data";
  it("GET with valid data returns success", async () => {
    const response = await request(app).get(PATH).query({
      "from": "2022-01-01",
      "to": "2022-01-03"
    })

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ "success": true });
  });
});
