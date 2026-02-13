---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {

  $('body').addClass('page-loaded')

  {% if site.disable_landing_page != true %}

  $('a.blog-button').on('click', function (e) {

    const isHome =
      window.location.pathname === '{{ site.baseurl }}/' ||
      window.location.pathname === '{{ site.baseurl }}/index.html'

    // ✅ FIX: Do NOT force redirect if not home
    if (!isHome) {
      return   // allow normal navigation
    }

    e.preventDefault()

    const $panel = $('.panel-cover')
    const $content = $('.content-wrapper')
    const isCollapsed = $panel.hasClass('panel-cover--collapsed')
    const currentWidth = $panel.width()

    if (isCollapsed) {
      $panel
        .removeClass('panel-cover--collapsed')
        .animate(
          { 'max-width': '100%', 'width': '100%' },
          400,
          'swing',
          function () {
            $panel.css({ 'max-width': '', 'width': '' })
            $('body').css('overflow-x', '')
          }
        )

      $content.removeClass('animated slideInRight')

    } else {
      if (currentWidth < 960) {
        $panel.addClass('panel-cover--collapsed')
        $content.addClass('animated slideInRight')
      } else {
        $('body').css('overflow-x', 'hidden')

        $panel
          .css({ 'max-width': currentWidth, 'width': currentWidth })
          .animate(
            { 'max-width': '530px', 'width': '30%' },
            400,
            'swing',
            function () {
              $panel.addClass('panel-cover--collapsed')
              $('body').css('overflow-x', '')
            }
          )
      }
    }
  })

  if (window.location.hash === '#blog') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (
    window.location.pathname !== '{{ site.baseurl }}/' &&
    window.location.pathname !== '{{ site.baseurl }}/index.html'
  ) {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  {% endif %}

  $('.btn-mobile-menu').on('click', function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon')
      .toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').on('click', function () {
    $('.navigation-wrapper').removeClass('visible')
    $('.btn-mobile-menu__icon')
      .toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})