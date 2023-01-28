
const app = require("./app");
const request = require("supertest");

const salontoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkSUQiOiI2MmI5NjQ5NTQ1NjMzODU0YzY5ZjZmNTQiLCJpYXQiOjE2NTg5MzgzODJ9.zLqxW_NmbfC94rItvyID_JBIeAY_wZ1L8Cu8Rp3f5sU";
const patienttoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwSUQiOiI2MmRmZjljZmEwMjFkMGRkMTMxOWEzZTQiLCJpYXQiOjE2NTg5Mzg2MTR9.6kzu0sSDUxXd66HAeIBu6C5A9ouPRR4wyL1vMQm14Go"

const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhSUQiOiI2MmUxMGMyYzI3OTM5OWUxY2JkY2NhMjQiLCJpYXQiOjE2NTg5MzgxNTB9.T8h1RMc-ESUWSYHtXarKhKzchIFa94q4tjZlFATvlCs"

///first test
test("Patient login test", async () => {
    await request(app)
        .post("/patient/login")
        .send({
            email: "shishir",
            password: "shishir",
        })
        .expect("Content-Type", /json/)
});

// second test
test("Patient register test", async () => {
    await request(app)
        .post("/patient/insert")
        .send({
            email: "diwas1",
            password: "diwas",
            fname: "diwas",
            lname: "diwas",
            username: "diwas",
            phone: "9847078571",
            age : "21",
            gender : "male"
        })
        .expect("Content-Type", /json/)
});

// //third test
test("Admin login test", async () => {
    await request(app)
        .post("/admin/login")
        .send({
            email: "admin",
            password: "admin",
        })
        .expect("Content-Type", /json/)
});

// Fourth Test
test("Salon login test", async () => {
    await request(app)
        .post("/salon/login")
        .send({
            email: "a",
            password: "a",
        })
        .expect("Content-Type", /json/)
});

// fifth Test
test("Getting Date and time", async () => {
    await request(app)
        .get("/staff/appointment/dateAndtime/62b491ca29d24b17c62174d8")
        .expect("Content-Type", /json/)
});

// Sixth Test
test("Getting Date and time", async () => {
    await request(app)
        .get("/salon/dashboard/single")
        .set("Authorization", salontoken)
        .expect("Content-Type", /json/)
});

// Seventh Test
test("Getting nails Category", async () => {
    await request(app)
        .get("/staff/nailsCategory")
        .expect("Content-Type", /json/)
});

// Eightth test
test("Getting Patient Dashboard", async () => {
    await request(app)
        .get("/staff/nailsCategory")
        .set("Authorization", patienttoken)
        .expect("Content-Type", /json/)
});

// Nineth Test
test("Getting Admin and dashboard", async () => {
    await request(app)
        .get("/salon/dashboard/get/admin")
        .set("Authorization", adminToken)
        .expect("Content-Type", /json/)
});

