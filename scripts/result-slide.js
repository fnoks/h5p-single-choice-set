var H5P = H5P || {};

/**
 * SingleChoiceResultSlide - Represents the result slide
 */
H5P.SingleChoiceResultSlide = (function ($, EventEmitter) {

   /**
   * @constructor
   * @param  {number}  maxscore            Max score
   * @param  {boolean} showSolutionEnabled Is Show solution enabled?
   * @param  {boolean} retryEnabled        Is retry enabled?
   */
  function ResultSlide(maxscore, showSolutionEnabled, retryEnabled, l10n) {
    EventEmitter.call(this);
    this.maxscore = maxscore;
    var self = this;

    this.$resultSlide = $('<div>', {
      'class': 'h5p-sc-slide h5p-sc-set-results',
      'css': {left: (maxscore * 100) + '%'}
    }).append(
      '<span class="h5p-sc-feedback">' + l10n.resultSlideTitle.replace(':numcorrect', '<span class="h5p-sc-score">?</span>').replace(':maxscore', maxscore) + '</span>'
    );

    if (showSolutionEnabled) {
      this.$resultSlide.append($('<button>', {
        'class': 'h5p-button h5p-sc-show-solution',
        'text': l10n.showSolutionButtonLabel,
        'click': function () {
          self.trigger('view-solution');
        }
      }));
    }

    if (retryEnabled) {
      this.$resultSlide.append($('<button>', {
        'class': 'h5p-button h5p-sc-retry',
        'text': l10n.retryButtonLabel,
        'click': function () {
          self.trigger('retry');
        }
      }));
    }
  }
  ResultSlide.prototype = Object.create(EventEmitter.prototype);
  ResultSlide.prototype.constructor = ResultSlide;


  /**
   * Append the resultslide to a container
   *
   * @param  {domElement} $container The container
   * @return {domElement}            This dom element
   */
  ResultSlide.prototype.appendTo = function ($container) {
    this.$resultSlide.appendTo($container);
    return this.$resultSlide;
  };


  /**
   * Set the score
   *
   * @param  {string} result The result
   */
  ResultSlide.prototype.setScore = function (result) {
    this.$resultSlide.find('.h5p-sc-score').text(result);
  };

  return ResultSlide;

})(H5P.jQuery, H5P.SingleChoiceEventEmitter);
