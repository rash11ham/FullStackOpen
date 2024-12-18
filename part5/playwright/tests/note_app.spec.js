// const { test, describe, expect, beforeEach } = require("@playwright/test");
// const { loginWith, createNote } = require('./helper')

// describe("Note app", () => {
//   beforeEach(async ({ page, request }) => {
//     await request.post("/api/testing/reset");
//     await request.post("/api/users", {
//       data: {
//         name: "Matti Luukkainen",
//         username: "mluukkai",
//         password: "salainen",
//       },
//     });
//     await page.goto("/");
//   });

//   test("front page can be opened", async ({ page }) => {
//     //await page.goto("http://localhost:5173");
//     const locator = await page.getByTestId("notes");
//     await expect(locator).toBeVisible();
//     await expect(
//       page.getByText(
//         "Note app, Department of Computer Science, University of Helsinki 2024"
//       )
//     ).toBeVisible();
//   });

//   test("login fails with wrong password", async ({ page }) => {
//     await loginWith(page, "mluukkai", "wrong");

//     const errorDiv = await page.locator(".error");
//     await expect(errorDiv).toContainText("Wrong credentials");
//     await expect(errorDiv).toHaveCSS("border-style", "solid");
//     await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

//     await expect(
//       page.getByText("Matti Luukkainen logged in")
//     ).not.toBeVisible();
//   });

//   test("login form can be opened", async ({ page }) => {
//     //await page.goto("http://localhost:5173");
//     await loginWith(page, 'mluukkai', 'salainen')

//     await expect(page.getByText("Matti Luukkainen logged-in")).toBeVisible();
//   });
//   describe("when logged in", () => {
//     beforeEach(async ({ page }) => {
//       await loginWith(page, "mluukkai", "salainen");
//     });

//     test("a new note can be created", async ({ page }) => {
//       await createNote(page, "a note created by playwright");
//       await expect(
//         page.getByText("a note created by playwright")
//       ).toBeVisible();
//     });
//     describe("and a note exists", () => {
//       beforeEach(async ({ page }) => {
//         await createNote(page, "first note");
//         await createNote(page, "second note");
//       });

//       test("importance can be changed", async ({ page }) => {
//         const otherNoteElement = await page.getByText("first note");
//           await otherNoteElement
//             .getByRole("button", { name: "make important" })
//             .click();
//         await expect(page.getByText("make not important")).toBeVisible();
//       });
//     });
//   });
// });