'use strict';

/**
 * @ngdoc function
 * @name playerApp.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the playerApp
 */
angular.module('playerApp')
        .controller('ContentCtrl', function (contentService, $log) {
            var content = this;
            content.keyword = '';
            content.listView = false;
            content.data = [];
            content.autosuggest_data = [];

            content.searchContent = function ($event) {
                content.enableLoader(true);
                var req = {
                    "query": content.keyword,
                    "filters": {
                    },
                    "params": {
                        "cid": "12"
                    }
                }
                contentService.search(req).then(function (res) {
                    content.enableLoader(false);
                    console.log(res);
                    if (res.responseCode === "OK") {
                        if ($event != undefined && content.keyword != '')
                        {
                            content.autosuggest_data = res.result;
                        } else
                        {
                            content.data = res.result;
                            content.autosuggest_data = [];
                        }
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };
            content.enableLoader = function (isEnabled) {
                if (isEnabled) {
                    $('#search-input-container').addClass('loading');
                } else
                {
                    $('#search-input-container').removeClass('loading');
                }
            }
            content.toggleView = function (isList)
            {
                content.listView = isList;
            }
            content.loadRating = function () {
                $('.ui.rating')
                        .rating({
                            maxRating: 5
                        }).rating("disable", true);
                $('.popup-button').popup();
            };
            content.searchContent();
            content.setSearchText = function (text)
            {
                content.keyword = text;
                content.searchContent();
            }          

        });

        