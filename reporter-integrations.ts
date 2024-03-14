
import type {
  Reporter, TestCase, TestResult, FullResult
} from '@playwright/test/reporter'
const axios = require('axios')


class ReporterIntegrations implements Reporter {
  milliseconds : number = 0

  tests : {
    title : string,
    status : string,
    browser: string,
    error: string | undefined,
    duration : number,
  }[] = []

  scenarios : {
    id : string,
    browsers : number,
  }[] = []

  onTestEnd(test: TestCase, result: TestResult): void {
    // @ts-ignore
    let browser : string = test.parent.parent.title.charAt(0).toUpperCase() + test.parent.parent.title.slice(1)
    const status : string = result.status.charAt(0).toUpperCase() + result.status.slice(1)
    let error : string | undefined = undefined

    if (browser === 'Webkit') browser = 'Safari'
    if (browser === 'Chromium') browser = 'Chrome'
    if (result.steps.filter(s => s.error !== undefined).length) {
      error = result.steps.find(s => s.error !== undefined)?.title
    }

    // HIDE PLAYWRIGHT ERROR SYNTAX & MAKE IT EASY TO READ FOR HUMANS
    if (error !== undefined) {
      if (error.includes('.click')) {
        error = error.split('(')[1]
        error = error.split(')')[0] + ' is not clickable.'
      }
      else if (error.includes('page.goto')) {
        error = 'URL is 404 or took too long to load: ' + error.replace('page.goto(', '').split(')')[0]
      }
    }

    this.tests.push({
      title: test.title,
      status,
      browser,
      error,
      duration: result.duration,
    })
  }

  onEnd(details: FullResult): void {
    this.milliseconds = details.duration
  }

  // @ts-ignore
  async onExit(): void {
    let message : string = ''
    message += '------------------------------------------\n'

    const passedTests : number = this.tests.filter(t => t.status === 'Passed').length
    const skippedTests : number = this.tests.filter(t => t.status === 'Skipped').length
    const failedTests : number = this.tests.filter(t => t.status === 'Failed').length
    const timedOutTests : number = this.tests.filter(t => t.status === 'TimedOut').length
    const interruptedTests : number = this.tests.filter(t => t.status === 'Interrupted').length

    message += (failedTests > 0 || timedOutTests > 0 || interruptedTests > 0) ? `❌ ${failedTests + timedOutTests + interruptedTests} ${(failedTests + timedOutTests + interruptedTests === 1) ? 'Test' : 'Tests'} Failed\n` : ''
    // message += (timedOutTests > 0) ? `❌ ${timedOutTests} ${(timedOutTests === 1) ? 'Test' : 'Tests'} Timed Out\n` : ''
    // message += (interruptedTests > 0) ? `❌ ${interruptedTests} ${(interruptedTests === 1) ? 'Test' : 'Tests'} Interrupted\n` : ''
    message += (skippedTests > 0) ? `⏭️ ${skippedTests} ${(skippedTests === 1) ? 'Test' : 'Tests'} Skipped\n` : ''
    message += (passedTests > 0) ? `✅ ${passedTests} ${(passedTests === 1) ? 'Test' : 'Tests'} Passed\n` : ''

    this.tests.map(t => {
      const browsers : number = this.tests.filter(f => f.title === t.title).length

      if (this.scenarios.find(s => s.id === t.title) === undefined) {
        this.scenarios.push({
          id: t.title,
          browsers,
        })
      }
    })

    message += `------------------------------------------\n${this.tests.length} Tests for ${this.scenarios.length} Parallel Scenarios = ${((this.milliseconds % 60000) / 1000).toFixed(1)}s\n`
    message += '------------------------------------------\n'

    this.tests.sort((a, b) => a.title.localeCompare(b.title))
    this.tests.map(t => {
      message += (t.status === 'Passed') ? '✅ '
               : (t.status === 'Skipped') ? '⏭️ '
               : (t.status === 'Failed' || t.status === 'Interrupted' || t.status === 'TimedOut') ? '    ❌ ' : ''

      message += (t.status === 'Failed' || t.status === 'Interrupted' || t.status === 'TimedOut') ? `${t.title} [${t.browser} - ${((t.duration % 60000) / 1000).toFixed(1) + 's'}]${(t.error !== undefined) ? '\n    Error: ' + t.error : ''}\n` : `${t.title} [${t.browser} - ${((t.duration % 60000) / 1000).toFixed(1) + 's'}]\n`
    })

    message += '------------------------------------------\n'

    const failMessage : string = `Test Automation Group has found ${failedTests + timedOutTests + interruptedTests} ${(failedTests + timedOutTests + interruptedTests === 1) ? 'error' : 'errors'} at runtime and will attempt to re-test manually once our team is available. If you require screenshots we keep them for 30 days and can provide them at your request. Our business hours are Mon - Fri, 9am - 5pm PST.`
    const ccUsers : string = ' cc ' + '<@john>'

    message += (failedTests > 0 || interruptedTests > 0 || timedOutTests > 0) ? failMessage + ccUsers : ''

    console.log(message)

    /*
    -------------------------------------------
    ❌ 2 Tests Failed
    ✅ 5 Tests Passed
    -------------------------------------------
    7 Tests for X Parallel Scenarios = 7.4s
    -------------------------------------------
    ✅ displays two todo items by default [Chrome - 1s]
      ❌ can add new todo items [Safari - 5.0s]
      ❌ can add new todo items [Chrome - 5.0s]
    ✅ can check off an item as completed [Chrome - 1.4s]
    ✅ can filter for uncompleted tasks [Chrome - 2.3s]
    ✅ can filter for completed tasks [Chrome - 2.3s]
    ✅ can delete all completed tasks [Chrome - 2.3s]
    -------------------------------------------
    Test Automation Group has found 2 errors at runtime and will attempt to re-test manually once our team is available. If you require screenshots we keep them for 30 days and can provide them at your request. Our business hours are Mon - Fri, 9am - 5pm PST. cc @john
    */



    // IF CLIENT ONLY WANTS TO SEE INSTANT MESSAGES ON FAILURE
    // if (failedTests > 0 || timedOutTests > 0 || interruptedTests > 0) {}



    /*
    SEND RESULTS TO CLIENT SLACK CHANNEL (API)
    */
    // const slackToken = 'xoxb-4748761055251-5057435052129-AnNpkrbKnB2DkSBxVmAZaQdk'
    // const channelID = 'dev'

    // // Message payload
    // const messagePayload = {
    //   channel: channelID,
    //   text: message,
    // }

    // // Make the HTTP POST request to chat.postMessage
    // await axios.post('https://slack.com/api/chat.postMessage', messagePayload, {
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'Authorization': `Bearer ${slackToken}`,
    //   }
    // })
    // .then(response => {
    //   // console.log('Sent to Slack:', response.data)
    // })
    // .catch(error => {
    //   console.error('ERROR Sending To Slack:', error.response.data)
    // })



    /*
    SEND EMAIL VIA SENDGRID
    */
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: 'test@example.com',
    //   from: 'test@example.com', // Use the email address or domain you verified above
    //   subject: 'Twilio Sendgrid - Subject Line',
    //   text: message,
    // };

    // try {
    //   await sgMail.send(msg);
    // } catch (error) {
    //   console.error(error);

    //   if (error.response) {
    //     console.error(error.response.body)
    //   }
    // }
  }
}
export default ReporterIntegrations
