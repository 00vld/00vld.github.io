---
layout: null
sitemap:
  exclude: 'yes'
---

$(document).ready(function () {
  var $panel = $('.panel-cover');
  var $content = $('.content-wrapper');

  $('body').addClass('page-loaded');

  {% if site.disable_landing_page != true %}

  // Detect current path
  var currentPath = window.location.pathname.replace('{{ site.baseurl }}/', '');
  
  // If not on homepage, auto-collapse
  if (currentPath !== '' && currentPath !== 'index.html') {
    $panel.addClass('panel-cover--collapsed');
  }

  // If hash is #blog, auto-collapse
  if (window.location.hash === '#blog') {
    $panel.addClass('panel-cover--collapsed');
  }

  // Blog button click
  $('a.blog-button').click(function (e) {
    var currentWidth = $panel.width();
   
    // If panel is not collapsed yet, collapse it
    if (!$panel.hasClass('panel-cover--collapsed')) {
      e.preventDefault();
      
      if (currentWidth < 960) {
        // Mobile
        $panel.addClass('panel-cover--collapsed');
        $content.addClass('animated slideInRight');
      } else {
        // Desktop
        $panel.css('max-width', currentWidth);
        $panel.animate({'max-width': '530px', 'width': '40%'}, 400, 'swing', function () {
          $panel.addClass('panel-cover--collapsed');
        });
      }
    }
  });

  {% endif %}

  // Mobile menu
  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

});