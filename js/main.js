---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {

  const $panel = $('.panel-cover')
  const $content = $('.content-wrapper')

  $('body').addClass('page-loaded')

  {% if site.disable_landing_page != true %}

  const pathname = window.location.pathname || '/'
  const isHome = (
    pathname === '{{ site.baseurl }}/' ||
    pathname === '{{ site.baseurl }}/index.html' ||
    pathname === '/' ||
    pathname === '/index.html'
  )

  const isNavigationPage = pathname.indexOf('/navigation') !== -1

  // Auto-collapse on navigation page or #blog hash
  if (isNavigationPage || window.location.hash === '#blog') {
    $panel.addClass('panel-cover--collapsed')
  }

  $('a.blog-button').on('click', function (e) {
    const rawHref = $(this).attr('href')
    const href = rawHref.replace(window.location.origin, '')

    console.log('Clicked blog-button:', { href, isHome, pathname })

    // ===== ABOUT BUTTON =====
    if (href.includes('#blog')) {

      // On homepage: toggle panel
      if (isHome) {
        e.preventDefault()
        
        if ($panel.hasClass('panel-cover--collapsed')) {
          // Expand
          $panel.removeClass('panel-cover--collapsed')
        } else {
          // Collapse
          $panel.addClass('panel-cover--collapsed')
          $content.addClass('animated slideInRight')
        }
        return
      }

      // On other pages: go to homepage and show collapsed
      e.preventDefault()
      window.location.href = '{{ site.baseurl }}/#blog'
      return
    }

    // ===== NAVIGATION BUTTON =====
    if (href.indexOf('/navigation') !== -1) {

      // If already on navigation page -> go back home
      if (isNavigationPage) {
        e.preventDefault()
        window.location.href = '{{ site.baseurl }}/'
        return
      }

      // Otherwise (including homepage): go directly to navigation
      // without collapsing first to avoid the About flash
      return // allow normal navigation
    }

    // ===== DEFAULT =====
    // allow default for any other links
  })

  {% endif %}

  // Mobile menu toggle
  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper')
      .toggleClass('visible animated bounceInDown')

    $('.btn-mobile-menu__icon')
      .toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})