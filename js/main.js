---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {

  const $panel = $('.panel-cover')
  const $content = $('.content-wrapper')

  // Check if we're on homepage
  const isHomePage = 
    window.location.pathname === '{{ site.baseurl }}/' ||
    window.location.pathname === '{{ site.baseurl }}/index.html'

  $('body').addClass('page-loaded')

  {% if site.disable_landing_page != true %}

  // If not on homepage, collapse sidebar immediately
  if (!isHomePage) {
    $panel.addClass('panel-cover--collapsed')
  }

  // Handle all blog button clicks
  $('a.blog-button').on('click', function (e) {
    e.preventDefault()
    
    const targetUrl = $(this).attr('href')
    
    // ============================================
    // SCENARIO 1: We're on the homepage
    // ============================================
    if (isHomePage) {
      
      // Add collapse class
      $panel.addClass('panel-cover--collapsed')
      $content.addClass('animated slideInRight')
      
      // Wait for animation, then navigate
      setTimeout(function () {
        window.location.href = targetUrl
      }, 400)
      
      return
    }
    
    // ============================================
    // SCENARIO 2: We're on About or Navigation page
    // ============================================
    
    // Just navigate directly (no animation needed, sidebar already collapsed)
    window.location.href = targetUrl
    
  })

  {% endif %}

  // Mobile menu
  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})