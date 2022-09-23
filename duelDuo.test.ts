
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('Choices display when Draw button is clicked', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(300)
    const choicesDiv = await driver.findElement(By.id('choices'))
    expect(choicesDiv).not.toBe('')
})

test('Selecting a bot displays it in our new div', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(300) 
    await driver.findElement(By.xpath('(//*[text()= "Add to Duo"])[1]')).click()  

    const playerDuoDiv = await driver.findElement(By.id('player-duo'))
    const displayed = await playerDuoDiv.isDisplayed()

    expect(displayed).toBe(true)
})