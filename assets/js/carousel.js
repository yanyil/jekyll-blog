function generateRandomSlides(inputSize, outputSize) {
  $('#carousel').slick({
    autoplay: true,
  });

  var random = generateRandomNumberSet(inputSize, outputSize);

  $('#carousel').slick('slickFilter', function(index) {
     return random.includes(index);
  });

  function generateRandomNumberSet(inputSize, outputSize) {
    var output = [];
    var counter = 0;

    if (outputSize >= inputSize) {
      outputSize = inputSize;
    }

    while (counter < outputSize) {
      var randomNumber = Math.floor(Math.random() * inputSize);
      if (!output.includes(randomNumber)) {
        output.push(randomNumber);
        counter++;
      }
    }

    return output;
  }
}