
describe('SingleChoiceSet', function () {
  var $ = H5P.jQuery;
  var content = {"choices":[{"answers":["Wolfberries","Catberries","Bearberries"],"question":"Goji berries are also known as ..."},{"answers":["Asia","Africa","Europe"],"question":"Goji berries are native to ..."},{"answers":["Dried","Pickled","Frozen"],"question":"Goji berries are usually sold ..."}],"behaviour":{"timeoutCorrect":1000,"timeoutWrong":1000,"soundEffectsEnabled":true,"enableRetry":true,"enableSolutionsButton":true},"l10n":{"resultSlideTitle":"You got :numcorrect of :maxscore correct","showSolutionButtonLabel":"Show solution","retryButtonLabel":"Retry","solutionViewTitle":"Solution"}};
  var libraryInfo = {
    versionedNameNoSpaces: 'H5P.SingleChoiceSet-1.3',
    machineName: "H5P.SingleChoiceSet",
    majorVersion: 1,
    minorVersion: 3
  };

  H5PIntegration.user = {
    name: 'fnoks',
    mbox: 'mailto:support@joubel.com',
    objectType: 'Agent'
  };

  H5P.XAPIEvent.prototype.getContentXAPIId = function () {
    return 'http://www.vg.no';
  };

  function addCSS() {
    $('head').append('<link rel="stylesheet" href="/base/styles/single-choice-set.css" type="text/css" />');

    $('html,body').css({
      height: '100%',
      width: '100%'
    });
  }

  it('shall be possible to initialize', function () {
    addCSS();
    var instance = new H5P.SingleChoiceSet(content, 1);
    instance.libraryInfo = libraryInfo;
    instance.contentId = 1;
    $body = $('body');
    instance.attach($body);
  });

  it('shall send xAPI statements', function (done) {
    addCSS();
    var instance = new H5P.SingleChoiceSet(content, 1);
    instance.libraryInfo = libraryInfo;
    instance.contentId = 1;
    $body = $('body');
    instance.attach($body);

    // Listen to xAPI statements
    H5P.externalDispatcher.on('xAPI', function (event) {
      expect(event.type).toBe('xAPI');
      var report = xapiValidator.validateStatement(event.data.statement);
      report.errors.forEach(function (element) {
        expect(element.level).not.toBe('MUST_VIOLATION', element);
      });
      expect(event.data.statement.verb.id).toBe('http://adlnet.gov/expapi/verbs/interacted');
      done();
    });

    // Click the correct element
    $('.h5p-sc-current-slide .h5p-sc-is-correct').click();
  });
});
