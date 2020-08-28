
// ================================================================================== //

// # Document on Ready
// # Document on Resize
// # Document on Load

// # Leader Post Size
// # Sticky Sidebar Widget
// # Sticky Sidebar
// # Feature Section
// # Feature Parallax
// # Page Settings
// # Basic Elements
// # Isotope
// # Parallax Section
// # Section Settings
// # Scroll Direction
// # Global Variables
// # Scrollbar Width
// # Full Page

// ================================================================================== //


var EUTHEM = EUTHEM || {};
window.EUTHEM = EUTHEM;

(function($) {
  'use strict';


  // # Document on Ready
  // ============================================================================= //
  EUTHEM.documentReady = {
    init: function() {
      EUTHEM.pageSettings.bodyLoader();
      EUTHEM.svgAnimation.init();
      EUTHEM.advancedHiddenMenu.init();
      EUTHEM.pageSettings.removeVideoBg();
      EUTHEM.pageSettings.addVideoBg();
      EUTHEM.slideToggleMenu.init( '#eut-hidden-menu', '#eut-hidden-menu .eut-menu' );
      EUTHEM.slideToggleMenu.init( '#eut-main-header.eut-header-side', '#eut-main-menu.eut-vertical-menu .eut-menu' );
      EUTHEM.slideToggleMenu.init( '#eut-sidearea', '.widget_nav_menu' );
      EUTHEM.featureSection.init( '#eut-feature-section' );
      EUTHEM.featureParallax.init();
      EUTHEM.featureSection.init( '.eut-page-title' );
      EUTHEM.pageSettings.init();
      EUTHEM.sectionSettings.init();
      EUTHEM.leaderPostSize.init();
      EUTHEM.isotope.init();
      EUTHEM.basicElements.init();
      EUTHEM.pageSettings.lightGallery();
      EUTHEM.fullPage.init();
      EUTHEM.pillingPage.init();
      EUTHEM.sectionNav.init();
    },
  };

  EUTHEM.reCall = {
    init: function() {
      EUTHEM.sectionSettings.init();
    },
  };


  // # Document on Resize
  // ============================================================================= //
  EUTHEM.documentResize = {
    init: function() {
      EUTHEM.featureSize.init( '#eut-feature-section' );
      EUTHEM.featureSize.init( '.eut-page-title' );
      EUTHEM.sectionSettings.init();
      EUTHEM.sectionHeight.resetHeight( '.eut-section' );
      EUTHEM.anchorMenu.resetSticky( '.eut-anchor-menu' );
      EUTHEM.pageSettings.resizeVideoBg();
      EUTHEM.pageSettings.stickyElements();
      EUTHEM.isotope.relayout();
      EUTHEM.pageSettings.closeSideArea();
    },
  };

  // # Document on Load
  // ============================================================================= //
  EUTHEM.documentLoad = {
    init: function() {
      EUTHEM.sectionHeight.init( '.eut-section' );
      EUTHEM.parallaxSection.init('#eut-content .eut-bg-parallax');
      EUTHEM.parallaxSection.init('.eut-column.eut-bg-parallax');
      EUTHEM.anchorMenu.init( '.eut-anchor-menu' );
      EUTHEM.stickySidebarWidget.init();
      EUTHEM.stickySidebar.init();
      EUTHEM.pageSettings.stickyElements();
      EUTHEM.basicElements.iconBox();
      EUTHEM.pageSettings.columnEffect();
      EUTHEM.wooThumbCarousel.init();

      // Location Hash
      if (window.location.hash) {
        setTimeout(function() {
          const target = window.location.hash;
          if ( $(target).length ) {
            if ( $(target).hasClass('eut-tab-content') || $(target).hasClass('eut-accordion-content') ) {
              const tabLink = $('.eut-tab-link[data-rel="' + target + '"]:visible');
              if ( tabLink.length ) {
                tabLink.click();
                setTimeout(function() {
                  EUTHEM.pageSettings.linkGoToTop( tabLink );
                }, 500);
              }
            } else {
              $('html, body').scrollTop( $(target).offset().top );
            }
          }
        }, 0);
      }
    },
  };

  // # Section Height
  // ============================================================================= //
  EUTHEM.sectionHeight = {
    init: function(section) {
      const $section = $(section);
      EUTHEM.sectionHeight.resetHeight( section );
    },
    settings: function(element) {
      const windowH = $(window).height();
      const $section = element;
      $section.each(function() {
        const $that = $(this);

        if ( $that.find('.eut-big-post').length || $that.parents('.eut-big-post').length ) {
          $that.removeClass('eut-loading-height');
          return;
        };

        if ( !$that.hasClass('eut-percentage-height') && !$that.find('.eut-percentage-height').length ) return;

        if ( $that.hasClass('eut-percentage-height') ) {
          EUTHEM.sectionHeight.getHeight( $that, windowH );
        }
        const $row = $that.find('.eut-row');
        const $column = $that.find('.eut-column');
        const sectionH = $that.hasClass('eut-percentage-height') ? $that.height() : windowH;
        let maxHeight = 0;

        $column.each(function() {
          const $col = $(this);
          const $colChild = $col.find('.eut-inner-section.eut-percentage-height');
          const $colParent = $col.parents('.eut-row');
          const elementSpace = EUTHEM.sectionHeight.getElementSpace( $colChild );
          const colHeight = $col.height();
          const parentH = sectionH - elementSpace;

          $colChild.each(function() {
            EUTHEM.sectionHeight.getHeight( $(this), parentH );
          });
          maxHeight = $colParent.height() > maxHeight ? $colParent.height() : maxHeight;
        });

        if ( maxHeight >= sectionH ) {
          $row.css({'min-height': maxHeight});
        }
      });
    },
    getRatio: function(element) {
      let ratio;
      const windowWidth = $(window).width() + scrollBarWidth;

      if ( windowWidth > tabletLandscape ) {
        ratio = element.data('height-ratio') !== undefined ? element.data('height-ratio')/100 : 0;
      } else if ( windowWidth > tabletPortrait && windowWidth <= tabletLandscape ) {
        ratio = element.data('tablet-height-ratio') !== undefined ? element.data('tablet-height-ratio')/100 : element.data('height-ratio') !== undefined ? element.data('height-ratio')/100 : 0;
      } else if ( windowWidth > mobileScreen && windowWidth <= tabletPortrait ) {
        ratio = element.data('tablet-sm-height-ratio') !== undefined ? element.data('tablet-sm-height-ratio')/100 : element.data('height-ratio') !== undefined ? element.data('height-ratio')/100 : 0;
      } else {
        ratio = element.data('mobile-height-ratio') !== undefined ? element.data('mobile-height-ratio')/100 : element.data('height-ratio') !== undefined ? element.data('height-ratio')/100 : 0;
      }

      return ratio;
    },
    getHeight: function( element, parentH ) {
      element.css({'height': 'auto'});
      const ratio = EUTHEM.sectionHeight.getRatio( element );
      const minHeight = element.data('min-height') !== undefined ? element.data('min-height') : 0;
      const paddingT = parseInt( element.css('padding-top') );
      const paddingB = parseInt( element.css('padding-bottom') );
      const space = paddingT + paddingB;
      const content = element.find('.eut-percentage-content').first();
      const contentH = content.height();
      const elementH = Math.round( parentH * ratio );
      const height = elementH > minHeight ? elementH - space : minHeight - space;

      EUTHEM.sectionHeight.setHeight( element, content, height, contentH );
    },
    setHeight: function( element, content, height, contentH ) {
      if ( height > contentH ) {
        content.css({'height': height});
      }
      element.removeClass('eut-loading-height');
    },
    getElementSpace: function( element ) {
      const space = element.parent().children('.eut-element, .eut-empty-space');
      let size = 0;
      space.each(function() {
        size += $(this).outerHeight();
      });
      return size;
    },
    resetHeight: function( section ) {
      const $section = $(section);
      const $row = $section.find('.eut-row');
      const $content = $section.find('.eut-percentage-content');
      $section.css({'height': ''});
      $row.css({'height': ''});
      $content.css({'height': ''});
      EUTHEM.sectionHeight.settings( $section );
    },
  };

  // # Fixed Custom Position Column
  // ============================================================================= //
  EUTHEM.customPositionColumn = {
    init: function() {
      $('.eut-column.eut-custom-position').each(function() {
        const $column = $(this);
        let columnW; let columnX; let windowW;

        setup();

        if ( !isMobile.any() ) {
          $(window).on('resize', resizer);
        } else {
          $(window).on('orientationchange', resizer);
        }
        function setup() {
          resetPosition();
          updateParams();
          if ( columnW + columnX >= windowW ) {
            resetPosition();
            fixedPositionRight();
          }

          if ( columnX < 0 ) {
            resetPosition();
            fixedPositionLeft();
          }
        }
        function updateParams() {
          columnW = $column.outerWidth();
          columnX = $column.offset().left;
          windowW = $(window).width();
        }
        function resizer() {
          let delay;
          window.clearTimeout(delay);
          delay = window.setTimeout(function() {
            setup();
          }, 200);
        }
        function fixedPositionRight() {
          const newPosX = ( windowW - columnW ) - $column.offset().left;
          $column.css({'left': newPosX, 'right': ''});
        }
        function fixedPositionLeft() {
          const newPosX = - $column.offset().left;
          $column.css({'left': newPosX, 'right': ''});
        }
        function resetPosition() {
          $column.css({'left': '', 'right': ''});
        }
      });
    },
  };

  // SVG Animation
  EUTHEM.svgAnimation = {
    init: function() {
      if (bodyLoader) {
        return false;
      }
      const $svg = $('.eut-svg-icon');
      $svg.each(function() {
        const $icon = $(this);
        const duration = $icon.data('duration');
        const id = $icon.attr('id');
        const file = $icon.data('file');
        let myVivus;
        let parentDelay = 0;

        if ( 'svg' !== file.split('.').pop() ) {
          return false;
        }

        if ( $icon.parents('.eut-element').hasClass('eut-animated-item') ) {
          parentDelay = $icon.parents('.eut-element').data('delay');
        }

        $icon.appear(function() {
          setTimeout(function() {
            myVivus = new Vivus( id, {
              duration: duration,
              file: file,
              type: 'async',
              start: 'inViewport',
            });
          }, parentDelay);
        }, {accX: 0, accY: 0});
      });
    },
  };


  // # Advanced Hidden Menu
  // ============================================================================= //
  EUTHEM.advancedHiddenMenu = {
    init: function() {
      const $header = $('#eut-header');
      const $mainHeader = $('#eut-main-header');
      const $menu = $('#eut-main-menu');
      const $menuEl = $menu.find('.eut-first-level');
      const $headerEl = $mainHeader.find('.eut-header-elements-wrapper');
      const $btn = $mainHeader.find('.eut-hidden-menu-btn a');
      let openHeader = false;
      let hoverDelay;

      if ( !$menu.length || !$header.hasClass('eut-advanced-hidden-menu') ) return;

      $mainHeader.on('mouseenter.advancedHidden', function() {
        const $that = $(this);
        if ( !openHeader ) {
          openHeader = true;
          toggleHeader();
        }
      });

      $mainHeader.on('mouseleave.advancedHidden', function() {
        const $that = $(this);
        if ( openHeader ) {
          openHeader = false;
          toggleHeader();
        }
      });

      $btn.on('click.advancedHidden', function(e) {
        e.preventDefault();
        if ( !openHeader ) {
          openHeader = true;
          toggleHeader();
        } else {
          openHeader = false;
          toggleHeader();
        }
      });

      if ( isMobile.any() ) {
        $mainHeader.off('mouseenter.advancedHidden');
        $mainHeader.off('mouseleave.advancedHidden');
      }

      const itemLength = $menuEl.length -1;
      let startTimer = false;
      let count = -1;
      let counter;

      function toggleHeader() {
        if ( openHeader ) {
          clearInterval(hoverDelay);
          $header.addClass('eut-header-hover');
          $menuEl.removeClass('hide');

          // Show Menu
          startTimer = true;
          counter = setInterval(timer, 100);
        } else {
          hoverDelay = setTimeout(function() {
            $header.removeClass('eut-header-hover');
            $menuEl.removeClass('show');
            $headerEl.removeClass('show');
          }, 400);

          // Hide Menu
          startTimer = false;
          count = -1;
          clearInterval(counter);
          $header.removeClass('eut-open-menu');
          $menuEl.addClass('hide');
        }
      }

      function timer() {
        count += 1;
        if (count >= itemLength) {
          clearInterval(counter);
          $header.addClass('eut-open-menu');
          $headerEl.addClass('show');
        }
        $menuEl.eq(count).addClass('show');
      }
    },
  };

  // # Leader Post Size
  // ============================================================================= //
  EUTHEM.leaderPostSize = {
    init: function() {
      const $leaderElement = $('.eut-blog-leader.eut-layout-1.eut-crocal-style');

      if ( !$leaderElement.length ) return;

      let windowWidth;
      let maxHeight;
      let leaderHeight;

      $leaderElement.each(function() {
        const $this = $(this);
        const $leaderPost = $this.find('.eut-post-leader');
        let resizing = false;


        resetHeight();
        $(window).smartresize(resetHeight);

        function resetHeight() {
          if (!resizing) {
            resizing = true;

            $leaderPost.css({
              'height': '',
            });

            updateParams();
          }
        }

        function updateParams() {
          windowWidth = $(window).width();

          $this.imagesLoaded('always', function() {
            maxHeight = $this.outerHeight();
            leaderHeight = $leaderPost.outerHeight();

            setLeaderHeight();
          });
        }

        function setLeaderHeight() {
          if ( maxHeight > leaderHeight && windowWidth + scrollBarWidth > tabletPortrait ) {
            $leaderPost.css({
              'height': maxHeight,
              'visibility': 'visible',
            });
          } else {
            $leaderPost.css({
              'visibility': 'visible',
            });
          }

          resizing = false;
        }
      });
    },
  };

  // # Anchor Menu
  // ============================================================================= //
  let openAnchorMenu = false;
  EUTHEM.anchorMenu = {
    init: function( anchor ) {
      const $anchor = $(anchor);
      if ( !$anchor.length ) return;
      EUTHEM.anchorMenu.resetSticky( anchor );
    },
    updateSticky: function( $wrapper, topOffset, topPos ) {
      const scroll = $(window).scrollTop();
      let sticky = false;

      if ( scroll >= topOffset ) {
        sticky = true;
        $wrapper
            .addClass('eut-sticky')
            .css({'top': topPos});
      } else {
        sticky = false;
        $wrapper
            .removeClass('eut-sticky')
            .css({'top': ''});
        $wrapper.css(EUTHEM.anchorMenu.doTranslate( 0 ));
      }
    },
    setOffset: function( anchor ) {
      const $anchor = $(anchor);
      const anchorT = $anchor.offset().top;
      const $header = $('#eut-header');
      const stikyType = $header.data('sticky');
      const headerH = $header.data('sticky-height') !== undefined && stikyType != 'scrollup' && stikyType != 'none' ? $header.data('sticky-height') : 0;
      const frameSize = $('body').hasClass('eut-framed') ? $('#eut-frames').find('.eut-frame.eut-top').height() : 0;
      let offset = 0;

      offset = {
        topOffset: anchorT - headerH - frameSize,
        topPos: headerH + frameSize,
      };
      return offset;
    },
    resetSticky: function( anchor ) {
      const $anchor = $(anchor);
      if ( !$anchor.length ) return;
      const $wrapper = $anchor.children('.eut-anchor-wrapper');
      const windowW = $(window).width();

      EUTHEM.anchorMenu.resetResponsive( anchor );

      if ( windowW + scrollBarWidth < 1023 ) {
        $anchor.addClass('eut-anchor-responsive');
        $wrapper.removeClass('eut-sticky');
        $wrapper.css(EUTHEM.anchorMenu.doTranslate( 0 ));
        $(window).off('scroll.eut_anchor');
        EUTHEM.anchorMenu.responsive( anchor );
      } else {
        $anchor.removeClass('eut-anchor-responsive');
        const topOffset = EUTHEM.anchorMenu.setOffset( anchor ).topOffset;
        const topPos = EUTHEM.anchorMenu.setOffset( anchor ).topPos;
        $(window).on('scroll.eut_anchor', function() {
          EUTHEM.anchorMenu.updateSticky( $wrapper, topOffset, topPos );
        });
      }
    },
    moveAnchor: function( anchor, position ) {
      const $anchor = $(anchor);
      const $wrapper = $anchor.children('.eut-anchor-wrapper');
      if ( $wrapper.hasClass('eut-sticky') ) {
        $wrapper.css(EUTHEM.anchorMenu.doTranslate( position ));
      }
    },
    doTranslate: function(value) {
      return {
        '-webkit-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
        '-moz-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
        '-ms-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
        '-o-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
        'transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
      };
    },
    responsive: function( anchor ) {
      const $anchor = $(anchor);
      const $btn = $anchor.find('.eut-anchor-btn');
      const $menu = $anchor.find('.menu');
      const $menuLink = $menu.find('a');

      $btn.on('click', function(e) {
        e.preventDefault();
        if (openAnchorMenu) {
          $anchor.css({'height': ''});
          $menu.slideUp(function() {
            openAnchorMenu = false;
            $(this).removeAttr('style');
          });
        } else {
          $anchor.css({'height': 'auto'});
          $menu.slideDown(function() {
            openAnchorMenu = true;
          });
        }
      });
    },
    resetResponsive: function( anchor ) {
      const $anchor = $(anchor);
      const $menu = $anchor.find('.menu');
      $menu.removeAttr('style');
      openAnchorMenu = false;
    },
  };

  // # Menu Slide or Toggle
  // ============================================================================= //
  EUTHEM.slideToggleMenu = {

    init: function( parrent, element ) {
      $(element).each(function() {
        if ( !$(this).length ) return;

        const $menu = $(this);
        const $menuParent = $menu.parents(parrent);
        const $menuItem = $menu.find('li.menu-item-has-children > a');
        const menuType = $menuParent.hasClass('eut-slide-menu') ? 'slide' : 'toggle';
        const $arrow = $('<i class="eut-arrow"></i>');
        const $goBack = $('<li class="eut-goback"><a href="#"><i class="eut-arrow"></i></a></li>');

        EUTHEM.slideToggleMenu.removeHiddenMenuItems( $menu );

        if ( menuType === 'slide' ) {
          // Add Arrows
          $arrow.appendTo( $menuItem.parent() );
          // Add Go Back Button for Slide Menu
          $goBack.prependTo( $menuItem.parent().find('>ul') );
        } else {
          // Add Arrows
          $arrow.appendTo( $menuItem );
        }

        $menuItem.on('tap click', function(e) {
          const $this = $(this);
          const link = $this.attr('href');
          let open = false;

          if ((link != '#' || link === '#') && menuType == 'toggle' ) {
            if ( !$this.parent().hasClass('open') && !open ) {
              e.preventDefault();
              $this.parent().addClass('open');
              toggle( $this, open );
            } else {
              open = true;
              toggle( $this, open );
              $this.parent().removeClass('open');
            }
          } else if ( link === '#' && menuType == 'slide' ) {
            e.preventDefault();
            const listLevel = $this.parents('ul').length;
            const $firstItem = $this.parent().find('ul').first();
            const menuOffset = $menu.offset().top;
            const offset = $this.offset().top;
            const title = $this.html();

            appendTitle( title, $firstItem );

            $firstItem.addClass('show').css({'top': - ( offset - menuOffset )});
            const firstItemH = $firstItem.outerHeight();

            if ( $('body').hasClass('rtl') ) {
              animRightMenu( firstItemH, listLevel );
            } else {
              animLeftMenu( firstItemH, listLevel );
            }
          }
        });

        if ( menuType === 'slide' ) {
          const $arrowBtn = $menuItem.parent().find('.eut-arrow');
          $arrowBtn.on('click', function() {
            const $this = $(this);
            const listLevel = $this.parents('ul').length;
            const $firstItem = $this.parent().find('ul').first();
            const menuOffset = $menu.offset().top;
            const offset = $this.offset().top;
            const title = $this.parent().find('a').first().html();

            appendTitle( title, $firstItem );

            $firstItem.addClass('show').css({'top': - ( offset - menuOffset )});
            const firstItemH = $firstItem.outerHeight();

            if ( $('body').hasClass('rtl') ) {
              animRightMenu( firstItemH, listLevel );
            } else {
              animLeftMenu( firstItemH, listLevel );
            }
          });
        }

        $('li.eut-goback a').on('click', function(e) {
          e.preventDefault();
          const listLevel = $(this).parents('ul ul').length - 1;
          const $firstItem = $(this).closest('.sub-menu');
          const firstItemH = $firstItem.closest('.menu-item-has-children').closest('ul').height();

          setTimeout(function() {
            $firstItem.removeClass('show');
          }, 300);
          if ( $('body').hasClass('rtl') ) {
            animRightMenu( firstItemH, listLevel );
          } else {
            animLeftMenu( firstItemH, listLevel );
          }
        });

        function toggle( $this, open ) {
          const $subMenu = $this.parent().find('>ul');
          if ( open ) {
            $subMenu.slideUp(200);
          } else {
            $subMenu.slideDown(200);
          }
        }

        function animLeftMenu( height, listLevel ) {
          $menu.parent().height(height);
          $menu.css('transform', 'translate3d(' + - listLevel * 100 + '%,0,0)');
        }

        function animRightMenu( height, listLevel ) {
          $menu.parent().height(height);
          $menu.css('transform', 'translate3d(' + listLevel * 100 + '%,0,0)');
        }

        function appendTitle( title, list ) {
          if ( list.find('.eut-goback .eut-item').length ) return;
          $(title).appendTo( list.find('> .eut-goback a') );
        }
      });
    },
    removeHiddenMenuItems: function( $menu ) {
      const $hiddenMenuItem = $menu.find('li.eut-hidden-menu-item');
      const $link = $hiddenMenuItem.find('>a');
      const $subMenu = $hiddenMenuItem.find('>.sub-menu');

      $link.remove();
      $subMenu.unwrap().children().unwrap();
    },

  };

  // # Sticky Sidebar Widget
  // ============================================================================= //
  EUTHEM.stickySidebarWidget = {
    init: function() {
      const $stickyWidget = $('#eut-content .eut-sticky-widget');
      let sidebarWidget = false;

      $stickyWidget.each(function() {
        const $this = $(this);

        if ( $this.length > 0 ) {
          if ( $('.eut-sticky-widget').parent().parent().is('#eut-sidebar') ) {
            sidebarWidget = true;
          }

          if ( sidebarWidget && $('#eut-sidebar').hasClass('eut-fixed-sidebar') ) return;

          var $content = sidebarWidget ? $('#eut-main-content .eut-main-content-wrapper') : $this.parents('.eut-row');
          var $sidebar = $this.parent();
          const headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
          const anchorHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
          var topOffset = headerHeight + anchorHeight + 40;

          var windowWidth; var sidebarWidth; var sidebarHeight; var contentTop; var contentPadding; var sidebarTop;

          const scrolling = false;
          var sidebarAnimation = false;
          var resizing = false;

          updateParams();

          if ( windowWidth + scrollBarWidth > tabletPortrait ) {
            $(window).on('scroll', checkSidebar);
          }
          $(window).smartresize(resetScroll);
        }

        function checkSidebar() {
          if ( !sidebarAnimation ) {
            sidebarAnimation = true;
            updateSidebarPosition();
          }
        }

        function resetScroll() {
          if ( !resizing ) {
            resizing = true;
            $sidebar.removeClass('fixed').attr('style', '');
            updateParams();
          }
        }

        function updateParams() {
          windowWidth = $(window).width();
          sidebarWidth = $sidebar.width();
          sidebarHeight = $sidebar.height();
          contentTop = $content.offset().top;
          contentPadding = parseInt( $content.css('padding-top') );
          sidebarTop = $this.offset().top;

          $(window).off('scroll', checkSidebar);

          if ( windowWidth + scrollBarWidth > tabletPortrait ) {
            $(window).on('scroll', checkSidebar);
          }
          resizing = false;
        }

        function updateSidebarPosition() {
          const contentHeight = $content.height();
          const scrollTop = $(window).scrollTop();
          const topPosition = sidebarTop - contentTop - topOffset - contentPadding;

          if ( scrollTop < sidebarTop - topOffset ) {
            $sidebar.removeClass('fixed').attr('style', '');
          } else if ( scrollTop >= sidebarTop - topOffset && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset ) {
            $sidebar.addClass('fixed').css({'top': - topPosition, 'position': 'fixed', 'width': sidebarWidth});
          } else {
            if ( $sidebar.hasClass('fixed') ) {
              $sidebar.removeClass('fixed').css({'top': contentHeight - sidebarHeight + 'px', 'position': 'relative'});
            }
          }
          sidebarAnimation = false;
        }
      });
    },
  };

  // # Sticky Sidebar
  // ============================================================================= //
  EUTHEM.stickySidebar = {
    init: function() {
      const $sidebar = $('#eut-sidebar');
      if ( $sidebar.length > 0 && $sidebar.hasClass('eut-fixed-sidebar') ) {
        var $content = $('#eut-main-content .eut-main-content-wrapper');
        var $sidebarWrapper = $sidebar.find('.eut-wrapper');
        const headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
        const anchorHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
        var topOffset = headerHeight + anchorHeight + 100;
        var bottomOffset = 0;

        var windowWidth; var sidebarWidth; var sidebarHeight; var contentPadding; var sidebarTop;

        const scrolling = false;
        var sidebarAnimation = false;
        var resizing = false;

        updateParams();

        if ( windowWidth + scrollBarWidth > tabletPortrait ) {
          $(window).on('scroll', checkSidebar);
        }

        $(window).smartresize(resetScroll);
      }

      function checkSidebar() {
        if ( !sidebarAnimation ) {
          sidebarAnimation = true;
          updateSidebarPosition();
        }
      }

      function resetScroll() {
        if ( !resizing ) {
          resizing = true;
          $sidebarWrapper.removeClass('fixed').attr('style', '');
          updateParams();
        }
      }

      function updateParams() {
        windowWidth = $(window).width();
        sidebarWidth = $sidebar.width();
        sidebarHeight = $sidebar.height();
        contentPadding = parseInt( $content.css('padding-top') );
        sidebarTop = $sidebar.offset().top;

        if ( $('.eut-navigation-bar').length ) {
          bottomOffset = $('.eut-navigation-bar').outerHeight() + 60;
        }

        $(window).off('scroll', checkSidebar);

        if ( windowWidth + scrollBarWidth > tabletPortrait ) {
          checkSidebar();
          $(window).on('scroll', checkSidebar);
        }

        $sidebar.css({
          'visibility': 'visible',
        });

        resizing = false;
      }

      function updateSidebarPosition() {
        const contentHeight = $content.height();
        const scrollTop = $(window).scrollTop();

        if ( scrollTop < sidebarTop - topOffset + contentPadding ) {
          $sidebarWrapper.removeClass('fixed').attr('style', '');
        } else if ( scrollTop >= sidebarTop - topOffset + contentPadding && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset + contentPadding - bottomOffset ) {
          $sidebarWrapper.addClass('fixed').css({'top': topOffset, 'position': 'fixed', 'width': sidebarWidth});
        } else {
          if ( $sidebarWrapper.hasClass('fixed') ) {
            $sidebarWrapper.removeClass('fixed').css({'top': contentHeight - sidebarHeight - bottomOffset + 'px', 'position': 'relative'});
          }
        }
        sidebarAnimation = false;
      }
    },
  };

  // # Set Feature Section Size
  // ============================================================================= //
  EUTHEM.featureSize = {
    init: function( section ) {
      if ( !$(section).length ) return;
      const $section = $(section);
      if ( $section.hasClass('eut-fullscreen') ) {
        this.fullscreenSize( $section );
      } else if ( $section.hasClass('eut-custom-size') ) {
        this.customSize( $section );
      }
    },
    getTopBarHeight: function( topBar ) {
      let height = 0;
      const $topBar = $(topBar);
      if ( $topBar.length ) {
        height = $topBar.outerHeight();
      }
      return height;
    },
    getHeaderHeight: function( header, responsiveHeader ) {
      let height = 0;
      const $header = $(header);
      const $resHeader = $(responsiveHeader);
      if ( $header.length && $header.is(':visible') && !$header.hasClass('eut-overlapping') && !$header.hasClass('eut-header-below') ) {
        height = $header.outerHeight();
      }
      if ( $resHeader.length && $resHeader.is(':visible') && !$header.hasClass('eut-responsive-overlapping') && !$header.hasClass('eut-header-below') ) {
        height = $resHeader.outerHeight();
      }
      return height;
    },
    fullscreenSize: function( $section ) {
      const windowH = $(window).height();
      const headerH = this.getHeaderHeight( '#eut-header', '#eut-responsive-header' );
      const topBarH = this.getTopBarHeight( '#eut-top-bar' );
      const frameSize = $('body').hasClass('eut-framed') ? $('#eut-frames').find('.eut-frame.eut-top').height() : 0;
      const sectionH = windowH - headerH - topBarH - (frameSize * 2);
      $section.css( 'height', sectionH).find('.eut-wrapper').css( 'height', sectionH);
    },
    customSize: function( $section ) {
      const windowH = $(window).height();
      const initHeight = $section.data('height');
      let newHeight = ((windowH * initHeight) / 100);
      if ( newHeight > this.windowH ) {
        newHeight = this.windowH;
      }
      $section.css( 'height', newHeight).find('.eut-wrapper').css( 'height', newHeight);
    },
  };

  // # Feature Section
  // ============================================================================= //
  EUTHEM.featureSection = {
    init: function(section) {
      if ( !section.length ) return;
      const $section = $(section);
      const $bgImage = $section.find('.eut-bg-image');
      const $bgVideo = $section.find('.eut-bg-video');
      const $spinner = $(spinner);
      let animateContent = false;

      // Set Size
      EUTHEM.featureSize.init( section );

      if ( $bgImage.length ) {
        // Load Background Images
        loadFeatureImage();
      } else if ( !$bgImage.length && $bgVideo.length ) {
        showFeature();
      } else {
        // Play Animation Content
        featureAnimation( $section );
      }

      // Load Background Images
      function loadFeatureImage() {
        let totalBgImage = $bgImage.length;
        const waitImgDone = function() {
          totalBgImage--;
          if (!totalBgImage) {
            showFeature();
          }
        };
        $bgImage.each(function() {
          function imageUrl(input) {
            return input.replace(/"/g, '').replace(/url\(|\)$/ig, '');
          }
          const image = new Image();
          const $that = $(this);
          image.src = imageUrl($that.css('background-image'));
          $(image).on('load', waitImgDone).on( 'error', waitImgDone );
        });
      }

      // Add Spinner
      function addSpinner() {
        $spinner.appendTo( $section );
        $section.addClass('eut-with-spinner');
      }

      // Remove Spinner
      function removeSpinner() {
        $spinner.fadeOut(900, function() {
          $spinner.remove();
          // Show Feature Section
          showFeature();
        });
      }

      // Show Feature Section
      function showFeature() {
        const $overlay = $section.find('.eut-bg-overlay');
        const $content = $section.find('.eut-content');
        const $bgImage = $section.find('.eut-bg-image');
        const $bgVideo = $section.find('.eut-bg-video');

        $bgImage.addClass('show');
        $bgVideo.addClass('show');
        $overlay.addClass('show');

        animateContent = true;
        if ( $section.hasClass('eut-with-slider') ) {
          // Init Feature Slider
          featureSlider();
        } else {
          // Play Feature Animation
          featureAnimation( $section );
        }
      }

      // Feature Slider
      function featureSlider() {
        const $slider = $('#eut-feature-slider');
        const pauseHover = $slider.attr('data-slider-pause') == 'yes' ? true : '';
        const sliderSpeed = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000;
        const transition = $slider.attr('data-slider-transition');
        const slidersLength = $slider.find('.eut-slider-item').length;
        const pagination = $slider.attr('data-pagination') != 'no' ? true : false;
        const $nextNav = $slider.parent().find('.eut-carousel-next');
        const $prevNav = $slider.parent().find('.eut-carousel-prev');
        let loop = true;
        let animateOut = false;
        let animateIn = false;
        let stopSlider = false;

        // Slider Trantition
        if ( transition != 'slide' ) {
          animateOut = 'carousel-' + transition + '-out';
          animateIn = 'carousel-' + transition + '-in';
        }

        EUTHEM.featureSection.addPaginationNumbers();


        $slider.on('initialized.owl.carousel changed.owl.carousel', function(event) {
          const current = event.item.index !== null ? event.item.index : 0;
          const $currentSlide = $(event.target).find('.eut-slider-item').eq(current);
          const sliderColor = $currentSlide.attr('data-header-color');
          const color = 'eut-' + sliderColor;

          if ( !$currentSlide.length) return;

          // Slider Animation
          featureAnimation( $currentSlide );

          EUTHEM.featureSection.getActiveNumber( current );

          // Set Header Color
          if ( !$('#eut-main-header').hasClass('eut-header-side') ) {
            $('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
          }

          // Set Navigation Color
          $('#eut-feature-slider').removeClass('eut-light eut-dark eut-default').addClass(color);
          $('#eut-feature-section .eut-carousel-navigation').removeClass('eut-light eut-dark eut-default').addClass(color);
          $('#eut-feature-section .eut-carousel-pagination').removeClass('eut-light eut-dark eut-default').addClass(color);

          $('#eut-feature-section .eut-slider-numbers').removeClass('eut-light eut-dark eut-default').addClass(color);
        });

        if ( $slider.find('.eut-slider-item').length == 1 ) {
          loop = false;
        }

        $slider.owlCarousel({
          items: 1,
          loop: loop,
          autoplay: true,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: pauseHover,
          smartSpeed: 500,
          dots: pagination,
          dotsClass: 'eut-carousel-pagination',
          animateOut: animateOut,
          animateIn: animateIn,
          responsiveClass: false,
          itemClass: 'eut-slider-item-wrapper',
        });

        $(window).on('scroll', autoplayHandler);

        function autoplayHandler() {
          const scroll = $(window).scrollTop();
          if ( scroll > 300 && !stopSlider ) {
            stopSlider = true;
            $slider.trigger('stop.owl.autoplay');
          } else if ( scroll < 300 && stopSlider ) {
            stopSlider = false;
            $slider.trigger('play.owl.autoplay');
          }
        }

        // Go to the next item
        $nextNav.on( 'click', function() {
          $slider.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $prevNav.on( 'click', function() {
          $slider.trigger('prev.owl.carousel');
        });
      }

      // Feature Animation
      function featureAnimation(section) {
        const $section = section;
        const $wrapper = $section.find('.eut-title-content-wrapper');
        const effect = $section.find('.eut-content').data('animation');
        const effectClass = 'eut-animate-' + effect;
        const delay = 200;
        let cnt = 0;
        let contentItems = {
          graphic: $section.find(' .eut-graphic '),
          subheading: $section.find(' .eut-subheading '),
          title: $section.find(' .eut-title '),
          description: $section.find(' .eut-description '),
          titleMeta: $section.find(' .eut-title-meta-content '),
          button1: $section.find(' .eut-btn-1 '),
          button2: $section.find(' .eut-btn-2 '),
          gotoArrow: $section.find(' .eut-goto-section-wrapper '),
        };

        // Show Content
        $section.find('.eut-content').addClass('show');

        if ( !$wrapper.hasClass('eut-bg-none') ) {
          contentItems = $wrapper;
        }

        // Add Animation Class
        $.each( contentItems, function( key, item ) {
          $(item).removeClass('eut-animate-fade-in eut-animate-fade-in-up eut-animate-fade-in-down eut-animate-fade-in-left eut-animate-fade-in-right eut-animate-zoom-in eut-animate-zoom-out');

          if ( $(item).length ) {
            cnt++;
            if ( effect != 'none' ) {
              setTimeout(function() {
                $(item).addClass( effectClass );
              }, cnt * delay);
            }
          }
        });
      }
    },
    addPaginationNumbers: function() {
      const $slider = $('#eut-feature-slider');
      const $sliderItems = $slider.find('.eut-slider-item');
      const $list = $slider.parent().find('.eut-slider-numbers');
      const sliderSpeed = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000;

      if ( $list.length > 0 ) {
        $list.appendTo( $slider.parent() );
        $sliderItems.each(function(num, item) {
          const number = (num + 1) < 10 ? '0' + (num + 1) : num + 1;
          const $listIem = $('<li class="eut-link-text">' + number +'</li>');
          $listIem.appendTo( $list );
        });

        $list.find('li').on('click', function() {
          const $that = $(this);
          const goTo = $that.index();
          let timer;
          $slider.trigger('to.owl.carousel', [goTo, 300]);
          $slider.trigger('stop.owl.autoplay');
          $that.addClass('active').siblings().removeClass('active');
          clearTimeout(timer);
          timer = setTimeout(function() {
            $slider.trigger('play.owl.autoplay');
          }, sliderSpeed);
        });
      }
    },
    getActiveNumber: function( currentSlider ) {
      const $slider = $('#eut-feature-slider');
      const $list = $slider.parent().find('.eut-slider-numbers');
      const $listIem = $list.find('li');
      if ( $list.length > 0 ) {
        const currentNumber = currentSlider - 2 <= 0 ? 0 : currentSlider - 2;
        $listIem.eq(currentNumber).addClass('active').siblings().removeClass('active');
      }
    },
  };

  // # Feature Parallax
  // ============================================================================= //
  const featureParallaxScroll = false;
  EUTHEM.featureParallax = {
    init: function() {
      const section = $('#eut-feature-section');
      let scroll = false;
      let smallDelay;

      if ( !section.hasClass('eut-bg-parallax') && !section.hasClass('eut-bg-advanced-parallax') && !section.hasClass('eut-bg-fixed-section') ) {
        return;
      }

      // Create Parallax Wrapper
      section.children().wrapAll('<div class="eut-feature-inner"><div class="eut-parallax-wrapper"></div></div>');

      updateParallax();

      // Add window events
      $(window).on('resize', function() {
        window.clearTimeout(smallDelay);
        smallDelay = window.setTimeout(function() {
          updateParallax();
        }, 100);
      });
      $(window).on('scroll', onWindowScroll);

      function onWindowScroll() {
        if ( window.requestAnimationFrame ) {
          if (!scroll) {
            window.requestAnimationFrame( updateParallax );
            scroll = true;
          }
        } else {
          updateParallax();
        }
      }

      function updateParallax() {
        const wrapper = section.find('.eut-parallax-wrapper');
        let parallaxType;
        if ( section.hasClass('eut-bg-advanced-parallax') ) {
          parallaxType = 'advanced';
        } else if ( section.hasClass('eut-bg-fixed-section') ) {
          parallaxType = 'fixed';
        } else {
          parallaxType = 'classic';
        }

        if ( inViewport( section ) ) {
          // References
          const scrollTop = $( window ).scrollTop();
          const sectionTop = section.offset().top;
          const sectionW = section.outerWidth();
          const sectionH = section.outerHeight();
          const position = scrollTop * 0.2;
          const elementH = sectionH + sectionTop;
          const opacity = ( ( ( sectionH + sectionTop ) - scrollTop ) / sectionH ).toFixed(2);
          const scale = ( ( ( sectionH + sectionTop ) + scrollTop ) / sectionH );
          const content = section.find('.eut-wrapper, .eut-background-wrapper');
          const bgImage = section.find('.eut-bg-image');
          if ( tSupport ) {
            if ( parallaxType == 'advanced' ) {
              wrapper.css({
                'position': 'fixed',
                'top': sectionTop,
                'height': elementH,
                'width': sectionW,
                'transform': 'translate3d( 0px' + ', ' + -position + 'px' + ', 0px) translateZ(0)',
                'visibility': 'visible',
              });
            } else if ( parallaxType == 'fixed' ) {
              wrapper.css({
                'position': 'fixed',
                'top': sectionTop,
                'height': elementH,
                'width': sectionW,
                'visibility': 'visible',
              });
            } else {
              wrapper.css({
                'position': 'relative',
                'height': elementH,
                'width': sectionW,
                'transform': 'translate3d( 0px' + ', ' + position + 'px' + ', 0px) translateZ(0)',
                'visibility': 'visible',
              });
            }

            bgImage.css({visibility: 'visible'});
          }
        } else {
          wrapper.css({
            'position': 'relative',
          });
        }
        scroll = false;
      }

      function inViewport( element ) {
        const winTop = $( window ).scrollTop();
        const winBottom = winTop + $( window ).height();
        const elTop = element.offset().top;
        const elBottom = elTop + element.outerHeight();
        return ( winBottom >= elTop && winTop <= elBottom );
      }
    },
  };

  // # Woocommerce Carousel Thumb Gallery
  // ============================================================================= //
  EUTHEM.wooThumbCarousel = {
    init: function() {
      const $thumbs = $('#eut-product-feature-image').find('.thumbnails');
      const $thumbsWrapper = $thumbs.find('.eut-thumbnails-wrapper');
      const $thumbsInner = $thumbs.find('.eut-thumbnails-inner');
      const $items = $thumbs.find('.eut-thumb-item');
      const $arrowPrev = $('<i class="eut-icon-nav-up-small eut-arrow-prev"></i>');
      const $arrowNext = $('<i class="eut-icon-nav-down-small eut-arrow-next"></i>');
      let wrapper = false;
      let smallDelay;
      let wrapperH;
      let slidesLength;
      let cnt;


      if ( !$thumbs.length || $items.length <= 4 ) {
        $thumbsWrapper.css({
          'visibility': 'visible',
        });
        return false;
      }

      setSlider();
      $(window).on('resize', function() {
        window.clearTimeout(smallDelay);
        smallDelay = window.setTimeout(function() {
          setSlider();
        }, 300);
      });

      function addWrapper() {
        if ( !wrapper ) {
          for (let i = 0, len = $items.length; i < len; i += 4) {
            $items.slice(i, i + 4).wrapAll('<div class="eut-thumb-wrapper"/>');
          }

          wrapperH = $('.eut-thumb-wrapper').first().outerHeight();
          slidesLength = $('.eut-thumb-wrapper').length - 1;

          $thumbsWrapper.css({
            'height': wrapperH,
            'overflow': 'hidden',
            'visibility': 'visible',
          });

          addArrows();
          $thumbsInner.addClass('eut-with-transition');

          wrapper = true;
        }
      }

      function addArrows() {
        $arrowPrev.appendTo( $thumbs );
        $arrowNext.appendTo( $thumbs );
        // Add Classes
        $arrowPrev.addClass('eut-disable-arrow');
        $arrowNext.removeClass('eut-disable-arrow');

        cnt = 0;
        bindEvents();
      }

      function moveSlide(n) {
        $thumbsInner.css( doTranslate( n * wrapperH ) );
      }

      function setSlider() {
        if ( $(window).width() + scrollBarWidth < tabletPortrait && wrapper) {
          resetSlider();
        } else if ( $(window).width() + scrollBarWidth > tabletPortrait && !wrapper) {
          addWrapper();
        }
      }

      function resetSlider() {
        $thumbsInner.removeClass('eut-with-transition');
        $thumbsInner.css( doTranslate( 0 ) );
        $items.unwrap();
        $thumbsWrapper.css({
          'height': '',
          'overflow': 'visible',
          'visibility': 'visible',
        });

        $arrowPrev.remove();
        $arrowNext.remove();

        wrapper = false;
      }

      function bindEvents() {
        $arrowNext.on('click.thumb-arrows', function() {
          const $that = $(this);
          if ( cnt > - slidesLength ) {
            cnt--;
            moveSlide( cnt );
            $arrowPrev.removeClass('eut-disable-arrow');
          }
          if (cnt == -slidesLength ) {
            $that.addClass('eut-disable-arrow');
          }
        });

        $arrowPrev.on('click.thumb-arrows', function() {
          const $that = $(this);
          if ( cnt < 0 ) {
            cnt++;
            moveSlide( cnt );
            $arrowNext.removeClass('eut-disable-arrow');
          }
          if (cnt === 0 ) {
            $that.addClass('eut-disable-arrow');
          }
        });
      }

      function doTranslate( value ) {
        return {
          '-webkit-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
          '-moz-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
          '-ms-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
          '-o-transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
          'transform': 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
        };
      }
    },
  };

  // # Page Settings
  // ============================================================================= //
  EUTHEM.pageSettings = {

    init: function() {
      this.opacityScroll();
      this.changeOrder();
      this.mainMenu();
      this.setClippingWrappers();
      this.setAppearWrappers();
      this.stickyHeader();
      this.responsiveStickyHeader();
      this.eutModal();
      this.gotoFirstSection();
      this.bgLoader();
      this.fitVid();
      this.hiddenArea();
      this.sideArea();
      this.backtoTop();
      this.animatedBg();
      this.onePageSettings();
      this.socialShareLinks();
      this.productImageParallax();
      this.lightBox();
      this.showList();
      this.fixedFooter();
    },
    opacityScroll: function() {
      const $bgImage = $('.eut-bg-scroll-effect');
      $bgImage.each(function() {
        const $that = $(this);
        const offset = $that.data('opacity-offset') / 100;
        const initialOpacity = $that.data('initial-opacity') / 100;
        const finalOpacity = $that.data('final-opacity') / 100;
        const invert = $that.data('initial-opacity') > $that.data('final-opacity') ? false : true;

        $(window).on('scroll', function() {
          const scrollTop = invert ? ($(window).scrollTop() + $(window).height()) - $that.offset().top : $(window).scrollTop() - $that.offset().top;
          const scroll = scrollTop / ( $that.outerHeight() * offset );
          let opacity = initialOpacity + ( scroll * ( finalOpacity - initialOpacity ) );
          opacity = opacity.toFixed(2);
          if ( invert ) {
            if ( opacity >= finalOpacity ) {
              opacity = finalOpacity;
            }
            if ( opacity <= initialOpacity ) {
              opacity = initialOpacity;
            }
          } else {
            if ( opacity <= finalOpacity ) {
              opacity = finalOpacity;
            }
            if ( opacity >= initialOpacity ) {
              opacity = initialOpacity;
            }
          }
          $that.css({'opacity': opacity});
        });
      });
    },
    setClippingWrappers: function() {
      const $element = $('.eut-clipping-animation');
      const wrapper = '<div class="eut-clipping-wrapper"><div class="eut-clipping-content"></div></div>';
      if ( isMobile.any() && !deviceAnimAppear ) {
        $element.removeClass('eut-clipping-animation');
      } else {
        $element.wrapInner( wrapper );
        $element.each(function() {
          const $that = $(this);
          const $wrapper = $that.find('.eut-clipping-wrapper');
          if ( $that.hasClass('eut-colored-clipping') ) {
            const color = $that.data('clipping-color');
            const overlay = '<div class="eut-clipping-overlay eut-bg-' + color + '"></div>';
            $(overlay).appendTo( $wrapper );
          }
        });
        this.clippingAppear();
      }
    },
    setAppearWrappers: function() {
      const $element = $('.eut-appear-animation');
      const wrapper = '<div class="eut-appear-wrapper eut-animation-wrapper"><div class="eut-appear-content"></div></div>';
      if ( isMobile.any() && !deviceAnimAppear ) {
        $element.removeClass('eut-appear-animation');
      } else {
        $element.wrapInner( wrapper );
        this.animAppear();
      }
    },
    animAppear: function() {
      const $animationItem = $('.eut-appear-animation');

      if ( bodyLoader || $('body').hasClass('page-template-template-full-page') || $('body').hasClass('page-template-template-pilling-page') ) {
        return;
      }
      if ( isMobile.any() && !deviceAnimAppear ) {
        $animationItem.removeClass('eut-appear-animation');
      } else {
        $animationItem.each(function() {
          const $that = $(this);
          const timeDelay = $that.attr('data-delay');

          $that.appear(function() {
            setTimeout(function() {
              $that.addClass('eut-appear-animated');
            }, timeDelay);
          }, {accX: 0, accY: -150});
        });
      }
    },
    clippingAppear: function() {
      const $clippingEl = $('.eut-clipping-animation');
      if ( bodyLoader || $('body').hasClass('page-template-template-full-page') || $('body').hasClass('page-template-template-pilling-page') ) {
        return;
      }
      if ( isMobile.any() && !deviceAnimAppear ) {
        $clippingEl.removeClass('eut-clipping-animation');
      } else {
        $clippingEl.each(function() {
          const $that = $(this);
          const timeDelay = $that.attr('data-delay');

          $that.appear(function() {
            setTimeout(function() {
              EUTHEM.pageSettings.clippingAnimated( $that );
            }, timeDelay);
          }, {accX: 0, accY: -150});
        });
      }
    },
    clippingAnimated: function( $element ) {
      let delay = 700;
      const $overlay = $element.find( '.eut-clipping-overlay' );

      $element.addClass('eut-clipping-animated');

      if ( $element.hasClass('eut-colored-clipping') ) {
        setTimeout(function() {
          $element.addClass('eut-clipping-show-content');
        }, delay);

        delay = 1400;
      }
      setTimeout(function() {
        $overlay.remove();
        $element.removeClass('eut-clipping-animation eut-clipping-animated eut-colored-clipping eut-clipping-show-content');
        EUTHEM.basicElements.animAppear();
      }, delay);
    },
    bodyLoader: function() {
      const $overflow = $('#eut-loader-overflow');
      const $loader = $('.eut-spinner');
      const $link = $('a');

      if ( $overflow.length > 0 ) {
        bodyLoader = true;
      } else {
        return;
      }

      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        window.onpageshow = function(event) {
          if (event.persisted) {
            $overflow.removeClass('eut-visible eut-hide');
            window.location.reload();
          }
        };
      } else if (navigator.userAgent.indexOf('Firefox') != -1) {
        window.onunload = function() {};
      }

      if ( $overflow.hasClass('eut-page-transition') ) {
        const exclude = ['.eut-no-transition', '.eut-toggle-modal'];
        const comp = new RegExp(location.host);

        $('a:not(' + exclude + ')').on('click', function(e) {
          const link = this;
          if ( comp.test(link.href) && link.href.split(/\?|#/)[0] != location.href.split(/\?|#/)[0] && link.target != '_blank' && link.href[0] != '#') {
            if ( link.href.indexOf( '#' ) == -1 &&
							link.href.indexOf( 'skype:' ) == -1 &&
							link.href.indexOf( 'mailto:' ) == -1 &&
							link.href.indexOf( 'tel:' ) == -1 &&
							link.href.indexOf( 'jpg' ) == -1 &&
							link.href.indexOf( 'jpeg' ) == -1 &&
							link.href.indexOf( 'png' ) == -1 &&
							link.href.indexOf( 'gif' ) == -1 &&
							link.href.indexOf( 'bmp' ) == -1 &&
							link.href.indexOf( 'pdf' ) == -1 &&
							link.href.indexOf( 'zip' ) == -1 &&
							link.href.indexOf('add-to-cart=') == -1 ) {
              e.preventDefault();
              const newLocation = this.href;
              $overflow.addClass('eut-visible').removeClass('eut-hide');
              setTimeout(function() {
                window.location = newLocation;
              }, 600);
            }
          }
        });
      }

      let images = $('img, .eut-bg-image');
      $.each(images, function() {
        const el = $(this);
        const image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
        if (image && image !== '' && image !== 'none') {
          images = images.add($('<img>').attr('src', image));
        }
        if (el.is('img')) {
          images = images.add(el);
        }
      });

      images.imagesLoaded(function() {
        setTimeout(function() {
          if ( $overflow.hasClass('eut-page-transition') ) {
            $overflow.removeClass('eut-visible').addClass('eut-hide');
            setTimeout(function() {
              bodyLoader = false;
              EUTHEM.basicElements.animAppear();
              EUTHEM.pageSettings.clippingAppear();
              EUTHEM.pageSettings.animAppear();
              EUTHEM.svgAnimation.init();
              EUTHEM.basicElements.counter();
            }, 1200);
          } else {
            $loader.fadeOut(500);
            $overflow.delay(500).fadeOut(700, function() {
              bodyLoader = false;
              EUTHEM.basicElements.animAppear();
              EUTHEM.pageSettings.clippingAppear();
              EUTHEM.pageSettings.animAppear();
              EUTHEM.svgAnimation.init();
              EUTHEM.basicElements.counter();
            });
          }
        }, 600);
      });
    },
    changeOrder: function() {
      const $element = $('.eut-change-order');
      const $parent = $element.parent();
      $parent.each(function() {
        const $that = $(this);
        const $column = $that.children();
        const colLength = $column.length;
        const tabletArr = $.makeArray( $column.not('.eut-change-order') );
        const tabletSmArr = $.makeArray( $column.not('.eut-change-order') );
        const mobileArr = $.makeArray( $column.not('.eut-change-order') );

        $column.each(function(num, value) {
          const $that = $(value);
          if ( $that.hasClass('eut-change-order') ) {
            const tabletOrder = $that.data('tablet-order') !== undefined && $that.data('tablet-order') <= colLength ? $that.data('tablet-order') - 1 : $that.index();
            const tabletSmOrder = $that.data('tablet-sm-order') !== undefined && $that.data('tablet-sm-order') <= colLength ? $that.data('tablet-sm-order') - 1 : $that.index();
            const mobileOrder = $that.data('mobile-order') !== undefined && $that.data('mobile-order') <= colLength ? $that.data('mobile-order') - 1 : $that.index();
            tabletArr.splice( tabletOrder, 0, value);
            tabletSmArr.splice( tabletSmOrder, 0, value);
            mobileArr.splice( mobileOrder, 0, value);
          }
        });

        $.each( tabletArr, function(i, n) {
          $( this ).addClass('eut-tablet-order-' + (i + 1));
        });

        $.each( tabletSmArr, function(i, n) {
          $( this ).addClass('eut-tablet-sm-order-' + (i + 1));
        });

        $.each( mobileArr, function(i, n) {
          $( this ).addClass('eut-mobile-order-' + (i + 1));
        });
      });
    },
    stickyHeader: function() {
      const $header = $('#eut-header');
      const $innerHeader = $('#eut-main-header');
      const stickyType = $header.data('sticky');

      if ( stickyType === 'none' || !$header.length ) return;

      const headerHeight = $header.height();
      const headerTop = $innerHeader.hasClass('eut-header-logo-top') ? $('#eut-bottom-header').offset().top : $header.offset().top;
      let threshold = headerTop;
      let stickyHeader = '#eut-main-header';
      const thresholdBackground = $header.hasClass('eut-overlapping') || stickyType == 'scrollup' ? 0 : headerHeight;
      let thresholdHeadIn = 0;
      const thresholdHeadOut = headerTop + 500;
      let onScrollUp = null;
      let onScrollDown = null;
      let stickyTop = 0;
      let tolerance = {
        up: 0,
        down: 0,
      };

      if ( isMobile.any() ) {
        tolerance = {up: 20, down: 20};
      }

      if ( stickyType == 'scrollup' ) {
        threshold = $header.outerHeight() + headerTop;
        thresholdHeadIn = headerTop + headerHeight;
        onScrollUp = scrollUpCallback;
        onScrollDown = scrollDownCallback;
      }

      if ( $('body').hasClass('eut-framed') ) {
        stickyTop = $('#eut-frames').data('frame-size');
      }

      if ( $innerHeader.hasClass('eut-header-logo-top') ) {
        stickyHeader = '#eut-bottom-header';
      }

      $header.StickyHeader({
        stickyHeader: stickyHeader,
        thresholdSticky: threshold,
        thresholdBackground: thresholdBackground,
        thresholdHeadIn: thresholdHeadIn,
        thresholdHeadOut: thresholdHeadOut,
        stickyTop: stickyTop,
        tolerance: tolerance,
        onScrollUp: onScrollUp,
        onScrollDown: onScrollDown,
      });

      function scrollUpCallback() {
        if ( $('#eut-page-anchor').length ) {
          const position = $header.data('sticky-height');
          $('#eut-page-anchor').addClass('eut-go-down').removeClass('eut-go-up');
          EUTHEM.anchorMenu.moveAnchor( '#eut-page-anchor', position );
        }
      }

      function scrollDownCallback() {
        if ( $('#eut-page-anchor').length ) {
          $('#eut-page-anchor').addClass('eut-go-up').removeClass('eut-go-down');
          EUTHEM.anchorMenu.moveAnchor( '#eut-page-anchor', 0 );
        }
      }
    },
    responsiveStickyHeader: function() {
      const $header = $('#eut-header');
      const $responsiveHeader = $('#eut-responsive-header');
      const $innerHeader = $('#eut-main-header');
      const sticky = $header.data('devices-sticky');

      if ( sticky === 'no' || !$responsiveHeader.length ) return;

      const headerHeight = $header.height();
      const headerTop = $responsiveHeader.offset().top;
      const threshold = headerTop;
      const thresholdHeadIn = 0;

      $responsiveHeader.StickyHeader({
        thresholdSticky: threshold,
        thresholdHeadIn: thresholdHeadIn,
      });
    },
    stickyElements: function() {
      if ( $window.width() + scrollBarWidth > tabletPortrait ) {
        EUTHEM.pageSettings.initStickyElement();
      } else {
        $stickyEl.trigger('sticky_kit:detach');
      }
    },

    initStickyElement: function() {
      $stickyEl.each(function() {
        const $that = $(this);
        const paddingT = $that.css('padding-top');
        const paddingL = $that.css('padding-left');
        const paddingB = $that.css('padding-bottom');
        const paddingR = $that.css('padding-right');
        const elPadding = paddingT + ' ' + paddingR + ' ' + paddingB + ' ' + paddingL;
        const offset = $that.data('sticky-offset') !== undefined ? $that.data('sticky-offset') : 0;
        const headerHeight = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0;
        const anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
        const topOffset = offset + headerHeight + anchorBarHeight + wpBarHeight;
        const $parent = $that.parents('.eut-row').length ? $that.parents('.eut-row') : $that.parent();

        $that.stick_in_parent({
          parent: $parent,
          bottoming: true,
          inner_scrolling: false,
          offset_top: topOffset,
        }).on('sticky_kit:stick', function(e) {
          $(this).css({
            'padding-top': paddingT,
            'z-index': 9999,
          });
          this.style.setProperty('padding', elPadding, 'important');
        }).on('sticky_kit:unstick', function(e) {
          this.style.setProperty('padding', '');
        });
      });
    },
    addVideoBg: function() {
      $('.eut-yt-bg-video').each(function() {
        const $element = $(this);
        const url = $element.data('video-bg-url');
        const videoID = url.match( /[\\?&]v=([^&#]*)/ )[1];
        if ( '' !== videoID ) {
          insertYouTubeVideo($element, videoID );
        }
      });
      $('.eut-html5-bg-video').each(function() {
        const $element = $(this);
        EUTHEM.pageSettings.resizeVideoBgElement( $element );
      });
      $('.eut-vimeo-bg-video').each(function() {
        const $element = $(this);
        if ('undefined' != typeof Vimeo ) {
          const videoPlayer = new Vimeo.Player( $element.attr('id') );
          videoPlayer.on('loaded', function() {
            EUTHEM.pageSettings.resizeVideoBgElement( $element );
          });
        }
      });
      function insertYouTubeVideo($element, youtubeId, counter) {
        if ('undefined' == typeof YT || 'undefined' === typeof YT.Player) {
          counter = 'undefined' === typeof counter ? 0 : counter;
          if (100 < counter) {
            console.warn('Too many attempts to load YouTube api');
            return;
          }
          setTimeout(function() {
            insertYouTubeVideo($element, youtubeId, counter++);
          }, 100);
          return;
        }
        const startSeconds = $element.data('video-start') !== undefined ? parseInt( $element.data('video-start') ) : 0;
        const endSeconds = $element.data('video-end') !== undefined ? parseInt( $element.data('video-end') ) : 0;
        const $container = $element.prepend('<div class="eut-bg-youtube-video"><div class="inner"></div></div>').find('.inner');
        const ytPlayer = new YT.Player($container[0], {
          width: '100%',
          height: '100%',
          videoId: youtubeId,
          playerVars: {
            playlist: youtubeId,
            iv_load_policy: 3,
            enablejsapi: 1,
            disablekb: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            start: startSeconds,
            end: endSeconds,
            wmode: 'transparent',
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
          },
        });
        function onPlayerReady(event) {
          event.target.mute().setLoop(true);
        }
        function onPlayerStateChange(event) {
          if ( 0 !== startSeconds || 0 !== endSeconds ) {
            if (event.data === YT.PlayerState.ENDED) {
              ytPlayer.loadVideoById({
                videoId: youtubeId,
                startSeconds: startSeconds,
                endSeconds: endSeconds,
              });
            }
          }
        }
        // Resize Video
        EUTHEM.pageSettings.resizeVideoBgElement( $element );
      }
    },
    resizeVideoBg: function() {
      $videoBg.each(function() {
        EUTHEM.pageSettings.resizeVideoBgElement( $(this) );
      });
    },
    resizeVideoBgElement: function( $element ) {
      let videoEl;
      let videoW;
      let videoH;
      let marginLeft;
      let marginTop;
      const containerW = $element.innerWidth();
      const containerH = $element.innerHeight();
      const ratio1 = 16;
      const ratio2 = 9;

      if (containerW / containerH < ratio1 / ratio2) {
        videoW = containerH * (ratio1 / ratio2);
        videoH = containerH;
        videoW += 'px';
        videoH += 'px';
      } else {
        videoW = containerW;
        videoH = containerW * (ratio2 / ratio1);
        videoW += 'px';
        videoH += 'px';
      }
      if ( $element.hasClass('eut-yt-bg-video') || $element.hasClass('eut-vimeo-bg-video') || $element.hasClass('eut-iframe-bg-video') ) {
        videoEl = 'iframe';
      } else {
        videoEl = 'video';
      }

      $element.find( videoEl ).css({
        maxWidth: '1000%',
        width: videoEl == 'iframe' ? videoW : '',
        height: videoH,
      });
    },
    removeVideoBg: function() {
      $('.eut-background-wrapper').each(function() {
        const $wrapper = $(this);
        const $bgImage = $wrapper.find('.eut-bg-image');
        const $bgVideo = $wrapper.find('.eut-bg-video');
        const $bgHtml5Video = $wrapper.find('.eut-html5-bg-video');
        const $bgYtVideo = $wrapper.find('.eut-yt-bg-video');
        const $bgVimeoVideo = $wrapper.find('.eut-vimeo-bg-video');
        const $bgIFrameVideo = $wrapper.find('.eut-iframe-bg-video');
        const $bgVideoButton = $wrapper.find('.eut-bg-video-button-device');

        const bgVideoDevice = $bgVideo.data('videoDevice') !== undefined ? $bgVideo.data('videoDevice') : 'no';
        if ( isMobile.any() && 'no' === bgVideoDevice) {
          $bgVideo.remove();
        } else {
          if ( $bgHtml5Video.length ) {
            const $videoElement = $wrapper.find('.eut-bg-video video');
            let canPlayVideo = false;
            $wrapper.find('.eut-bg-video source').each(function() {
              if ( $videoElement.get(0).canPlayType( $(this).attr('type') ) ) {
                canPlayVideo = true;
              }
            });
            if (canPlayVideo) {
              $bgImage.remove();
            } else {
              $bgVideo.remove();
            }
          }
          if ( $bgYtVideo.length || $bgVimeoVideo.length || $bgIFrameVideo.length ) {
            $bgImage.remove();
          }
          if ( $bgVideoButton.length ) {
            $bgVideoButton.remove();
          }
        }
      });
    },
    linkGoToTop: function( element, delay, space ) {
      const $this = element;
      const elementTop = $this.offset().top;
      const header = $('#eut-header').length && $('#eut-main-header').is(':visible') ? true : false;
      const responsiveHeader = $('#eut-responsive-header').length && $('#eut-responsive-header').is(':visible') ? true : false;
      const headerHeight = header && $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0;
      const respHeaderH = responsiveHeader && $('#eut-header').data('devices-sticky') == 'yes' ? $('#eut-responsive-header').outerHeight() : 0;
      const topBarHeight = $('#eut-top-bar').length ? $('#eut-top-bar').height() : 0;
      const anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
      const delayAnim = delay !== undefined ? delay : 300;
      const topSpace = space !== undefined ? space : 0;
      const offset = topBarHeight + wpBarHeight + headerHeight + respHeaderH + anchorBarHeight + topSpace;
      if ( elementTop > 0 ) {
        $('html, body').delay(delayAnim).animate({
          scrollTop: elementTop - offset,
        }, 900, 'easeInOutCubic');
        $('html, body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function() {
          $('html, body').stop();
        });
        return false;
      }
    },
    mainMenu: function() {
      const $mainMenu = $('#eut-header .eut-horizontal-menu ul.eut-menu');

      $('.eut-main-menu').find( 'a[href="#"]').on('click', function(e) {
        e.preventDefault();
      });

      $mainMenu.superfish({
        popUpSelector: '.sub-menu',
        delay: 300,
        speed: 'fast',
        cssArrows: false,
        onBeforeShow: function() {
          const $subMenu = $(this);
          if ( !$subMenu.length ) return;
          const $li = $subMenu.parent();
          const windowW = $(window).width();
          const subMenuW = $subMenu.width();
          const liOffsetL = $li.offset().left;

          if ( $li.hasClass('megamenu')) {
            setTimeout(function() {
              setEqualMenuColumns( $li );
            }, 50);
          }

          if ( $li.hasClass('megamenu') && $li.css('position') == 'relative' ) {
            if (subMenuW + liOffsetL > windowW) {
              const left = windowW - (subMenuW + liOffsetL);
              $subMenu.css({'left': left});
            }
          }
          if ( $('#eut-header .eut-first-level').length > 0 ) {
            if ( !$li.hasClass('eut-first-level') && !$li.hasClass('megamenu') ) {
              const subMenuLength = $li.find('.sub-menu').length + 1;
              const subMenuOffsetL = $li.parents('.eut-first-level').offset().left;
              if ( (subMenuW * subMenuLength) + subMenuOffsetL > windowW) {
                $li.addClass('eut-invert');
              }
            } else if ( $li.hasClass('eut-first-level') && !$li.hasClass('megamenu') && $('#eut-header').hasClass('eut-fullwidth') ) {
              const menuOffsetL = $li.offset().left;
              if ( subMenuW + menuOffsetL > windowW) {
                $li.addClass('eut-invert');
              }
            }
          }

          if ( $('body').hasClass('eut-boxed') && ( $li.hasClass('megamenu column-3') || $li.hasClass('megamenu column-2') ) ) {
            const containerW = $('#eut-theme-wrapper').width();
            const containerL = $('#eut-theme-wrapper').offset().left;
            let positionL = 0;

            if ( subMenuW + liOffsetL > containerW + containerL ) {
              positionL = (containerW + containerL) - (subMenuW + liOffsetL);
            }

            $subMenu.css({
              'left': positionL,
            });
          }
        },
        onHide: function() {
          const $subMenu = $(this);
          const $li = $subMenu.parent();
          $li.removeClass('eut-invert');

          if ( $li.hasClass('megamenu')) {
            removeEqualMenuColumns( $li );
          }
        },
      });

      function setEqualMenuColumns( $li ) {
        const $subMenu = $li.children('ul');
        const $column = $subMenu.children('li');
        let maxHeight = 0;
        $column.each(function() {
          const columnH = $(this).outerHeight();
          if ( columnH >= maxHeight ) {
            maxHeight = columnH;
          }
        });
        $column.css({'height': maxHeight});
      }

      function removeEqualMenuColumns( $li ) {
        const $subMenu = $li.children('ul');
        const $column = $subMenu.children('li');
        $column.css({'height': ''});
      }
    },
    columnEffect: function() {
      const $parallaxColumn = $('.eut-parallax-effect');
      const $section = $parallaxColumn.parents('.eut-section');

      $parallaxColumn.each(function() {
        const $that = $(this);
        const parallaxEffect = $that.data('parallax-effect');
        const tabletL = $that.data('tablet-landscape-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false;
        const tabletP = $that.data('tablet-portrait-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false;
        const mobileL = $that.data('mobile-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false;
        const $section = $that.parents('.eut-section');

        imagesLoaded( $section, function() {
          $that.paraller({
            tabletL: [tabletLandscape, tabletL],
            tabletP: [tabletPortrait, tabletP],
            mobileL: [mobileScreen, mobileL],
          });
        });
      });
    },
    eutModal: function() {
      const $button = $('.eut-toggle-modal');
      const $overlay = $('<div id="eut-modal-overlay" class="eut-body-overlay"></div>');
      const $closeBtn = $('<div class="eut-close-modal"><i class="eut-icon-close"></i></div>');
      const $themeWrapper = $('#eut-theme-wrapper');
      let content;

      $button.on('click', function(e) {
        content = $(this).attr('href');
        if ( content.indexOf('#') === 0 && $(content).length > 0 ) {
          e.preventDefault();

          // Append Overlay on body
          $overlay.appendTo( $themeWrapper );
          $closeBtn.appendTo( $(content) );

          $(content).addClass('prepare-anim');

          openModal();

          $closeBtn.on('click', function(e) {
            e.preventDefault();
            closeModal();
          });

          $(content).on('click', function(e) {
            if ( !$('.eut-modal-item').is(e.target) && $('.eut-modal-item').has(e.target).length === 0 ) {
              e.preventDefault();
              closeModal();
            }
          });
        }
      });

      // Open Modal
      function openModal() {
        $overlay.fadeIn(function() {
          $(content).addClass('animate');

          // Search Modal
          if ( $(content).is('#eut-search-modal') ) {
            const $searchContent = $('#eut-search-modal');
            const $searchInput = $searchContent.find('.eut-search-textfield');

            $searchInput.val('');
            setTimeout(function() {
              $searchInput.focus();
            }, 600);
          }
        });
      }

      // Close Modal
      function closeModal() {
        $(content).removeClass('animate mobile');
        setTimeout(function() {
          $overlay.fadeOut(function() {
            $(content).removeClass('prepare-anim');
            $overlay.remove();
            $closeBtn.remove();
          });
        }, 600);
      }

      $(document).on('keyup', function(evt) {
        if (evt.keyCode == 27 && $(content).hasClass('animate') ) {
          closeModal();
        }
      });
    },
    gotoFirstSection: function() {
      const $selector = $('#eut-feature-section .eut-goto-section');
      const $nextSection = $('#eut-content');

      $selector.on('click', function() {
        $('html,body').animate({
          scrollTop: $nextSection.offset().top,
        }, 1000);
        return false;
      });
    },
    bgLoader: function() {
      const $selector = $('#eut-header .eut-bg-image, #eut-content .eut-bg-image, #eut-footer .eut-bg-image, .eut-navigation-bar .eut-bg-image, #eut-sidearea .eut-bg-image, #eut-theme-wrapper');
      $selector.each(function() {
        const $selector = $(this);
        if ( $selector.data('loader') == 'yes' ) {
          EUTHEM.pageSettings.addSpinner( $selector );
        }
        function imageUrl(input) {
          return input.replace(/"/g, '').replace(/url\(|\)$/ig, '');
        }
        const image = new Image();
        const $that = $(this);
        image.src = imageUrl($that.css('background-image'));
        image.onload = function() {
          if ( $selector.data('loader') == 'yes' ) {
            EUTHEM.pageSettings.removeSpinner( $selector );
          } else {
            $that.addClass('show');
          }
        };
      });
    },
    addSpinner: function( $selector ) {
      const $section = $selector;
      $(spinner).appendTo( $section.parent() );
    },
    removeSpinner: function( $selector ) {
      const $section = $selector.parent();
      const $spinner = $section.find('.eut-spinner');

      $spinner.fadeOut(600, function() {
        $selector.addClass('show');
        $spinner.remove();
      });
    },
    fitVid: function() {
      $('.eut-video, .eut-media').fitVids();
      $('iframe[src*="youtube"]').parent(':not(.eut-bg-youtube-video)').fitVids();
      $('iframe[src*="vimeo"]').parent().fitVids();
    },
    hiddenArea: function( section, btn ) {
      const $btn = $('.eut-toggle-hiddenarea');
      const $themeWrapper = $('#eut-theme-wrapper');
      const $closeBtn = $('.eut-hidden-area').find('.eut-close-btn');
      const startTimer = false;
      const count = -1;
      const itemLength = 0;
      let counter;
      let areaWidth = 0;
      let content;
      let $overlay;

      $btn.on('click', function(e) {
        content = $(this).attr('href');
        if ( content.indexOf('#') === 0 && $(content).length > 0 ) {
          e.preventDefault();
          const overlayId = content.replace('#', '');

          $(content).addClass('prepare-anim');
          $overlay = $('<div id="' + overlayId + '-overlay" class="eut-body-overlay"></div>');

          // Append Overlay on body
          $overlay.appendTo( $themeWrapper );

          // Calculate Width
          areaWidth = hiddenAreaWidth( content );
          $(window).smartresize(function() {
            areaWidth = hiddenAreaWidth( content );
          });

          if ( $(content).hasClass('open') ) {
            closeHiddenArea();
          } else {
            openHiddenArea();
          }

          // For One Page
          const $link = $(content).find('a[href*="#"]:not( [href="#"] )');
          $link.on('click', function() {
            const target = $(this.hash);
            const targetHash = this.hash;
            const dataValue = this.hash.replace('#', '');
            if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') || target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
              closeHiddenArea();
            }
            // For Fullpage Scrolling
            if ( $('[data-anchor="' + dataValue + '"]').length ) {
              closeHiddenArea();
            }
          });
        }
      });

      $closeBtn.on('click', function() {
        closeHiddenArea();
      });

      // Open Hidden Area
      function openHiddenArea() {
        $overlay.fadeIn(function() {
          $('body').scrollTop( 0 );
          $(content).addClass('open');
          $(this).on('click', function() {
            closeHiddenArea();
          });
        });
      }
      // Close Hidden Area
      function closeHiddenArea() {
        $themeWrapper.css({'height': 'auto'});
        $(content).removeClass('open');
        $overlay.fadeOut(function() {
          $overlay.remove();
          $(content).removeClass('prepare-anim');
        });
      }

      // Calculate Area Width
      function hiddenAreaWidth( area ) {
        const $area = $(area);
        const windowWidth = $(window).width();

        if ( $(window).width() + scrollBarWidth <= mobileScreen ) {
          $(area).css({'width': windowWidth + 30});
        } else {
          if ( $area.hasClass('eut-large-width') ) {
            $(area).css({'width': Math.max(550, (windowWidth / 2))});
          } else if ( $area.hasClass('eut-medium-width') ) {
            $(area).css({'width': Math.max(550, (windowWidth / 3))});
          } else {
            $(area).css({'width': Math.max(550, (windowWidth / 4))});
          }
        }

        return areaWidth;
      }
    },
    hiddenAreaHeight: function( area ) {
      if ( $(area).length === 0 ) return;

      const windowWidth = $(window).width();
      const windowHeight = $(window).height();
      const hiddenAreaHeight = $(area).find('.eut-hiddenarea-content').outerHeight() + 200;
      const $themeWrapper = $('#eut-theme-wrapper');
      const $scroller = $(area).find('.eut-scroller');
      const $buttonWrapper = $(area).find('.eut-buttons-wrapper');
      const btnWrapperHeight = $buttonWrapper.length ? $buttonWrapper.height() : 0;
      let sideHeight = 0;

      if ( hiddenAreaHeight > windowHeight ) {
        sideHeight = hiddenAreaHeight;
      } else {
        sideHeight = windowHeight;
      }

      if ( $(window).width() + scrollBarWidth <= mobileScreen ) {
        $scroller.css({'height': 'auto'});
        $(area).css({'position': 'absolute', 'height': sideHeight});
        $themeWrapper.css({'height': sideHeight, 'overflow': 'hidden'});
      } else {
        $scroller.css({'height': windowHeight - btnWrapperHeight - 150});
        $themeWrapper.css({'height': '', 'overflow': ''});
      }
    },
    sideArea: function() {
      const $btn = $('.eut-toggle-sidearea');
      const $themeWrapper = $('#eut-theme-wrapper');
      let content;

      $btn.on('click', function(e) {
        content = $(this).attr('href');
        if ( content.indexOf('#') === 0 && $(content).length > 0 ) {
          e.preventDefault();

          $(content).addClass('eut-active-sidearea');
          if ( !$themeWrapper.hasClass('eut-side-area-open') ) {
            EUTHEM.pageSettings.openSideArea();
          } else {
            EUTHEM.pageSettings.closeSideArea();
          }
        }
      });

      $(document).on('keyup', function(evt) {
        if (evt.keyCode == 27) {
          EUTHEM.pageSettings.closeSideArea();
        }
      });

      $('.eut-sidearea-close-btn').on('click', function(e) {
        e.preventDefault();
        EUTHEM.pageSettings.closeSideArea();
      });
    },
    openSideArea: function() {
      if ( !$('body').hasClass('eut-side-area-open') ) {
        $('body').addClass('eut-side-area-open');
        const $themeWrapper = $('#eut-theme-wrapper');
        const wrapperH = $(window).height();
        const topP = $(window).scrollTop();
        const $btn = $('.eut-toggle-sidearea');
        const $closeBtn = $('.eut-sidearea-close-btn');
        const $sideArea = $('.eut-active-sidearea');

        $btn.addClass('eut-hide');
        setTimeout(function() {
          $closeBtn.removeClass('eut-hide');
        }, 800);

        if ( $.fn.StickyHeader && 'none' != $('#eut-header').data('sticky') ) {
          $('#eut-header').data('eut_StickyHeader').unbindEvents();
        }

        $sideArea.addClass('eut-show').css({
          'padding-top': (wrapperH * 20)/100,
        });
        $('.eut-wrapper-inner').css({
          'top': -topP,
          'position': 'relative',
        });
        $themeWrapper.addClass('eut-with-side-area').css({
          'height': wrapperH,
        }).addClass('eut-side-area-open eut-side-area-shadow');
      }
    },
    closeSideArea: function() {
      if ( $('body').hasClass('eut-side-area-open') ) {
        const $themeWrapper = $('#eut-theme-wrapper');
        const topP = Math.abs( parseInt( $('.eut-wrapper-inner').css('top') ) );
        const $btn = $('.eut-toggle-sidearea');
        const $closeBtn = $('.eut-sidearea-close-btn');
        const $sideArea = $('.eut-active-sidearea');

        $themeWrapper.removeClass('eut-side-area-open');

        $closeBtn.addClass('eut-hide');

        setTimeout(function() {
          $themeWrapper.css({
            'height': '',
          }).removeClass('eut-with-side-area eut-side-area-shadow');
          $('.eut-wrapper-inner').css({
            'top': '',
            'position': '',
          });
          $('html, body').scrollTop( topP );
          if ( $.fn.StickyHeader && 'none' != $('#eut-header').data('sticky') ) {
            $('#eut-header').data('eut_StickyHeader').bindEvents();
          }
          $('body').removeClass('eut-side-area-open');
          $btn.removeClass('eut-hide');
          $sideArea.removeClass('eut-show');
        }, 800);
      }
    },
    backtoTop: function() {
      const selectors = {
        topBtn: '.eut-back-top',
        dividerBtn: '.eut-divider-backtotop',
        topLink: 'a[href="#eut-goto-header"]',
      };
      const footerBarHeight = $('.eut-footer-bar.eut-fullwidth').length ? $('.eut-footer-bar.eut-fullwidth').outerHeight() : 0;

      if ( $( selectors.topBtn ).length ) {
        $(window).on('scroll', function() {
          const scroll = $(this).scrollTop();
          const $topBtn = $( selectors.topBtn );

          if (scroll > 600) {
            $topBtn.addClass('show');
          } else {
            $topBtn.removeClass('show');
          }

          if ( scroll > 600 && !$('body').hasClass('eut-side-area-open') ) {
            $('.eut-sidearea-btn').addClass('eut-push-up');
          } else if ( scroll < 600 && !$('body').hasClass('eut-side-area-open') ) {
            $('.eut-sidearea-btn').removeClass('eut-push-up');
          }
        });
      }

      $.each(selectors, function(key, value) {
        $(value).on('click', function(e) {
          e.preventDefault();
          const scrollTop = Math.abs($(window).scrollTop()) / 2;
          let speed = scrollTop < 1000 ? 1000 : scrollTop;

          if ( $(this).data('speed') != undefined && $(this).data('speed') != 'height-based' ) {
            speed = $(this).data('speed');
          }

          // Remove Scroll Up Classes
          if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
            $('#eut-header').data('eut_StickyHeader').destroyScrollUp();
          }
          $('html, body').animate({scrollTop: 0}, speed, 'easeInOutCubic');
          $('html, body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function() {
            $('html, body').stop();
          });
        });
      });
    },
    animatedBg: function() {
      const $section = $('.eut-section');

      $section.each(function() {
        const $this = $(this);

        if ( $this.hasClass('eut-bg-animated') ) {
          zoomBg( $this );
        } else if ( $this.hasClass('eut-bg-horizontal') ) {
          horizontalBg( $this );
        }
      });

      function zoomBg( $this ) {
        $this.mouseenter(function() {
          $this.addClass('zoom');
        });
        $this.mouseleave(function() {
          $this.removeClass('zoom');
        });
      }

      function horizontalBg( $this ) {
        let bgPosition = 0;
        setInterval(function() {
          bgPosition++;
          $this.find('.eut-bg-image').css({'background-position': bgPosition+'px center', 'background-repeat': 'repeat'});
        }, 75);
      }
    },
    onePageSettings: function() {
      // On Scroll Event
      $(window).on('scroll.eut_onepage', function() {
        EUTHEM.pageSettings.onePageMenu();
      });

      $('a[href*="#"]:not( [href="#"] )').on('click', function(e) {
        const headerHeight = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0;
        const anchorBarHeight = $('.eut-anchor-menu').length && !$('.eut-anchor-menu').hasClass('eut-anchor-responsive') ? $('.eut-anchor-menu').outerHeight() : 0;
        const target = $(this.hash);
        const targetHash = this.hash;

        // Remove Scroll Up Classes
        if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
          $('#eut-header').data('eut_StickyHeader').destroyScrollUp();
        }

        if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-inner-section') || target.hasClass('eut-bookmark') ) ) {
          $('html,body').animate({
            scrollTop: target.offset().top - headerHeight - anchorBarHeight + 1,
          }, 1000);
          return false;
        }
        if ( target.length && ( target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
          const tabLink = $('.eut-tab-link[data-rel="' + targetHash + '"]:visible');
          if ( tabLink.length ) {
            tabLink.click();
            setTimeout(function() {
              EUTHEM.pageSettings.linkGoToTop( tabLink );
            }, 500);
          }
          return false;
        }
      });
    },
    onePageMenu: function() {
      const $section = $('#eut-main-content .eut-section[id], #eut-main-content .eut-inner-section[id]');
      if ( $section.length === 0 ) return;

      const sideHeader = $('#eut-main-header').hasClass('eut-header-side') ? true : false;
      const headerHeight = $('#eut-header').attr('data-sticky-header') != 'none' && !sideHeader ? $('#eut-main-header').outerHeight() : 0;
      const anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
      const offsetTop = headerHeight + anchorBarHeight + wpBarHeight;
      const scroll = $(window).scrollTop();

      $section.each(function() {
        const $that = $(this);
        const currentId = $that.attr('id');
        const sectionOffset = $that.offset().top - offsetTop;

        if (sectionOffset <= scroll && sectionOffset + $that.outerHeight() > scroll ) {
          $('a[href*="#' + currentId + '"]').parent().addClass('active');
        } else {
          $('a[href*="#' + currentId + '"]').parent().removeClass('active');
        }
      });
    },
    showList: function() {
      const $list = $('.eut-show-list');
      $list.ShowListItems();
      // if ( isMobile.any() ) {
      // 	$list.data('eut_ShowListItems').destroy();
      // };
    },
    fixedFooter: function() {
      const $footer = $('#eut-footer');
      const sticky = $footer.data('sticky-footer');
      const prevSection = $footer.prev();
      let prevMargin = parseInt( prevSection.css('margin-bottom') );
      let delay;

      if ( !$footer.length || sticky != 'yes' || isMobile.any() ) return;

      // On window events
      $( window ).on( 'scroll', function() {
        update();
      });
      $(window).on('resize', resizer);

      function resizer() {
        window.clearTimeout(delay);
        delay = window.setTimeout(function() {
          $footer.prev().css( 'margin-bottom', '' );
          prevMargin = parseInt( prevSection.css('margin-bottom') );
          update();
        }, 900);
      }

      update();

      function update() {
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const footerHeight = $footer.outerHeight();
        const margin = footerHeight + prevMargin;

        if ( ( windowWidth + scrollBarWidth <= tabletLandscape ) || ( footerHeight > windowHeight ) ) {
          $footer.removeClass('eut-fixed-footer').prev().css( 'margin-bottom', '' );
        } else {
          $footer.addClass('eut-fixed-footer').prev().css( 'margin-bottom', margin );
        }
      }
    },
    productImageParallax: function() {
      $('#eut-product-feature-image .eut-product-parallax-image img').paraller({
        wrapper: '.eut-product-area-wrapper',
        effect: 'mouse-move-x',
        sensitive: 'normal',
        invert: true,
      });
    },
    lightGallery: function() {
      let thumbnail = false;
      if ( 1 == crocal_eutf_main_data.woo_popup_thumbs ) {
        thumbnail = true;
      }
      $('.eut-woo-light-gallery-popup').lightGallery({
        selector: '.eut-popup-link',
        thumbnail: thumbnail,
        hash: false,
      });
 			$('.eut-gallery-popup').lightGallery({
        selector: '.eut-item-url',
        thumbnail: false,
        hash: false,
      });
      $('.eut-post-gallery-popup').lightGallery({
        selector: 'a',
        thumbnail: false,
        hash: false,
      });
      $('.eut-light-gallery').lightGallery({
        selector: '.eut-item-url',
        thumbnail: false,
        hash: false,
      });
      $('.eut-image-popup').lightGallery({
        selector: 'this',
        thumbnail: false,
        hash: false,
      });

      if ( $('.eut-body').hasClass( 'eut-privacy-video-embeds-disabled' ) ) {
        $('.eut-video-popup').each(function() {
          $(this).attr({'target': '_blank'});
        });
      } else {
        $('.eut-video-popup').lightGallery({
          selector: 'this',
          thumbnail: false,
          hash: false,
        });
      }

      if ( 1 == crocal_eutf_main_data.wp_gallery_popup ) {
        $('.gallery').lightGallery({
          selector: '.gallery-item a',
          getCaptionFromTitleOrAlt: false,
          thumbnail: false,
          hash: false,
        });
        $('.wp-block-gallery').lightGallery({
          selector: '.blocks-gallery-item a',
          getCaptionFromTitleOrAlt: false,
          thumbnail: false,
          hash: false,
        });
      }
    },
    lightBox: function() {
      // Inline Modal Popup
      $('.eut-modal-popup').each(function() {
        $(this).magnificPopup({
          disableOn: 0,
          type: 'inline',
          preloader: false,
          prependTo: '#eut-theme-wrapper',
          fixedBgPos: true,
          fixedContentPos: true,
          removalDelay: 200,
          closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
          closeOnBgClick: true,
          callbacks: {
            beforeOpen: function() {
              const mfpWrap = this.wrap;
              this.bgOverlay.fadeIn(200);
              addSpinner( mfpWrap );
              this.container.css({'opacity': 0});
            },
            open: function() {
              const $spinner = this.wrap.find('.eut-spinner');
              const $content = this.container;
              removeSpinner( $spinner, $content );
              if ( $content.find('.eut-isotope').length ) {
                setTimeout(function() {
                  EUTHEM.isotope.relayout();
                }, 100);
              }
              if ( $content.find('.owl-carousel').length ) {
                setTimeout(function() {
                  $content.find('.owl-carousel').each(function() {
                    const owl = $(this).data('owlCarousel');
                    owl.onResize();
                  });
                }, 300);
              }
              if ( $content.find('.eut-map').length ) {
                $('.eut-map').trigger( 'eut_redraw_map' );
              }
            },
            beforeClose: function() {
              this.wrap.fadeOut(100);
              this.container.css({'opacity': 0});
              this.bgOverlay.fadeOut(100);
            },
          },
        });
      });
      // VIDEOS
      $('.eut-page-popup').each(function() {
        $(this).magnificPopup({
          disableOn: 0,
          type: 'iframe',
          preloader: false,
          fixedBgPos: true,
          fixedContentPos: true,
          removalDelay: 200,
          closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
          closeOnBgClick: true,
          callbacks: {
            beforeOpen: function() {
              const mfpWrap = this.wrap;
              this.bgOverlay.fadeIn(200);
              addSpinner( mfpWrap );
            },
            open: function() {
              const $spinner = this.wrap.find('.eut-spinner');
              const $content = this.container;
              removeSpinner( $spinner, $content );
            },
            beforeClose: function() {
              this.wrap.fadeOut(100);
              this.container.css({'opacity': 0});
              this.bgOverlay.fadeOut(100);
            },
          },
        });
      });

      $('.eut-html5-video-popup').each(function() {
        $(this).magnificPopup({
          disableOn: 0,
          type: 'inline',
          preloader: false,
          prependTo: '#eut-theme-wrapper',
          fixedBgPos: true,
          fixedContentPos: true,
          removalDelay: 200,
          closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
          closeOnBgClick: true,
          callbacks: {
            beforeOpen: function() {
              const mfpWrap = this.wrap;
              this.bgOverlay.fadeIn(200);
              addSpinner( mfpWrap );
            },
            open: function() {
              const $spinner = this.wrap.find('.eut-spinner');
              const $content = this.container;
              removeSpinner( $spinner, $content );
              if ( $content.find('video').length ) {
                setTimeout(function() {
                  $content.find('video')[0].play();
                }, 500);
              }
            },
            beforeClose: function() {
              if ( this.wrap.find('video').length ) {
                this.wrap.find('video')[0].load();
              }
              this.wrap.fadeOut(100);
              this.container.css({'opacity': 0});
              this.bgOverlay.fadeOut(100);
            },
          },
        });
      });

      function addSpinner( mfpWrap ) {
        $(spinner).appendTo( mfpWrap );
      }

      function removeSpinner( spinner, content ) {
        setTimeout(function() {
          spinner.fadeOut(1000, function() {
            content.animate({'opacity': 1}, 600);
            $('.eut-modal-popup').trigger( 'eut_open_modal' );
            $(spinner).remove();
          });
        }, 700);
      }
    },
    socialShareLinks: function() {
      $(document).on('click', '.eut-social-share-facebook', function(e) {
        e.preventDefault();
        window.open( 'https://www.facebook.com/sharer/sharer.php?u=' + $(this).attr('href'), 'facebookWindow', 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0' );
        return false;
      });
      $(document).on('click', '.eut-social-share-twitter', function(e) {
        e.preventDefault();
        window.open( 'http://twitter.com/intent/tweet?text=' + encodeURIComponent( $(this).attr('title') ) + ' ' + $(this).attr('href'), 'twitterWindow', 'height=450,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0' );
        return false;
      });
      $(document).on('click', '.eut-social-share-linkedin', function(e) {
        e.preventDefault();
        window.open( 'http://www.linkedin.com/shareArticle?mini=true&url=' + $(this).attr('href') + '&title=' + encodeURIComponent( $(this).attr('title') ), 'linkedinWindow', 'height=500,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0' );
        return false;
      });
      $(document).on('click', '.eut-social-share-pinterest', function(e) {
        e.preventDefault();
        window.open( 'http://pinterest.com/pin/create/button/?url=' + $(this).attr('href') + '&media=' + $(this).data('pin-img') + '&description=' + encodeURIComponent( $(this).attr('title') ), 'pinterestWindow', 'height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0' );
        return false;
      });
      $(document).on('click', '.eut-social-share-reddit', function(e) {
        e.preventDefault();
        window.open( '//www.reddit.com/submit?url=' + $(this).attr('href'), 'redditWindow', 'height=600,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1' );
        return false;
      });
      $(document).on('click', '.eut-social-share-tumblr', function(e) {
        e.preventDefault();
        window.open( '//www.tumblr.com/share/link?url=' + $(this).attr('href') + '&name=' + encodeURIComponent( $(this).attr('title') ), 'tumblrWindow', 'height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0' );
        return false;
      });
      $(document).on('click', '.eut-like-counter-link', function(e) {
        e.preventDefault();
        const link = $(this);
        const id = link.data('post-id');
        const counter = link.parent().find('.eut-like-counter');
        const icon = link.find('i');

        const dataParams = {
          action: 'crocal_eutf_likes_callback',
          eut_likes_id: id,
          _eutf_nonce: crocal_eutf_main_data.nonce_likes,
        };

        $.post( crocal_eutf_main_data.ajaxurl, dataParams, function( response ) {
          if ( '-1' != response ) {
            if ( 'active' == response.status ) {
              link.addClass('active');
              icon.addClass('eut-heading-color');
            } else {
              link.removeClass('active');
              icon.removeClass('eut-heading-color');
            }
            counter.html(response.likes);
          }
        }).fail(function(xhr, status, error) {
        });

        return false;
      });
    },
  };

  // # Basic Elements
  // ============================================================================= //
  EUTHEM.basicElements = {
    init: function() {
      this.pieChart();
      this.progressBars();
      this.counter();
      this.slider();
      this.testimonial();
      this.flexibleCarousel();
      this.carousel();
      this.advancedCarousel();
      this.advancedPromo();
      this.doubleImageText();
      this.portfolioParallax();
      this.teamParallax();
      this.testimonialParallax();
      this.messageBox();
      this.wooProduct();
      this.animAppear();
      this.htmlVideoPlayWhenAppear();
      this.accordionToggle();
      this.tabs();
      this.productSocials();
      this.countdown();
      this.hovers();
    },
    pieChart: function() {
      $('.eut-chart-number').each(function() {
        const $element = $(this);
        const delay = $element.parent().data('delay') !== '' ? parseInt( $element.parent().data('delay') ) : 0;
        const size = $element.data('pie-size');
        let chartSize = '130';
        if ( size == 'small' ) {
          chartSize = '100';
        }
        if ( size == 'large' ) {
          chartSize = '160';
        }

        $element.css({'width': chartSize, 'height': chartSize, 'line-height': chartSize + 'px'});

        if ( $element.parents('.eut-modal-element').length ) {
          $('.eut-modal-popup').on( 'eut_open_modal', function() {
            EUTHEM.basicElements.pieChartInit( $element, chartSize );
          });
        } else {
          $element.appear(function() {
            setTimeout(function() {
              EUTHEM.basicElements.pieChartInit( $element, chartSize );
            }, delay);
          });
        }
      });
    },
    pieChartInit: function( $element, size ) {
      const activeColor = $element.data('pie-active-color') !== '' ? $element.data('pie-active-color') : 'rgba(0,0,0,1)';
      const pieColor = $element.data('pie-color') !== '' ? $element.data('pie-color') : 'rgba(0,0,0,0.1)';
      const pieLineCap = $element.data('pie-line-cap') !== '' ? $element.data('pie-line-cap') : 'round';
      const lineSize = $element.data('pie-line-size') !== '' ? $element.data('pie-line-size') : '6';
      const chartSize = size;


      $element.easyPieChart({
        barColor: activeColor,
        trackColor: pieColor,
        scaleColor: false,
        lineCap: pieLineCap,
        lineWidth: lineSize,
        animate: 1500,
        size: chartSize,
      });
    },
    progressBars: function() {
      $('.eut-progress-bar').each(function() {
        const $element = $(this);
        if ( $element.parents('.eut-modal-element').length ) {
          $('.eut-modal-popup').on( 'eut_open_modal', function() {
            EUTHEM.basicElements.progressBarsInit( $element );
          });
        } else {
          $element.appear(function() {
            EUTHEM.basicElements.progressBarsInit( $element );
          });
        }
      });
    },
    progressBarsInit: function( $element ) {
      const val = $element.attr('data-value');
      const percentage = $('<span class="eut-percentage">'+ val + '%'+'</span>');

      $element.find('.eut-bar-line').animate({width: val + '%'}, 1600);
      if ( $element.parent().hasClass('eut-style-1') ) {
        percentage.appendTo($element.find('.eut-bar')).animate({left: val + '%'}, 1600);
      } else {
        percentage.appendTo($element.find('.eut-bar-title'));
      }
    },
    counter: function() {
      if ( bodyLoader === true ) {
        return;
      }
      const selector = '.eut-counter-item span';
      $(selector).each(function(i) {
        const elements = $(selector)[i];
        const thousandsSeparator = $(this).attr('data-thousands-separator') !== '' ? $(this).attr('data-thousands-separator') : ',';
        $(elements).attr('id', 'eut-counter-' + i );
        const delay = $(this).parents('.eut-counter').attr('data-delay') !== '' ? parseInt( $(this).parents('.eut-counter').attr('data-delay') ) : 200;
        const options = {
          useEasing: true,
          useGrouping: true,
          separator: $(this).attr('data-thousands-separator-vis') !== 'yes' ? thousandsSeparator : '',
          decimal: $(this).attr('data-decimal-separator') !== '' ? $(this).attr('data-decimal-separator') : '.',
          prefix: $(this).attr('data-prefix') !== '' ? $(this).attr('data-prefix') : '',
          suffix: $(this).attr('data-suffix') !== '' ? $(this).attr('data-suffix') : '',
        };
        const counter = new CountUp( $(this).attr('id'), $(this).attr('data-start-val'), $(this).attr('data-end-val'), $(this).attr('data-decimal-points'), 2.5, options);
        $(this).appear(function() {
          setTimeout(function() {
            counter.start();
          }, delay);
        });
      });
    },
    slider: function() {
      const $element = $('#eut-main-content .eut-slider-element, #eut-single-media .eut-slider-element');

      $element.each(function() {
        const $slider = $(this);
        const $nextNav = $slider.parents('.eut-slider').find('.eut-carousel-next');
        const $prevNav = $slider.parents('.eut-slider').find('.eut-carousel-prev');
        const sliderSpeed = ( parseInt( $slider.attr('data-slider-speed') ) ) ? parseInt( $slider.attr('data-slider-speed') ) : 3000;
        const transition = $slider.attr('data-slider-transition');
        let loop = $slider.attr('data-slider-loop') != 'no' ? true : false;
        const autoPlay = $slider.attr('data-slider-autoplay') != 'no' ? true : false;
        const autoHeight = $slider.attr('data-slider-autoheight') == 'yes' ? true : false;
        const paginColor = $slider.attr('data-pagination-color') !== undefined ? 'eut-carousel-pagination eut-dots-' + $slider.attr('data-pagination-color') : 'eut-carousel-pagination';
        const pagination = $slider.attr('data-pagination') != 'no' ? true : false;
        let animateOut = false;
        let animateIn = false;

        // Slider Trantition
        if ( $slider.parents('.eut-slider').hasClass('eut-layout-2') || 'fade' == transition ) {
          animateOut = 'carousel-fade-out';
          animateIn = 'carousel-fade-in';
        }

        if ( $slider.find('.eut-slider-item').length == 1 ) {
          loop = false;
        }

        // Slider Init
        $slider.owlCarousel({
          items: 1,
          loop: loop,
          autoplay: autoPlay,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: false,
          smartSpeed: 500,
          dots: pagination,
          animateOut: animateOut,
          animateIn: animateIn,
          autoHeight: autoHeight,
          dotsClass: paginColor,
          itemClass: 'eut-slider-item-wrapper',
        });

        $slider.parents('.eut-slider').css('visibility', 'visible');

        // Go to the next item
        $nextNav.on( 'click', function() {
          $slider.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $prevNav.on( 'click', function() {
          $slider.trigger('prev.owl.carousel');
        });
      });
    },
    testimonial: function() {
      const $element = $('.eut-testimonial.eut-carousel-element');

      $element.each(function() {
        const $testimonial = $(this);
        const sliderSpeed = ( parseInt( $testimonial.attr('data-slider-speed') ) ) ? parseInt( $testimonial.attr('data-slider-speed') ) : 3000;
        const pagination = $testimonial.attr('data-pagination') != 'no' ? true : false;
        const paginationSpeed = ( parseInt( $testimonial.attr('data-pagination-speed') ) ) ? parseInt( $testimonial.attr('data-pagination-speed') ) : 400;
        const transition = $testimonial.attr('data-slider-transition');
        const autoHeight = $testimonial.attr('data-slider-autoheight') == 'yes' ? true : false;
        const autoPlay = $testimonial.attr('data-slider-autoplay') != 'no' ? true : false;
        const sliderPause = $testimonial.attr('data-slider-pause') == 'yes' ? true : false;
        let loop = true;
        let animateOut = false;
        let animateIn = false;

        // Testimonial Trantition
        if ( $testimonial.hasClass('eut-layout-2') || 'fade' == transition ) {
          animateOut = 'carousel-fade-out';
          animateIn = 'carousel-fade-in';
        }
        if ( $testimonial.find('.eut-testimonial-element').length == 1 ) {
          loop = false;
        }

        // Testimonial Init
        $testimonial.owlCarousel({
          items: 1,
          loop: loop,
          autoplay: autoPlay,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: sliderPause,
          smartSpeed: 500,
          dots: pagination,
          dotsClass: 'eut-carousel-pagination',
          animateOut: animateOut,
          animateIn: animateIn,
          autoHeight: autoHeight,
          itemClass: 'eut-testimonial-item-wrapper',
        });

        $testimonial.css('visibility', 'visible');
      });
    },
    flexibleCarousel: function() {
      const $element = $('.eut-flexible-carousel-element');

      $element.each(function() {
        const $carousel = $(this);
        const $nextNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-next');
        const $prevNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-prev');
        const sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000;
        const pagination = $carousel.attr('data-pagination') != 'no' ? true : false;
        const paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400;
        const autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false;
        const autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false;
        const sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false;
        let loop = true;
        const itemNum = parseInt( $carousel.attr('data-items'));
        const tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 4;
        const tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 2;
        const mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1;
        const gap = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') ? 30 : 0;
        const padding = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') ? 30 : 0;

        if ( $carousel.find('.eut-flexible-carousel-element').length == 1 ) {
          loop = false;
        }
        // Carousel Init
        $carousel.owlCarousel({
          items: 1,
          loop: loop,
          autoplay: autoPlay,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: sliderPause,
          smartSpeed: 500,
          dots: pagination,
          dotsClass: 'eut-carousel-pagination',
          responsive: {
            0: {
              items: mobileNum,
            },
            768: {
              items: tabletPortraitNum,
            },
            1024: {
              items: tabletLandscapeNum,
            },
            1200: {
              items: itemNum,
            },
          },
          margin: gap,
          stagePadding: padding,
          autoHeight: autoHeight,
          itemClass: 'eut-carousel-item-wrapper',
        });

        $carousel.css('visibility', 'visible');

        // Go to the next item
        $nextNav.on( 'click', function() {
          $carousel.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $prevNav.on( 'click', function() {
          $carousel.trigger('prev.owl.carousel');
        });
      });
    },
    carousel: function() {
      const $element = $('.eut-carousel-element');

      $element.each(function() {
        const $carousel = $(this);
        const $nextNav = $carousel.parents('.eut-carousel').find('.eut-carousel-next');
        const $prevNav = $carousel.parents('.eut-carousel').find('.eut-carousel-prev');
        const sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000;
        const pagination = $carousel.attr('data-pagination') != 'no' ? true : false;
        const paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400;
        const autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false;
        const autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false;
        const sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false;
        let loop = $carousel.attr('data-slider-loop') != 'no' ? true : false;
        const itemNum = parseInt( $carousel.attr('data-items'));
        const tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 3;
        const tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 3;
        const mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1;
        const gap = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0;
        const padding = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0;

        if ( $carousel.find('.eut-carousel-item').length == 1 ) {
          loop = false;
        }

        // Carousel Init
        $carousel.owlCarousel({
          loop: loop,
          autoplay: autoPlay,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: sliderPause,
          smartSpeed: 500,
          dots: pagination,
          dotsClass: 'eut-carousel-pagination',
          responsive: {
            0: {
              items: mobileNum,
            },
            768: {
              items: tabletPortraitNum,
            },
            1024: {
              items: tabletLandscapeNum,
            },
            1200: {
              items: itemNum,
            },
          },
          margin: gap,
          stagePadding: padding,
          itemClass: 'eut-carousel-item-wrapper',
        });

        $carousel.css('visibility', 'visible');

        // Go to the next item
        $nextNav.on( 'click', function() {
          $carousel.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $prevNav.on( 'click', function() {
          $carousel.trigger('prev.owl.carousel');
        });
      });
    },
    advancedCarousel: function() {
      const $element = $('.eut-advanced-carousel');

      $element.each(function() {
        const $carousel = $(this);
        const sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000;
        const pagination = $carousel.attr('data-pagination') != 'no' ? true : false;
        const paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400;
        const autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false;
        const autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false;
        const sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false;
        let loop = $carousel.attr('data-slider-loop') != 'no' ? true : false;
        const gap = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0;
        const largeScreenStagePadding = !isNaN( $carousel.data('stage-padding-large-screen') ) ? Math.abs( $carousel.data('stage-padding-large-screen') ) : 0;
        const stagePadding = !isNaN( $carousel.data('stage-padding') ) ? Math.abs( $carousel.data('stage-padding') ) : 0;
        const tabletLandscapeStagePadding = !isNaN( $carousel.data('stage-padding-tablet-landscape') ) ? Math.abs( $carousel.data('stage-padding-tablet-landscape') ) : 0;
        const tabletPortraitStagePadding = !isNaN( $carousel.data('stage-padding-tablet-portrait') ) ? Math.abs( $carousel.data('stage-padding-tablet-portrait') ) : 0;
        const mobileStagePadding = !isNaN( $carousel.data('stage-padding-mobile') ) ? Math.abs( $carousel.data('stage-padding-mobile') ) : 0;

        if ( $carousel.find('.eut-carousel-item').length == 1 ) {
          loop = false;
        }

        // Carousel Init
        $carousel.owlCarousel({
          loop: loop,
          autoplay: autoPlay,
          autoplayTimeout: sliderSpeed,
          autoplayHoverPause: sliderPause,
          smartSpeed: 500,
          dots: pagination,
          dotsClass: 'eut-carousel-pagination',
          items: 1,
          margin: gap,
          responsive: {
            0: {
              items: 1,
              stagePadding: mobileStagePadding,
            },
            768: {
              items: 1,
              stagePadding: tabletPortraitStagePadding,
            },
            1024: {
              items: 1,
              stagePadding: tabletLandscapeStagePadding,
            },
            1200: {
              items: 1,
              stagePadding: stagePadding,
            },
            2000: {
              items: 1,
              stagePadding: largeScreenStagePadding,
            },
          },
          itemClass: 'eut-carousel-item-wrapper',
        });

        $carousel.css('visibility', 'visible');
      });
    },
    advancedPromo: function() {
      const $item = $('.eut-expandable-info');
      $item.each(function() {
        const $that = $(this);
        const $wrapper = $that.parents('.eut-section');
        const $content = $that.find('.eut-expandable-info-content');
        const paddingTop = parseInt( $wrapper.css('padding-top') );
        const paddingBottom = parseInt( $wrapper.css('padding-bottom') );

        $wrapper.addClass('eut-pointer-cursor');
        $wrapper.on('click', function() {
          const headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0;
          const fieldBarHeight = $('.eut-fields-bar').length ? $('.eut-fields-bar').outerHeight() : 0;
          const offset = $(this).offset().top;
          const distance = offset - ( headerHeight + fieldBarHeight );

          if ( $content.is(':visible') ) {
            $content.slideUp( 600, function() {
              $content.removeClass('show');
            });
          } else {
            $('html,body').animate({
              scrollTop: distance,
            }, 600, function() {
              $content.slideDown( function() {
                $content.addClass('show');
                return;
              });
            });
          }
        });
        $wrapper.mouseenter(function() {
          $(this).css({'padding-top': paddingTop + 40, 'padding-bottom': paddingBottom + 40});
        });
        $wrapper.mouseleave(function() {
          $(this).css({'padding-top': paddingTop, 'padding-bottom': paddingBottom});
        });
      });
    },
    doubleImageText: function() {
      const $el = $('.eut-double-image-text');
      const $paraller = $el.find('.eut-paraller');

      imagesLoaded( $el, function() {
        $paraller.paraller({
          wrapper: '.eut-paraller-wrapper',
          invert: false,
          tabletL: [1200, true],
          tabletP: [1023, true],
          mobileL: [767, false],
        });
      });
    },
    portfolioParallax: function() {
      const $el = $('.eut-portfolio-crocal-style');
      const $paraller = $el.find('.eut-paraller');

      imagesLoaded( $el, function() {
        $paraller.paraller({
          wrapper: '.eut-paraller-wrapper',
          invert: false,
          tabletL: [1200, true],
          tabletP: [1023, true],
          mobileL: [767, false],
        });
      });
    },
    teamParallax: function() {
      const $el = $('.eut-team.eut-layout-2');
      const $paraller = $el.find('.eut-paraller');

      imagesLoaded( $el, function() {
        $paraller.paraller({
          wrapper: '.eut-paraller-wrapper',
          invert: false,
          tabletL: [1200, true],
          tabletP: [1023, true],
          mobileL: [767, false],
        });
      });
    },
    testimonialParallax: function() {
      const $el = $('.eut-testimonial.eut-layout-2');
      const $paraller = $el.find('.eut-paraller');

      imagesLoaded( $el, function() {
        $paraller.paraller({
          wrapper: '.eut-paraller-wrapper',
          invert: false,
          tabletL: [1200, true],
          tabletP: [1023, true],
          mobileL: [767, false],
        });
      });
    },
    iconBox: function() {
      const $iconBox = $('.eut-box-icon.eut-advanced-hover');
      if ( isMobile.any() ) {
        $iconBox.css({'visibility': 'visible'});
        return false;
      }
      $iconBox.each(function() {
        const $that = $(this);
        const $text = $that.find('p');
        const $column = $that.parents('.eut-column');
        let space = 0;
        let resize = false;

        setup();
        $(window).smartresize(setup);

        function updateParams() {
          space = $text.outerHeight();
        }

        function resetIcon() {
          $that.css({'top': ''});
          $text.css({'opacity': 1, 'bottom': ''});
        }

        function setup() {
          if (!resize) {
            resize = true;

            resetIcon();
            updateParams();

            $column.css({'overflow': 'hidden'});
            $that.css({'top': space, 'visibility': 'visible'});
            $text.css({'opacity': 0, 'position': 'relative', 'bottom': '-120%'});

            resize = true;
          }
        }

        $column.hover(function() {
          $that.stop( true, true ).animate({
            'top': 0,
          }, 400, 'easeOutBack');
          $text.stop( true, true ).delay( 100 ).animate({
            'opacity': 1,
            'bottom': 0,
          }, 600, 'easeOutBack');
        }, function() {
          $that.stop( true, true ).animate({
            'top': space,
          }, 500, 'easeOutBack');
          $text.stop( true, true ).animate({
            'opacity': 0,
            'bottom': '-120%',
          }, 400, 'easeOutBack');
        });
      });
    },
    messageBox: function() {
      const infoMessage = $('.eut-message');
      const closeBtn = infoMessage.find($('.eut-close'));
      closeBtn.on( 'click', function() {
        $(this).parent().slideUp(150);
      });
    },
    wooProduct: function() {
      const $item = $('.eut-product-item');
      const $addBtn = $item.find('.add_to_cart_button');
      $addBtn.on('click', function() {
        $(this).parents('.eut-product-item').addClass('eut-product-added');
      });
    },
    animAppear: function() {
      if ( bodyLoader || $('body').hasClass('page-template-template-full-page') ) {
        return;
      }
      if ( isMobile.any() && !deviceAnimAppear ) {
        $('.eut-animated-item').css('opacity', 1);
      } else {
        $('.eut-animated-item').each(function() {
          const $that = $(this);
          const timeDelay = $that.attr('data-delay');

          if ( $that.parents('.eut-clipping-animation').length ) return;

          $that.appear(function() {
            setTimeout(function() {
              $that.addClass('eut-animated');
            }, timeDelay);
          }, {accX: 0, accY: -150});
        });
      }
    },
    htmlVideoPlayWhenAppear: function() {
      const $video = $('.eut-embed-video');
      $video.each(function() {
        const $that = $(this);
        $that[0].pause();
        $that.appear(function() {
          if ( $that[0].autoplay ) {
            $that[0].play();
          }
        }, {accX: 0, accY: -150});
      });
    },
    accordionToggle: function() {
      $('.eut-accordion-wrapper.eut-action-toggle').on('click', '.eut-title-wrapper', function() {
        const $that = $(this);
        const gototop = $that.parents('.eut-accordion').attr('data-gototop') == 'yes' ? true : false;

        $that
            .toggleClass('active')
            .next().slideToggle(350, function() {
              // Go to top
              if ( gototop ) {
                EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
              }
            });
        if ( $(this).parent().find('.eut-isotope').length ) {
          setTimeout(function() {
            EUTHEM.isotope.relayout();
          }, 100);
        }
      });
      $('.eut-accordion-wrapper.eut-action-accordion').on('click', '.eut-title-wrapper', function() {
        const $that = $(this);
        const gototop = $that.parents('.eut-accordion').attr('data-gototop') == 'yes' ? true : false;

        $that
            .toggleClass('active').next().slideToggle(350)
            .parent().siblings().find('.eut-title-wrapper').removeClass('active')
            .next().slideUp(350, function() {
              // Go to top
              if ( gototop ) {
                EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
              }
            });
        if ( $(this).parent().find('.eut-isotope').length ) {
          setTimeout(function() {
            EUTHEM.isotope.relayout();
          }, 100);
        }
        // Recalculate Section Height
        if ( $that.parents('.eut-section').hasClass('eut-percentage-height') || $that.parents('.eut-section').find('.eut-percentage-height').length ) {
          const $parent = $that.parents('.eut-section');
          setTimeout(function() {
            EUTHEM.sectionHeight.resetHeight( $parent[0] );
          }, 400);
        }
      });
    },
    tabs: function() {
      $('.eut-tab-title').on( 'click', function() {
        const $that = $(this);
        const contentId = $that.data('rel');
        const gototop = $that.parents('.eut-tab').attr('data-gototop') == 'yes' ? true : false;
        $that.parents('.eut-tab').find('.eut-tab-title').removeClass('active');
        $that.addClass('active');
        $that.parents('.eut-tab').find('.eut-tab-content').removeClass('active');
        $that.parents('.eut-tab').find(contentId).addClass('active');
        if ( $that.parents('.eut-tab').find('.eut-tab-content').find('.eut-isotope').length ) {
          setTimeout(function() {
            EUTHEM.isotope.relayout();
          }, 100);
        }

        // Recalculate Section Height
        if ( $that.parents('.eut-section').hasClass('eut-percentage-height') || $that.parents('.eut-section').find('.eut-percentage-height').length ) {
          const $parent = $that.parents('.eut-section');
          EUTHEM.sectionHeight.resetHeight( $parent[0] );
        }
        // Go to top
        if ( gototop ) {
          EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
        }
      });
    },
    productSocials: function() {
      const $socials = $('.eut-product-social');
      const $item = $socials.find('li');
      if ( !$socials.length ) return;

      $socials.appear(function() {
        $item.each(function(i, n) {
          const $this = $(this);
          setTimeout(function() {
            $this.addClass('eut-animated');
          }, 150 * i);
        });
      }, {accX: 0, accY: -50});
    },
    countdown: function() {
      $('.eut-countdown').each(function() {
        let $this = $(this);
        const finalDate = $this.data('countdown');
        const numbersSize = $this.data('numbers-size');
        const textSize = $this.data('text-size');
        const numbersColor = $this.data('numbers-color');
        const textColor = $this.data('text-color');
        let countdownItems = '';
        let text = '';
        const countdownFormat = $this.data('countdown-format').split('|');

        $.each( countdownFormat, function( index, value ) {
          switch (value) {
            case 'w':
              text = crocal_eutf_main_data.string_weeks;
              break;
            case 'D':
            case 'd':
            case 'n':
              text = crocal_eutf_main_data.string_days;
              break;
            case 'H':
              text = crocal_eutf_main_data.string_hours;
              break;
            case 'M':
              text = crocal_eutf_main_data.string_minutes;
              break;
            case 'S':
              text = crocal_eutf_main_data.string_seconds;
              break;
            default:
              text = '';
          }
          countdownItems += '<div class="eut-countdown-item">';
          countdownItems += '<div class="eut-number eut-' + numbersSize + ' eut-text-' + numbersColor + '">%' + value + '</div>';
          countdownItems += '<span class="eut-' + textSize + ' eut-text-' + textColor + '">' + text + '</span>';
          countdownItems += '</div>';
        });

        $this.countdown(finalDate, function(event) {
          $this = $(this).html(event.strftime( countdownItems ));
        });
      });
    },
    hovers: function() {
      const hoverItem = '.eut-image-hover';
      if ( isMobile.any() && '0' === crocal_eutf_main_data.device_hover_single_tap ) {
        let touchevent = 'touchend';
        if ( $(hoverItem).parent().parent().hasClass('eut-carousel-item') ) {
          touchevent = 'touchstart';
        }
        $('body').on(touchevent, hoverItem, function(e) {
          const $item = $(this);
          if ( !$item.hasClass('hover') ) {
            $item.addClass('hover');
            $(hoverItem).not(this).removeClass('hover');
            e.preventDefault();
          }
        });
        $(document).on('touchstart touchend', function(e) {
          if ( !$(hoverItem).is(e.target) && $(hoverItem).has(e.target).length === 0 ) {
            $(hoverItem).removeClass('hover');
          }
        });
      } else {
        $('body').on('mouseenter mouseleave', hoverItem, function() {
          $(this).toggleClass('hover');
        });
      }
    },
  };

  // # Parallax Section
  // ============================================================================= //
  EUTHEM.parallaxSection = {
    init: function( section ) {
      const $section = $(section);
      $section.bgParallax();
    },
  };

  // # Section Settings
  // ============================================================================= //
  EUTHEM.sectionSettings = {

    init: function() {
      EUTHEM.sectionSettings.expandColumnBg();

      if ( $('#eut-sidebar').length === 0 ) return;

      const section = '#eut-content .eut-section';
      const windowWidth = $(window).width();
      const themeWidth = $('#eut-theme-wrapper').width();
      const wrapperWidth = $('.eut-content-wrapper').width();
      const contentWidth = $('#eut-main-content').width();
      const sidebarWidth = $('#eut-sidebar').outerWidth();
      const space = (themeWidth - wrapperWidth)/2;
      const sidebarSpace = space + wrapperWidth - contentWidth;


      $(section).each(function() {
        const $section = $(this);
        if ( $section.hasClass('eut-fullwidth-background') ) {
          fullBg($section);
        }
        if ( $section.hasClass('eut-fullwidth') ) {
          fullElement($section);
        }
      });

      function fullBg( section ) {
        if ( windowWidth + scrollBarWidth >= tabletPortrait ) {
          if ( $('.eut-right-sidebar').length ) {
            section.css({'visibility': 'visible', 'padding-left': space, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
          } else {
            section.css({'visibility': 'visible', 'padding-left': sidebarSpace, 'padding-right': space, 'margin-left': -sidebarSpace, 'margin-right': -space});
          }
        } else {
          section.css({'visibility': 'visible', 'padding-left': '', 'padding-right': '', 'margin-left': '', 'margin-right': ''});
        }
      }

      function fullElement( section ) {
        if ( windowWidth + scrollBarWidth >= tabletPortrait ) {
          if ( $('.eut-right-sidebar').length ) {
            section.css({'visibility': 'visible', 'padding-left': 0, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
          } else {
            section.css({'visibility': 'visible', 'padding-left': sidebarSpace, 'padding-right': 0, 'margin-left': -sidebarSpace, 'margin-right': -space});
          }
        } else {
          section.css({'visibility': 'visible', 'padding-left': '', 'padding-right': '', 'margin-left': -space, 'margin-right': -space});
        }
      }
    },
    expandColumnBg: function() {
      const $column = $('.eut-expand-bg');
      $column.each(function() {
        const $that = $(this);
        const $inner = $that.children();
        let direction = 'left';
        if ( $that.hasClass('eut-expand-bg-right') ) {
          direction = 'right';
        }

        EUTHEM.sectionSettings.expandSettings( $that, $inner, direction );
        if ( $that.hasClass('eut-clipping-animation') ) {
          const $innerWrapper = $that.find('.eut-clipping-content').children();
          EUTHEM.sectionSettings.expandSettings( $that, $innerWrapper, direction );
        }
      });
    },
    expandSettings: function( $that, $element, direction ) {
      resetExpandBg();

      const positionL = $element.offset().left;
      const positionR = $(window).width() - (positionL + $element.width());
      const windowWidth = $(window).width();

      if ( windowWidth > tabletPortrait && windowWidth < tabletLandscape && $that.hasClass('eut-tablet-landscape-reset-expand-bg') ) {
        resetExpandBg();
      } else if ( windowWidth > mobileScreen && windowWidth < tabletPortrait && $that.hasClass('eut-tablet-portrait-reset-expand-bg') ) {
        resetExpandBg();
      } else if ( windowWidth < mobileScreen && $that.hasClass('eut-mobile-reset-expand-bg') ) {
        resetExpandBg();
      } else {
        expandBg();
      }

      function expandBg() {
        if ( 'left' == direction ) {
          $element[0].style.cssText += 'padding-left: ' + positionL + 'px !important';
          $element[0].style.cssText += 'margin-left: -' + positionL + 'px !important';
          $element[0].style.cssText += 'width: auto';
        } else {
          $element[0].style.cssText += 'padding-right: ' + positionR + 'px !important';
          $element[0].style.cssText += 'margin-right: -' + positionR + 'px !important';
          $element[0].style.cssText += 'width: auto';
        }
      }

      function resetExpandBg() {
        $element.css({
          'margin-left': '',
          'margin-right': '',
          'padding-left': '',
          'padding-right': '',
          'width': '',
        });
      }

      $that.css('visibility', 'visible');
    },
  };

  // # Isotope
  // ============================================================================= //
  EUTHEM.isotope = {
    init: function() {
      $('.eut-isotope').each(function() {
        const $wrapper = $(this);
        const $container = $wrapper.find('.eut-isotope-container');
        const itemsArr = $.makeArray( $container.find('.eut-isotope-item') );
        const layoutMode = $wrapper.data('layout');
        const $pagination = $wrapper.find('.eut-infinite-pagination');
        const displayStyle = $wrapper.data('display-style');

        $container.imagesLoaded().always( function( instance ) {
          EUTHEM.isotope.updateSettings( $wrapper );

          $container.isotope({
            itemSelector: '.eut-isotope-item',
            layoutMode: layoutMode,
            transitionDuration: 0,
            masonry: {
              columnWidth: EUTHEM.isotope.getColumnWidth( $wrapper ),
            },
          });

          // Recalculate Section Height
          if ( $wrapper.parents('.eut-section').hasClass('eut-percentage-height') || $wrapper.parents('.eut-section').find('.eut-percentage-height').length) {
            const $parent = $wrapper.parents('.eut-section');
            EUTHEM.sectionHeight.resetHeight( $parent[0] );
          }

          $container.css('visibility', 'visible');

          // Isotope Items Animation
          $wrapper.appear(function() {
            EUTHEM.isotope.itemsAnimation( itemsArr );
          });
        });


        // Filters
        const filterArr = [];
        const $filters = $wrapper.find('.eut-filter');
        const $filter = $filters.find('li');

        $filter.each(function() {
          const selector = $(this).data('filter');
          if ( filterArr.indexOf(selector) === -1 ) {
            filterArr.push(selector);
          }
        });

        $filters.on('click', 'li', function() {
          const selector = $(this).data('filter');
          const title = $(this).html();
          const $curCategory = $(this).parent().find('.eut-current-category');
          const gototop = $(this).parents('.eut-filter').attr('data-gototop') == 'yes' ? true : false; ;

          if ( $curCategory.length > 0 ) {
            $curCategory.find('span').html( title );
          }

          $container.isotope({
            filter: selector,
          });

          // Go to top
          if ( 'infinite-scroll' !== displayStyle && 'load-more' !== displayStyle ) {
            if ( gototop ) {
              EUTHEM.pageSettings.linkGoToTop( $(this).parent(), 300, 30 );
            }
          }
          $(this).addClass('selected').siblings().removeClass('selected');
        });

        // Infinite Scroll
        if ( $pagination.length ) {
          let scrollThresh = true;
          if ('load-more' == displayStyle ) {
            scrollThresh = false;
          }

          const isotopeId = '#' + $wrapper.attr('id');
          const path = isotopeId + ' .eut-infinite-pagination .next';
          const status = isotopeId + ' .eut-infinite-page-load';
          const btn = isotopeId + ' .eut-infinite-button';

          $container.infiniteScroll({
            path: path,
            history: false,
            status: status,
            button: btn,
            scrollThreshold: scrollThresh,
          });

          // append items on load
          $container.on( 'load.infiniteScroll', function( event, response, path ) {
            const items = $( response ).find( isotopeId +' .eut-isotope-item');
            const $filter = $( response ).find( isotopeId + ' .eut-filter ul li');
            const $filterList = $wrapper.find('.eut-filter ul');
            const activeCategory = $wrapper.find('.eut-filter .selected').data('filter');

            if ( '*' !== activeCategory ) {
              const $filterAll = $wrapper.find('.eut-filter ul li[data-filter="*"]');
              $filterAll.trigger('click');
            }

            // append items after images loaded
            items.imagesLoaded( function() {
              $container.append( items );
              EUTHEM.isotope.itemSize( $wrapper, items );
              $container.isotope( 'insert', items );
              EUTHEM.isotope.isotopeReinitFunction( $container );
              $(window).trigger('eut_isotope_append_items');

              EUTHEM.isotope.autoHeadings( $container );

              // Equal Columns
              EUTHEM.isotope.equalColumns( $wrapper, items );
              $container.isotope( 'layout' );

              // New Items Animation
              EUTHEM.isotope.itemsAnimation( items );

              $filter.each(function() {
                const $that = $(this);
                const filterClass = $that.data('filter');
                if ( -1 === filterArr.indexOf( filterClass ) ) {
                  filterArr.push( filterClass );
                  $that.appendTo($filterList);
                }
              });
            });
          });
        }
      });
    },
    isotopeReinitFunction: function( $container ) {
      EUTHEM.basicElements.slider();
      EUTHEM.pageSettings.fitVid();
      EUTHEM.pageSettings.bgLoader();

      // Recalculate Section Height
      if ( $container.parents('.eut-section').hasClass('eut-percentage-height') || $container.parents('.eut-section').find('.eut-percentage-height').length) {
        const $parent = $container.parents('.eut-section');
        EUTHEM.sectionHeight.resetHeight( $parent[0] );
      }
    },
    updateSettings: function( $wrapper ) {
      const $container = $wrapper.find('.eut-isotope-container');
      const itemsArr = $.makeArray( $container.find('.eut-isotope-item') );
      const layoutMode = $wrapper.data('layout');

      EUTHEM.isotope.containerSize( $wrapper );
      EUTHEM.isotope.itemSize( $wrapper, itemsArr );
      EUTHEM.isotope.autoHeadings( $container );
      // Equal Columns
      EUTHEM.isotope.equalColumns( $wrapper, itemsArr );
    },
    autoHeadings: function( $container ) {
      const $postItem = $container.find('.eut-blog-item.eut-style-2 .eut-blog-item-inner');
      const $portfolioItem = $('.eut-portfolio.eut-auto-headings .eut-isotope-item-inner');
      let compressor = 10;

      $postItem.each(function() {
        const $that = $(this);
        const $title = $that.find('.eut-post-title');
        if ( $that.parents('.eut-section').hasClass('eut-fullwidth')) {
          compressor = 20;
        }
        EUTHEM.isotope.setAutoHeadings( $that, $title, compressor );
      });
      $portfolioItem.each(function() {
        const $that = $(this);
        const $title = $that.find('.eut-title');
        if ( $that.parents('.eut-section').hasClass('eut-fullwidth')) {
          compressor = 20;
        }
        EUTHEM.isotope.setAutoHeadings( $that, $title, compressor );
      });
    },
    setAutoHeadings: function( $item, $title, compressor ) {
      EUTHEM.isotope.resetAutoHeadings( $title );
      const itemW = $item.width();
      const initFontSize = parseInt( $title.css('font-size') );
      const maxFontSize = 90;
      const newSize = (Math.max( Math.min( itemW / compressor, parseFloat(maxFontSize) ), parseFloat(initFontSize) )).toFixed(0);
      $title.css({
        'font-size': newSize + 'px',
      });
    },
    resetAutoHeadings: function( $title ) {
      $title.css({
        'font-size': '',
      });
    },
    equalColumns: function( $wrapper, items ) {
      if ( 'fitRows' != $wrapper.data('layout') || !$wrapper.hasClass('eut-blog') || $wrapper.hasClass('eut-blog-small') ) return;
      const $innerItems = $(items).find('.eut-isotope-item-inner');
      let maxHeight = 0;
      $innerItems.each(function() {
        const $that = $(this);
        const itemH = $that.css('height', 'auto').height();
        if ( itemH > maxHeight ) {
          maxHeight = itemH;
        }
      });
      $innerItems.css( 'height', maxHeight );
    },
    relayout: function() {
      $('.eut-isotope').each(function() {
        const $wrapper = $(this);
        const $container = $wrapper.find('.eut-isotope-container');
        EUTHEM.isotope.updateSettings( $wrapper );
        $container.isotope({
          transitionDuration: 0,
        }).isotope( 'layout' );
        // Recalculate Section Height
        if ( $wrapper.parents('.eut-section').hasClass('eut-percentage-height') || $wrapper.parents('.eut-section').find('.eut-percentage-height').length) {
          const $parent = $wrapper.parents('.eut-section');
          EUTHEM.sectionHeight.resetHeight( $parent[0] );
        }
      });
    },
    getColumnWidth: function( $wrapper ) {
      const gutter = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0;
      const columns = EUTHEM.isotope.getColumns( $wrapper );
      const wrapperW = $wrapper.innerWidth();
      const offset = $wrapper.parents('.eut-section').hasClass('eut-fullwidth') ? - gutter : gutter;
      let columnW = (wrapperW + offset) / columns;
      columnW = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW;
      return columnW;
    },
    itemSize: function( $wrapper, items ) {
      const gutter = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0;
      const columns = EUTHEM.isotope.getColumns( $wrapper );
      const columnW = EUTHEM.isotope.getColumnWidth( $wrapper );

      $.each( items, function(index, item) {
        const $item = $(item);
        const $thumb = $item.find('.eut-thumbnail');
        if ( $item.hasClass('eut-image-landscape') ) {
          if ( columns != 1 && columns != 2) {
            $item.css({'width': columnW * 2});
          } else {
            $item.css({'width': columnW});
          }
          $thumb.removeAttr('style');
          $thumb.css('height', columnW - gutter);
        } else if ( $item.hasClass('eut-image-portrait') ) {
          $item.css({'width': columnW});
          $thumb.removeAttr('style');
          $thumb.css('height', columnW*2 - gutter);
        } else {
          $item.css({'width': columnW});
        }
        if ( $item.hasClass('eut-style-2') && $item.hasClass('eut-bg-size-double') && columns != 1 && columns != 2 ) {
          $item.css({'width': columnW * 2});
        }
        $item.css({'padding': gutter/2});

        if ( $item.find('.eut-slider-element').length ) {
          $item.find('.eut-slider-element').trigger('refresh.owl.carousel');
        }
      });
    },
    containerSize: function( $wrapper ) {
      const $container = $wrapper.find('.eut-isotope-container');
      const wrapperW = $wrapper.innerWidth();
      const gutter = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0;
      const columns = EUTHEM.isotope.getColumns( $wrapper );
      const offset = $wrapper.parents('.eut-section').hasClass('eut-fullwidth') ? - gutter : gutter;
      let columnW = (wrapperW + offset) / columns;
      columnW = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW;
      const containerW = columnW * columns;

      if ( $container.parents('.eut-section').hasClass('eut-fullwidth') ) {
        $container.css({'padding-left': gutter/2, 'padding-right': gutter/2, 'width': containerW + gutter});
      } else {
        $container.css({'margin': - (gutter/2), 'width': containerW});
      }
    },
    getColumns: function( $wrapper ) {
      const windowWidth = $(window).width();
      let columns = {
        largeS: $wrapper.data('columns-large-screen'),
        desktop: $wrapper.data('columns'),
        tabletL: $wrapper.data('columns-tablet-landscape'),
        tabletP: $wrapper.data('columns-tablet-portrait'),
        mobile: $wrapper.data('columns-mobile'),
      };

      if ( windowWidth > largeScreen ) {
        columns = columns.largeS;
      } else if ( windowWidth > tabletLandscape && windowWidth <= largeScreen ) {
        columns = columns.desktop;
      } else if ( windowWidth > tabletPortrait && windowWidth <= tabletLandscape ) {
        columns = columns.tabletL;
      } else if ( windowWidth > mobileScreen && windowWidth <= tabletPortrait ) {
        columns = columns.tabletP;
      } else {
        columns = columns.mobile;
      }

      return columns;
    },
    itemsAnimation: function( items ) {
      $.each( items, function(index, item) {
        const delay = 200 * index;
        setTimeout(function() {
          $(item).find('.eut-isotope-item-inner').addClass('eut-animated');
        }, delay);
      });
    },
  };

  // # Scroll Direction
  // ============================================================================= //
  EUTHEM.scrollDir = {
    init: function() {
      const scroll = $(window).scrollTop();
      if (scroll > lastScrollTop) {
        lastScrollTop = scroll;
        return {direction: 'scrollDown'};
      } else {
        lastScrollTop = scroll;
        return {direction: 'scrollUp'};
      }

      lastScrollTop = scroll;
    },
  };

  // # Full Page
  // ============================================================================= //
  EUTHEM.fullPage = {
    init: function() {
      const $fPage = $('#eut-fullpage');
      if ( $fPage.length === 0 ) return;
      const $section = $fPage.find('.eut-row-section');
      let deviceNavigation = true;
      let deviceAutoScrolling = true;
      let scrollOverflow = true;
      let fitToSection = true;
      const speed = $fPage.data('scroll-speed');
      const deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
      const lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
      const loop = $fPage.data('scroll-loop');
      let loopTop = false;
      let loopBottom = false;
      if ( 'both' == loop || 'top' == loop ) {
        loopTop = true;
      }
      if ( 'both' == loop || 'bottom' == loop ) {
        loopBottom = true;
      }

      if ( isMobile.any() && !deviceFullPageEnable ) {
        deviceNavigation = false;
        deviceAutoScrolling = false;
        scrollOverflow = false;
        fitToSection = false;
        $section.find('.eut-animated-item').addClass('eut-animated');
      }

      const navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function() {
        return $(this).data('anchor-tooltip').toString();
      }).get();

      $fPage.fullpage({
        navigation: deviceNavigation,
        navigationPosition: 'right',
        navigationTooltips: navigationAnchorTooltips,
        sectionSelector: $section,
        css3: true,
        scrollingSpeed: speed,
        autoScrolling: deviceAutoScrolling,
        fitToSection: fitToSection,
        lockAnchors: lockAnchors,
        loopTop: loopTop,
        loopBottom: loopBottom,
        scrollOverflow: scrollOverflow,
        afterLoad: function(anchorLink, index) {
          const sectionHeaderColor = $($section[index-1]).attr('data-header-color');
          const color = 'eut-' + sectionHeaderColor;

          $section.find('.fp-tableCell').css('visibility', 'visible');

          // Set Header Color
          if ( !$('#eut-main-header').hasClass('eut-header-side') ) {
            $('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
          }
          $('#fp-nav').removeClass('eut-light eut-dark').addClass(color);

          EUTHEM.scrollingPageAnimations.addAnim( $section, index );
        },
        afterRender: function() {
          const $videoBg = $('.eut-bg-video');

          $videoBg.each(function() {
            const $that = $(this);
            const $video = $that.find('video');
            if ( $video.length ) {
              $video[0].play();
            }
            EUTHEM.pageSettings.resizeVideoBgElement( $that );
          });
        },
        onLeave: function(index) {
          if ( !isMobile.any() ) {
            EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
          }
        },
      });
    },
  };

  // # Pilling Page
  // ============================================================================= //
  EUTHEM.pillingPage = {
    init: function() {
      const $fPage = $('#eut-pilling-page');
      if ( $fPage.length === 0 ) return;
      const $section = $fPage.find('.eut-row-section');
      const deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
      const lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
      const direction = $fPage.data('scroll-direction');
      const loop = $fPage.data('scroll-loop');
      const speed = $fPage.data('scroll-speed');
      let loopTop = false;
      let loopBottom = false;
      if ( 'both' == loop || 'top' == loop ) {
        loopTop = true;
      }
      if ( 'both' == loop || 'bottom' == loop ) {
        loopBottom = true;
      }

      if ( isMobile.any() && !deviceFullPageEnable ) {
        $fPage.addClass('eut-disable-on-device');
        $section.find('.eut-animated-item').addClass('eut-animated');
        $section.children().wrap('<div class="pp-tableCell"></div>');
        $('.eut-row-section').each(function() {
          if ( $(this).attr('data-anchor').length ) {
            $(this).attr('id', $(this).attr('data-anchor') );
          }
        });
        return;
      }

      const navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function() {
        return $(this).data('anchor-tooltip').toString();
      }).get();


      let navigationAnchors = [];
      if ( !lockAnchors ) {
        navigationAnchors = $('[data-anchor]').map(function() {
          return $(this).data('anchor').toString();
        }).get();
      }

      $('html').addClass('fp-enabled');

      $fPage.pagepiling({
        sectionSelector: $section,
        css3: true,
        scrollingSpeed: speed,
        anchors: navigationAnchors,
        direction: direction,
        lockAnchors: lockAnchors,
        loopTop: loopTop,
        loopBottom: loopBottom,
        navigation: {
          'tooltips': navigationAnchorTooltips,
        },
        afterLoad: function(anchorLink, index) {
          const sectionHeaderColor = $($section[index-1]).attr('data-header-color');
          const color = 'eut-' + sectionHeaderColor;
          const $videoBg = $('.eut-bg-video');

          $videoBg.each(function() {
            const $that = $(this);
            const $video = $that.find('video');
            if ( $video.length ) {
              $video[0].play();
            }
            EUTHEM.pageSettings.resizeVideoBgElement( $that );
          });
          // Set Header Color
          if ( !$('#eut-main-header').hasClass('eut-header-side') ) {
            $('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
          }
          $('#pp-nav').removeClass('eut-light eut-dark').addClass(color);

          EUTHEM.scrollingPageAnimations.addAnim( $section, index );
        },
        afterRender: function() {
          const sectionHeaderColor = $($section[0]).attr('data-header-color');
          const color = 'eut-' + sectionHeaderColor;
          const $videoBg = $('.eut-bg-video');

          $videoBg.each(function() {
            const $that = $(this);
            const $video = $that.find('video');
            $video[0].play();
          });

          // Set Header Color
          if ( !$('#eut-main-header').hasClass('eut-header-side') ) {
            $('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
          }
          $('#pp-nav').removeClass('eut-light eut-dark').addClass(color);
          EUTHEM.scrollingPageAnimations.addAnim( $section, 1 );
        },
        onLeave: function(index) {
          EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
        },
      });
    },
  };

  // # Scrolling Page Animations
  // ============================================================================= //
  EUTHEM.scrollingPageAnimations = {
    addAnim: function( section, index ) {
      const $section = $(section[index-1]);
      const $element = $section.find('.eut-animated-item');
      const $column = $section.find('.eut-clipping-animation');

      $element.each(function() {
        const $that = $(this);
        const delay = $that.data('delay');
        if ( $that.parents('.eut-clipping-animation').length ) return;
        setTimeout(function() {
          $that.addClass('eut-animated');
        }, delay);
      });

      $column.each(function() {
        const $that = $(this);
        const $element = $that.find('.eut-animated-item');
        const delay = $that.data('delay');
        setTimeout(function() {
          EUTHEM.pageSettings.clippingAnimated( $that );
          setTimeout(function() {
            $element.addClass('eut-animated');
          }, 700);
        }, delay);
      });
    },


    removeAnim: function(section, index, speed) {
      const $section = $(section[index-1]);
      const $element = $section.find('.eut-animated-item');
      setTimeout(function() {
        $element.removeClass('eut-animated');
      }, speed);
    },
  };

  // # Section Navigation
  // ============================================================================= //
  EUTHEM.sectionNav = {
    init: function() {
      const $content = $('#eut-content');

      // Check if content has class section-nav
      if ( !$content.hasClass('eut-section-nav') ) return;

      const $themeWrapper = $('#eut-theme-wrapper');
      const $section = $('.eut-section[data-anchor]');
      let anchor;

      // Create Navigation List
      createList();

      const $navigation = $('#eut-section-nav');
      const $navItem = $('#eut-section-nav .eut-nav-item');
      let animate = false;

      // On Click Navigation Item
      $navItem.on('click', function(event) {
        event.preventDefault();
        const $that = $(this);
        const link = $that.attr('href');
        const scrollTop = Math.abs($(window).scrollTop()) / 2;
        const speed = scrollTop < 1000 ? 1000 : scrollTop;
        const $target = $('.eut-section[data-anchor=' + link + ']');
        const headerHeight = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0;
        const targetTop = $target.offset().top - headerHeight + 1;

        $that.addClass('active').siblings().removeClass('active');

        // Remove Scroll Up Classes
        if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
          $('#eut-header').data('eut_StickyHeader').destroyScrollUp();
        }

        smoothScroll( targetTop, speed );
      });

      updateNav();
      $(window).on('scroll', function() {
        if ( !animate ) {
          updateNav();
        }
      });

      function createList() {
        $('<div id="eut-section-nav"><div class="eut-inner-nav"></div></div>').appendTo($themeWrapper);
        $section.each(function() {
          const $that = $(this);
          const title = $that.data('anchor-tooltip');
          anchor = $that.data('anchor');
          const $listEl = $('<a class="eut-nav-item eut-small-text" href="' + anchor + '">' + title + '</a>');
          if ( title ) {
            $listEl.prependTo( $('#eut-section-nav .eut-inner-nav') );
          }
        });
      }

      function updateNav() {
        $section.each(function() {
          const $that = $(this);
          if ( ( $that.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $that.offset().top + $that.outerHeight() - $(window).height()/2 > $(window).scrollTop() ) ) {
            $navigation.find('a[href=' + $that.data('anchor') + ']').addClass('active');
          } else {
            $navigation.find('a[href=' + $that.data('anchor') + ']').removeClass('active');
          }
        });
      }

      function smoothScroll(target, speed) {
        if ( !animate ) {
          animate = true;
          $('html, body').animate({scrollTop: target}, speed, 'easeInOutCubic', function() {
            animate = false;
          });
          $('html, body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function() {
            $('html, body').stop();
            animate = false;
          });
        }
      }
    },
  };

  // # Global Variables
  // ============================================================================= //
  let resizeTimeout;
  var bodyLoader = false;
  var largeScreen = 2048;
  var tabletLandscape = 1200;
  var tabletPortrait = 1023;
  var mobileScreen = 767;
  var lastScrollTop = 0;
  var wpBarHeight = $('.eut-body').hasClass('admin-bar') ? 32 : 0;
  var $videoBg = $('.eut-bg-video');
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
  };

  var deviceAnimAppear = false;
  if ( 1 == crocal_eutf_main_data.device_animations ) {
    deviceAnimAppear = true;
  }

  var spinner = '<div class="eut-spinner"><div></div><div></div><div></div><div></div></div>';

  const $document = $(document);
  var $window = $(window);
  const $body = $('body');
  var $stickyEl = $('.eut-sticky-element');

  // Animation support & prefixing
  const t = document.body || document.documentElement;
  const s = t.style;
  var tSupport = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
  const property = ['WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
  let prefix;
  for ( const i in property ) {
    if ( s[property[i]] !== undefined ) {
      prefix = '-' + property[i].replace( 'Transform', '' ).toLowerCase();
    }
  }
  const transform = prefix + '-transform';

  // # Scrollbar Width
  // ============================================================================= //
  let parent; let child; let scrollBarWidth;

  if ( scrollBarWidth === undefined ) {
    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
    child = parent.children();
    scrollBarWidth = child.innerWidth()-child.height(99).innerWidth();
    parent.remove();
  }


  $(document).ready(function() {
    EUTHEM.documentReady.init();
  });
  $(window).on('load', function() {
    EUTHEM.documentLoad.init();
  });

  // Resize
  if ( !isMobile.any() ) {
    $(window).on('resize', resizer);
  } else {
    $(window).on('orientationchange', resizer);
  }
  function resizer() {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(function() {
      EUTHEM.documentResize.init();
    }, 300);
  }
})(jQuery);
