
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

(function($){

	"use strict";


	// # Document on Ready
	// ============================================================================= //
	EUTHEM.documentReady = {
		init: function(){
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
		}
	};

	EUTHEM.reCall = {
		init: function(){
			EUTHEM.sectionSettings.init();
		}
	};


	// # Document on Resize
	// ============================================================================= //
		EUTHEM.documentResize = {
		init: function(){
			EUTHEM.featureSize.init( '#eut-feature-section' );
			EUTHEM.featureSize.init( '.eut-page-title' );
			EUTHEM.sectionSettings.init();
			EUTHEM.sectionHeight.resetHeight( '.eut-section' );
			EUTHEM.anchorMenu.resetSticky( '.eut-anchor-menu' );
			EUTHEM.pageSettings.resizeVideoBg();
			EUTHEM.pageSettings.stickyElements();
			EUTHEM.isotope.relayout();
			EUTHEM.pageSettings.closeSideArea();
		}
	};

	// # Document on Load
	// ============================================================================= //
	EUTHEM.documentLoad = {
		init: function(){
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
					var target = window.location.hash;
					if( $(target).length ){
						if ( $(target).hasClass('eut-tab-content') || $(target).hasClass('eut-accordion-content')  ) {
							var tabLink =  $('.eut-tab-link[data-rel="' + target + '"]:visible');
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
		}
	};

	// # Section Height
	// ============================================================================= //
	EUTHEM.sectionHeight = {
		init: function(section){
			var $section = $(section);
			EUTHEM.sectionHeight.resetHeight( section );
		},
		settings: function(element){

				var windowH = $(window).height(),
					$section = element;
				$section.each(function(){
					var $that = $(this);

					if( $that.find('.eut-big-post').length || $that.parents('.eut-big-post').length ) {
						$that.removeClass('eut-loading-height');
						return;
					};

					if( !$that.hasClass('eut-percentage-height') && !$that.find('.eut-percentage-height').length ) return;

					if( $that.hasClass('eut-percentage-height') ){
						EUTHEM.sectionHeight.getHeight( $that, windowH );
					}
					var $row = $that.find('.eut-row'),
						$column = $that.find('.eut-column'),
						sectionH = $that.hasClass('eut-percentage-height') ? $that.height() : windowH,
						maxHeight = 0;

					$column.each(function(){
						var $col = $(this),
							$colChild = $col.find('.eut-inner-section.eut-percentage-height'),
							$colParent = $col.parents('.eut-row'),
							elementSpace = EUTHEM.sectionHeight.getElementSpace( $colChild ),
							colHeight = $col.height(),
							parentH = sectionH - elementSpace;

						$colChild.each(function(){
							EUTHEM.sectionHeight.getHeight( $(this), parentH );
						});
						maxHeight = $colParent.height() > maxHeight ? $colParent.height() : maxHeight;
					});

					if( maxHeight >= sectionH ){
						$row.css({'min-height' : maxHeight});
					}
				});

		},
		getRatio: function(element){
			var ratio,
				windowWidth = $(window).width() + scrollBarWidth;

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
		getHeight: function( element, parentH ){
			element.css({'height' : 'auto'});
			var ratio = EUTHEM.sectionHeight.getRatio( element ),
				minHeight = element.data('min-height') !== undefined ? element.data('min-height') : 0,
				paddingT = parseInt( element.css('padding-top') ),
				paddingB = parseInt( element.css('padding-bottom') ),
				space = paddingT + paddingB,
				content = element.find('.eut-percentage-content').first(),
				contentH = content.height(),
				elementH = Math.round( parentH * ratio ),
				height = elementH > minHeight ? elementH - space : minHeight - space;

			EUTHEM.sectionHeight.setHeight( element, content, height, contentH );
		},
		setHeight: function( element, content, height, contentH ){
			if( height > contentH ){
				content.css({ 'height' : height });
			}
			element.removeClass('eut-loading-height');
		},
		getElementSpace: function( element ){
			var space = element.parent().children('.eut-element, .eut-empty-space'),
				size = 0;
			space.each(function(){
				size += $(this).outerHeight();
			});
			return size;
		},
		resetHeight: function( section ){
			var $section = $(section),
				$row = $section.find('.eut-row'),
				$content = $section.find('.eut-percentage-content');
			$section.css({ 'height' : '' });
			$row.css({ 'height' : '' });
			$content.css({ 'height' : '' });
			EUTHEM.sectionHeight.settings( $section );
		}
	};

	// # Fixed Custom Position Column
	// ============================================================================= //
	EUTHEM.customPositionColumn = {
		init: function(){
			$('.eut-column.eut-custom-position').each(function(){
				var $column = $(this),
					columnW, columnX, windowW;

				setup();

				if( !isMobile.any() ) {
					$(window).on('resize', resizer);
				} else {
					$(window).on('orientationchange', resizer);
				}
				function setup(){
					resetPosition();
					updateParams();
					if( columnW + columnX >= windowW ){
						resetPosition();
						fixedPositionRight();
					}

					if( columnX < 0 ){
						resetPosition();
						fixedPositionLeft();
					}
				}
				function updateParams(){
					columnW = $column.outerWidth();
					columnX = $column.offset().left;
					windowW = $(window).width();
				}
				function resizer(){
					var delay;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						setup();
					}, 200);
				}
				function fixedPositionRight(){
					var newPosX = ( windowW - columnW ) - $column.offset().left;
					$column.css({'left' : newPosX, 'right' : '' });
				}
				function fixedPositionLeft(){
					var newPosX = - $column.offset().left;
					$column.css({'left' : newPosX, 'right' : '' });
				}
				function resetPosition(){
					$column.css({'left' : '', 'right' : ''});
				}
			});
		}
	};

	// SVG Animation
	EUTHEM.svgAnimation = {
		init : function(){
			if(bodyLoader){
				return false;
			}
			var $svg = $('.eut-svg-icon');
			$svg.each(function(){
				var $icon = $(this),
					duration = $icon.data('duration'),
					id = $icon.attr('id'),
					file = $icon.data('file'),
					myVivus,
					parentDelay = 0;

					if ( 'svg' !== file.split('.').pop() ) {
						return false;
					}

					if( $icon.parents('.eut-element').hasClass('eut-animated-item') ){
						parentDelay = $icon.parents('.eut-element').data('delay');
					}

					$icon.appear(function() {
						setTimeout(function () {
							myVivus = new Vivus( id, {
								duration : duration,
								file : file,
								type: 'async',
								start : 'inViewport'
							});
						}, parentDelay);
					},{accX: 0, accY: 0});
			});
		}
	};



	// # Advanced Hidden Menu
	// ============================================================================= //
	EUTHEM.advancedHiddenMenu = {
		init : function(){
			var $header = $('#eut-header'),
				$mainHeader = $('#eut-main-header'),
				$menu = $('#eut-main-menu'),
				$menuEl = $menu.find('.eut-first-level'),
				$headerEl = $mainHeader.find('.eut-header-elements-wrapper'),
				$btn = $mainHeader.find('.eut-hidden-menu-btn a'),
				openHeader = false,
				hoverDelay;

			if( !$menu.length || !$header.hasClass('eut-advanced-hidden-menu') ) return;

			$mainHeader.on('mouseenter.advancedHidden', function(){
				var $that = $(this);
				if( !openHeader ){
					openHeader = true;
					toggleHeader();
				}

			});

			$mainHeader.on('mouseleave.advancedHidden', function(){
				var $that = $(this);
				if( openHeader ){
					openHeader = false;
					toggleHeader();
				}
			});

			$btn.on('click.advancedHidden', function(e){
				e.preventDefault();
				if( !openHeader ){
					openHeader = true;
					toggleHeader();
				} else {
					openHeader = false;
					toggleHeader();
				}
			});

			if( isMobile.any() ) {
				$mainHeader.off('mouseenter.advancedHidden');
				$mainHeader.off('mouseleave.advancedHidden');
			}

			var itemLength = $menuEl.length -1,
				startTimer = false,
				count = -1,
				counter;

			function toggleHeader(){
				if( openHeader ){
					clearInterval(hoverDelay);
					$header.addClass('eut-header-hover');
					$menuEl.removeClass('hide');

					// Show Menu
					startTimer = true;
					counter = setInterval(timer, 100);

				} else {
					hoverDelay = setTimeout(function(){
						$header.removeClass('eut-header-hover');
						$menuEl.removeClass('show');
						$headerEl.removeClass('show');
					},400);

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
		}
	};

	// # Leader Post Size
	// ============================================================================= //
	EUTHEM.leaderPostSize = {
		init : function(){
			var $leaderElement = $('.eut-blog-leader.eut-layout-1.eut-crocal-style');

			if( !$leaderElement.length ) return;

			var windowWidth,
				maxHeight,
				leaderHeight;

			$leaderElement.each(function(){
				var $this = $(this),
					$leaderPost = $this.find('.eut-post-leader'),
					resizing  = false;


				resetHeight();
				$(window).smartresize(resetHeight);

				function resetHeight(){
					if(!resizing){
						resizing  = true;

						$leaderPost.css({
							'height' : ''
						});

						updateParams();
					}
				}

				function updateParams() {
					windowWidth = $(window).width();

					$this.imagesLoaded('always',function(){
						maxHeight = $this.outerHeight();
						leaderHeight = $leaderPost.outerHeight();

						setLeaderHeight();
					});
				}

				function setLeaderHeight(){
					if( maxHeight > leaderHeight && windowWidth + scrollBarWidth > tabletPortrait ){
						$leaderPost.css({
							'height' : maxHeight,
							'visibility' : 'visible'
						});
					} else {
						$leaderPost.css({
							'visibility' : 'visible'
						});
					}

					resizing = false;
				}
			});
		}
	};

	// # Anchor Menu
	// ============================================================================= //
	var openAnchorMenu = false;
	EUTHEM.anchorMenu = {
		init: function( anchor ){
			var $anchor = $(anchor);
			if( !$anchor.length ) return;
			EUTHEM.anchorMenu.resetSticky( anchor );
		},
		updateSticky: function( $wrapper, topOffset, topPos ){
			var scroll = $(window).scrollTop(),
				sticky = false;

			if( scroll >= topOffset ){
				sticky = true;
				$wrapper
					.addClass('eut-sticky')
					.css({'top' : topPos});
			} else {
				sticky = false;
				$wrapper
					.removeClass('eut-sticky')
					.css({'top' : ''});
				$wrapper.css(EUTHEM.anchorMenu.doTranslate( 0 ));
			}
		},
		setOffset: function( anchor ){
			var $anchor   = $(anchor),
				anchorT   = $anchor.offset().top,
				$header   = $('#eut-header'),
				stikyType = $header.data('sticky'),
				headerH   = $header.data('sticky-height') !== undefined && stikyType != 'scrollup' && stikyType != 'none' ? $header.data('sticky-height') : 0,
				frameSize = $('body').hasClass('eut-framed') ? $('#eut-frames').find('.eut-frame.eut-top').height() : 0,
				offset    = 0;

			offset = {
				topOffset : anchorT - headerH - frameSize,
				topPos : headerH + frameSize
			};
			return offset;
		},
		resetSticky: function( anchor ){
			var $anchor  = $(anchor);
			if( !$anchor.length ) return;
			var $wrapper = $anchor.children('.eut-anchor-wrapper'),
				windowW  = $(window).width();

			EUTHEM.anchorMenu.resetResponsive( anchor );

			if( windowW + scrollBarWidth < 1023 ) {
				$anchor.addClass('eut-anchor-responsive');
				$wrapper.removeClass('eut-sticky');
				$wrapper.css(EUTHEM.anchorMenu.doTranslate( 0 ));
				$(window).off('scroll.eut_anchor');
				EUTHEM.anchorMenu.responsive( anchor );
			} else {
				$anchor.removeClass('eut-anchor-responsive');
				var topOffset = EUTHEM.anchorMenu.setOffset( anchor ).topOffset,
					topPos = EUTHEM.anchorMenu.setOffset( anchor ).topPos;
				$(window).on('scroll.eut_anchor', function(){
					EUTHEM.anchorMenu.updateSticky( $wrapper, topOffset, topPos );
				});
			}
		},
		moveAnchor : function( anchor, position ){
			var $anchor  = $(anchor),
				$wrapper = $anchor.children('.eut-anchor-wrapper');
				if( $wrapper.hasClass('eut-sticky') ){
					$wrapper.css(EUTHEM.anchorMenu.doTranslate( position ));
				}
		},
		doTranslate : function(value){
			return {
				'-webkit-transform' : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-moz-transform'    : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-ms-transform'     : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-o-transform'      : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'transform'         : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)'
			};
		},
		responsive : function( anchor ){
			var $anchor   = $(anchor),
				$btn      = $anchor.find('.eut-anchor-btn'),
				$menu     = $anchor.find('.menu'),
				$menuLink = $menu.find('a');

			$btn.on('click',function(e){
				e.preventDefault();
				if(openAnchorMenu){
					$anchor.css({'height' : ''});
					$menu.slideUp(function(){
						openAnchorMenu = false;
						$(this).removeAttr('style');
					});
				} else {
					$anchor.css({'height' : 'auto'});
					$menu.slideDown(function(){
						openAnchorMenu = true;
					});
				}
			});
		},
		resetResponsive: function( anchor ){
			var $anchor = $(anchor),
				$menu   = $anchor.find('.menu');
			$menu.removeAttr('style');
			openAnchorMenu = false;
		}
	};

	// # Menu Slide or Toggle
	// ============================================================================= //
	EUTHEM.slideToggleMenu = {

		init: function( parrent, element ){

			$(element).each(function(){
				if( !$(this).length ) return;

				var $menu = $(this),
				$menuParent = $menu.parents(parrent),
				$menuItem   = $menu.find('li.menu-item-has-children > a'),
				menuType    = $menuParent.hasClass('eut-slide-menu') ? 'slide' : 'toggle',
				$arrow      = $('<i class="eut-arrow"></i>'),
				$goBack     = $('<li class="eut-goback"><a href="#"><i class="eut-arrow"></i></a></li>');

				EUTHEM.slideToggleMenu.removeHiddenMenuItems( $menu );

				if( menuType === 'slide' ) {
					// Add Arrows
					$arrow.appendTo( $menuItem.parent() );
					// Add Go Back Button for Slide Menu
					$goBack.prependTo( $menuItem.parent().find('>ul') );
				} else {
					// Add Arrows
					$arrow.appendTo( $menuItem );
				}

				$menuItem.on('tap click',function(e){
					var $this = $(this),
						link  = $this.attr('href'),
						open  = false;

					if((link != '#' || link === '#') && menuType == 'toggle' ) {
						if( !$this.parent().hasClass('open') && !open ) {
							e.preventDefault();
							$this.parent().addClass('open');
							toggle( $this, open );
						} else {
							open = true;
							toggle( $this, open );
							$this.parent().removeClass('open');
						}
					} else if( link === '#' && menuType == 'slide' ) {
						e.preventDefault();
						var listLevel  = $this.parents('ul').length,
							$firstItem = $this.parent().find('ul').first(),
							menuOffset = $menu.offset().top,
							offset     = $this.offset().top,
							title      = $this.html();

							appendTitle( title, $firstItem );

						$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
						var firstItemH = $firstItem.outerHeight();

						if( $('body').hasClass('rtl') ) {
							animRightMenu( firstItemH, listLevel );
						} else {
							animLeftMenu( firstItemH, listLevel );
						}
					}
				});

				if( menuType === 'slide' ) {
					var $arrowBtn = $menuItem.parent().find('.eut-arrow');
					$arrowBtn.on('click',function(){
						var $this = $(this),
							listLevel  = $this.parents('ul').length,
							$firstItem = $this.parent().find('ul').first(),
							menuOffset = $menu.offset().top,
							offset     = $this.offset().top,
							title      = $this.parent().find('a').first().html();

						appendTitle( title, $firstItem );

						$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
						var firstItemH = $firstItem.outerHeight();

						if( $('body').hasClass('rtl') ) {
							animRightMenu( firstItemH, listLevel );
						} else {
							animLeftMenu( firstItemH, listLevel );
						}

					});
				}

				$('li.eut-goback a').on('click', function(e) {
					e.preventDefault();
					var listLevel  = $(this).parents('ul ul').length - 1,
						$firstItem = $(this).closest('.sub-menu'),
						firstItemH = $firstItem.closest('.menu-item-has-children').closest('ul').height();

					setTimeout(function(){
						$firstItem.removeClass('show');
					},300);
					if( $('body').hasClass('rtl') ) {
						animRightMenu( firstItemH, listLevel );
					} else {
						animLeftMenu( firstItemH, listLevel );
					}
				});

				function toggle( $this, open ){
					var $subMenu = $this.parent().find('>ul');
					if( open ) {
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

				function appendTitle( title, list ){
					if( list.find('.eut-goback .eut-item').length ) return;
					$(title).appendTo( list.find('> .eut-goback a') );
				}
			});
		},
		removeHiddenMenuItems: function( $menu ){
			var $hiddenMenuItem = $menu.find('li.eut-hidden-menu-item'),
				$link = $hiddenMenuItem.find('>a'),
				$subMenu = $hiddenMenuItem.find('>.sub-menu');

			$link.remove();
			$subMenu.unwrap().children().unwrap();
		}

	};

	// # Sticky Sidebar Widget
	// ============================================================================= //
	EUTHEM.stickySidebarWidget = {
		init: function(){

			var $stickyWidget = $('#eut-content .eut-sticky-widget'),
				sidebarWidget = false;

			$stickyWidget.each(function(){
				var $this = $(this);

				if( $this.length > 0 ) {

					if( $('.eut-sticky-widget').parent().parent().is('#eut-sidebar') ) {
						sidebarWidget = true;
					}

					if( sidebarWidget && $('#eut-sidebar').hasClass('eut-fixed-sidebar') ) return;

					var $content         = sidebarWidget ? $('#eut-main-content .eut-main-content-wrapper') : $this.parents('.eut-row'),
						$sidebar         = $this.parent(),
						headerHeight     = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0,
						anchorHeight     = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
						topOffset        = headerHeight + anchorHeight + 40;

					var windowWidth,sidebarWidth,sidebarHeight,contentTop,contentPadding,sidebarTop;

					var scrolling        = false,
						sidebarAnimation = false,
						resizing         = false;

					updateParams();

					if( windowWidth + scrollBarWidth > tabletPortrait ) {
						$(window).on('scroll', checkSidebar);
					}
					$(window).smartresize(resetScroll);

				}

				function checkSidebar() {
					if( !sidebarAnimation ) {
						sidebarAnimation = true;
						updateSidebarPosition();
					}
				}

				function resetScroll() {
					if( !resizing ) {
						resizing = true;
						$sidebar.removeClass('fixed').attr('style', '');
						updateParams();
					}
				}

				function updateParams() {
					windowWidth    = $(window).width();
					sidebarWidth   = $sidebar.width();
					sidebarHeight  = $sidebar.height();
					contentTop     = $content.offset().top;
					contentPadding = parseInt( $content.css('padding-top') );
					sidebarTop     = $this.offset().top;

					$(window).off('scroll', checkSidebar);

					if( windowWidth + scrollBarWidth > tabletPortrait ) {
						$(window).on('scroll', checkSidebar);
					}
					resizing = false;
				}

				function updateSidebarPosition() {
					var contentHeight = $content.height(),
						scrollTop     = $(window).scrollTop(),
						topPosition   = sidebarTop - contentTop - topOffset - contentPadding;

					if( scrollTop < sidebarTop - topOffset ) {
						$sidebar.removeClass('fixed').attr('style', '');
					} else if( scrollTop >= sidebarTop - topOffset && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset ) {
						$sidebar.addClass('fixed').css({ 'top' : - topPosition, 'position' : 'fixed', 'width' : sidebarWidth });
					} else {
						if( $sidebar.hasClass('fixed') ) {
							$sidebar.removeClass('fixed').css({ 'top' : contentHeight - sidebarHeight + 'px', 'position' : 'relative' });
						}
					}
					sidebarAnimation =  false;
				}
			});
		}
	};

	// # Sticky Sidebar
	// ============================================================================= //
	EUTHEM.stickySidebar = {
		init: function(){

			var $sidebar = $('#eut-sidebar');
			if( $sidebar.length > 0 && $sidebar.hasClass('eut-fixed-sidebar') ) {

				var $content         = $('#eut-main-content .eut-main-content-wrapper'),
					$sidebarWrapper  = $sidebar.find('.eut-wrapper'),
					headerHeight     = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0,
					anchorHeight     = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
					topOffset        = headerHeight + anchorHeight + 100,
					bottomOffset     = 0;

				var windowWidth,sidebarWidth,sidebarHeight,contentPadding,sidebarTop;

				var scrolling        = false,
					sidebarAnimation = false,
					resizing         = false;

				updateParams();

				if( windowWidth + scrollBarWidth > tabletPortrait ) {
					$(window).on('scroll', checkSidebar);
				}

				$(window).smartresize(resetScroll);
			}

			function checkSidebar() {
				if( !sidebarAnimation ) {
					sidebarAnimation = true;
					updateSidebarPosition();
				}
			}

			function resetScroll() {
				if( !resizing ) {
					resizing = true;
					$sidebarWrapper.removeClass('fixed').attr('style', '');
					updateParams();
				}
			}

			function updateParams() {
				windowWidth    = $(window).width();
				sidebarWidth   = $sidebar.width();
				sidebarHeight  = $sidebar.height();
				contentPadding = parseInt( $content.css('padding-top') );
				sidebarTop     = $sidebar.offset().top;

				if( $('.eut-navigation-bar').length ) {
					bottomOffset = $('.eut-navigation-bar').outerHeight() + 60;
				}

				$(window).off('scroll', checkSidebar);

				if( windowWidth + scrollBarWidth > tabletPortrait ) {
					checkSidebar();
					$(window).on('scroll', checkSidebar);
				}

				$sidebar.css({
					'visibility' : 'visible'
				});

				resizing = false;
			}

			function updateSidebarPosition() {
				var contentHeight = $content.height(),
					scrollTop     = $(window).scrollTop();

				if( scrollTop < sidebarTop - topOffset + contentPadding ) {
					$sidebarWrapper.removeClass('fixed').attr('style', '');
				} else if( scrollTop >= sidebarTop - topOffset + contentPadding && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset + contentPadding - bottomOffset ) {
					$sidebarWrapper.addClass('fixed').css({ 'top' : topOffset, 'position' : 'fixed', 'width' : sidebarWidth });
				} else {
					if( $sidebarWrapper.hasClass('fixed') ) {
						$sidebarWrapper.removeClass('fixed').css({ 'top' : contentHeight - sidebarHeight - bottomOffset + 'px', 'position' : 'relative' });
					}
				}
				sidebarAnimation =  false;
			}

		}
	};

	// # Set Feature Section Size
	// ============================================================================= //
	EUTHEM.featureSize = {
		init: function( section ){
			if( !$(section).length ) return;
			var $section = $(section);
			if( $section.hasClass('eut-fullscreen') ) {
				this.fullscreenSize( $section );
			} else if( $section.hasClass('eut-custom-size') ) {
				this.customSize( $section );
			}
		},
		getTopBarHeight : function( topBar ){
			var height = 0,
				$topBar = $(topBar);
			if( $topBar.length ) {
				height = $topBar.outerHeight();
			}
			return height;
		},
		getHeaderHeight : function( header, responsiveHeader ){
			var height = 0,
				$header = $(header),
				$resHeader = $(responsiveHeader);
			if( $header.length && $header.is(':visible') && !$header.hasClass('eut-overlapping') && !$header.hasClass('eut-header-below') ) {
				height = $header.outerHeight();
			}
			if( $resHeader.length && $resHeader.is(':visible') && !$header.hasClass('eut-responsive-overlapping') && !$header.hasClass('eut-header-below') ) {
				height = $resHeader.outerHeight();
			}
			return height;
		},
		fullscreenSize : function( $section ){
			var windowH   = $(window).height(),
				headerH   = this.getHeaderHeight( '#eut-header', '#eut-responsive-header' ),
				topBarH   = this.getTopBarHeight( '#eut-top-bar' ),
				frameSize = $('body').hasClass('eut-framed') ? $('#eut-frames').find('.eut-frame.eut-top').height() : 0,
				sectionH  = windowH - headerH - topBarH - (frameSize * 2);
			$section.css( 'height', sectionH).find('.eut-wrapper').css( 'height', sectionH);
		},
		customSize : function( $section ){
			var windowH    = $(window).height(),
				initHeight = $section.data('height'),
				newHeight  = ((windowH * initHeight) / 100);
			if( newHeight > this.windowH ) {
				newHeight = this.windowH;
			}
			$section.css( 'height', newHeight).find('.eut-wrapper').css( 'height', newHeight);
		}
	};

	// # Feature Section
	// ============================================================================= //
	EUTHEM.featureSection = {
		init : function(section){
			if( !section.length ) return;
			var $section = $(section),
				$bgImage = $section.find('.eut-bg-image'),
				$bgVideo = $section.find('.eut-bg-video'),
				$spinner = $(spinner),
				animateContent = false;

			// Set Size
			EUTHEM.featureSize.init( section );

			if( $bgImage.length ) {
				// Load Background Images
				loadFeatureImage();
			} else if( !$bgImage.length && $bgVideo.length ) {
				showFeature();
			} else {
				// Play Animation Content
				featureAnimation( $section );
			}

			// Load Background Images
			function loadFeatureImage(){
				var totalBgImage = $bgImage.length,
					waitImgDone = function() {
						totalBgImage--;
						if (!totalBgImage) {
							showFeature();
						}
					};
				$bgImage.each(function () {
					function imageUrl(input) {
						return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
					}
					var image = new Image(),
						$that = $(this);
					image.src = imageUrl($that.css('background-image'));
					$(image).on('load',waitImgDone).on( "error", waitImgDone );
				});
			}

			// Add Spinner
			function addSpinner(){
				$spinner.appendTo( $section );
				$section.addClass('eut-with-spinner');
			}

			// Remove Spinner
			function removeSpinner(){
				$spinner.fadeOut(900,function(){
					$spinner.remove();
					// Show Feature Section
					showFeature();
				});
			}

			// Show Feature Section
			function showFeature(){
				var $overlay   = $section.find('.eut-bg-overlay'),
					$content   = $section.find('.eut-content'),
					$bgImage   = $section.find('.eut-bg-image'),
					$bgVideo   = $section.find('.eut-bg-video');

				$bgImage.addClass('show');
				$bgVideo.addClass('show');
				$overlay.addClass('show');

				animateContent = true;
				if( $section.hasClass('eut-with-slider') ) {
					// Init Feature Slider
					featureSlider();
				} else {
					// Play Feature Animation
					featureAnimation( $section );
				}
			}

			// Feature Slider
			function featureSlider(){
				var $slider         = $('#eut-feature-slider'),
					pauseHover      = $slider.attr('data-slider-pause') == 'yes' ? true : '',
					sliderSpeed     = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000,
					transition      = $slider.attr('data-slider-transition'),
					slidersLength   = $slider.find('.eut-slider-item').length,
					pagination      = $slider.attr('data-pagination') != 'no' ? true : false,
					$nextNav        = $slider.parent().find('.eut-carousel-next'),
					$prevNav        = $slider.parent().find('.eut-carousel-prev'),
					loop            = true,
					animateOut      = false,
					animateIn       = false,
					stopSlider      = false;

				// Slider Trantition
				if( transition != 'slide' ){
					animateOut = 'carousel-' + transition + '-out';
					animateIn = 'carousel-' + transition + '-in';
				}

				EUTHEM.featureSection.addPaginationNumbers();


				$slider.on('initialized.owl.carousel changed.owl.carousel',function(event){
					var current = event.item.index !== null ? event.item.index : 0,
						$currentSlide = $(event.target).find('.eut-slider-item').eq(current),
						sliderColor = $currentSlide.attr('data-header-color'),
						color = 'eut-' + sliderColor;

					if( !$currentSlide.length) return;

					// Slider Animation
					featureAnimation( $currentSlide );

					EUTHEM.featureSection.getActiveNumber( current );

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
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
					items : 1,
					loop : loop,
					autoplay : true,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : pauseHover,
					smartSpeed : 500,
					dots : pagination,
					dotsClass : 'eut-carousel-pagination',
					animateOut : animateOut,
					animateIn : animateIn,
					responsiveClass : false,
					itemClass : 'eut-slider-item-wrapper'
				});

				$(window).on('scroll',autoplayHandler);

				function autoplayHandler(){
					var scroll = $(window).scrollTop();
					if( scroll > 300 && !stopSlider ){
						stopSlider = true;
						$slider.trigger('stop.owl.autoplay');
					} else if( scroll < 300 && stopSlider ) {
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
			function featureAnimation(section){
				var $section = section,
					$wrapper = $section.find('.eut-title-content-wrapper'),
					effect = $section.find('.eut-content').data('animation'),
					effectClass = 'eut-animate-' + effect,
					delay = 200,
					cnt = 0,
					contentItems = {
						graphic     : $section.find(' .eut-graphic '),
						subheading  : $section.find(' .eut-subheading '),
						title       : $section.find(' .eut-title '),
						description : $section.find(' .eut-description '),
						titleMeta   : $section.find(' .eut-title-meta-content '),
						button1     : $section.find(' .eut-btn-1 '),
						button2     : $section.find(' .eut-btn-2 '),
						gotoArrow   : $section.find(' .eut-goto-section-wrapper ')
					};

				// Show Content
				$section.find('.eut-content').addClass('show');

				if( !$wrapper.hasClass('eut-bg-none') ){
					contentItems = $wrapper;
				}

				// Add Animation Class
				$.each( contentItems, function( key, item ) {
					$(item).removeClass('eut-animate-fade-in eut-animate-fade-in-up eut-animate-fade-in-down eut-animate-fade-in-left eut-animate-fade-in-right eut-animate-zoom-in eut-animate-zoom-out');

					if( $(item).length ){
						cnt++;
						if( effect != 'none' ){
							setTimeout(function(){
								$(item).addClass( effectClass );
							},cnt * delay);
						}
					}
				});
			}
		},
		addPaginationNumbers: function(){
			var $slider = $('#eut-feature-slider'),
				$sliderItems = $slider.find('.eut-slider-item'),
				$list = $slider.parent().find('.eut-slider-numbers'),
				sliderSpeed = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000;

			if( $list.length > 0 ) {
				$list.appendTo( $slider.parent() );
				$sliderItems.each(function(num,item){
					var number = (num + 1) < 10 ? '0' + (num + 1) : num + 1,
						$listIem = $('<li class="eut-link-text">' + number +'</li>');
					$listIem.appendTo( $list );
				});

				$list.find('li').on('click',function(){
					var $that = $(this),
						goTo = $that.index(),
						timer;
					$slider.trigger('to.owl.carousel', [goTo, 300]);
					$slider.trigger('stop.owl.autoplay');
					$that.addClass('active').siblings().removeClass('active');
					clearTimeout(timer);
					timer = setTimeout(function(){
						$slider.trigger('play.owl.autoplay');
					},sliderSpeed);
				});
			}
		},
		getActiveNumber: function( currentSlider ){
			var $slider = $('#eut-feature-slider'),
				$list = $slider.parent().find('.eut-slider-numbers'),
				$listIem = $list.find('li');
			if( $list.length > 0 ) {
				var currentNumber = currentSlider - 2 <= 0 ? 0 : currentSlider - 2;
				$listIem.eq(currentNumber).addClass('active').siblings().removeClass('active');
			}
		}
	};

	// # Feature Parallax
	// ============================================================================= //
	var featureParallaxScroll = false;
	EUTHEM.featureParallax = {
		init: function(){
			var section = $('#eut-feature-section'),
				scroll = false,
				smallDelay;

			if( !section.hasClass('eut-bg-parallax') && !section.hasClass('eut-bg-advanced-parallax') && !section.hasClass('eut-bg-fixed-section') ) {
				return;
			}

			// Create Parallax Wrapper
			section.children().wrapAll('<div class="eut-feature-inner"><div class="eut-parallax-wrapper"></div></div>');

			updateParallax();

			// Add window events
			$(window).on('resize', function(){
				window.clearTimeout(smallDelay);
				smallDelay = window.setTimeout(function () {
					updateParallax();
				}, 100);
			});
			$(window).on('scroll', onWindowScroll);

			function onWindowScroll(){
				if( window.requestAnimationFrame ) {
					if(!scroll){
						window.requestAnimationFrame( updateParallax );
						scroll = true;
					}
				} else {
					updateParallax();
				}
			}

			function updateParallax(){
				var wrapper = section.find('.eut-parallax-wrapper');
				var parallaxType;
				if( section.hasClass('eut-bg-advanced-parallax') ){
					parallaxType = 'advanced';
				} else if( section.hasClass('eut-bg-fixed-section') ){
					parallaxType = 'fixed';
				} else {
					parallaxType = 'classic';
				}

				if( inViewport( section ) ){
					// References
					var scrollTop = $( window ).scrollTop();
					var sectionTop = section.offset().top;
					var sectionW = section.outerWidth();
					var sectionH = section.outerHeight();
					var position = scrollTop * 0.2;
					var elementH = sectionH + sectionTop;
					var opacity = ( ( ( sectionH + sectionTop ) - scrollTop ) / sectionH ).toFixed(2);
					var scale = ( ( ( sectionH + sectionTop ) + scrollTop ) / sectionH );
					var content = section.find('.eut-wrapper, .eut-background-wrapper');
					var bgImage = section.find('.eut-bg-image');
					if( tSupport ){

						if( parallaxType == 'advanced' ) {
							wrapper.css({
								'position' : 'fixed',
								'top' : sectionTop,
								'height' : elementH,
								'width' : sectionW,
								transform: 'translate3d( 0px' + ', ' + -position + 'px' + ', 0px) translateZ(0)',
								visibility: 'visible'
							});
						} else if( parallaxType == 'fixed' ) {
							wrapper.css({
								'position' : 'fixed',
								'top' : sectionTop,
								'height' : elementH,
								'width' : sectionW,
								visibility: 'visible'
							});
						} else {
							wrapper.css({
								'position' : 'relative',
								'height' : elementH,
								'width' : sectionW,
								transform: 'translate3d( 0px' + ', ' + position + 'px' + ', 0px) translateZ(0)',
								visibility: 'visible'
							});
						}

						bgImage.css({visibility: 'visible'});
					}
				} else {
					wrapper.css({
						'position' : 'relative'
					});
				}
				scroll = false;
			}

			function inViewport( element ){
				var winTop = $( window ).scrollTop();
				var winBottom = winTop + $( window ).height();
				var elTop = element.offset().top;
				var elBottom = elTop + element.outerHeight();
				return ( winBottom >= elTop && winTop <= elBottom );
			}

		}
	};

	// # Woocommerce Carousel Thumb Gallery
	// ============================================================================= //
	EUTHEM.wooThumbCarousel = {
		init : function(){
			var $thumbs = $('#eut-product-feature-image').find('.thumbnails'),
				$thumbsWrapper = $thumbs.find('.eut-thumbnails-wrapper'),
				$thumbsInner = $thumbs.find('.eut-thumbnails-inner'),
				$items = $thumbs.find('.eut-thumb-item'),
				$arrowPrev = $('<i class="eut-icon-nav-up-small eut-arrow-prev"></i>'),
				$arrowNext = $('<i class="eut-icon-nav-down-small eut-arrow-next"></i>'),
				wrapper = false,
				smallDelay,
				wrapperH,
				slidesLength,
				cnt;


			if( !$thumbs.length || $items.length <= 4 ) {
				$thumbsWrapper.css({
					'visibility' : 'visible'
				});
				return false;
			}

			setSlider();
			$(window).on('resize', function(){
				window.clearTimeout(smallDelay);
				smallDelay = window.setTimeout(function () {
					setSlider();
				}, 300);
			});

			function addWrapper(){
				if( !wrapper ) {
					for (var i = 0, len = $items.length; i < len; i += 4) {
						$items.slice(i, i + 4).wrapAll('<div class="eut-thumb-wrapper"/>');
					}

					wrapperH = $('.eut-thumb-wrapper').first().outerHeight();
					slidesLength = $('.eut-thumb-wrapper').length - 1;

					$thumbsWrapper.css({
						'height' : wrapperH,
						'overflow' : 'hidden',
						'visibility' : 'visible'
					});

					addArrows();
					$thumbsInner.addClass('eut-with-transition');

					wrapper = true;
				}
			}

			function addArrows(){
				$arrowPrev.appendTo( $thumbs );
				$arrowNext.appendTo( $thumbs );
				// Add Classes
				$arrowPrev.addClass('eut-disable-arrow');
				$arrowNext.removeClass('eut-disable-arrow');

				cnt = 0;
				bindEvents();
			}

			function moveSlide(n){
				$thumbsInner.css( doTranslate( n * wrapperH ) );
			}

			function setSlider(){
				if( $(window).width() + scrollBarWidth < tabletPortrait && wrapper) {
					resetSlider();
				} else if( $(window).width() + scrollBarWidth > tabletPortrait && !wrapper) {
					addWrapper();
				}
			}

			function resetSlider(){
				$thumbsInner.removeClass('eut-with-transition');
				$thumbsInner.css( doTranslate( 0 ) );
				$items.unwrap();
				$thumbsWrapper.css({
					'height' : '',
					'overflow' : 'visible',
					'visibility' : 'visible'
				});

				$arrowPrev.remove();
				$arrowNext.remove();

				wrapper = false;
			}

			function bindEvents(){
				$arrowNext.on('click.thumb-arrows',function(){
					var $that = $(this);
					if( cnt > - slidesLength ){
						cnt--;
						moveSlide( cnt );
						$arrowPrev.removeClass('eut-disable-arrow');
					}
					if(cnt == -slidesLength ){
						$that.addClass('eut-disable-arrow');
					}
				});

				$arrowPrev.on('click.thumb-arrows',function(){
					var $that = $(this);
					if( cnt < 0 ){
						cnt++;
						moveSlide( cnt );
						$arrowNext.removeClass('eut-disable-arrow');
					}
					if(cnt === 0 ){
						$that.addClass('eut-disable-arrow');
					}
				});
			}

			function doTranslate( value ){
				return {
					'-webkit-transform' : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-moz-transform'    : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-ms-transform'     : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-o-transform'      : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'transform'         : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)'
				};
			}
		}
	};

	// # Page Settings
	// ============================================================================= //
	EUTHEM.pageSettings = {

		init: function(){
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
		opacityScroll: function(){
			var $bgImage = $('.eut-bg-scroll-effect');
			$bgImage.each(function(){
				var $that = $(this),
					offset = $that.data('opacity-offset') / 100,
					initialOpacity = $that.data('initial-opacity') / 100,
					finalOpacity = $that.data('final-opacity') / 100,
					invert = $that.data('initial-opacity') > $that.data('final-opacity') ? false : true;

				$(window).on('scroll', function () {
					var scrollTop = invert ? ($(window).scrollTop() + $(window).height()) - $that.offset().top : $(window).scrollTop() - $that.offset().top,
						scroll = scrollTop / ( $that.outerHeight() * offset ),
						opacity = initialOpacity + ( scroll * ( finalOpacity - initialOpacity ) );
					opacity = opacity.toFixed(2);
					if ( invert ) {
						if( opacity >= finalOpacity ) { opacity = finalOpacity; }
						if( opacity <= initialOpacity ) { opacity = initialOpacity ;}
					} else {
						if( opacity <= finalOpacity ) { opacity = finalOpacity; }
						if( opacity >= initialOpacity ) { opacity = initialOpacity; }
					}
					$that.css({ 'opacity': opacity });
				});
			});
		},
		setClippingWrappers: function(){
			var $element = $('.eut-clipping-animation'),
				wrapper = '<div class="eut-clipping-wrapper"><div class="eut-clipping-content"></div></div>';
			if( isMobile.any() && !deviceAnimAppear ) {
				$element.removeClass('eut-clipping-animation');
			} else {
				$element.wrapInner( wrapper );
				$element.each(function(){
					var $that = $(this),
						$wrapper = $that.find('.eut-clipping-wrapper');
					if( $that.hasClass('eut-colored-clipping') ) {
						var color = $that.data('clipping-color'),
							overlay = '<div class="eut-clipping-overlay eut-bg-' + color + '"></div>';
						$(overlay).appendTo( $wrapper );
					}
				});
				this.clippingAppear();
			}
		},
		setAppearWrappers: function(){
			var $element = $('.eut-appear-animation'),
				wrapper = '<div class="eut-appear-wrapper eut-animation-wrapper"><div class="eut-appear-content"></div></div>';
			if( isMobile.any() && !deviceAnimAppear ) {
				$element.removeClass('eut-appear-animation');
			} else {
				$element.wrapInner( wrapper );
				this.animAppear();
			}
		},
		animAppear: function(){
			var $animationItem = $('.eut-appear-animation');

			if( bodyLoader || $('body').hasClass('page-template-template-full-page') || $('body').hasClass('page-template-template-pilling-page') ){
				return;
			}
			if( isMobile.any() && !deviceAnimAppear ) {
				$animationItem.removeClass('eut-appear-animation');
			} else {
				$animationItem.each(function() {
					var $that = $(this),
						timeDelay = $that.attr('data-delay');

					$that.appear(function() {
						setTimeout(function () {
							$that.addClass('eut-appear-animated');
						}, timeDelay);
					},{accX: 0, accY: -150});
				});
			}
		},
		clippingAppear: function(){
			var $clippingEl = $('.eut-clipping-animation');
			if( bodyLoader || $('body').hasClass('page-template-template-full-page') || $('body').hasClass('page-template-template-pilling-page') ){
				return;
			}
			if( isMobile.any() && !deviceAnimAppear ) {
				$clippingEl.removeClass('eut-clipping-animation');
			} else {
				$clippingEl.each(function() {
					var $that = $(this),
						timeDelay = $that.attr('data-delay');

					$that.appear(function() {
						setTimeout(function () {
							EUTHEM.pageSettings.clippingAnimated( $that );
						}, timeDelay);
					},{accX: 0, accY: -150});
				});
			}
		},
		clippingAnimated: function( $element ){
			var delay = 700,
				$overlay = $element.find( '.eut-clipping-overlay' );

			$element.addClass('eut-clipping-animated');

			if ( $element.hasClass('eut-colored-clipping') ) {
				setTimeout(function(){
					$element.addClass('eut-clipping-show-content');
				},delay);

				delay = 1400;
			}
			setTimeout(function(){
				$overlay.remove();
				$element.removeClass('eut-clipping-animation eut-clipping-animated eut-colored-clipping eut-clipping-show-content');
				EUTHEM.basicElements.animAppear();
			},delay);
		},
		bodyLoader: function(){
			var $overflow = $('#eut-loader-overflow'),
				$loader   = $('.eut-spinner'),
				$link = $('a');

			if( $overflow.length > 0 ){
				bodyLoader = true;
			} else {
				return;
			}

			if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
				window.onpageshow = function(event) {
					if (event.persisted) {
						$overflow.removeClass('eut-visible eut-hide');
						window.location.reload();
					}
				};
			} else if(navigator.userAgent.indexOf('Firefox') != -1) {
				window.onunload = function(){};
			}

			if( $overflow.hasClass('eut-page-transition') ) {
				var exclude = ['.eut-no-transition', '.eut-toggle-modal'],
					comp = new RegExp(location.host);

				$('a:not(' + exclude + ')').on('click',function(e){
					var link = this;
					if( comp.test(link.href) && link.href.split(/\?|#/)[0] != location.href.split(/\?|#/)[0] && link.target != '_blank' && link.href[0] != '#') {
						if( link.href.indexOf( '#' ) == -1 &&
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
							var newLocation = this.href;
							$overflow.addClass('eut-visible').removeClass('eut-hide');
							setTimeout(function(){
								window.location = newLocation;
							}, 600);
						}
					}
				});
			}

			var images = $('img, .eut-bg-image');
			$.each(images, function(){
				var el = $(this),
				image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
				if(image && image !== '' && image !== 'none')
					images = images.add($('<img>').attr('src', image));
				if(el.is('img'))
					images = images.add(el);
			});

			images.imagesLoaded(function(){
				setTimeout(function () {
					if( $overflow.hasClass('eut-page-transition') ) {
						$overflow.removeClass('eut-visible').addClass('eut-hide');
						setTimeout(function(){
							bodyLoader = false;
							EUTHEM.basicElements.animAppear();
							EUTHEM.pageSettings.clippingAppear();
							EUTHEM.pageSettings.animAppear();
							EUTHEM.svgAnimation.init();
							EUTHEM.basicElements.counter();
						}, 1200);
					} else {
						$loader.fadeOut(500);
						$overflow.delay(500).fadeOut(700,function(){
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
		changeOrder: function(){
			var $element = $('.eut-change-order'),
				$parent = $element.parent();
			$parent.each(function(){
				var $that = $(this),
					$column = $that.children(),
					colLength = $column.length,
					tabletArr = $.makeArray( $column.not('.eut-change-order') ),
					tabletSmArr = $.makeArray( $column.not('.eut-change-order') ),
					mobileArr = $.makeArray( $column.not('.eut-change-order') );

				$column.each(function(num,value){
					var $that = $(value);
					if( $that.hasClass('eut-change-order') ){
						var tabletOrder = $that.data('tablet-order') !== undefined && $that.data('tablet-order') <= colLength ? $that.data('tablet-order') - 1 : $that.index(),
							tabletSmOrder = $that.data('tablet-sm-order') !== undefined && $that.data('tablet-sm-order') <= colLength ? $that.data('tablet-sm-order') - 1 : $that.index(),
							mobileOrder = $that.data('mobile-order') !== undefined && $that.data('mobile-order') <= colLength ? $that.data('mobile-order') - 1 : $that.index();
						tabletArr.splice( tabletOrder, 0, value);
						tabletSmArr.splice( tabletSmOrder, 0, value);
						mobileArr.splice( mobileOrder, 0, value);
					}
				});

				$.each( tabletArr, function(i,n){
					$( this ).addClass('eut-tablet-order-' + (i + 1));
				});

				$.each( tabletSmArr, function(i,n){
					$( this ).addClass('eut-tablet-sm-order-' + (i + 1));
				});

				$.each( mobileArr, function(i,n){
					$( this ).addClass('eut-mobile-order-' + (i + 1));
				});
			});

		},
		stickyHeader : function(){
			var $header = $('#eut-header'),
				$innerHeader = $('#eut-main-header'),
				stickyType = $header.data('sticky');

			if( stickyType === 'none' || !$header.length ) return;

			var headerHeight = $header.height(),
				headerTop = $innerHeader.hasClass('eut-header-logo-top') ? $('#eut-bottom-header').offset().top : $header.offset().top,
				threshold = headerTop,
				stickyHeader = '#eut-main-header',
				thresholdBackground = $header.hasClass('eut-overlapping') || stickyType == 'scrollup' ? 0 : headerHeight,
				thresholdHeadIn = 0,
				thresholdHeadOut = headerTop + 500,
				onScrollUp = null,
				onScrollDown = null,
				stickyTop = 0,
				tolerance = {
					up : 0,
					down : 0
				};

			if( isMobile.any() ) {
				tolerance = { up : 20, down : 20 };
			}

			if( stickyType == 'scrollup' ){
				threshold = $header.outerHeight() + headerTop;
				thresholdHeadIn = headerTop + headerHeight;
				onScrollUp = scrollUpCallback;
				onScrollDown = scrollDownCallback;
			}

			if( $('body').hasClass('eut-framed') ){
				stickyTop = $('#eut-frames').data('frame-size');
			}

			if( $innerHeader.hasClass('eut-header-logo-top') ) {
				stickyHeader = '#eut-bottom-header';
			}

			$header.StickyHeader({
				stickyHeader : stickyHeader,
				thresholdSticky : threshold,
				thresholdBackground : thresholdBackground,
				thresholdHeadIn : thresholdHeadIn,
				thresholdHeadOut : thresholdHeadOut,
				stickyTop : stickyTop,
				tolerance : tolerance,
				onScrollUp : onScrollUp,
				onScrollDown : onScrollDown
			});

			function scrollUpCallback(){
				if( $('#eut-page-anchor').length ) {
					var position = $header.data('sticky-height');
					$('#eut-page-anchor').addClass('eut-go-down').removeClass('eut-go-up');
					EUTHEM.anchorMenu.moveAnchor( '#eut-page-anchor', position );
				}
			}

			function scrollDownCallback(){
				if( $('#eut-page-anchor').length ) {
					$('#eut-page-anchor').addClass('eut-go-up').removeClass('eut-go-down');
					EUTHEM.anchorMenu.moveAnchor( '#eut-page-anchor', 0 );
				}
			}
		},
		responsiveStickyHeader : function(){
			var $header = $('#eut-header'),
				$responsiveHeader = $('#eut-responsive-header'),
				$innerHeader = $('#eut-main-header'),
				sticky = $header.data('devices-sticky');

			if( sticky === 'no' || !$responsiveHeader.length ) return;

			var headerHeight = $header.height(),
				headerTop = $responsiveHeader.offset().top,
				threshold = headerTop,
				thresholdHeadIn = 0;

			$responsiveHeader.StickyHeader({
				thresholdSticky : threshold,
				thresholdHeadIn : thresholdHeadIn
			});
		},
		stickyElements: function(){
			if( $window.width() + scrollBarWidth  > tabletPortrait ) {
				EUTHEM.pageSettings.initStickyElement();
			} else {
				$stickyEl.trigger("sticky_kit:detach");
			}
		},

		initStickyElement: function(){
			$stickyEl.each(function(){
				var $that = $(this),
					paddingT = $that.css('padding-top'),
					paddingL = $that.css('padding-left'),
					paddingB = $that.css('padding-bottom'),
					paddingR = $that.css('padding-right'),
					elPadding = paddingT + ' ' + paddingR + ' ' + paddingB + ' ' + paddingL,
					offset = $that.data('sticky-offset') !== undefined ? $that.data('sticky-offset') : 0,
					headerHeight = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0,
					anchorBarHeight  = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
					topOffset = offset + headerHeight + anchorBarHeight + wpBarHeight,
					$parent = $that.parents('.eut-row').length ? $that.parents('.eut-row') : $that.parent();

				$that.stick_in_parent({
					parent: $parent,
					bottoming: true,
					inner_scrolling: false,
					offset_top: topOffset
				}).on("sticky_kit:stick", function(e) {
					$(this).css({
						'padding-top' : paddingT,
						'z-index' : 9999
					});
					this.style.setProperty('padding', elPadding, 'important');
				}).on("sticky_kit:unstick", function(e) {
					this.style.setProperty('padding', '');
				});
			});
		},
		addVideoBg: function(){
			$('.eut-yt-bg-video').each(function() {
				var $element = $(this);
				var url = $element.data("video-bg-url");
				var videoID = url.match( /[\\?&]v=([^&#]*)/ )[ 1 ];
				if( '' !== videoID ) {
					insertYouTubeVideo($element, videoID );
				}
			});
			$('.eut-html5-bg-video').each(function() {
				var $element = $(this);
				EUTHEM.pageSettings.resizeVideoBgElement( $element );
			});
			$('.eut-vimeo-bg-video').each(function() {
				var $element = $(this);
				if ("undefined" != typeof Vimeo ) {
					var videoPlayer = new Vimeo.Player( $element.attr('id') );
					videoPlayer.on('loaded', function() {
						EUTHEM.pageSettings.resizeVideoBgElement( $element );
					});
				}
			});
			function insertYouTubeVideo($element, youtubeId, counter) {
				if ("undefined" == typeof YT || "undefined" === typeof YT.Player) {
					counter = "undefined" === typeof counter ? 0 : counter;
					if (100 < counter) {
						console.warn("Too many attempts to load YouTube api");
						return;
					}
					setTimeout(function() {
						insertYouTubeVideo($element, youtubeId, counter++);
					}, 100);
					return;
				}
				var startSeconds = $element.data('video-start') !== undefined ? parseInt( $element.data('video-start') ) : 0;
				var endSeconds = $element.data('video-end') !== undefined ? parseInt( $element.data('video-end') ) : 0;
				var $container = $element.prepend('<div class="eut-bg-youtube-video"><div class="inner"></div></div>').find(".inner");
				var ytPlayer = new YT.Player($container[0], {
					width: "100%",
					height: "100%",
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
						wmode: "transparent"
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
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
								endSeconds: endSeconds
							});
						}
					}
				}
				// Resize Video
				EUTHEM.pageSettings.resizeVideoBgElement( $element );
			}
		},
		resizeVideoBg: function(){
			$videoBg.each(function(){
				EUTHEM.pageSettings.resizeVideoBgElement( $(this) );
			});
		},
		resizeVideoBgElement: function( $element ){
			var videoEl,
				videoW,
				videoH,
				marginLeft,
				marginTop,
				containerW = $element.innerWidth(),
				containerH = $element.innerHeight(),
				ratio1 = 16,
				ratio2 = 9;

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
			if( $element.hasClass('eut-yt-bg-video') || $element.hasClass('eut-vimeo-bg-video') || $element.hasClass('eut-iframe-bg-video') ) {
				videoEl = 'iframe';
			} else {
				videoEl = 'video';
			}

			$element.find( videoEl ).css({
				maxWidth: '1000%',
				width: videoEl == 'iframe' ? videoW : '',
				height: videoH
			});
		},
		removeVideoBg: function(){
			$('.eut-background-wrapper').each(function () {
				var $wrapper = $(this),
					$bgImage = $wrapper.find('.eut-bg-image'),
					$bgVideo = $wrapper.find('.eut-bg-video'),
					$bgHtml5Video = $wrapper.find('.eut-html5-bg-video'),
					$bgYtVideo = $wrapper.find('.eut-yt-bg-video'),
					$bgVimeoVideo = $wrapper.find('.eut-vimeo-bg-video'),
					$bgIFrameVideo = $wrapper.find('.eut-iframe-bg-video'),
					$bgVideoButton = $wrapper.find('.eut-bg-video-button-device');

				var bgVideoDevice = $bgVideo.data('videoDevice') !== undefined ? $bgVideo.data('videoDevice') : 'no';
				if( isMobile.any() && 'no' === bgVideoDevice) {
					$bgVideo.remove();
				} else {

					if ( $bgHtml5Video.length ) {
						var $videoElement = $wrapper.find('.eut-bg-video video');
						var canPlayVideo = false;
						$wrapper.find('.eut-bg-video source').each(function(){
							if ( $videoElement.get(0).canPlayType( $(this).attr('type') ) ) {
								canPlayVideo = true;
							}
						});
						if(canPlayVideo) {
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
		linkGoToTop: function( element, delay, space ){
			var $this = element,
				elementTop       = $this.offset().top,
				header           = $('#eut-header').length && $('#eut-main-header').is(":visible") ? true : false,
				responsiveHeader = $('#eut-responsive-header').length && $('#eut-responsive-header').is(":visible") ? true : false,
				headerHeight     = header && $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
				respHeaderH      = responsiveHeader && $('#eut-header').data('devices-sticky') == 'yes' ? $('#eut-responsive-header').outerHeight() : 0,
				topBarHeight     = $('#eut-top-bar').length ? $('#eut-top-bar').height() : 0,
				anchorBarHeight  = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
				delayAnim        = delay !== undefined ? delay : 300,
				topSpace         = space !== undefined ? space : 0,
				offset           = topBarHeight + wpBarHeight + headerHeight + respHeaderH + anchorBarHeight + topSpace;
			if( elementTop > 0 ){
				$('html, body').delay(delayAnim).animate({
					scrollTop: elementTop - offset
				}, 900, 'easeInOutCubic');
				$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
					$('html, body').stop();
				});
				return false;
			}
		},
		mainMenu: function(){
			var $mainMenu = $('#eut-header .eut-horizontal-menu ul.eut-menu');

			$('.eut-main-menu').find( 'a[href="#"]').on('click',function(e){
				e.preventDefault();
			});

			$mainMenu.superfish({
				popUpSelector: '.sub-menu',
				delay: 300,
				speed: 'fast',
				cssArrows: false,
				onBeforeShow: function(){

					var $subMenu = $(this);
					if( !$subMenu.length ) return;
					var $li = $subMenu.parent(),
						windowW = $(window).width(),
						subMenuW = $subMenu.width(),
						liOffsetL = $li.offset().left;

					if( $li.hasClass('megamenu')){
						setTimeout(function(){
							setEqualMenuColumns( $li );
						},50);
					}

					if( $li.hasClass('megamenu') && $li.css('position') == 'relative' ){
						if(subMenuW + liOffsetL > windowW) {
							var left = windowW - (subMenuW + liOffsetL);
							$subMenu.css({'left' : left});
						}
					}
					if( $('#eut-header .eut-first-level').length > 0 ){
						if( !$li.hasClass('eut-first-level') && !$li.hasClass('megamenu') ){
							var subMenuLength = $li.find('.sub-menu').length + 1,
								subMenuOffsetL = $li.parents('.eut-first-level').offset().left;
							if( (subMenuW * subMenuLength) + subMenuOffsetL > windowW) {
								$li.addClass('eut-invert');
							}
						} else if( $li.hasClass('eut-first-level') && !$li.hasClass('megamenu') && $('#eut-header').hasClass('eut-fullwidth') ){
							var menuOffsetL = $li.offset().left;
							if( subMenuW + menuOffsetL > windowW) {
								$li.addClass('eut-invert');
							}
						}
					}

					if( $('body').hasClass('eut-boxed') && ( $li.hasClass('megamenu column-3') || $li.hasClass('megamenu column-2') ) ){
						var containerW = $('#eut-theme-wrapper').width(),
							containerL = $('#eut-theme-wrapper').offset().left,
							positionL = 0;

						if( subMenuW + liOffsetL > containerW + containerL ){
							positionL = (containerW + containerL) - (subMenuW + liOffsetL);
						}

						$subMenu.css({
							'left' : positionL
						});
					}
				},
				onHide: function(){
					var $subMenu = $(this),
						$li = $subMenu.parent();
					$li.removeClass('eut-invert');

					if( $li.hasClass('megamenu')){
						removeEqualMenuColumns( $li );
					}
				}
			});

			function setEqualMenuColumns( $li ) {
				var $subMenu = $li.children('ul'),
					$column = $subMenu.children('li'),
					maxHeight = 0;
				$column.each(function(){
					var columnH = $(this).outerHeight();
					if( columnH >= maxHeight ) {
						maxHeight = columnH;
					}
				});
				$column.css({ 'height' : maxHeight });
			}

			function removeEqualMenuColumns( $li ) {
				var $subMenu = $li.children('ul'),
					$column = $subMenu.children('li');
				$column.css({ 'height' : '' });
			}

		},
		columnEffect: function(){
			var $parallaxColumn = $('.eut-parallax-effect'),
				$section = $parallaxColumn.parents('.eut-section');

			$parallaxColumn.each(function(){
				var $that = $(this),
					parallaxEffect = $that.data('parallax-effect'),
					tabletL = $that.data('tablet-landscape-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					tabletP = $that.data('tablet-portrait-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					mobileL = $that.data('mobile-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					$section = $that.parents('.eut-section');

				imagesLoaded( $section, function() {
					$that.paraller({
						tabletL : [tabletLandscape, tabletL],
						tabletP : [tabletPortrait, tabletP],
						mobileL : [mobileScreen, mobileL]
					});
				});
			});
		},
		eutModal: function(){

			var $button       = $('.eut-toggle-modal'),
				$overlay      = $('<div id="eut-modal-overlay" class="eut-body-overlay"></div>'),
				$closeBtn     = $('<div class="eut-close-modal"><i class="eut-icon-close"></i></div>'),
				$themeWrapper = $('#eut-theme-wrapper'),
				content;

			$button.on('click',function(e){
				content = $(this).attr('href');
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );
					$closeBtn.appendTo( $(content) );

					$(content).addClass('prepare-anim');

					openModal();

					$closeBtn.on('click',function(e){
						e.preventDefault();
						closeModal();
					});

					$(content).on('click',function(e){
						if ( !$('.eut-modal-item').is(e.target) && $('.eut-modal-item').has(e.target).length === 0 ) {
							e.preventDefault();
							closeModal();
						}
					});
				}
			});

			// Open Modal
			function openModal() {
				$overlay.fadeIn(function(){
					$(content).addClass('animate');

					// Search Modal
					if( $(content).is('#eut-search-modal') ){
						var $searchContent = $('#eut-search-modal'),
							$searchInput = $searchContent.find('.eut-search-textfield');

						$searchInput.val('');
						setTimeout(function(){
							$searchInput.focus();
						},600);
					}
				});
			}

			// Close Modal
			function closeModal() {
				$(content).removeClass('animate mobile');
				setTimeout(function(){
					$overlay.fadeOut(function(){
						$(content).removeClass('prepare-anim');
						$overlay.remove();
						$closeBtn.remove();
					});
				},600);
			}

			$(document).on('keyup',function(evt) {
				if (evt.keyCode == 27 && $(content).hasClass('animate') ) {
					closeModal();
				}
			});

		},
		gotoFirstSection: function(){
			var $selector    = $('#eut-feature-section .eut-goto-section'),
				$nextSection = $('#eut-content');

			$selector.on('click',function(){
				$('html,body').animate({
					scrollTop: $nextSection.offset().top
				}, 1000);
				return false;
			});
		},
		bgLoader: function() {

			var $selector = $('#eut-header .eut-bg-image, #eut-content .eut-bg-image, #eut-footer .eut-bg-image, .eut-navigation-bar .eut-bg-image, #eut-sidearea .eut-bg-image');
			$selector.each(function () {
				var $selector = $(this);
				if( $selector.data('loader') == 'yes' ){
					EUTHEM.pageSettings.addSpinner( $selector );
				}
				function imageUrl(input) {
					return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
				}
				var image = new Image(),
					$that = $(this);
				image.src = imageUrl($that.css('background-image'));
				image.onload = function () {
					if( $selector.data('loader') == 'yes' ){
						EUTHEM.pageSettings.removeSpinner( $selector );
					} else {
						$that.addClass('show');
					}
				};
			});
		},
		addSpinner: function( $selector ){
			var $section = $selector;
			$(spinner).appendTo( $section.parent() );
		},
		removeSpinner: function( $selector ){

			var $section   = $selector.parent(),
				$spinner   = $section.find('.eut-spinner');

			$spinner.fadeOut(600,function(){
				$selector.addClass('show');
				$spinner.remove();
			});
		},
		fitVid: function(){
			$('.eut-video, .eut-media').fitVids();
			$('iframe[src*="youtube"]').parent(":not(.eut-bg-youtube-video)").fitVids();
			$('iframe[src*="vimeo"]').parent().fitVids();
		},
		hiddenArea: function( section, btn ){
			var $btn          = $('.eut-toggle-hiddenarea'),
				$themeWrapper = $('#eut-theme-wrapper'),
				$closeBtn     = $('.eut-hidden-area').find('.eut-close-btn'),
				startTimer = false,
				count = -1,
				itemLength = 0,
				counter,
				areaWidth     = 0,
				content,
				$overlay;

			$btn.on('click',function(e){
				content = $(this).attr('href');
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();
					var overlayId = content.replace('#','');

					$(content).addClass('prepare-anim');
					$overlay = $('<div id="' + overlayId + '-overlay" class="eut-body-overlay"></div>');

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );

					// Calculate Width
					areaWidth = hiddenAreaWidth( content );
					$(window).smartresize(function(){
						areaWidth = hiddenAreaWidth( content );
					});

					if( $(content).hasClass('open') ) {
						closeHiddenArea();
					} else {
						openHiddenArea();
					}

					// For One Page
					var $link = $(content).find('a[href*="#"]:not( [href="#"] )');
					$link.on('click',function(){
						var target = $(this.hash),
							targetHash = this.hash,
							dataValue = this.hash.replace('#','');
						if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') || target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
							closeHiddenArea();
						}
						// For Fullpage Scrolling
						if( $('[data-anchor="' + dataValue + '"]').length ){
							closeHiddenArea();
						}
					});

				}
			});

			$closeBtn.on('click',function(){
				closeHiddenArea();
			});

			// Open Hidden Area
			function openHiddenArea() {
				$overlay.fadeIn(function(){
					$('body').scrollTop( 0 );
					$(content).addClass('open');
					$(this).on('click',function(){
						closeHiddenArea();
					});
				});
			}
			// Close Hidden Area
			function closeHiddenArea() {
				$themeWrapper.css({ 'height' : 'auto' });
				$(content).removeClass('open');
				$overlay.fadeOut(function(){
					$overlay.remove();
					$(content).removeClass('prepare-anim');
				});
			}

				// Calculate Area Width
			function hiddenAreaWidth( area ){
				var $area = $(area),
					windowWidth  = $(window).width();

				if( $(window).width() + scrollBarWidth <= mobileScreen ) {
					$(area).css({ 'width' : windowWidth + 30 });
				} else {
					if( $area.hasClass('eut-large-width') ) {
						$(area).css({ 'width' : Math.max(550, (windowWidth / 2)) });
					} else if( $area.hasClass('eut-medium-width') ) {
						$(area).css({ 'width' : Math.max(550, (windowWidth / 3)) });
					} else {
						$(area).css({ 'width' : Math.max(550, (windowWidth / 4)) });
					}
				}

				return areaWidth;
			}

		},
		hiddenAreaHeight: function( area ){
			if( $(area).length === 0 ) return;

			var windowWidth      = $(window).width(),
				windowHeight     = $(window).height(),
				hiddenAreaHeight = $(area).find('.eut-hiddenarea-content').outerHeight() + 200,
				$themeWrapper    = $('#eut-theme-wrapper'),
				$scroller        = $(area).find('.eut-scroller'),
				$buttonWrapper   = $(area).find('.eut-buttons-wrapper'),
				btnWrapperHeight = $buttonWrapper.length ? $buttonWrapper.height() : 0,
				sideHeight       = 0;

			if( hiddenAreaHeight > windowHeight ){
				sideHeight = hiddenAreaHeight;
			} else {
				sideHeight = windowHeight;
			}

			if( $(window).width() + scrollBarWidth <= mobileScreen ) {
				$scroller.css({ 'height' : 'auto' });
				$(area).css({ 'position' : 'absolute','height' : sideHeight });
				$themeWrapper.css({ 'height' : sideHeight, 'overflow' : 'hidden' });
			} else {
				$scroller.css({ 'height' : windowHeight - btnWrapperHeight - 150 });
				$themeWrapper.css({ 'height' : '', 'overflow' : '' });
			}
		},
		sideArea: function(){
			var $btn          = $('.eut-toggle-sidearea'),
				$themeWrapper = $('#eut-theme-wrapper'),
				content;

			$btn.on('click',function(e){
				content = $(this).attr('href');
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();

					$(content).addClass('eut-active-sidearea');
					if( !$themeWrapper.hasClass('eut-side-area-open') ) {
						EUTHEM.pageSettings.openSideArea();
					} else {
						EUTHEM.pageSettings.closeSideArea();
					}
				}
			});

			$(document).on('keyup',function(evt) {
				if (evt.keyCode == 27) {
					EUTHEM.pageSettings.closeSideArea();
				}
			});

			$('.eut-sidearea-close-btn').on('click',function(e){
				e.preventDefault();
				EUTHEM.pageSettings.closeSideArea();
			});
		},
		openSideArea: function(){

			if ( !$('body').hasClass('eut-side-area-open') ) {
				$('body').addClass('eut-side-area-open');
				var $themeWrapper = $('#eut-theme-wrapper'),
					wrapperH      = $(window).height(),
					topP          = $(window).scrollTop(),
					$btn          = $('.eut-toggle-sidearea'),
					$closeBtn     = $('.eut-sidearea-close-btn'),
					$sideArea     = $('.eut-active-sidearea');

				$btn.addClass('eut-hide');
				setTimeout(function(){
					$closeBtn.removeClass('eut-hide');
				},800);

				if ( $.fn.StickyHeader && 'none' != $('#eut-header').data('sticky') ) {
					$('#eut-header').data('eut_StickyHeader').unbindEvents();
				}

				$sideArea.addClass('eut-show').css({
					'padding-top' : (wrapperH * 20)/100
				});
				$('.eut-wrapper-inner').css({
					'top' : -topP,
					'position' : 'relative'
				});
				$themeWrapper.addClass('eut-with-side-area').css({
					'height' : wrapperH
				}).addClass('eut-side-area-open eut-side-area-shadow');
			}
		},
		closeSideArea: function(){

			if ( $('body').hasClass('eut-side-area-open') ) {
				var $themeWrapper = $('#eut-theme-wrapper'),
					topP          = Math.abs( parseInt( $('.eut-wrapper-inner').css('top') ) ),
					$btn          = $('.eut-toggle-sidearea'),
					$closeBtn     = $('.eut-sidearea-close-btn'),
					$sideArea     = $('.eut-active-sidearea');

				$themeWrapper.removeClass('eut-side-area-open');

				$closeBtn.addClass('eut-hide');

				setTimeout(function(){
					$themeWrapper.css({
						'height' : ''
					}).removeClass('eut-with-side-area eut-side-area-shadow');
					$('.eut-wrapper-inner').css({
						'top' : '',
						'position' : ''
					});
					$('html, body').scrollTop( topP );
					if ( $.fn.StickyHeader && 'none' != $('#eut-header').data('sticky') ) {
						$('#eut-header').data('eut_StickyHeader').bindEvents();
					}
					$('body').removeClass('eut-side-area-open');
					$btn.removeClass('eut-hide');
					$sideArea.removeClass('eut-show');
				},800);
			}
		},
		backtoTop: function() {
			var selectors  = {
				topBtn     : '.eut-back-top',
				dividerBtn : '.eut-divider-backtotop',
				topLink    : 'a[href="#eut-goto-header"]'
				},
				footerBarHeight = $('.eut-footer-bar.eut-fullwidth').length ? $('.eut-footer-bar.eut-fullwidth').outerHeight() : 0;

				if( $( selectors.topBtn ).length ) {

					$(window).on('scroll', function() {
						var scroll = $(this).scrollTop(),
							$topBtn = $( selectors.topBtn );

						if (scroll > 600) {
							$topBtn.addClass('show');
						} else {
							$topBtn.removeClass('show');
						}

						if ( scroll > 600 && !$('body').hasClass('eut-side-area-open') ) {
							$('.eut-sidearea-btn').addClass('eut-push-up');
						} else if( scroll < 600 && !$('body').hasClass('eut-side-area-open') ) {
							$('.eut-sidearea-btn').removeClass('eut-push-up');
						}
					});
				}

			$.each(selectors, function(key, value){
				$(value).on('click', function(e){
					e.preventDefault();
					var scrollTop = Math.abs($(window).scrollTop()) / 2,
						speed = scrollTop < 1000 ? 1000 : scrollTop;

					if( $(this).data('speed') != undefined && $(this).data('speed') != 'height-based' ) {
						speed = $(this).data('speed');
					}

					// Remove Scroll Up Classes
					if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
						$('#eut-header').data('eut_StickyHeader').destroyScrollUp();
					}
					$('html, body').animate({scrollTop: 0}, speed, 'easeInOutCubic');
					$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
						$('html, body').stop();
					});
				});
			});

		},
		animatedBg: function(){
			var $section = $('.eut-section');

			$section.each(function(){
				var $this = $(this);

				if( $this.hasClass('eut-bg-animated') ) {
					zoomBg( $this );
				} else if( $this.hasClass('eut-bg-horizontal') ) {
					horizontalBg( $this );
				}
			});

			function zoomBg( $this ){
				$this.mouseenter(function() {
					$this.addClass('zoom');
				});
				$this.mouseleave(function() {
					$this.removeClass('zoom');
				});
			}

			function horizontalBg( $this ){
				var bgPosition = 0;
				setInterval(function(){
					bgPosition++;
					$this.find('.eut-bg-image').css({ 'background-position' : bgPosition+'px center', 'background-repeat' : 'repeat' });
				},75);
			}
		},
		onePageSettings: function(){

			// On Scroll Event
			$(window).on('scroll.eut_onepage', function(){
				EUTHEM.pageSettings.onePageMenu();
			});

			$('a[href*="#"]:not( [href="#"] )').on('click', function(e) {
				var headerHeight    = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0,
					anchorBarHeight = $('.eut-anchor-menu').length && !$('.eut-anchor-menu').hasClass('eut-anchor-responsive') ? $('.eut-anchor-menu').outerHeight() : 0,
					target          = $(this.hash),
					targetHash      = this.hash;

				// Remove Scroll Up Classes
				if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
					$('#eut-header').data('eut_StickyHeader').destroyScrollUp();
				}

				if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-inner-section') || target.hasClass('eut-bookmark') ) ) {
					$('html,body').animate({
						scrollTop: target.offset().top - headerHeight - anchorBarHeight + 1
					}, 1000);
					return false;
				}
				if ( target.length && ( target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
					var tabLink =  $('.eut-tab-link[data-rel="' + targetHash + '"]:visible');
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
		onePageMenu: function(){
			var $section = $('#eut-main-content .eut-section[id], #eut-main-content .eut-inner-section[id]');
			if ( $section.length === 0 ) return;

			var sideHeader     = $('#eut-main-header').hasClass('eut-header-side') ? true : false,
				headerHeight   = $('#eut-header').attr('data-sticky-header') != 'none' && !sideHeader ? $('#eut-main-header').outerHeight() : 0,
				anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
				offsetTop      = headerHeight + anchorBarHeight + wpBarHeight,
				scroll         = $(window).scrollTop();

			$section.each(function(){
				var $that         = $(this),
					currentId     = $that.attr('id'),
					sectionOffset = $that.offset().top - offsetTop;

				if (sectionOffset <= scroll && sectionOffset + $that.outerHeight() > scroll ) {
					$('a[href*="#' + currentId + '"]').parent().addClass('active');
				}
				else{
					$('a[href*="#' + currentId + '"]').parent().removeClass("active");
				}

			});
		},
		showList: function(){
			var $list = $('.eut-show-list');
			$list.ShowListItems();
			// if ( isMobile.any() ) {
			// 	$list.data('eut_ShowListItems').destroy();
			// };
		},
		fixedFooter: function(){
			var $footer      = $('#eut-footer'),
				sticky       = $footer.data('sticky-footer'),
				prevSection  = $footer.prev(),
				prevMargin = parseInt( prevSection.css('margin-bottom') ),
				delay;

			if( !$footer.length || sticky != 'yes' || isMobile.any() ) return;

			// On window events
			$( window ).on( 'scroll', function(){
				update();
			});
			$(window).on('resize',resizer);

			function resizer(){
				window.clearTimeout(delay);
				delay = window.setTimeout(function() {
					$footer.prev().css( 'margin-bottom','' );
					prevMargin = parseInt( prevSection.css('margin-bottom') );
					update();
				}, 900);
			}

			update();

			function update(){
				var windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					footerHeight = $footer.outerHeight(),
					margin       = footerHeight + prevMargin;

				if( ( windowWidth + scrollBarWidth <= tabletLandscape ) || ( footerHeight > windowHeight ) ) {
					$footer.removeClass('eut-fixed-footer').prev().css( 'margin-bottom','' );
				} else {
					$footer.addClass('eut-fixed-footer').prev().css( 'margin-bottom',margin );
				}
			}

		},
		productImageParallax: function(){
			$('#eut-product-feature-image .eut-product-parallax-image img').paraller({
				wrapper : '.eut-product-area-wrapper',
				effect : 'mouse-move-x',
				sensitive : 'normal',
				invert : true
			});
		},
		lightGallery: function(){
			var thumbnail = false;
			if( 1 == crocal_eutf_main_data.woo_popup_thumbs ) {
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
					$(this).attr({"target" : "_blank"});
				});
			} else {
				$('.eut-video-popup').lightGallery({
					selector: 'this',
					thumbnail: false,
					hash: false,
				});
			}

			if( 1 == crocal_eutf_main_data.wp_gallery_popup ) {
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
		lightBox: function(){
			//Inline Modal Popup
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
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
							this.container.css({'opacity':0});
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
							if( $content.find('.eut-isotope').length ) {
								setTimeout(function(){
									EUTHEM.isotope.relayout();
								},100);
							}
							if( $content.find('.owl-carousel').length ) {
								setTimeout(function(){
									$content.find('.owl-carousel').each(function(){
										var owl = $(this).data('owlCarousel');
										owl.onResize();
									});
								},300);
							}
							if( $content.find('.eut-map').length ) {
								$('.eut-map').trigger( "eut_redraw_map" );
							}
						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});
			//VIDEOS
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
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					}
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
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
							if ( $content.find('video').length ) {
								setTimeout(function(){
									$content.find('video')[0].play();
								},500);
							}
						},
						beforeClose: function() {
							if ( this.wrap.find('video').length ) {
								this.wrap.find('video')[0].load();
							}
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});

			function addSpinner( mfpWrap ){
				$(spinner).appendTo( mfpWrap );
			}

			function removeSpinner( spinner, content ){
				setTimeout(function(){
					spinner.fadeOut(1000, function(){
						content.animate({'opacity':1},600);
						$('.eut-modal-popup').trigger( 'eut_open_modal' );
						$(spinner).remove();
					});
				}, 700);
			}
		},
		socialShareLinks: function(){
			$(document).on('click','.eut-social-share-facebook',function(e){
				e.preventDefault();
				window.open( 'https://www.facebook.com/sharer/sharer.php?u=' + $(this).attr('href'), "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-twitter',function(e){
				e.preventDefault();
				window.open( 'http://twitter.com/intent/tweet?text=' + encodeURIComponent( $(this).attr('title') ) + ' ' + $(this).attr('href'), "twitterWindow", "height=450,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-linkedin',function(e){
				e.preventDefault();
				window.open( 'http://www.linkedin.com/shareArticle?mini=true&url=' + $(this).attr('href') + '&title=' + encodeURIComponent( $(this).attr('title') ), "linkedinWindow", "height=500,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-pinterest',function(e){
				e.preventDefault();
				window.open( 'http://pinterest.com/pin/create/button/?url=' + $(this).attr('href') + '&media=' + $(this).data('pin-img') + '&description=' + encodeURIComponent( $(this).attr('title') ), "pinterestWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-reddit',function(e){
				e.preventDefault();
				window.open( '//www.reddit.com/submit?url=' + $(this).attr('href'), "redditWindow", "height=600,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1" );
				return false;
			});
			$(document).on('click','.eut-social-share-tumblr',function(e){
				e.preventDefault();
				window.open( '//www.tumblr.com/share/link?url=' + $(this).attr('href') + '&name=' + encodeURIComponent( $(this).attr('title') ) , "tumblrWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-like-counter-link',function(e){
				e.preventDefault();
				var link = $(this);
				var id = link.data('post-id'),
					counter = link.parent().find('.eut-like-counter'),
					icon = link.find('i');

				var dataParams = {
					action:'crocal_eutf_likes_callback',
					eut_likes_id: id,
					_eutf_nonce: crocal_eutf_main_data.nonce_likes
				};

				$.post( crocal_eutf_main_data.ajaxurl, dataParams , function( response ) {
					if ( '-1' != response ) {
						if( 'active' == response.status ){
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
		}
	};

	// # Basic Elements
	// ============================================================================= //
	EUTHEM.basicElements = {
		init: function(){
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
		pieChart: function(){

			$('.eut-chart-number').each(function() {
				var $element  = $(this),
					delay     = $element.parent().data('delay') !== '' ? parseInt( $element.parent().data('delay') ) : 0,
					size      = $element.data('pie-size'),
					chartSize = '130';
				if( size == 'small' ){
					chartSize = '100';
				}
				if( size == 'large' ){
					chartSize = '160';
				}

				$element.css({ 'width' : chartSize, 'height' : chartSize, 'line-height' : chartSize + 'px' });

				if( $element.parents('.eut-modal-element').length ){
					$('.eut-modal-popup').on( 'eut_open_modal', function(){
						EUTHEM.basicElements.pieChartInit( $element, chartSize );
					});
				} else {
					$element.appear(function() {
						setTimeout(function () {
							EUTHEM.basicElements.pieChartInit( $element, chartSize );
						}, delay);
					});
				}
			});

		},
		pieChartInit: function( $element, size ){

			var activeColor = $element.data('pie-active-color') !== '' ? $element.data('pie-active-color') : 'rgba(0,0,0,1)',
				pieColor    = $element.data('pie-color') !== '' ? $element.data('pie-color') : 'rgba(0,0,0,0.1)',
				pieLineCap  = $element.data('pie-line-cap') !== '' ? $element.data('pie-line-cap') : 'round',
				lineSize    = $element.data('pie-line-size') !== '' ? $element.data('pie-line-size') : '6',
				chartSize   = size;


			$element.easyPieChart({
				barColor: activeColor,
				trackColor: pieColor,
				scaleColor: false,
				lineCap: pieLineCap,
				lineWidth: lineSize,
				animate: 1500,
				size: chartSize
			});
		},
		progressBars: function(){
			$('.eut-progress-bar').each(function() {

				var $element  = $(this);
				if( $element.parents('.eut-modal-element').length ){
					$('.eut-modal-popup').on( 'eut_open_modal', function(){
						EUTHEM.basicElements.progressBarsInit( $element );
					});
				} else {
					$element.appear(function() {
						EUTHEM.basicElements.progressBarsInit( $element );
					});
				}
			});
		},
		progressBarsInit: function( $element ){
			var val = $element.attr('data-value'),
				percentage = $('<span class="eut-percentage">'+ val + '%'+'</span>');

			$element.find('.eut-bar-line').animate({ width: val + '%' }, 1600);
			if( $element.parent().hasClass('eut-style-1') ) {
				percentage.appendTo($element.find('.eut-bar')).animate({ left: val + '%' }, 1600);
			} else {
				percentage.appendTo($element.find('.eut-bar-title'));
			}
		},
		counter: function(){
			if( bodyLoader === true ){
				return;
			}
			var selector = '.eut-counter-item span';
			$(selector).each(function(i){
				var elements = $(selector)[i],
					thousandsSeparator = $(this).attr('data-thousands-separator') !== '' ? $(this).attr('data-thousands-separator') : ',';
				$(elements).attr('id','eut-counter-' + i );
				var delay = $(this).parents('.eut-counter').attr('data-delay') !== '' ? parseInt( $(this).parents('.eut-counter').attr('data-delay') ) : 200,
					options = {
						useEasing    : true,
						useGrouping  : true,
						separator    : $(this).attr('data-thousands-separator-vis') !== 'yes' ? thousandsSeparator : '',
						decimal      : $(this).attr('data-decimal-separator') !== '' ? $(this).attr('data-decimal-separator') : '.',
						prefix       : $(this).attr('data-prefix') !== '' ? $(this).attr('data-prefix') : '',
						suffix       : $(this).attr('data-suffix') !== '' ? $(this).attr('data-suffix') : ''
					},
					counter = new CountUp( $(this).attr('id') , $(this).attr('data-start-val'), $(this).attr('data-end-val'), $(this).attr('data-decimal-points'), 2.5, options);
				$(this).appear(function() {
					setTimeout(function () {
						counter.start();
					}, delay);
				});
			});
		},
		slider: function(){

			var $element = $('#eut-main-content .eut-slider-element, #eut-single-media .eut-slider-element');

			$element.each(function(){
				var $slider = $(this),
					$nextNav = $slider.parents('.eut-slider').find('.eut-carousel-next'),
					$prevNav = $slider.parents('.eut-slider').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $slider.attr('data-slider-speed') ) ) ? parseInt( $slider.attr('data-slider-speed') ) : 3000,
					transition = $slider.attr('data-slider-transition'),
					loop = $slider.attr('data-slider-loop') != 'no' ? true : false,
					autoPlay = $slider.attr('data-slider-autoplay') != 'no' ? true : false,
					autoHeight = $slider.attr('data-slider-autoheight') == 'yes' ? true : false,
					paginColor = $slider.attr('data-pagination-color') !== undefined ? 'eut-carousel-pagination eut-dots-' + $slider.attr('data-pagination-color') : 'eut-carousel-pagination',
					pagination = $slider.attr('data-pagination') != 'no' ? true : false,
					animateOut = false,
					animateIn = false;

				// Slider Trantition
				if( $slider.parents('.eut-slider').hasClass('eut-layout-2') || 'fade' == transition ){
					animateOut = 'carousel-fade-out';
					animateIn = 'carousel-fade-in';
				}

				if ( $slider.find('.eut-slider-item').length == 1 ) {
					loop = false;
				}

				// Slider Init
				$slider.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : false,
					smartSpeed : 500,
					dots : pagination,
					animateOut : animateOut,
					animateIn : animateIn,
					autoHeight : autoHeight,
					dotsClass : paginColor,
					itemClass : 'eut-slider-item-wrapper'
				});

				$slider.parents('.eut-slider').css('visibility','visible');

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
		testimonial: function(){

			var $element = $('.eut-testimonial.eut-carousel-element');

			$element.each(function(){
				var $testimonial = $(this),
					sliderSpeed = ( parseInt( $testimonial.attr('data-slider-speed') ) ) ? parseInt( $testimonial.attr('data-slider-speed') ) : 3000,
					pagination = $testimonial.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $testimonial.attr('data-pagination-speed') ) ) ? parseInt( $testimonial.attr('data-pagination-speed') ) : 400,
					transition = $testimonial.attr('data-slider-transition'),
					autoHeight = $testimonial.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $testimonial.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $testimonial.attr('data-slider-pause') == 'yes' ? true : false,
					loop = true,
					animateOut = false,
					animateIn = false;

				// Testimonial Trantition
				if( $testimonial.hasClass('eut-layout-2') || 'fade' == transition ){
					animateOut = 'carousel-fade-out';
					animateIn = 'carousel-fade-in';
				}
				if ( $testimonial.find('.eut-testimonial-element').length == 1 ) {
					loop = false;
				}

				// Testimonial Init
				$testimonial.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					dotsClass : 'eut-carousel-pagination',
					animateOut : animateOut,
					animateIn : animateIn,
					autoHeight : autoHeight,
					itemClass : 'eut-testimonial-item-wrapper'
				});

				$testimonial.css('visibility','visible');

			});
		},
		flexibleCarousel: function(){

			var $element = $('.eut-flexible-carousel-element');

			$element.each(function(){

				var $carousel = $(this),
					$nextNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-next'),
					$prevNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000,
					pagination = $carousel.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400,
					autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false,
					loop = true,
					itemNum = parseInt( $carousel.attr('data-items')),
					tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 4,
					tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 2,
					mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1,
					gap = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') ? 30 : 0,
					padding = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') ? 30 : 0;

				if ( $carousel.find('.eut-flexible-carousel-element').length == 1 ) {
					loop = false;
				}
				// Carousel Init
				$carousel.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					dotsClass : 'eut-carousel-pagination',
					responsive : {
						0 : {
							items : mobileNum
						},
						768 : {
							items : tabletPortraitNum
						},
						1024 : {
							items : tabletLandscapeNum
						},
						1200 : {
							items : itemNum
						}
					},
					margin : gap,
					stagePadding : padding,
					autoHeight : autoHeight,
					itemClass : 'eut-carousel-item-wrapper'
				});

				$carousel.css('visibility','visible');

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
		carousel: function(){

			var $element = $('.eut-carousel-element');

			$element.each(function(){
				var $carousel = $(this),
					$nextNav = $carousel.parents('.eut-carousel').find('.eut-carousel-next'),
					$prevNav = $carousel.parents('.eut-carousel').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000,
					pagination = $carousel.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400,
					autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false,
					loop = $carousel.attr('data-slider-loop') != 'no' ? true : false,
					itemNum = parseInt( $carousel.attr('data-items')),
					tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 3,
					tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 3,
					mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1,
					gap = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0,
					padding = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0;

				if ( $carousel.find('.eut-carousel-item').length == 1 ) {
					loop = false;
				}

				// Carousel Init
				$carousel.owlCarousel({
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					dotsClass : 'eut-carousel-pagination',
					responsive : {
						0 : {
							items : mobileNum
						},
						768 : {
							items : tabletPortraitNum
						},
						1024 : {
							items : tabletLandscapeNum
						},
						1200 : {
							items : itemNum
						}
					},
					margin : gap,
					stagePadding : padding,
					itemClass : 'eut-carousel-item-wrapper'
				});

				$carousel.css('visibility','visible');

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
		advancedCarousel: function(){

			var $element = $('.eut-advanced-carousel');

			$element.each(function(){
				var $carousel = $(this),
					sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000,
					pagination = $carousel.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400,
					autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false,
					loop = $carousel.attr('data-slider-loop') != 'no' ? true : false,
					gap = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0,
					largeScreenStagePadding = !isNaN( $carousel.data('stage-padding-large-screen') ) ? Math.abs( $carousel.data('stage-padding-large-screen') ) : 0,
					stagePadding = !isNaN( $carousel.data('stage-padding') ) ? Math.abs( $carousel.data('stage-padding') ) : 0,
					tabletLandscapeStagePadding = !isNaN( $carousel.data('stage-padding-tablet-landscape') ) ? Math.abs( $carousel.data('stage-padding-tablet-landscape') ) : 0,
					tabletPortraitStagePadding = !isNaN( $carousel.data('stage-padding-tablet-portrait') ) ? Math.abs( $carousel.data('stage-padding-tablet-portrait') ) : 0,
					mobileStagePadding = !isNaN( $carousel.data('stage-padding-mobile') ) ? Math.abs( $carousel.data('stage-padding-mobile') ) : 0;

				if ( $carousel.find('.eut-carousel-item').length == 1 ) {
					loop = false;
				}

				// Carousel Init
				$carousel.owlCarousel({
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					dotsClass : 'eut-carousel-pagination',
					items : 1,
					margin : gap,
					responsive:{
						0:{
							items:1,
							stagePadding: mobileStagePadding
						},
						768:{
							items:1,
							stagePadding: tabletPortraitStagePadding
						},
						1024:{
							items:1,
							stagePadding: tabletLandscapeStagePadding
						},
						1200:{
							items:1,
							stagePadding: stagePadding
						},
						2000:{
							items:1,
							stagePadding: largeScreenStagePadding
						}
					},
					itemClass : 'eut-carousel-item-wrapper'
				});

				$carousel.css('visibility','visible');

			});
		},
		advancedPromo: function(){
			var $item = $('.eut-expandable-info');
			$item.each(function(){
				var $that         = $(this),
					$wrapper      = $that.parents('.eut-section'),
					$content      = $that.find('.eut-expandable-info-content'),
					paddingTop    = parseInt( $wrapper.css('padding-top') ),
					paddingBottom = parseInt( $wrapper.css('padding-bottom') );

				$wrapper.addClass('eut-pointer-cursor');
				$wrapper.on('click',function(){

					var headerHeight   = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
						fieldBarHeight = $('.eut-fields-bar').length ? $('.eut-fields-bar').outerHeight() : 0,
						offset         = $(this).offset().top,
						distance       = offset - ( headerHeight + fieldBarHeight );

					if( $content.is(":visible") ){
						$content.slideUp( 600, function(){
							$content.removeClass('show');
						});
					} else {

						$('html,body').animate({
							scrollTop: distance
						}, 600,function(){
							$content.slideDown( function(){
								$content.addClass('show');
								return;
							});
						});
					}
				});
				$wrapper.mouseenter(function() {
					$(this).css({ 'padding-top' : paddingTop + 40, 'padding-bottom' : paddingBottom + 40 });
				});
				$wrapper.mouseleave(function() {
					$(this).css({ 'padding-top' : paddingTop, 'padding-bottom' : paddingBottom });
				});
			});
		},
		doubleImageText: function(){
			var $el = $('.eut-double-image-text'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		portfolioParallax: function(){
			var $el = $('.eut-portfolio-crocal-style'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		teamParallax: function(){
			var $el = $('.eut-team.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		testimonialParallax: function(){
			var $el = $('.eut-testimonial.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		iconBox: function(){
			var $iconBox = $('.eut-box-icon.eut-advanced-hover');
			if( isMobile.any() ) {
				$iconBox.css({'visibility' : 'visible'});
				return false;
			}
			$iconBox.each(function(){
				var $that = $(this),
					$text = $that.find('p'),
					$column = $that.parents('.eut-column'),
					space = 0,
					resize = false;

				setup();
				$(window).smartresize(setup);

				function updateParams(){
					space = $text.outerHeight();
				}

				function resetIcon(){
					$that.css({ 'top' : '' });
					$text.css({ 'opacity' : 1, 'bottom' : '' });
				}

				function setup(){
					if(!resize){
						resize = true;

						resetIcon();
						updateParams();

						$column.css({ 'overflow' : 'hidden' });
						$that.css({ 'top' : space, 'visibility' : 'visible' });
						$text.css({ 'opacity' : 0, 'position' : 'relative', 'bottom' : '-120%' });

						resize = true;
					}
				}

				$column.hover(function(){
					$that.stop( true, true ).animate({
						'top' : 0
					},400, 'easeOutBack');
					$text.stop( true, true ).delay( 100 ).animate({
						'opacity' : 1,
						'bottom' : 0
					},600, 'easeOutBack');
				},function(){
					$that.stop( true, true ).animate({
						'top' : space
					},500, 'easeOutBack');
					$text.stop( true, true ).animate({
						'opacity' : 0,
						'bottom' : '-120%'
					},400, 'easeOutBack');
				});

			});

		},
		messageBox: function(){
			var infoMessage = $('.eut-message'),
			closeBtn = infoMessage.find($('.eut-close'));
			closeBtn.on( 'click', function() {
				$(this).parent().slideUp(150);
			});
		},
		wooProduct: function(){
			var $item   = $('.eut-product-item'),
				$addBtn = $item.find('.add_to_cart_button');
			$addBtn.on('click',function(){
				$(this).parents('.eut-product-item').addClass('eut-product-added');
			});
		},
		animAppear: function(){
			if( bodyLoader || $('body').hasClass('page-template-template-full-page') ){
				return;
			}
			if( isMobile.any() && !deviceAnimAppear ) {
				$('.eut-animated-item').css('opacity',1);
			} else {
				$('.eut-animated-item').each(function() {
					var $that = $(this),
						timeDelay = $that.attr('data-delay');

					if( $that.parents('.eut-clipping-animation').length ) return;

					$that.appear(function() {
						setTimeout(function () {
							$that.addClass('eut-animated');
						}, timeDelay);
					},{accX: 0, accY: -150});
				});
			}
		},
		htmlVideoPlayWhenAppear: function(){
			var $video = $('.eut-embed-video');
			$video.each(function(){
				var $that = $(this);
				$that[0].pause();
				$that.appear(function(){
					if( $that[0].autoplay ){
						$that[0].play();
					}
				},{accX: 0, accY: -150});
			});
		},
		accordionToggle: function(){
			$('.eut-accordion-wrapper.eut-action-toggle').on('click', '.eut-title-wrapper', function(){
				var $that = $(this),
				gototop      = $that.parents('.eut-accordion').attr('data-gototop') == 'yes' ? true : false;

				$that
					.toggleClass('active')
					.next().slideToggle(350, function(){
						// Go to top
						if ( gototop ) {
							EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
						}
					});
				if( $(this).parent().find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.relayout();
					},100);
				}
			});
			$('.eut-accordion-wrapper.eut-action-accordion').on('click', '.eut-title-wrapper', function(){
				var $that = $(this),
				gototop      = $that.parents('.eut-accordion').attr('data-gototop') == 'yes' ? true : false;

				$that
					.toggleClass('active').next().slideToggle(350)
					.parent().siblings().find('.eut-title-wrapper').removeClass('active')
					.next().slideUp(350,function(){
						// Go to top
						if ( gototop ) {
							EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
						}
					});
				if( $(this).parent().find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.relayout();
					},100);
				}
				// Recalculate Section Height
				if( $that.parents('.eut-section').hasClass('eut-percentage-height') || $that.parents('.eut-section').find('.eut-percentage-height').length )  {
					var $parent = $that.parents('.eut-section');
					setTimeout(function(){
						EUTHEM.sectionHeight.resetHeight( $parent[0] );
					},400);
				}
			});
		},
		tabs: function(){
			$('.eut-tab-title').on( 'click', function() {
				var $that = $(this),
					contentId = $that.data('rel'),
					gototop      = $that.parents('.eut-tab').attr('data-gototop') == 'yes' ? true : false;
				$that.parents('.eut-tab').find('.eut-tab-title').removeClass('active');
				$that.addClass('active');
				$that.parents('.eut-tab').find('.eut-tab-content').removeClass('active');
				$that.parents('.eut-tab').find(contentId).addClass('active');
				if( $that.parents('.eut-tab').find('.eut-tab-content').find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.relayout();
					},100);
				}

				// Recalculate Section Height
				if( $that.parents('.eut-section').hasClass('eut-percentage-height') || $that.parents('.eut-section').find('.eut-percentage-height').length )  {
					var $parent = $that.parents('.eut-section');
					EUTHEM.sectionHeight.resetHeight( $parent[0] );
				}
				// Go to top
				if ( gototop ) {
					EUTHEM.pageSettings.linkGoToTop( $that.parent(), 300, 30 );
				}
			});
		},
		productSocials: function(){
			var $socials = $('.eut-product-social'),
				$item    = $socials.find('li');
			if( !$socials.length ) return;

			$socials.appear(function() {
				$item.each(function(i,n){
					var $this = $(this);
					setTimeout(function(){
						$this.addClass('eut-animated');
					},150 * i);
				});
			},{accX: 0, accY: -50});
		},
		countdown: function(){
			$('.eut-countdown').each(function() {
				var $this        = $(this),
					finalDate    = $this.data('countdown'),
					numbersSize  = $this.data('numbers-size'),
					textSize     = $this.data('text-size'),
					numbersColor = $this.data('numbers-color'),
					textColor    = $this.data('text-color'),
					countdownItems = '',
					text = '',
					countdownFormat = $this.data('countdown-format').split('|');

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
		hovers: function(){
			var hoverItem = '.eut-image-hover';
			if( isMobile.any() && '0' === crocal_eutf_main_data.device_hover_single_tap ) {
				var touchevent = 'touchend';
				if( $(hoverItem).parent().parent().hasClass('eut-carousel-item') ) {
					touchevent = 'touchstart';
				}
				$('body').on(touchevent, hoverItem, function(e) {
					var $item = $(this);
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
		}
	};

	// # Parallax Section
	// ============================================================================= //
	EUTHEM.parallaxSection = {
		init : function( section ){
			var $section = $(section);
			$section.bgParallax();
		}
	};

	// # Section Settings
	// ============================================================================= //
	EUTHEM.sectionSettings = {

		init: function(){
			EUTHEM.sectionSettings.expandColumnBg();

			if( $('#eut-sidebar').length === 0 ) return;

			var section      = '#eut-content .eut-section',
				windowWidth  = $(window).width(),
				themeWidth   = $('#eut-theme-wrapper').width(),
				wrapperWidth = $('.eut-content-wrapper').width(),
				contentWidth = $('#eut-main-content').width(),
				sidebarWidth = $('#eut-sidebar').outerWidth(),
				space        = (themeWidth - wrapperWidth)/2,
				sidebarSpace = space + wrapperWidth - contentWidth;


			$(section).each(function(){
				var $section = $(this);
				if( $section.hasClass('eut-fullwidth-background') ){
					fullBg($section);
				}
				if( $section.hasClass('eut-fullwidth') ){
					fullElement($section);
				}

			});

			function fullBg( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':space, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': space, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': '', 'margin-right': ''});
				}

			}

			function fullElement( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':0, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': 0, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': -space, 'margin-right': -space});
				}
			}
		},
		expandColumnBg: function(){
			var $column = $('.eut-expand-bg');
			$column.each(function(){
				var $that = $(this),
					$inner = $that.children(),
					direction = 'left';
				if( $that.hasClass('eut-expand-bg-right') ) {
					direction = 'right';
				}

				EUTHEM.sectionSettings.expandSettings( $that, $inner, direction );
				if( $that.hasClass('eut-clipping-animation') ) {
					var $innerWrapper = $that.find('.eut-clipping-content').children();
					EUTHEM.sectionSettings.expandSettings( $that, $innerWrapper, direction );
				}

			});
		},
		expandSettings: function( $that, $element, direction ){
			resetExpandBg();

			var positionL = $element.offset().left,
				positionR = $(window).width() - (positionL + $element.width()),
				windowWidth = $(window).width();

			if ( windowWidth > tabletPortrait && windowWidth < tabletLandscape && $that.hasClass('eut-tablet-landscape-reset-expand-bg') ) {
				resetExpandBg();
			} else if ( windowWidth > mobileScreen && windowWidth < tabletPortrait && $that.hasClass('eut-tablet-portrait-reset-expand-bg') ) {
				resetExpandBg();
			} else if( windowWidth < mobileScreen && $that.hasClass('eut-mobile-reset-expand-bg') ) {
				resetExpandBg();
			} else {
				expandBg();
			}

			function expandBg() {
				if( 'left' == direction ) {
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
					'margin-left' : '',
					'margin-right' : '',
					'padding-left' : '',
					'padding-right' : '',
					'width': ''
				});
			}

			$that.css('visibility','visible');
		}
	};

	// # Isotope
	// ============================================================================= //
	EUTHEM.isotope = {
		init: function(){
			$('.eut-isotope').each(function(){
				var $wrapper     = $(this),
					$container   = $wrapper.find('.eut-isotope-container'),
					itemsArr     = $.makeArray( $container.find('.eut-isotope-item') ),
					layoutMode   = $wrapper.data('layout'),
					$pagination  = $wrapper.find('.eut-infinite-pagination'),
					displayStyle = $wrapper.data('display-style');

				$container.imagesLoaded().always( function( instance ) {

					EUTHEM.isotope.updateSettings( $wrapper );

					$container.isotope({
						itemSelector: '.eut-isotope-item',
						layoutMode: layoutMode,
						transitionDuration: 0,
						masonry: {
							columnWidth: EUTHEM.isotope.getColumnWidth( $wrapper )
						}
					});

					// Recalculate Section Height
					if( $wrapper.parents('.eut-section').hasClass('eut-percentage-height') || $wrapper.parents('.eut-section').find('.eut-percentage-height').length)  {
						var $parent = $wrapper.parents('.eut-section');
						EUTHEM.sectionHeight.resetHeight( $parent[0] );
					}

					$container.css('visibility','visible');

					// Isotope Items Animation
					$wrapper.appear(function() {
						EUTHEM.isotope.itemsAnimation( itemsArr );
					});
				});


				// Filters
				var filterArr = [],
					$filters = $wrapper.find('.eut-filter'),
					$filter = $filters.find('li');

				$filter.each(function(){
					var selector = $(this).data('filter');
					if( filterArr.indexOf(selector) === -1 ) {
						filterArr.push(selector);
					}
				});

				$filters.on('click', 'li', function(){
					var selector     = $(this).data('filter'),
						title        = $(this).html(),
						$curCategory = $(this).parent().find('.eut-current-category'),
						gototop      = $(this).parents('.eut-filter').attr('data-gototop') == 'yes' ? true : false;;

					if( $curCategory.length > 0 ){
						$curCategory.find('span').html( title );
					}

					$container.isotope({
						filter: selector
					});

					// Go to top
					if( 'infinite-scroll' !== displayStyle && 'load-more' !== displayStyle ) {
						if ( gototop ) {
							EUTHEM.pageSettings.linkGoToTop( $(this).parent(), 300, 30 );
						}
					}
					$(this).addClass('selected').siblings().removeClass('selected');
				});

				// Infinite Scroll
				if( $pagination.length ){
					var scrollThresh = true;
					if ('load-more' == displayStyle ) {
						scrollThresh = false;
					}

					var isotopeId = '#' + $wrapper.attr('id'),
						path   = isotopeId + ' .eut-infinite-pagination .next',
						status = isotopeId + ' .eut-infinite-page-load',
						btn    = isotopeId + ' .eut-infinite-button';

					$container.infiniteScroll({
						path: path,
						history: false,
						status: status,
						button: btn,
						scrollThreshold: scrollThresh,
					});

					// append items on load
					$container.on( 'load.infiniteScroll', function( event, response, path ) {
						var items = $( response ).find( isotopeId +' .eut-isotope-item'),
							$filter = $( response ).find( isotopeId + ' .eut-filter ul li'),
							$filterList = $wrapper.find('.eut-filter ul'),
							activeCategory = $wrapper.find('.eut-filter .selected').data('filter');

						if( '*' !== activeCategory ) {
							var $filterAll = $wrapper.find('.eut-filter ul li[data-filter="*"]');
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

							$filter.each(function(){
								var $that = $(this),
									filterClass = $that.data('filter');
								if( -1 === filterArr.indexOf( filterClass ) ) {
									filterArr.push( filterClass );
									$that.appendTo($filterList);
								}
							});
						});
					});
				}

			});
		},
		isotopeReinitFunction: function( $container ){
			EUTHEM.basicElements.slider();
			EUTHEM.pageSettings.fitVid();
			EUTHEM.pageSettings.bgLoader();

			// Recalculate Section Height
			if( $container.parents('.eut-section').hasClass('eut-percentage-height') || $container.parents('.eut-section').find('.eut-percentage-height').length) {
				var $parent = $container.parents('.eut-section');
				EUTHEM.sectionHeight.resetHeight( $parent[0] );
			}
		},
		updateSettings: function( $wrapper ){
			var $container = $wrapper.find('.eut-isotope-container'),
				itemsArr   = $.makeArray( $container.find('.eut-isotope-item') ),
				layoutMode = $wrapper.data('layout');

			EUTHEM.isotope.containerSize( $wrapper );
			EUTHEM.isotope.itemSize( $wrapper, itemsArr );
			EUTHEM.isotope.autoHeadings( $container );
			// Equal Columns
			EUTHEM.isotope.equalColumns( $wrapper, itemsArr );
		},
		autoHeadings: function( $container ){
			var $postItem = $container.find('.eut-blog-item.eut-style-2 .eut-blog-item-inner'),
				$portfolioItem = $('.eut-portfolio.eut-auto-headings .eut-isotope-item-inner'),
				compressor = 10;

			$postItem.each(function(){
				var $that = $(this),
					$title = $that.find('.eut-post-title');
				if( $that.parents('.eut-section').hasClass('eut-fullwidth')) {
					compressor = 20;
				}
				EUTHEM.isotope.setAutoHeadings( $that, $title, compressor );
			});
			$portfolioItem.each(function(){
				var $that = $(this),
					$title = $that.find('.eut-title');
				if( $that.parents('.eut-section').hasClass('eut-fullwidth')) {
					compressor = 20;
				}
				EUTHEM.isotope.setAutoHeadings( $that, $title, compressor );
			});
		},
		setAutoHeadings:function( $item, $title, compressor ){
			EUTHEM.isotope.resetAutoHeadings( $title );
			var itemW = $item.width(),
				initFontSize = parseInt( $title.css('font-size') ),
				maxFontSize = 90,
				newSize = (Math.max( Math.min( itemW / compressor, parseFloat(maxFontSize) ), parseFloat(initFontSize) )).toFixed(0);
			$title.css({
				'font-size' : newSize + 'px'
			});
		},
		resetAutoHeadings: function( $title ){
			$title.css({
				'font-size' : ''
			});
		},
		equalColumns: function( $wrapper, items ){
			if( 'fitRows' != $wrapper.data('layout') || !$wrapper.hasClass('eut-blog') || $wrapper.hasClass('eut-blog-small')  ) return;
			var $innerItems = $(items).find('.eut-isotope-item-inner'),
				maxHeight = 0;
			$innerItems.each(function(){
				var $that = $(this),
					itemH = $that.css('height','auto').height();
				if( itemH > maxHeight ) {
					maxHeight = itemH;
				}
			});
			$innerItems.css( 'height', maxHeight );
		},
		relayout: function(){
			$('.eut-isotope').each(function(){
				var $wrapper   = $(this),
					$container = $wrapper.find('.eut-isotope-container');
				EUTHEM.isotope.updateSettings( $wrapper );
				$container.isotope({
					transitionDuration: 0
				}).isotope( 'layout' );
				// Recalculate Section Height
				if( $wrapper.parents('.eut-section').hasClass('eut-percentage-height') || $wrapper.parents('.eut-section').find('.eut-percentage-height').length)  {
					var $parent = $wrapper.parents('.eut-section');
					EUTHEM.sectionHeight.resetHeight( $parent[0] );
				}
			});
		},
		getColumnWidth: function(  $wrapper ){
			var gutter     = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0,
				columns    = EUTHEM.isotope.getColumns( $wrapper ),
				wrapperW   = $wrapper.innerWidth(),
				offset     = $wrapper.parents('.eut-section').hasClass('eut-fullwidth') ? - gutter : gutter,
				columnW    = (wrapperW + offset) / columns;
				columnW    = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW;
			return columnW;
		},
		itemSize: function( $wrapper, items ){
			var gutter = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0,
				columns = EUTHEM.isotope.getColumns( $wrapper ),
				columnW = EUTHEM.isotope.getColumnWidth( $wrapper );

			$.each( items, function(index, item){
				var $item = $(item),
					$thumb = $item.find('.eut-thumbnail');
				if( $item.hasClass('eut-image-landscape') ) {
					if ( columns != 1 && columns != 2) {
						$item.css({'width' : columnW * 2});
					} else {
						$item.css({'width' : columnW });
					}
					$thumb.removeAttr('style');
					$thumb.css('height',columnW - gutter);
				} else if( $item.hasClass('eut-image-portrait') ) {
					$item.css({'width' : columnW });
					$thumb.removeAttr('style');
					$thumb.css('height',columnW*2  - gutter);
				} else {
					$item.css({'width' : columnW });
				}
				if( $item.hasClass('eut-style-2') && $item.hasClass('eut-bg-size-double') && columns != 1 && columns != 2 ) {
					$item.css({'width' : columnW * 2});
				}
				$item.css({ 'padding' : gutter/2 });

				if( $item.find('.eut-slider-element').length ) {
					$item.find('.eut-slider-element').trigger('refresh.owl.carousel');
				}
			});
		},
		containerSize: function( $wrapper ){
			var $container = $wrapper.find('.eut-isotope-container'),
				wrapperW   = $wrapper.innerWidth(),
				gutter     = !isNaN( $wrapper.data('gutter-size') ) ? Math.abs( $wrapper.data('gutter-size') ) : 0,
				columns    = EUTHEM.isotope.getColumns( $wrapper ),
				offset     = $wrapper.parents('.eut-section').hasClass('eut-fullwidth') ? - gutter : gutter,
				columnW    = (wrapperW + offset) / columns;
			columnW    = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW;
			var containerW = columnW * columns;

			if ( $container.parents('.eut-section').hasClass('eut-fullwidth') ) {
				$container.css({ 'padding-left' : gutter/2, 'padding-right' : gutter/2, 'width' : containerW + gutter });
			} else {
				$container.css({ 'margin' : - (gutter/2), 'width' : containerW });
			}
		},
		getColumns: function( $wrapper ){
			var windowWidth = $(window).width(),
				columns = {
					largeS  : $wrapper.data('columns-large-screen'),
					desktop : $wrapper.data('columns'),
					tabletL : $wrapper.data('columns-tablet-landscape'),
					tabletP : $wrapper.data('columns-tablet-portrait'),
					mobile : $wrapper.data('columns-mobile')
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
		itemsAnimation: function( items ){
			$.each( items, function(index, item){
				var delay = 200 * index;
				setTimeout(function () {
					$(item).find('.eut-isotope-item-inner').addClass('eut-animated');
				}, delay);
			});
		}
	};

	// # Scroll Direction
	// ============================================================================= //
	EUTHEM.scrollDir = {
		init: function(){
			var scroll = $(window).scrollTop();
			if (scroll > lastScrollTop){
				lastScrollTop = scroll;
				return { direction : 'scrollDown'  };
			} else {
				lastScrollTop = scroll;
				return { direction : 'scrollUp'  };
			}

			lastScrollTop = scroll;
		}
	};

	// # Full Page
	// ============================================================================= //
	EUTHEM.fullPage = {
		init: function(){
			var $fPage = $('#eut-fullpage');
			if( $fPage.length === 0 ) return;
				var $section = $fPage.find('.eut-row-section');
				var deviceNavigation = true;
				var deviceAutoScrolling = true;
				var scrollOverflow = true;
				var fitToSection = true;
				var speed = $fPage.data('scroll-speed');
				var deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
				var lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
				var loop = $fPage.data('scroll-loop');
				var loopTop = false;
				var loopBottom = false;
				if ( 'both' == loop || 'top' == loop ) {
					loopTop = true;
				}
				if ( 'both' == loop || 'bottom' == loop ) {
					loopBottom = true;
				}

				if( isMobile.any() && !deviceFullPageEnable ) {
					deviceNavigation = false;
					deviceAutoScrolling = false;
					scrollOverflow = false;
					fitToSection = false;
					$section.find('.eut-animated-item').addClass('eut-animated');
				}

				var navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function(){
					return $(this).data('anchor-tooltip').toString();
				}).get();

			$fPage.fullpage({
				navigation: deviceNavigation,
				navigationPosition: 'right',
				navigationTooltips: navigationAnchorTooltips,
				sectionSelector: $section,
				css3: true,
				scrollingSpeed: speed,
				autoScrolling : deviceAutoScrolling,
				fitToSection : fitToSection,
				lockAnchors : lockAnchors,
				loopTop : loopTop,
				loopBottom : loopBottom,
				scrollOverflow: scrollOverflow,
				afterLoad: function(anchorLink, index){

					var sectionHeaderColor = $($section[index-1]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;

					$section.find('.fp-tableCell').css('visibility','visible');

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#fp-nav').removeClass('eut-light eut-dark').addClass(color);

					EUTHEM.scrollingPageAnimations.addAnim( $section, index );
				},
				afterRender: function(){
					var $videoBg = $('.eut-bg-video');

					$videoBg.each(function(){
						var $that = $(this),
							$video = $that.find('video');
						if( $video.length ){
							$video[0].play();
						}
						EUTHEM.pageSettings.resizeVideoBgElement( $that );
					});

				},
				onLeave: function(index){
					if( !isMobile.any() ) {
						EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
					}
				}
			});
		}
	};

	// # Pilling Page
	// ============================================================================= //
	EUTHEM.pillingPage = {
		init: function(){
			var $fPage = $('#eut-pilling-page');
			if( $fPage.length === 0 ) return;
				var $section = $fPage.find('.eut-row-section');
				var deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
				var lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
				var direction = $fPage.data('scroll-direction');
				var loop = $fPage.data('scroll-loop');
				var speed = $fPage.data('scroll-speed');
				var loopTop = false;
				var loopBottom = false;
				if ( 'both' == loop || 'top' == loop ) {
					loopTop = true;
				}
				if ( 'both' == loop || 'bottom' == loop ) {
					loopBottom = true;
				}

				if( isMobile.any() && !deviceFullPageEnable ) {
					$fPage.addClass('eut-disable-on-device');
					$section.find('.eut-animated-item').addClass('eut-animated');
					$section.children().wrap('<div class="pp-tableCell"></div>');
					$('.eut-row-section').each(function(){
						if ( $(this).attr('data-anchor').length ) {
							$(this).attr('id',  $(this).attr('data-anchor') );
						}
					});
					return;
				}

				var navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function(){
					return $(this).data('anchor-tooltip').toString();
				}).get();


				var navigationAnchors = [];
				if ( !lockAnchors ) {
					navigationAnchors  = $('[data-anchor]').map(function(){
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
				lockAnchors : lockAnchors,
				loopTop : loopTop,
				loopBottom : loopBottom,
				navigation: {
					'tooltips': navigationAnchorTooltips
				},
				afterLoad: function(anchorLink, index){

					var sectionHeaderColor = $($section[index-1]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;
					var $videoBg = $('.eut-bg-video');

					$videoBg.each(function(){
						var $that = $(this),
							$video = $that.find('video');
						if( $video.length ){
							$video[0].play();
						}
						EUTHEM.pageSettings.resizeVideoBgElement( $that );
					});
					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#pp-nav').removeClass('eut-light eut-dark').addClass(color);

					EUTHEM.scrollingPageAnimations.addAnim( $section, index );
				},
				afterRender: function(){
					var sectionHeaderColor = $($section[0]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;
					var $videoBg = $('.eut-bg-video');

					$videoBg.each(function(){
						var $that = $(this),
							$video = $that.find('video');
						$video[0].play();
					});

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#pp-nav').removeClass('eut-light eut-dark').addClass(color);
					EUTHEM.scrollingPageAnimations.addAnim( $section, 1 );
				},
				onLeave: function(index){
					EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
				}
			});
		}
	};

	// # Scrolling Page Animations
	// ============================================================================= //
	EUTHEM.scrollingPageAnimations = {
		addAnim: function( section, index ){
			var $section = $(section[index-1]),
				$element = $section.find('.eut-animated-item'),
				$column = $section.find('.eut-clipping-animation');

			$element.each(function(){
				var $that = $(this),
					delay = $that.data('delay');
				if( $that.parents('.eut-clipping-animation').length ) return;
				setTimeout(function(){
					$that.addClass('eut-animated');
				},delay);
			});

			$column.each(function(){
				var $that = $(this),
					$element = $that.find('.eut-animated-item'),
					delay = $that.data('delay');
				setTimeout(function(){
					EUTHEM.pageSettings.clippingAnimated( $that );
					setTimeout(function(){
						$element.addClass('eut-animated');
					},700);
				},delay);
			});
		},


		removeAnim: function(section, index, speed){
			var $section = $(section[index-1]),
				$element = $section.find('.eut-animated-item');
			setTimeout(function(){
				$element.removeClass('eut-animated');
			},speed);
		}
	};

	// # Section Navigation
	// ============================================================================= //
	EUTHEM.sectionNav = {
		init: function(){

			var $content = $('#eut-content');

			// Check if content has class section-nav
			if( !$content.hasClass('eut-section-nav') ) return;

			var $themeWrapper = $('#eut-theme-wrapper');
			var $section = $('.eut-section[data-anchor]');
			var anchor;

			// Create Navigation List
			createList();

			var $navigation = $('#eut-section-nav');
			var $navItem = $('#eut-section-nav .eut-nav-item');
			var animate = false;

			// On Click Navigation Item
			$navItem.on('click', function(event){
				event.preventDefault();
				var $that = $(this);
				var link = $that.attr('href');
				var scrollTop = Math.abs($(window).scrollTop()) / 2;
				var speed = scrollTop < 1000 ? 1000 : scrollTop;
				var $target = $('.eut-section[data-anchor=' + link + ']');
				var headerHeight = $('#eut-header').data('sticky') != 'none' && $('#eut-header').data('sticky') != 'scrollup' ? $('#eut-header').data('sticky-height') : 0;
				var targetTop = $target.offset().top - headerHeight + 1;

				$that.addClass('active').siblings().removeClass('active');

				// Remove Scroll Up Classes
				if ( $.fn.StickyHeader && $('#eut-header').data('sticky') === 'scrollup' ) {
					$('#eut-header').data('eut_StickyHeader').destroyScrollUp();
				}

				smoothScroll( targetTop, speed );

			});

			updateNav();
			$(window).on('scroll', function(){
				if( !animate ){
					updateNav();
				}
			});

			function createList(){
				$('<div id="eut-section-nav"><div class="eut-inner-nav"></div></div>').appendTo($themeWrapper);
				$section.each(function(){
					var $that = $(this);
					var title = $that.data('anchor-tooltip');
					anchor = $that.data('anchor');
					var $listEl = $('<a class="eut-nav-item eut-small-text" href="' + anchor + '">' + title + '</a>');
					if( title ) {
						$listEl.prependTo( $('#eut-section-nav .eut-inner-nav') );
					}
				});
			}

			function updateNav(){
				$section.each(function(){
					var $that = $(this);
					if ( ( $that.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $that.offset().top + $that.outerHeight() - $(window).height()/2 > $(window).scrollTop() ) ) {
						$navigation.find('a[href=' + $that.data('anchor') + ']').addClass('active');
					} else {
						$navigation.find('a[href=' + $that.data('anchor') + ']').removeClass('active');
					}
				});
			}

			function smoothScroll(target, speed){
				if( !animate ) {
					animate = true;
					$('html, body').animate({scrollTop: target}, speed, 'easeInOutCubic',function(){
						animate = false;
					});
					$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
						$('html, body').stop();
						animate = false;
					});
				}
			}
		}
	};

	// # Global Variables
	// ============================================================================= //
	var resizeTimeout;
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
		}
	};

	var deviceAnimAppear =  false;
	if( 1 == crocal_eutf_main_data.device_animations ) {
		deviceAnimAppear =  true;
	}

	var spinner = '<div class="eut-spinner"><div></div><div></div><div></div><div></div></div>';

	var $document = $(document),
		$window = $(window),
		$body = $('body'),
		$stickyEl = $('.eut-sticky-element');

	// Animation support & prefixing
	var t = document.body || document.documentElement;
	var s = t.style;
	var tSupport = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
	var property = [ 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
	var prefix;
	for( var i in property ){
		if( s[ property[ i ] ] !== undefined ){
			prefix = '-' + property[ i ].replace( 'Transform', '' ).toLowerCase();
		}
	}
	var transform = prefix + '-transform';

	// # Scrollbar Width
	// ============================================================================= //
	var parent, child, scrollBarWidth;

	if( scrollBarWidth === undefined ) {
		parent          = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child           = parent.children();
		scrollBarWidth  = child.innerWidth()-child.height(99).innerWidth();
		parent.remove();
	}



	$(document).ready(function(){ EUTHEM.documentReady.init(); });
	$(window).on('load',function () { EUTHEM.documentLoad.init(); });

	// Resize
	if( !isMobile.any() ) {
		$(window).on('resize', resizer);
	} else {
		$(window).on('orientationchange', resizer);
	}
	function resizer(){
		window.clearTimeout(resizeTimeout);
		resizeTimeout = window.setTimeout(function () {
			EUTHEM.documentResize.init();
		}, 300);
	}

})(jQuery);