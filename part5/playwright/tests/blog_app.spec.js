const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, creatBlog } = require('./blog_helper')

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset');
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        });
        await page.goto("/");
    });
    //exercise 5.17
    test("Login form is shown", async ({ page }) => {
        const locator = await page.getByText("Login to Application");
        await expect(locator).toBeVisible()
    });
    //exercise 5.18
    test('Login success', async ({ page }) => {
        
        await loginWith(page, 'mluukkai', 'salainen')
        
        await expect(page.getByText('user logged in: mluukkai')).toBeVisible()
    });
    //exercise 5.18
    test("Login fail", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");

      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });

    //exercise 5.19
    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "mluukkai", "salainen");
      });

      test("a new blog can be created", async ({ page }) => {
          await creatBlog(page, 'a new blog', 'Autor', 'example.com')
          await expect(page.getByText('A new blog is added by: mluukkai')).toBeVisible()

      });
        describe('Blog created check like', () => {
            beforeEach(async ({ page }) => {
                await creatBlog(page, "a new blog", "Autor", "example.com");              
            })
            test('after creat blog check like', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                //await expect(page.getByText('likes')).toBeVisible()
                await page.getByRole("button", { name: "like" }).click();
                await expect(page.getByText('likes: 1')).toBeVisible();
            })
            // test("test delete", async ({ page }) => {
            //   await page.getByRole("button", { name: "view" }).click();
            //   await page.getByRole("button", { name: "remove" }).click();
            //   await page.getByText("blog has been removed!").toBeVisible();
            // });
      })
    });

});
