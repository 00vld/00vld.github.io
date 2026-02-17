---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {

  const $panel = $('.panel-cover')
  const $content = $('.content-wrapper')

  // Detect homepage - must check BEFORE any operations
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const basePath = '{{ site.baseurl }}'.replace(/\/$/, '') || '/'
  const isHomePage = (currentPath === basePath || currentPath === basePath + '/index.html')

  console.log('DEBUG:', { currentPath, basePath, isHomePage })

  $('body').addClass('page-loaded')

  {% if site.disable_landing_page != true %}

  // If NOT on homepage, auto-collapse sidebar
  if (!isHomePage) {
    $panel.addClass('panel-cover--collapsed')
  }

  // Handle blog button clicks
  $('a.blog-button').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()

    const $link = $(this)
    const targetUrl = $link.attr('href')
    const normalizedTarget = targetUrl.replace(/\/$/, '') || '/'

    console.log('Button clicked:', { targetUrl, normalizedTarget, currentPath, isHomePage })

    // CASE 1: We're on homepage (full cover showing)
    if (isHomePage) {
      
      // Don't do anything if clicking "About" while already on homepage
      if (normalizedTarget === basePath || normalizedTarget === '/') {
        console.log('Already on homepage - ignoring click')
        return
      }

      // Clicking Notes/other page from homepage
      console.log('Navigating from homepage to:', targetUrl)
      $panel.addClass('panel-cover--collapsed')
      $content.addClass('animated slideInRight')
      
      setTimeout(function () {
        window.location.href = targetUrl
      }, 400)
      
      return
    }

    // CASE 2: We're on an internal page (About/Notes)
    
    // If clicking About/homepage link, go back to homepage
    if (normalizedTarget === basePath || normalizedTarget === '/' || normalizedTarget === '') {
      console.log('Going back to homepage')
      window.location.href = basePath || '/'
      return
    }

    // If clicking Notes while already on Notes, go back to homepage
    if (normalizedTarget === currentPath) {
      console.log('Same page clicked - going to homepage')
      window.location.href = basePath || '/'
      return
    }

    // Otherwise, navigate to the target page
    console.log('Navigating to:', targetUrl)
    window.location.href = targetUrl

  })

  {% endif %}

  // Mobile menu toggle
  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})