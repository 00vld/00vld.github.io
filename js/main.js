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

  // Check if we're on homepage
  const pathname = window.location.pathname
  const isHome = (
    pathname === '{{ site.baseurl }}/' ||
    pathname === '{{ site.baseurl }}/index.html' ||
    pathname === '/' ||
    pathname === '/index.html'
  )

  // Auto-collapse if not on homepage OR if #blog hash is present
  if (!isHome || window.location.hash === '#blog') {
    $panel.addClass('panel-cover--collapsed')
  }

  // Blog button click handler
  $('a.blog-button').on('click', function (e) {
    const href = $(this).attr('href')
    const $this = $(this)
    
    console.log('Click:', { href, isHome, currentPath: pathname })

    // CASE 1: Clicking "About" button (href contains #blog)
    if (href.indexOf('#blog') !== -1) {
      
      // If we're on homepage with full cover, collapse it
      if (isHome && !$panel.hasClass('panel-cover--collapsed')) {
        e.preventDefault()
        $panel.addClass('panel-cover--collapsed')
        $content.addClass('animated slideInRight')
        return
      }
      
      // If we're on another page, go to homepage and collapse
      if (!isHome) {
        e.preventDefault()
        window.location.href = '{{ site.baseurl }}/#blog'
        return
      }
      
      // Already collapsed on homepage, do nothing
      return
    }

    // CASE 2: Clicking "Notes" or other page
    e.preventDefault()
    
    // If on homepage with full cover, animate then navigate
    if (isHome && !$panel.hasClass('panel-cover--collapsed')) {
      $panel.addClass('panel-cover--collapsed')
      $content.addClass('animated slideInRight')
      
      setTimeout(function () {
        window.location.href = href
      }, 400)
      return
    }
    
    // Otherwise just navigate
    window.location.href = href
  })

  {% endif %}

  // Mobile menu
  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})