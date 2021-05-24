# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

    (1) 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

    No, since Unit testing cannot test how the individual components interact with each other on an application level, and the message feature requires an user to write and send a message to another user, which has component interaction. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

    Yes, since the feature is local to one user and it is a component independent of other parts, thus is makes sense to do unit tests. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

    With "headless" set to true, puppeteer would run the tests without a graphical user interface (or browser UI)

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500');
        await page.click('[alt=settings]')
        await page.waitForTimeout(500);
    });