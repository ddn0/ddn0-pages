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

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","d0b572e31944b9396d11426887d799ae"],["bower_components/app-layout/app-drawer/app-drawer.html","edb12d9e17c61053022154cfb186a1af"],["bower_components/app-layout/app-header-layout/app-header-layout.html","b1672e816c86be4d3430466792793076"],["bower_components/app-layout/app-header/app-header.html","0839e3fe45dc03b7ec82a3ff994f9999"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","ed3e4c1b26f0c346516d986d32b8293e"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","490b917b75be97cfb6d00b4f265c0a8f"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","f9af3b19ba0df5aea027b835f0d4e766"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","a03d3b8b36ed563d95de1d216a4f95c1"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","56e9ae0ae405d591797ff358b40fe0ec"],["bower_components/app-layout/app-scroll-effects/effects/material.html","71f0901390d66a79c2064a9ad1fd2ab9"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","bfe6b7317a221e6babe303b8d7e8b514"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","f844cb0e86aaa492f9434a9c659627e5"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","b478b69e3b017981a15231d27cfb3d93"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","2d139b7154665bbd45e3b60cc0055d94"],["bower_components/app-layout/app-toolbar/app-toolbar.html","f2dedc637dcf2f0c143dd49f34c69351"],["bower_components/app-layout/helpers/helpers.html","83fd30d1f6a521655e29f9d418873d18"],["bower_components/app-route/app-location.html","1fa84168285fdab6d7167f7f24f74125"],["bower_components/app-route/app-route-converter-behavior.html","1109e78e524ae215a0fe16164fca1898"],["bower_components/app-route/app-route.html","ebd95bb1412bb7b2909f5ef6c5a16c8a"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","b216ddf5b140814ac9d79031789de423"],["bower_components/iron-ajax/iron-ajax.html","9252ad906bc08605f9e46e5404d49c2b"],["bower_components/iron-ajax/iron-request.html","cbe67ba0d6274a558cd8196f2f9a5b07"],["bower_components/iron-behaviors/iron-button-state.html","2ee8b97f0dc42f816c3982c7464fa346"],["bower_components/iron-behaviors/iron-control-state.html","6143543da11673e4e614959df7ca57d4"],["bower_components/iron-flex-layout/iron-flex-layout.html","b8aa79f9be851cf7ecc5a6f8c2c09d98"],["bower_components/iron-icon/iron-icon.html","babd845aa065081571fc871e905fa820"],["bower_components/iron-icons/image-icons.html","56aeefb5517b2cf02ae016cb53c9358f"],["bower_components/iron-icons/iron-icons.html","b06b48bbd24e44ce5f592c008e254376"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","1e3330da11aec0da63e866bf90f776c8"],["bower_components/iron-location/iron-location.html","3d1d1640f117543269575c7c1c9de85a"],["bower_components/iron-location/iron-query-params.html","2ce94815f8f8f1630d71d77e2f566802"],["bower_components/iron-media-query/iron-media-query.html","7d3f43a96df98d79d2adf3124e8222a8"],["bower_components/iron-meta/iron-meta.html","b00996d776a98c7e895b4511609267e3"],["bower_components/iron-pages/iron-pages.html","c29a9f80bbef253c80723dc6d8bb596b"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","28388bfc5987e454df94cda48ece6e40"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","b17bc4995cce01c10aef6795a65fb184"],["bower_components/iron-selector/iron-multi-selectable.html","2f18affc118443f511f179bbe7960b6a"],["bower_components/iron-selector/iron-selectable.html","8f5da0b830e2603ff8e8ff205299a203"],["bower_components/iron-selector/iron-selection.html","2226092899e54f12b29675a185fa5514"],["bower_components/iron-selector/iron-selector.html","7efc0c12ff2e8e0c4c31e292260ea200"],["bower_components/paper-behaviors/paper-button-behavior.html","a0b4157e2a9b7f45a364d3c6601b358e"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","4c05d6417c14adaa64a7be4603380413"],["bower_components/paper-behaviors/paper-ripple-behavior.html","6a6b928ccf33c4dd4e290de99bd4e733"],["bower_components/paper-button/paper-button.html","254e644921fa8c910072f7116d5cb07f"],["bower_components/paper-icon-button/paper-icon-button.html","3b68ae2d0bf8c26c8b125cfe8c34c7c2"],["bower_components/paper-ripple/paper-ripple.html","8853b9cea48cfefe4336fb8d6a888d05"],["bower_components/paper-styles/color.html","2b6b926e5bd4005bdbdcd15a34a50b95"],["bower_components/paper-styles/default-theme.html","9480969fcd665e90201b506a4737fa1a"],["bower_components/paper-styles/element-styles/paper-material-styles.html","b0a38bd2eb6f4c4844d4903a46268c92"],["bower_components/paper-styles/shadow.html","2fbe595f966eebe419b9b91611d6392a"],["bower_components/polymer/lib/elements/array-selector.html","d9ce72915fcd94e045f37fd69005d60f"],["bower_components/polymer/lib/elements/custom-style.html","1d6da5c8ed6be4885e745d3b6fd7b5ff"],["bower_components/polymer/lib/elements/dom-bind.html","1fd682ef71950fda93b9dfc30a07b38f"],["bower_components/polymer/lib/elements/dom-if.html","8c56ac417a990db1e7730ab94e05eefc"],["bower_components/polymer/lib/elements/dom-module.html","7abaf87e66987f4cf7266718f3f449b4"],["bower_components/polymer/lib/elements/dom-repeat.html","3f58ba1b527d669b7087e402615f3f69"],["bower_components/polymer/lib/legacy/class.html","06a9a03cc96a12e387b0af643b1a5840"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","9884cf46cebe8afdf5a49ecbe50afd50"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","4df2a7f7803d35928f5e740e85443ece"],["bower_components/polymer/lib/legacy/polymer-fn.html","daea28b40e0edb539f4903526568e2bc"],["bower_components/polymer/lib/legacy/polymer.dom.html","7c7468013e34a852a894e9a3f8ba749f"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","ca634ed594d10511c96db0ab26fe4ef3"],["bower_components/polymer/lib/mixins/dir-mixin.html","c9f3dfd9e36b3caa0d8ca3f96c1f9a7b"],["bower_components/polymer/lib/mixins/element-mixin.html","5a8f6663997b0d50fa494f3ac3bfb1ea"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","1f390af97c2ea2f0647980233e736fdf"],["bower_components/polymer/lib/mixins/mutable-data.html","e14f55be95ffcbb6f0ef9e4a953ac139"],["bower_components/polymer/lib/mixins/properties-changed.html","39ac9a047aaabec04df1cee4183751f8"],["bower_components/polymer/lib/mixins/properties-mixin.html","bb620562a64b50655b0961e7c1e07832"],["bower_components/polymer/lib/mixins/property-accessors.html","f7dd48e5151e76373febeaeee327f0fd"],["bower_components/polymer/lib/mixins/property-effects.html","9303c1345decd532ad4737c1f58562c8"],["bower_components/polymer/lib/mixins/template-stamp.html","bff4f0ae4042b7c0b24b23a8f789a9c1"],["bower_components/polymer/lib/utils/array-splice.html","af45213e9722ac2cff72b3da989b2d35"],["bower_components/polymer/lib/utils/async.html","c8c04ca11c20e296606c0c8b5fb09ea5"],["bower_components/polymer/lib/utils/boot.html","3b2d72eede425a5eb274f75c3eb6c24d"],["bower_components/polymer/lib/utils/case-map.html","a563011a2a9fed423f186d9162c6094e"],["bower_components/polymer/lib/utils/debounce.html","6884bbcd273c9b1dae5f2248d7752568"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","7e203246cf48da2784a29e970d43482a"],["bower_components/polymer/lib/utils/flush.html","0940b6dbab4ce60dc9185a3a13fab2e4"],["bower_components/polymer/lib/utils/gestures.html","344ac4b2d9ec8624ee42ad96432cd659"],["bower_components/polymer/lib/utils/html-tag.html","40b52607129959875fd9c5758c89bf4c"],["bower_components/polymer/lib/utils/import-href.html","e044c6fe4562d8a74b95d5a1a4aa3c02"],["bower_components/polymer/lib/utils/mixin.html","32aefbbfe727cd8c8c88c03a23526e92"],["bower_components/polymer/lib/utils/path.html","009e390d6f45dda28859e3fa90216e89"],["bower_components/polymer/lib/utils/render-status.html","ef95ca0eec4a9f8ed210830b6a367cec"],["bower_components/polymer/lib/utils/resolve-url.html","6bac182b4ac9ca300fe99ead2bc2ce23"],["bower_components/polymer/lib/utils/settings.html","100af3fad58f4e01a293ca3ef844d21f"],["bower_components/polymer/lib/utils/style-gather.html","a0267c1f749ae6fa8e376b6b8768dd98"],["bower_components/polymer/lib/utils/telemetry.html","432c30b36993464c5029d66cd6d1a73a"],["bower_components/polymer/lib/utils/templatize.html","f9f67905c19ff7aebca4cd2c8f943711"],["bower_components/polymer/lib/utils/unresolved.html","0db19a736bfeca0ea0a265784fdbc45a"],["bower_components/polymer/polymer-element.html","e46b3b3f39daa9b47ffe3c1cb86606b2"],["bower_components/polymer/polymer.html","b8d6e0b7108b5487c5056745d4260fee"],["bower_components/shadycss/apply-shim.html","f220299c2be1b5040111843d640b70a5"],["bower_components/shadycss/apply-shim.min.js","2f10de5f53752d98aca8bb0b50fb7214"],["bower_components/shadycss/custom-style-interface.html","0a68ea0f3af7bcb1ca6617e512f720cb"],["bower_components/shadycss/custom-style-interface.min.js","63c1d4edf7ea436dc9eb408ef6a7a24b"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","8af5f1900788253d8384715a01425ab7"],["bower_components/webcomponentsjs/gulpfile.js","d62de2e3466a2ebfebb7c463a724f50d"],["bower_components/webcomponentsjs/webcomponents-ce.js","79018f7fe2788095460a82dad1d0e2d9"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","ceb979b7d4c089b9daa38eec743a3915"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","4cc6fe042af14bded21af71ccb137f45"],["bower_components/webcomponentsjs/webcomponents-hi-sd.js","8631268c8fb731636ddf410293155f89"],["bower_components/webcomponentsjs/webcomponents-hi.js","2e02d950c1c199919a375acfd1fbc108"],["bower_components/webcomponentsjs/webcomponents-lite.js","e6a9f166ed6b16c555bd020782780db5"],["bower_components/webcomponentsjs/webcomponents-loader.js","596ad3dc06dfb78ecdc6bcee1d653f04"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","0ae8ee0bf172ca9bcbc04f1bfea15fe4"],["bower_components/webcomponentsjs/webcomponents-sd.js","221ef1c37f786b0f26f5e94e53276d20"],["index.html","7d9354c0ab241ee28114b3bf0a55e167"],["manifest.json","405f0aaf6ed3a93688109735926c04a1"],["src/author-list.html","fb5f45e08073f6e3284d104cb945f136"],["src/my-app.html","26cc150db6f73a9849d6928138259055"],["src/my-details.html","6c37fee98ce5bd66a04a0067c036266d"],["src/my-icons.html","5bbb6a8d595f50a22a73679d68a2304c"],["src/my-overview.html","40d1fc4d06bc2511a81f848664ab5a5e"],["src/my-publications.html","b1961b91469947c4da15cffc029f8893"],["src/my-view404.html","eb5559920464a5fa706874086f68c150"],["src/publication-list.html","34426e8213b1d0929fb020fd5bd06c9a"],["src/shared-styles.html","3308987250f3ccd7f135d698cfd289cf"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function (body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
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
    return whitelist.some(function (whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
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
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







