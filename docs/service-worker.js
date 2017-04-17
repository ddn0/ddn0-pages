/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","8c0b647db4d25a3a2e95e6e4e24bb221"],["/bower_components/app-layout/app-drawer/app-drawer.html","1163bb1aa96ea301ff061225afa549b2"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","3a1f94051e68b0b8fcd6c484cb6ea224"],["/bower_components/app-layout/app-header/app-header.html","be5b5895f4d6bfc49446c2df40689395"],["/bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","0c1cf447170ee584c2e4cda88e8ed53a"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","fc72538a2ea03edaf275238a97b21bc8"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","334eac7f54a828baedbe8f09574571b7"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","53ab90982adbe7457d8603d722c98d2f"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","593bd7855bcc277f33e8c256c45ef039"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","09fc23898ebd40bf11160760df03de86"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","d50c47e6d50fe8a33e65d10a9c189684"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","a9dcfcb21b7af4dbe25d8ca6d8099463"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","572428f1f51fd78b90c1e867e9cb33c4"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","0d19840e1b4112985dacaf8a99513abe"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","97861d12dd6dd8874e74a4a7fe085710"],["/bower_components/app-layout/helpers/helpers.html","cdd968e67df0b732f9d47057af41e73f"],["/bower_components/app-route/app-location.html","734b06f3c15a9df75277d372f746694b"],["/bower_components/app-route/app-route-converter-behavior.html","5ed794fad917e6c6cae8ecc2da6a1840"],["/bower_components/app-route/app-route.html","7e0b3dc18212e19edfadfb43aba5687a"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-ajax/iron-ajax.html","1ae452371ec90c327487034e6d4acae1"],["/bower_components/iron-ajax/iron-request.html","12eca57ec63912a505d6c455d360614e"],["/bower_components/iron-behaviors/iron-button-state.html","477c03ed546186de581ee1b2495bef3f"],["/bower_components/iron-behaviors/iron-control-state.html","d8caf1bf4afc8ef52625109d57a7f540"],["/bower_components/iron-flex-layout/iron-flex-layout.html","bfb5f3486f020afa5f289f3b22398c34"],["/bower_components/iron-icon/iron-icon.html","fef9331d08a730357652773c88676452"],["/bower_components/iron-icons/image-icons.html","88718ecb8e6a153b45edd9218c5b3176"],["/bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","7f43f3963b39b325898703673a3d2f53"],["/bower_components/iron-location/iron-location.html","5b866ad0574359d468864fc666817ed6"],["/bower_components/iron-location/iron-query-params.html","5e10cc028701b213de7790f68a3140c6"],["/bower_components/iron-media-query/iron-media-query.html","81acb2abcf1ad3a7636fce5c43f0fcb5"],["/bower_components/iron-meta/iron-meta.html","706d2c47bdd19b3dc9e041db7098af93"],["/bower_components/iron-pages/iron-pages.html","0bcbc3ee4469ff26099a1ab1066afca0"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e22494690a6d3affa8dbb051c4822641"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","aa108ab483825128d97a10a609f9e3c8"],["/bower_components/iron-selector/iron-multi-selectable.html","af7e6902c67bec0736d3ac021788afe4"],["/bower_components/iron-selector/iron-selectable.html","669e25a181cde3b8d3e3411627bfa7f2"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-selector/iron-selector.html","eaec85c290f2dfa24f778a676bf56e15"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","07276537aed6235c4126ff8f2f38db6a"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","a320677d790ef9662f3ccda1fe77d87b"],["/bower_components/paper-icon-button/paper-icon-button.html","bfadf4611f2104d816b43ba254460c7c"],["/bower_components/paper-ripple/paper-ripple.html","a538684da4f217d83cfd66cfc4eada62"],["/bower_components/paper-styles/color.html","e3e3c43a7fa75c3a2f8a395ae8fd490d"],["/bower_components/paper-styles/default-theme.html","ed4df18f1171d7793508d645054335b8"],["/bower_components/paper-styles/element-styles/paper-material.html","f0f83e3976975d607e326f44e83d1217"],["/bower_components/paper-styles/shadow.html","4123860d1a9035b047714385f21f368f"],["/bower_components/polymer/lib/elements/array-selector.html","3c6b2faa0fc3fb3213d38d2c99d5e23f"],["/bower_components/polymer/lib/elements/custom-style.html","5f3b28865d7f8a469ee745438f6eb8d9"],["/bower_components/polymer/lib/elements/dom-bind.html","e01b19f292f91c546c36dd5ce7d82f39"],["/bower_components/polymer/lib/elements/dom-if.html","847fb578e0b1f7c3947dba2736029da8"],["/bower_components/polymer/lib/elements/dom-module.html","7c5f90016ba36ee95561a57d405b6b96"],["/bower_components/polymer/lib/elements/dom-repeat.html","c2c4905e244f79585bd3a6a4f2e6a4eb"],["/bower_components/polymer/lib/legacy/class.html","2f0858bb93493dac53f5a1ba85ba12df"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","ab170011ed657984625af1460143c10b"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","bb4f75ba9c1cdc662c30ac2dcab6866f"],["/bower_components/polymer/lib/legacy/polymer-fn.html","69a632ca8a1d22137d8cdd19c0841b02"],["/bower_components/polymer/lib/legacy/polymer.dom.html","e3f165bcf2d187874fe0d66c61b51b4c"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","4b05abec9b19213ac3f19e7dc95086f4"],["/bower_components/polymer/lib/mixins/element-mixin.html","cf129666d3465e8b03618b67bd8db0ff"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","e969366e367a734ef6695125d6782c38"],["/bower_components/polymer/lib/mixins/mutable-data.html","3654cbe785028abee5e7129f051547a9"],["/bower_components/polymer/lib/mixins/property-accessors.html","ae2bbf262109d9a48b89eb20bef6fb57"],["/bower_components/polymer/lib/mixins/property-effects.html","c1486221bbd9642e382c821aed46091a"],["/bower_components/polymer/lib/mixins/template-stamp.html","f559def11fbc603e3b3b1e73d68ada98"],["/bower_components/polymer/lib/utils/array-splice.html","7a80bca520c3f5a054c1c4577f51182c"],["/bower_components/polymer/lib/utils/async.html","63f34f2f19f465262ed75f98b5b008c3"],["/bower_components/polymer/lib/utils/boot.html","514f334a8b77eb9fb9ff20ce80a1167e"],["/bower_components/polymer/lib/utils/case-map.html","397d495f3eb392b59a65dfee0421b305"],["/bower_components/polymer/lib/utils/debounce.html","f1866fc98fa520288f4001a5c3d0b50b"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","64b37ed9fae48a40dd86c27f89bbe400"],["/bower_components/polymer/lib/utils/flush.html","5e9e55d5e5d7d88bfe3073f4536331ea"],["/bower_components/polymer/lib/utils/gestures.html","f5e1a6ab1019718276d8372d7c510b86"],["/bower_components/polymer/lib/utils/import-href.html","de2edb660b88a3f2f8b6927ee403fd6a"],["/bower_components/polymer/lib/utils/mixin.html","4859fa08b603a555f81cfe7ce3e5db95"],["/bower_components/polymer/lib/utils/path.html","f09edb0bf2e7333a3d7ba33fe0984d6b"],["/bower_components/polymer/lib/utils/render-status.html","747bfdf7272d49de08399cc4ebea8493"],["/bower_components/polymer/lib/utils/resolve-url.html","15810a3ba447c460502e9cf7f04b64b5"],["/bower_components/polymer/lib/utils/style-gather.html","595515fcdf8cf59afba1d67d94a9deba"],["/bower_components/polymer/lib/utils/templatize.html","0933b113ad1c10fed71681dd876a2a13"],["/bower_components/polymer/lib/utils/unresolved.html","bea349c4a71e9f4327da774afd73f8ae"],["/bower_components/polymer/polymer-element.html","54c861005cf028b03abab90e8de6221f"],["/bower_components/polymer/polymer.html","edc45d69a352ab2bcb32048524c02573"],["/bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["/bower_components/shadycss/apply-shim.min.js","6b47e16c654d1686c4c8359a98a16045"],["/bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["/bower_components/shadycss/custom-style-interface.min.js","3d87ce64588ea9a73f62dbe8d75990ce"],["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","76bf14c68e996daeddf9d8ec2ee46edb"],["/bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["/bower_components/webcomponentsjs/webcomponents-hi-ce.js","46f55471a5ad6893cd8115e5663b875e"],["/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","e300de0202a6cc8b9759c080575d93fa"],["/bower_components/webcomponentsjs/webcomponents-hi.js","497996949b601c43ba5bfe979f4ffb4b"],["/bower_components/webcomponentsjs/webcomponents-lite.js","c99c738af384279692c6438c764ccf65"],["/bower_components/webcomponentsjs/webcomponents-loader.js","8d3e67f553c1ae91569e16e2cc80b616"],["/bower_components/webcomponentsjs/webcomponents-sd-ce.js","e21cf49f5bd36dcf777db42570df5326"],["/index.html","2797e1731bfd1ccfd6e6c62d74c7e43a"],["/manifest.json","405f0aaf6ed3a93688109735926c04a1"],["/src/author-list.html","8588a145d0db429e97eb578e01c48299"],["/src/my-app.html","e7c0796430a27faf2fa97d1420b1ba25"],["/src/my-details.html","f830c9324f09a020350203275c83bb0f"],["/src/my-icons.html","46a164b81d130beeec8b4409481eed8c"],["/src/my-overview.html","203edf1d7ec26e55917171d74073375f"],["/src/my-publications.html","a70fb9f4aafc258ea3ccc573c38fdf22"],["/src/my-view404.html","bba808c44ca2eb972c7c166d804e464d"],["/src/publication-list.html","51173628d7f9752f823b278e108a829e"],["/src/shared-styles.html","b7f65eebef9653bd7b45702f231cb98e"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







