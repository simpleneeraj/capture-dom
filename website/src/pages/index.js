import Seo from "./seo"
import css from "./index.module.css"
import classnames from "classnames"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import React, { useEffect } from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const kFormatter = (num) => {
  return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig: config = {} } = context

  useEffect(() => {
    window
      .fetch("https://api.github.com/repos/nextauthjs/next-auth")
      .then((res) => res.json())
      .then((data) => {
        const navLinks = document.getElementsByClassName(
          "navbar__item navbar__link"
        )
        const githubStat = document.createElement("span")
        githubStat.innerHTML = kFormatter(data.stargazers_count)
        githubStat.className = "github-counter"
        navLinks[4].appendChild(githubStat)
      })
  }, [])
  return (
    <Layout description={config.tagline}>
      <Seo />
      <div className="home-wrapper">
        <header className={classnames("hero", css.heroBanner)}>
          <div className="container">
            <div className="hero-inner">
              <img
                src="/icons/android-chrome-512x512.png"
                alt="Shield with key icon"
                className={css.heroLogo}
              />
              <div className={css.heroText}>
                <h1 className="hero__title">{config.title}</h1>
                <p className="hero__subtitle">{config.tagline}</p>
              </div>
              <div className={css.buttons}>
                <a
                  className={classnames(
                    "button button--outline button--secondary button--lg rounded-pill",
                    css.button
                  )}
                  href="https://next-auth-example.vercel.app"
                >
                  Live Demo
                </a>
                <Link
                  className={classnames(
                    "button button--primary button--lg rounded-pill",
                    css.button
                  )}
                  to={useBaseUrl("/getting-started/example")}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-wave">
            <div className="hero-wave-inner" />
          </div>
        </header>
        <main className="home-main">
          <section className={`section-features ${css.features}`}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className={css.featuresTitle}>
                    <span>Open Source.</span> <span>Full Stack.</span>{" "}
                    <span>Own Your Data.</span>
                  </h2>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="text--center">
                    <a
                      href="https://www.npmjs.com/package/next-auth"
                      className="button button--primary button--outline rounded-pill button--lg"
                    >
                      npm install next-auth
                    </a>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h2 className="text--center" style={{ fontSize: "2.5rem" }}>
                    Take screenshots in seconds!
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col col--6">
                  <div className="code">
                    <h4 className="code-heading">
                      Server <span>/pages/api/auth/[...nextauth].js</span>
                    </h4>
                    <CodeBlock className="prism-code language-js">
                      {serverlessFunctionCode}
                    </CodeBlock>
                  </div>
                </div>
                <div className="col col--6">
                  <div className="code">
                    <h4 className="code-heading">
                      Client (App) <span>/pages/_app.jsx</span>
                    </h4>
                    <CodeBlock className="prism-code language-js">
                      {appCode}
                    </CodeBlock>
                    <h4 className="code-heading">
                      Client (Page) <span>/pages/index.js</span>
                    </h4>
                    <CodeBlock className="prism-code language-js">
                      {pageCode}
                    </CodeBlock>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p className="text--center" style={{ marginTop: "2rem" }}>
                    <Link
                      to="/getting-started/example"
                      className="button button--primary button--lg rounded-pill"
                    >
                      Example Code
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className={css.homeSubtitle}>
            <p>Screenshot.js is an open source community project.</p>
          </div>
        </main>
      </div>
    </Layout>
  )
}

const appCode = `
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}`.trim()

const pageCode = `
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}`.trim()

const serverlessFunctionCode = `
import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'Screenshot.js <no-reply@example.com>'
    }),
  ]
})
`.trim()

export default Home
