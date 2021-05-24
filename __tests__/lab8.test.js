describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    jest.setTimeout(8000);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  //test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    expect(page.url().indexOf("/#entry1")).not.toEqual(-1);
    });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let header = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(header).toEqual("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let data, plainValue;
    let correct = true;
    const entries = await page.$$('journal-entry');
      data = await entries[0].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title != 'You like jazz?') { correct = false; }
      if (plainValue.date != '4/25/2021') { correct = false; }
      if (plainValue.content.length == "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") { correct = false; }
      if (plainValue.image.src != "https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455") { correct = false; }
      if (plainValue.image.alt != 'bee with sunglasses') { correct = false; }
      expect(correct).toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const className = await page.evaluate(() => document.body.className);
    expect(className).toEqual("single-entry")
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('[alt=settings]');
    expect(page.url().indexOf("/#settings")).not.toEqual(-1);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let header = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(header).toEqual("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const className = await page.evaluate(() => document.body.className);
    expect(className).toEqual("settings")
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url().indexOf("/#entry1")).not.toEqual(-1);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url().indexOf("/#entry")).toEqual(-1);
    expect(page.url().indexOf("/#settings")).toEqual(-1);
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12:  When the user if on the homepage, the header title should be "Journal Entries"', async() => {
    let header = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(header).toEqual("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13:  On the home page the <body> element should not have any class attribute ', async() => {
    const className = await page.evaluate(() => document.body.className);
    expect(className).toEqual("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14:  Verify the url is correct when clicking on the second entry', async() => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(100);
    expect(page.url().indexOf("/#entry2")).not.toEqual(-1);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15:  Verify the title is current when clicking on the second entry', async() => {
    let header = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(header).toEqual("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16:  Verify the entry page contents is correct when clicking on the second entry', async() => {
    let data, plainValue;
    let correct = true;
    const entries = await page.$$('journal-entry');
      data = await entries[1].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title != 'Run, Forrest! Run!') { correct = false; }
      if (plainValue.date != '4/26/2021') { correct = false; }
      if (plainValue.content != "Mama always said life was like a box of chocolates. You never know what you're gonna get.") { correct = false; }
      if (plainValue.image.src != "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg") { correct = false; }
      if (plainValue.image.alt != "forrest running") { correct = false; }
      expect(correct).toBe(true);
  }, 10000);

  // create your own test 17
  it('Test17:  Verify the url is correct when clicking on the fourth entry', async() => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[3].click();
    await page.waitForTimeout(100);
    expect(page.url().indexOf("/#entry4")).not.toEqual(-1);
  });
  // create your own test 18
  it('Test18:  Verify the title is current when clicking on the fourth entry', async() => {
    let header = await page.evaluate(() => document.querySelector('h1').textContent);
    expect(header).toEqual("Entry 4");
  });
  // create your own test 19
  it('Test19:  Verify the image is correct on the fourth entry', async() => {
    let data, plainValue;
    let correct = true;
    const entries = await page.$$('journal-entry');
    data = await entries[3].getProperty('entry');
    plainValue = await data.jsonValue();
    expect(plainValue.image.src).toEqual("https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg");
    expect(plainValue.image.alt).toEqual("harry looking up at the sorting hat");
  });

  // create your own test 20
  it('Test20:  Verify nothing happens when clicking on header while at homepage', async() => {
    await page.goBack();
    await page.click('h1');
    await page.waitForTimeout(200);
    expect(page.url().indexOf("/#entry")).toEqual(-1);
    expect(page.url().indexOf("/#settings")).toEqual(-1);
  });
});
