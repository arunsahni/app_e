angular.module('app').controller('CarouselController', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [

    {
      image: 'images/frontend/banner1.jpg',
      text: 'Don’t Miss The Event'
    },
    {
      image: 'images/frontend/banner1.jpg',
      text: 'Don’t Miss That Event'
    },
    {
      image: 'images/frontend/banner1.jpg',
      text: 'Don’t Miss That Event'
    }

  ];
  /*$scope.addSlide = function() {
    var newWidth = 800 + slides.length + 1;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }*/
});