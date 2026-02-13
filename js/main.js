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

  const isHome =
    window.location.pathname === '{{ site.baseurl }}/' ||
    window.location.pathname === '{{ site.baseurl }}/index.html'

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

    const isCollapsed = $panel.hasClass('panel-cover--collapsed')

    if (!isCollapsed) {

      // Mobile
      if ($(window).width() < 960) {

        $panel.addClass('panel-cover--collapsed')
        $content.addClass('animated slideInRight')

        setTimeout(function () {
          window.location.href = targetUrl
        }, 300)

      } 
      // Desktop
      else {

        $panel.animate(
          { width: '30%' },
          400,
          'swing',
          function () {
            $panel.addClass('panel-cover--collapsed')
            window.location.href = targetUrl
          }
        )
      }

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