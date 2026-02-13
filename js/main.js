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

    if (!isHome) {
      return // allow normal navigation
    }

    e.preventDefault()

    if (!$panel.hasClass('panel-cover--collapsed')) {

      // Collapse using class only (no width animation)
      $panel.addClass('panel-cover--collapsed')
      $content.addClass('animated slideInRight')

      // Delay navigation slightly so animation feels smooth
      setTimeout(function () {
        window.location.href = targetUrl
      }, 300)
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