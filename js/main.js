---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {

  const $panel = $('.panel-cover')
  const $content = $('.content-wrapper')

  const isHome =
    window.location.pathname === '{{ site.baseurl }}/' ||
    window.location.pathname === '{{ site.baseurl }}/index.html'

  $('body').addClass('page-loaded')

  {% if site.disable_landing_page != true %}

  /* Auto collapse when NOT homepage */
  if (!isHome) {
    $panel.addClass('panel-cover--collapsed')
  }

  /* Hero buttons (About / Notes etc) */
  $('a.blog-button').on('click', function (e) {

    const targetUrl = $(this).attr('href')

    // If not on homepage, allow normal navigation
    if (!isHome) {
      return
    }

    // On homepage, handle collapse/expand
    e.preventDefault()

    const isCollapsed = $panel.hasClass('panel-cover--collapsed')

    if (isCollapsed) {
      // Expand back to full cover
      $panel.removeClass('panel-cover--collapsed')
      $content.removeClass('animated slideInRight')
    } else {
      // Collapse and navigate
      $panel.addClass('panel-cover--collapsed')
      $content.addClass('animated slideInRight')

      // Navigate after animation completes
      setTimeout(function () {
        window.location.href = targetUrl
      }, 400)
    }

  })

  {% endif %}

  /* Mobile menu toggle */
  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper')
      .toggleClass('visible animated bounceInDown')

    $('.btn-mobile-menu__icon')
      .toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})