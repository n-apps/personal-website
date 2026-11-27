import { Link } from 'react-router';
import { useEffect } from 'react';
import './privacy.css';

const sections = [
  {
    title: '1. Information stored on your device',
    content: (
      <>
        <p>
          Score Counter does not require you to create an account or provide your name, email address, or other directly identifying information.
        </p>
        <p>
          Information you enter into Score Counter, such as counter names, player names, scores, session information, game information, game templates, app settings, and preferences, is stored locally on your device.
        </p>
        <p>
          n-apps does not operate a user-account system or a server that receives this locally stored content. Your counter names, player names, and scores are never included in the optional usage data described in Section 2.
        </p>
        <p>
          Score Counter lets you export your data to a backup file and import it again, and share game results as text or images. These actions happen only when you start them, and the file or image goes only where you choose to send or save it. n-apps does not receive a copy.
        </p>
        <p>
          You can delete locally stored information by deleting the app. On Android, you can also clear Score Counter's storage through your device settings.
        </p>
      </>
    ),
  },
  {
    title: '2. Optional usage and crash data',
    content: (
      <>
        <p>
          Score Counter can share anonymous usage data and crash diagnostics to help n-apps understand how the app is used and fix problems. <strong>Sharing is off until you turn it on.</strong> You can turn it on or off at any time with the <strong>Share anonymous usage and crash data</strong> setting, which appears when you first open the app and in <strong>Settings → General</strong>. One setting controls both kinds of data.
        </p>
        <h3>Usage data (PostHog)</h3>
        <p>When sharing is on, Score Counter sends a small set of app activity events to PostHog, a product-analytics service. The events are:</p>
        <ul>
          <li>The app was used on a given day.</li>
          <li>A counter was created, and whether it was created manually or with Quick Start.</li>
          <li>A scoring session started.</li>
          <li>Dice were rolled.</li>
          <li>The Pro screen was viewed, a Pro purchase was started, or a Pro purchase was completed, together with the product identifier and where in the app the Pro screen was opened.</li>
        </ul>
        <p>
          Each event includes the platform, the app version, the time of the event, and a random installation identifier created by the app. This identifier is not linked to your name, email address, Google Account, or Apple Account. A new identifier is created each time you turn sharing on.
        </p>
        <p>
          The app asks PostHog not to look up your location from your IP address and not to build a personal profile from the events. Events are sent over an encrypted connection in batches. Your IP address is visible to PostHog when the data is received, as with any internet connection.
        </p>
        <h3>Crash diagnostics (Firebase Crashlytics)</h3>
        <p>When sharing is on, Score Counter uses Firebase Crashlytics, a service provided by Google, to identify crashes, errors, and stability problems. Crash reports may include:</p>
        <ul>
          <li>Crash stack traces and error information.</li>
          <li>Relevant application state at the time of the error.</li>
          <li>The app version and configuration.</li>
          <li>The device model and device information.</li>
          <li>The Android or iOS version and operating-system information.</li>
          <li>The date and time associated with the crash or error.</li>
          <li>Firebase and Crashlytics installation identifiers.</li>
        </ul>
        <p>n-apps does not intentionally attach your name, email address, or other directly identifying information to crash reports.</p>
        <h3>Turning sharing off</h3>
        <p>
          When you turn sharing off, Score Counter stops collecting and sending usage events, deletes usage events that are waiting on your device, discards the installation identifier, and does not send crash reports that have not yet been sent. Data that was already sent remains with PostHog or Firebase until it is deleted under their retention policies (see Section 10).
        </p>
      </>
    ),
  },
  {
    title: '3. Android backups and iCloud',
    content: (
      <>
        <p>
          Depending on your device and backup settings, Android may back up or transfer some locally stored app data to your Google Account or another device. On Android, only your game data (games, scores, players, history, and templates) is included; app settings are not. iOS may include locally stored app information in an iCloud or device backup.
        </p>
        <p>
          These backup and transfer features are operated and controlled by Google, Apple, and your device manufacturer rather than by n-apps. You can manage them through your device or account settings.
        </p>
      </>
    ),
  },
  {
    title: '4. Optional in-app purchases',
    content: (
      <>
        <p>Score Counter offers an optional purchase that unlocks Pro features. Earlier versions of the app offered subscriptions to support the app.</p>
        <p>
          Purchases made through Google Play are processed by Google. Purchases made through the App Store are processed by Apple. n-apps does not receive your complete payment-card or bank-account information, your Apple Account password, or other credentials used to access Google or Apple services.
        </p>
        <p>
          The app may receive limited transaction information necessary to verify or manage a purchase, such as the purchased product, purchase status, transaction or order identifiers, and related purchase information. This includes checking whether you have an active subscription from an earlier version of the app. Google and Apple process payment and transaction information according to their applicable privacy policies and store terms.
        </p>
      </>
    ),
  },
  {
    title: '5. Information you voluntarily provide',
    content: (
      <>
        <p>If you contact n-apps by email, n-apps receives the information you choose to provide. This may include:</p>
        <ul>
          <li>Your email address.</li>
          <li>The contents of your message.</li>
          <li>Screenshots or attachments.</li>
          <li>Device or app information you include in your message.</li>
        </ul>
        <p>
          This information is used to respond to your request, provide support, investigate reported problems, and review feedback. It is not used for advertising or unrelated marketing.
        </p>
        <p>Please avoid including sensitive personal information unless it is necessary to resolve your request.</p>
      </>
    ),
  },
  {
    title: '6. Third-party services',
    content: (
      <>
        <p>Score Counter uses or relies on the following platform and third-party services:</p>
        <ul>
          <li>PostHog, for optional usage analytics (only when you turn on sharing).</li>
          <li>Firebase Crashlytics, provided by Google, for optional crash reporting and app-stability monitoring (only when you turn on sharing).</li>
          <li>Google Play services, Google Play Billing, and the Google Play In-App Review API for Android platform functionality, purchases, and asking whether you'd like to rate the app.</li>
          <li>Apple App Store and iOS services for app distribution, purchases, operating-system functionality, backups, security, and related platform services.</li>
        </ul>
        <p>These providers may process information according to their own privacy policies and terms.</p>
      </>
    ),
  },
  {
    title: '7. Advertising and analytics',
    content: (
      <>
        <p>Score Counter does not contain third-party advertising.</p>
        <p>The app does not use personal information for targeted advertising, and usage data is not sold or used to build advertising profiles.</p>
        <p>Usage analytics and crash reporting are optional and are described in Section 2. They are used only to understand which features are used, improve the app, and fix problems.</p>
      </>
    ),
  },
  {
    title: '8. How information is used',
    content: (
      <>
        <p>Information processed in connection with Score Counter may be used to:</p>
        <ul>
          <li>Provide and maintain the app.</li>
          <li>Store counters, scores, settings, and preferences on your device.</li>
          <li>Understand which features are used, if you turn on sharing.</li>
          <li>Diagnose crashes and technical errors.</li>
          <li>Improve app stability, performance, and reliability.</li>
          <li>Process and verify optional purchases.</li>
          <li>Respond to support requests and feedback.</li>
          <li>Protect the app against fraud, misuse, or security threats.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    title: '9. Sharing of information',
    content: (
      <>
        <p>n-apps does not sell or rent users' personal information.</p>
        <p>
          If you turn on sharing, usage data is processed by PostHog and crash diagnostics are processed by Google through Firebase Crashlytics. These providers may process this data on servers in the United States. Purchase-related information may be processed by Google or Apple as necessary to provide store payment and transaction services. Backup-related information may be processed by Google or Apple according to your account and device settings.
        </p>
        <p>
          Information may also be disclosed when reasonably necessary to comply with applicable law, respond to a valid legal request, investigate fraud or security issues, or protect the rights and safety of n-apps, users, or others.
        </p>
      </>
    ),
  },
  {
    title: '10. Data retention and deletion',
    content: (
      <>
        <p>
          Locally stored counters, scores, player information, session information, settings, and preferences remain on your device until you delete them, remove the app, or clear the app's data. Copies created through Android backup, iCloud, or device backup may remain according to your Google Account, Apple Account, and backup settings.
        </p>
        <p>Usage data is retained by PostHog for up to 1 year. Crash diagnostics are retained by Firebase Crashlytics according to Firebase's applicable retention policies.</p>
        <p>
          Support emails and related correspondence are retained only for as long as reasonably necessary to respond to the request, investigate an issue, maintain appropriate support records, or comply with legal obligations.
        </p>
        <p>
          You may request deletion of personal information that you have directly provided to n-apps by email. Because Score Counter does not maintain user accounts and usage and crash data are not associated with your name or email address, n-apps may not be able to identify which anonymous records belong to you. Turning sharing off, as described in Section 2, stops further collection and prevents data that has not yet been sent from being sent.
        </p>
      </>
    ),
  },
  {
    title: '11. Security',
    content: (
      <p>
        n-apps takes reasonable precautions when handling information processed in connection with the app and uses established service providers for analytics, crash reporting, and payment processing. However, no method of electronic storage or transmission is completely secure, and absolute security cannot be guaranteed.
      </p>
    ),
  },
  {
    title: "12. Children's privacy",
    content: (
      <>
        <p>Score Counter is a general-purpose utility and does not require users to provide personal information.</p>
        <p>
          n-apps does not knowingly request personal information from children. If you are a parent or guardian and believe that a child has sent personal information directly to n-apps, please contact n-apps so that the information can be reviewed and, where appropriate, deleted.
        </p>
      </>
    ),
  },
  {
    title: '13. Links to external services',
    content: (
      <p>
        The app may contain links that open third-party websites or applications, such as Google Play pages, App Store pages, or email applications. n-apps does not control the content, availability, or privacy practices of third-party services. Users should review the privacy policies of those services before providing information to them.
      </p>
    ),
  },
  {
    title: '14. Changes to this Privacy Policy',
    content: (
      <p>
        This Privacy Policy may be updated when the app's functionality, service providers, or information-handling practices change. The updated policy will be posted on this Privacy Policy page, and the “Last updated” date will be revised. Material changes may also be communicated within the app or through its Google Play or App Store listing where appropriate.
      </p>
    ),
  },
];

export function ScoreCounterPrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen px-5 sm:px-8'>
      <header className='mx-auto flex w-full max-w-3xl items-center justify-between py-6 sm:py-8'>
        <Link to='/score-counter/' data-goatcounter-click='score-counter-privacy-back-to-app' className='inline-flex min-h-11 items-center pr-4 text-sm underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>
          Score Counter
        </Link>
      </header>
      <main className='mx-auto w-full max-w-3xl pb-16 sm:pb-24'>
        <article className='policy-copy'>
          <p className='mb-5 text-sm text-muted-foreground'>Last updated: November 27, 2026</p>
          <h1>Score Counter Privacy Policy</h1>
          <p className='policy-scope'>This Privacy Policy applies to Score Counter on Android and iOS.</p>
          <p>
            n-apps develops and operates the Score Counter – Count Anything application, referred to in this Privacy Policy as “Score Counter” or “the app.” This Privacy Policy explains what information is stored or processed when you use the app, why it is used, and what choices you have regarding that information.
          </p>
          {sections.map(({ title, content }, index) => (
            <section key={title} aria-labelledby={`privacy-section-${index + 1}`}>
              <h2 id={`privacy-section-${index + 1}`}>{title}</h2>
              {content}
            </section>
          ))}
          <section aria-labelledby='contact-heading'>
            <h2 id='contact-heading'>Contact</h2>
            <p>For questions, privacy requests, or suggestions regarding this Privacy Policy, contact:</p>
            <address>
              n-apps<br />
              Email: <a href='mailto:developer.scorecounter@gmail.com' data-goatcounter-click='score-counter-privacy-email'>developer.scorecounter@gmail.com</a>
            </address>
          </section>
        </article>
      </main>
    </div>
  );
}
