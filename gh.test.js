let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async() => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 25000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team")
  }, 20000);
});

describe("Should check titles for GitHub pages", () => {
  test("Check Pricing page", async() => {
   await page.goto("https://github.com/pricing");
   const title = await page.title();
   expect(title).toContain("Pricing · Plans for every developer · GitHub")
  }, 45000);

  test("", async() => {
    await page.goto("https://partner.github.com");
    const title = await page.title();
    expect(title).toContain("GitHub Partners | GitHub Partner Portal");
  },35000);

  test("", async() => {
    await page.goto("https://github.blog");
    const title = await page.title();
    expect(title).toContain("The GitHub Blog | Updates, ideas, and inspiration from GitHub to help developers build and design software.");
  },35000);
});
