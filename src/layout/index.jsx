import React from 'react'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import './index.scss'

export const Layout = ({ location, title, className, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const breakpoints = useBreakpoint();

  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(breakpoints.md ? 32 : 40),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={rootPath} />
        <div className={className}>
          {children}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  )
}
