import { useEffect, useState } from 'react'
import { useSingleton } from '../hooks/useSingleton'
import { useOrderedCollection } from '../hooks/useOrderedCollection'

import Nav from '../components/public/Nav'
import Hero from '../components/public/Hero'
import Works from '../components/public/Works'
import About from '../components/public/About'
import Contact from '../components/public/Contact'
import Footer from '../components/public/Footer'
import Loader from '../components/shared/Loader'

const DEFAULT_NAV = [
  {
    id: 'home',
    number: '01',
    label: 'Home',
    target: 'home',
    enabled: true,
  },
  {
    id: 'works',
    number: '02',
    label: 'Works',
    target: 'works',
    enabled: true,
  },
  {
    id: 'about',
    number: '03',
    label: 'About me',
    target: 'about',
    enabled: true,
  },
  {
    id: 'contact',
    number: '04',
    label: 'Contact',
    target: 'contact',
    enabled: true,
  },
]

export default function PublicSite() {
  const { data: hero, loading: heroLoading } = useSingleton('hero')
  const { data: about, loading: aboutLoading } = useSingleton('about')
  const { data: contact, loading: contactLoading } = useSingleton('contact')
  const { data: settings } = useSingleton('settings')

  const { items: navItems } = useOrderedCollection('navigation')
  const { items: projects } = useOrderedCollection('projects')
  const { items: socialLinks } = useOrderedCollection('socialLinks')

  const [navDark, setNavDark] = useState(true)

  useEffect(() => {
    function onScroll() {
      setNavDark(window.scrollY < window.innerHeight * 0.85)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (settings?.title) {
      document.title = settings.title
    }

    if (settings?.metaDescription) {
      let tag = document.querySelector(
        'meta[name="description"]'
      )

      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }

      tag.content = settings.metaDescription
    }

    if (settings?.favicon?.url) {
      let link = document.querySelector(
        'link[rel="icon"]'
      )

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }

      link.href = settings.favicon.url
    }
  }, [settings])

  const loading =
    heroLoading ||
    aboutLoading ||
    contactLoading

  if (loading) {
    return <Loader label="Loading site" />
  }

  // Use Firebase navigation if available,
  // otherwise use the default navigation.
  const nav =
    navItems.length > 0
      ? navItems.filter(
          (item) => item.target !== 'components'
        )
      : DEFAULT_NAV

  return (
    <div className="min-h-screen">

      <Nav
        items={nav}
        siteTitle={settings?.title}
        dark={navDark}
      />

      <Hero hero={hero} />

      <Works
        projects={projects}
        description={settings?.worksDescription}
      />

      <About about={about} />

      <Contact
        contact={contact}
        socialLinks={socialLinks}
      />

      <Footer
        siteTitle={settings?.title}
        footerText={settings?.footerText}
      />

    </div>
  )
}