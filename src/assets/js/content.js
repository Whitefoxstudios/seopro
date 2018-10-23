(function($, window, document){
  'use-strict';

  var toolbar = $('<div/>', {class: 'seopro-bar'}),
  buttonsWrapper = $('<div/>', {class: 'seopro-bar-nav'}),
  url = location.href,
  domain = url.replace(/https?:\/\//i, '').split('/')[0],
  title = isDefined($($('html >head >title')[0]).text(), 'title not set'),
  description = isDefined($($('meta[name=description]')[0]).attr('content'), 'meta description not set'),
  prefix = '//ahrefs.com',
  buttons = {
    ahrefsSite: $('<a/>', {
      class: 'ahrefs ahrefs-site icon-ahrefs-site',
      href: prefix+'/site-explorer/overview/v2/subdomains/fresh?target='+domain,
      target: '_blank',
      title: 'ahrefs Site Explorer'
    }),
    ahrefsRank: $('<a/>', {
      class: 'ahrefs ahrefs-rank icon-ahrefs-rank',
      href: prefix+'/positions-explorer/organic-keywords/v5/subdomains/us/all/all/all/all/all/all/all/1/traffic_desc?target='+domain,
      target: '_blank',
      title: 'ahrefs Positions Explorer'
    }),
    ahrefsContent: $('<a/>', {
      class: 'ahrefs ahrefs-content icon-ahrefs-content',
      href: prefix+'/content-explorer/overview/v4/all/1/score_desc?topic='+title,
      target: '_blank',
      title: 'ahrefs Content Explorer'
    }),
    responsinator: $('<a/>', {
      class: 'responsinator icon-responsinator',
      href:   '//www.responsinator.com/?url='+url,
      target: '_blank',
      title:  'Responsinator'
    }),
    whois: $('<a/>', {
      class: 'whois icon-whois',
      href:   '//www.whois.com/whois/'+domain,
      target: '_blank',
      title:  'Who Is'
    }),
    archive: $('<a/>', {
      class: 'wayback icon-wayback',
      href:   '//web.archive.org/web/*/'+domain,
      target: '_blank',
      title:  'Wayback Machine'
    })
  },
  snippet,
  menuWrapper,
  menuToggle,
  menu,
  menuItems,
  results;

  if(domain.match(/instagram\.com/g)){
    //we're on instagram
    var addInstagramFollow = false;
    var follows = [];

    if($('button').length > 0){
      $('button').each(function(i, b){
        if($(b).text() == 'Follow'){
          follows.push(b);
        }
      });
    }

    if(follows.length > 1){
      buttons.instagramFollowAll = $('<a/>', {
        class: 'instagram instagram-follow-all icon-instagram-follow-all',
        href: '#',
        text: 'Follow All ('+follows.length+')',
        click: function(e){
          $.each(follows, function(i, f){
            $(f).click();
          })
        }
      });
    }

    var addInstagramLike = false;
    var likes = [];

    if($('a[href="#"][role="button"]').length > 0){
      $('a[href="#"][role="button"]').each(function(i, l){
        if($(l).find('>span.coreSpriteHeartOpen').length > 0){
          $(l).find('>span.coreSpriteHeartOpen').each(function(i, k){
            if($(k).text() == 'Like'){
              likes.push(l);
            }
          });
        }
      });
    }

    if(likes.length > 1){
      buttons.instagramLikes = $('<a/>', {
        class: 'instagram instagram-like-all icon-instagram-like-all',
        href: '#',
        text: 'Like All ('+likes.length+')',
        click: function(e){
          $.each(likes, function(i, l){
            $(l).click();
          })
        }
      });
    }
  }

  snippet = {
    title: $('<div/>', {
      class: 'snippet-title',
      text: title,
    }),

    url: $('<div/>', {
      class: 'snippet-domain',
      text: url,
    }),

    description: $('<div/>', {
      class: 'snippet-description',
      text: description,
    }),

    wrapper: $('<div/>', {
      class: 'snippet',
    }),

    toggler: $('<a/>', {
      class: 'snippet-toggle icon-audit-snippet',
      href: '#',
      title: 'Preview snippet'
    })
  };

  snippet.willToggle = function(event){
    event.preventDefault(); event.stopPropagation();

    $('html').toggleClass('seoProBar-snippet-open');

    if($('.seoProBar-snippet-open body >.seoProBar-snippet').length > 0){
      snippet.wrapper.remove();
    } else {
      snippet.wrapper.append(snippet.title, snippet.url, snippet.description);
      snippet.wrapper.appendTo();
    }
  }

  buttons.snippetToggler = $('<a/>', {
    class: 'snippet-toggle icon-audit-snippet',
    href: '#',
    title: 'Preview snippet'
  }).click(function(e){
    snippet.willToggle(e);
  });

  $('body').on('seoProbarDidToggle', function(event, state){
    if(state === true){
      toolbar.appendTo('html.seopro-bar-active body');

      buttonsWrapper.appendTo(toolbar);

      $.each(buttons, function(i, o){
        o.addClass('seopro-bar-nav-item');

        o.appendTo(buttonsWrapper);
      });
    }

    if(state === false){
      toolbar.remove();
    }
  });

  $(window).bind('load', function(e){
    var x = document.querySelectorAll('.rl_full-list .uMdZh .dbg0pd >div'), i = 0; for(i; i<x.length; i++){x[i].innerHTML = "<span class='item-count'>"+(i+1)+" </span>"+x[i].innerHTML;}
  });
})(window.jQuery, window, document, undefined);

// Helpers
function isDefined(variable, message = ''){
  return (typeof variable !== typeof undefined || variable !== false || typeof variable !== undefined) ? variable : message;
}
